import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  Renderer2,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  inject,
  input,
  model,
  output,
} from '@angular/core';

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
 * - **Accessibility:** `role="status"` (default/success/info) or `role="alert"` (warning/error);
 *   matching `aria-live`; close button with accessible name.
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
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.css',
  encapsulation: ViewEncapsulation.None,
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
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  private dismissTimer: ReturnType<typeof setTimeout> | undefined;
  private bodyAnchor: Comment | null = null;

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
  /** Accessible name for the close control. */
  readonly closeAriaLabel = input<string>('Dismiss notification');

  readonly liveRole = computed(() =>
    this.variant() === 'error' || this.variant() === 'warning' ? 'alert' : 'status',
  );

  readonly livePoliteness = computed(() =>
    this.variant() === 'error' || this.variant() === 'warning' ? 'assertive' : 'polite',
  );

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
    }
  });

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.clearDismissTimer();
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
    event.preventDefault();
    this.close();
  }

  close(): void {
    if (!this.open()) {
      return;
    }
    this.clearDismissTimer();
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
    if (host.parentElement === this.document.body) {
      return;
    }
    const parent = host.parentNode;
    if (parent) {
      this.bodyAnchor = this.document.createComment('au-snackbar-anchor');
      parent.insertBefore(this.bodyAnchor, host);
    }
    this.renderer.appendChild(this.document.body, host);
  }

  private restoreFromBody(): void {
    if (!isPlatformBrowser(this.platformId) || !this.bodyAnchor?.parentNode) {
      return;
    }
    const host = this.host.nativeElement;
    if (host.parentElement === this.document.body) {
      this.bodyAnchor.parentNode.insertBefore(host, this.bodyAnchor);
      this.bodyAnchor.remove();
      this.bodyAnchor = null;
    }
  }
}
