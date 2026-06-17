import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  Renderer2,
  afterRenderEffect,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { injectHostRef } from '../au-host-element';

import { AuIcon, type AuIconName } from '../icon/icon';
import {
  isTopmostSnackbarStackEntry,
  registerSnackbarStackEntry,
  setSnackbarStackSurface,
  subscribeSnackbarStackLayout,
  unregisterSnackbarStackEntry,
} from './snackbar-stack';
import {
  bindPortaledThemeContextObserver,
  clearPortaledThemeContext,
  syncPortaledThemeContext,
} from '../overlay/portaled-theme-context';

export type AuSnackbarVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type AuSnackbarPosition =
  | 'bottom-center'
  | 'bottom-start'
  | 'bottom-end'
  | 'top-center'
  | 'top-start'
  | 'top-end';

/**
 * Design-system **snackbar**: brief feedback message with optional action and auto-dismiss.
 *
 * @remarks
 * - **Visibility:** `[(open)]` toggles the toast; `durationMs` auto-closes (0 = manual dismiss only).
 * - **Content:** `message` input or projected default slot (slot used when `message` is empty).
 * - **Icons:** {@link AuIcon} per semantic variant; `default` has none; disable with `showIcon`.
 * - **Stacking:** multiple open instances with the same `position` stack; newest sits on the edge,
 *   older toasts shift upward (bottom) or downward (top). Escape dismisses only the topmost toast.
 * - **Accessibility:** `role="status"` (default/success/info) or `role="alert"` (warning/error);
 *   matching `aria-live`; only the **topmost** toast in a stack announces (`aria-live="off"` on others).
 *
 * @example
 * ```html
 * <au-snackbar
 *   [(open)]="saved"
 *   message="Changes saved"
 *   variant="success"
 *   [durationMs]="4000"
 * />
 * ```
 */
@Component({
  selector: 'au-snackbar',
  imports: [AuIcon],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-snackbar',
    '[class.au-snackbar--open]': 'open()',
    '[attr.data-au-variant]': 'variant()',
    '[attr.data-au-position]': 'position()',
    '(document:keydown)': 'onDocumentKeydown($event)',
  },
})
export class AuSnackbar {
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectHostRef<HTMLElement>();
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  private dismissTimer: ReturnType<typeof setTimeout> | undefined;
  private bodyAnchor: Comment | null = null;
  private unbindThemeContext: (() => void) | null = null;
  private stackId: number | null = null;
  private stackResizeObserver: ResizeObserver | null = null;
  /** Only the newest toast in a position group uses polite/assertive live regions. */
  private readonly announceLive = signal(true);

  /** Whether the snackbar is visible. */
  readonly open = model<boolean>(false);
  /** Emits when the snackbar is dismissed (timeout, close, or Escape). */
  readonly dismiss = output<void>();
  /** Emits when the optional action control is activated. */
  readonly action = output<void>();

  /** Primary text; ignored when empty if default slot content is projected. */
  readonly message = input<string>('');
  readonly variant = input<AuSnackbarVariant>('default');
  readonly position = input<AuSnackbarPosition>('bottom-center');
  /** Auto-dismiss delay in ms; `0` keeps the snackbar open until the user dismisses it. */
  readonly durationMs = input<number>(5000);
  /** Label for the optional action button. */
  readonly actionLabel = input<string>('');
  readonly showCloseButton = input<boolean>(true);
  /** Shows the semantic variant icon (none for `default`). */
  readonly showIcon = input<boolean>(true);
  /** Accessible name for the close control. */
  readonly closeAriaLabel = input<string>('Dismiss notification');

  readonly showVariantIcon = computed(() => this.showIcon() && this.variant() !== 'default');

  readonly variantIcon = computed((): AuIconName | null => {
    switch (this.variant()) {
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'info':
        return 'info';
      default:
        return null;
    }
  });

  readonly liveRole = computed(() =>
    this.variant() === 'error' || this.variant() === 'warning' ? 'alert' : 'status',
  );

  readonly livePoliteness = computed(() => {
    if (!this.announceLive()) {
      return 'off';
    }
    return this.variant() === 'error' || this.variant() === 'warning' ? 'assertive' : 'polite';
  });

  readonly showMessage = computed(() => this.message().trim().length > 0);

  private readonly syncOpenState = afterRenderEffect(() => {
    const isOpen = this.open();
    const duration = this.durationMs();
    this.clearDismissTimer();
    if (isOpen && duration > 0) {
      this.dismissTimer = setTimeout(() => this.close(), duration);
    }
    if (isOpen) {
      this.attachToBody();
      this.syncStack();
    } else {
      this.teardownStack();
    }
  });

  constructor() {
    const unsubscribeLayout = subscribeSnackbarStackLayout(() => this.updateAnnounceLive());
    this.destroyRef.onDestroy(() => {
      unsubscribeLayout();
      this.clearDismissTimer();
      this.teardownStack();
      this.restoreFromBody();
    });
  }

  onActionClick(): void {
    this.action.emit();
    this.close();
  }

  onCloseClick(): void {
    this.close();
  }

  onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape' || !this.open()) {
      return;
    }
    if (this.stackId !== null && !isTopmostSnackbarStackEntry(this.stackId)) {
      return;
    }
    event.preventDefault();
    this.close();
  }

  close(): void {
    if (!this.open()) {
      return;
    }
    this.clearDismissTimer();
    this.teardownStack();
    this.open.set(false);
    this.dismiss.emit();
  }

  private clearDismissTimer(): void {
    if (this.dismissTimer !== undefined) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = undefined;
    }
  }

  /** Keeps the toast above Storybook canvases and transformed ancestors. */
  private attachToBody(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const host = this.host.nativeElement;
    if (host.parentElement !== this.document.body) {
      const parent = host.parentNode;
      if (parent) {
        this.bodyAnchor = this.document.createComment('au-snackbar-anchor');
        parent.insertBefore(this.bodyAnchor, host);
      }
      this.renderer.appendChild(this.document.body, host);
    }
    syncPortaledThemeContext(host, host);
    this.unbindThemeContext?.();
    this.unbindThemeContext = bindPortaledThemeContextObserver(host, host);
  }

  private syncStack(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const host = this.host.nativeElement;
    const surface = host.querySelector<HTMLElement>('.au-snackbar__surface');

    if (this.stackId === null) {
      this.stackId = registerSnackbarStackEntry(host, this.position());
    }
    setSnackbarStackSurface(this.stackId, surface);
    this.updateAnnounceLive();
    this.observeStackResize(surface);
  }

  private updateAnnounceLive(): void {
    if (!this.open() || this.stackId === null) {
      this.announceLive.set(true);
      return;
    }
    this.announceLive.set(isTopmostSnackbarStackEntry(this.stackId));
  }

  private teardownStack(): void {
    if (this.stackId !== null) {
      unregisterSnackbarStackEntry(this.stackId);
      this.stackId = null;
    }
    this.stackResizeObserver?.disconnect();
    this.stackResizeObserver = null;
  }

  private observeStackResize(surface: HTMLElement | null): void {
    if (!isPlatformBrowser(this.platformId) || typeof ResizeObserver === 'undefined') {
      return;
    }
    this.stackResizeObserver?.disconnect();
    if (!surface || this.stackId === null) {
      return;
    }
    this.stackResizeObserver = new ResizeObserver(() => {
      if (this.stackId !== null) {
        setSnackbarStackSurface(this.stackId, surface);
      }
    });
    this.stackResizeObserver.observe(surface);
  }

  private restoreFromBody(): void {
    if (!isPlatformBrowser(this.platformId) || !this.bodyAnchor?.parentNode) {
      return;
    }
    const host = this.host.nativeElement;
    this.unbindThemeContext?.();
    this.unbindThemeContext = null;
    if (host.parentElement === this.document.body) {
      clearPortaledThemeContext(host);
      this.bodyAnchor.parentNode?.insertBefore(host, this.bodyAnchor);
      this.bodyAnchor.remove();
      this.bodyAnchor = null;
    }
  }
}
