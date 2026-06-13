import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  PLATFORM_ID,
  Renderer2,
  afterRenderEffect,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { injectHostRef } from '../au-host-element';
import { TooltipOverlay } from '../overlay/tooltip-overlay';
import type { AuTooltipPlacement } from '../overlay/tooltip-position';

/**
 * Design-system **tooltip**: supplementary label on hover or keyboard focus.
 *
 * @remarks
 * - Apply to the **focusable trigger** (button, link, icon control).
 * - **Accessibility:** `role="tooltip"` + `aria-describedby` on the host while open.
 * - **Pointer:** show delay / hide delay avoid flicker when crossing the trigger.
 * - **Focus:** shows on keyboard focus (`:focus-visible`), not on programmatic `.focus()` (e.g. after a modal closes).
 * - **Portal:** bubble is fixed on `document.body` so it is not clipped by overflow.
 *
 * @example
 * ```html
 * <button auButton auTooltip="Save changes">Save</button>
 * ```
 */
@Directive({
  selector: '[auTooltip]',
  host: {
    '(mouseenter)': 'onPointerEnter()',
    '(mouseleave)': 'onPointerLeave()',
    '(focusin)': 'onFocusIn()',
    '(focusout)': 'onFocusOut($event)',
    '(document:keydown)': 'onDocumentKeydown($event)',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
  },
})
export class AuTooltip {
  /** Tooltip copy (ignored when empty). */
  readonly auTooltip = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });

  /** Preferred placement; flips when there is not enough viewport space. */
  readonly auTooltipPlacement = input<AuTooltipPlacement>('top');

  /** Milliseconds before showing after hover/focus. */
  readonly auTooltipShowDelay = input(200);

  /** Milliseconds before hiding after pointer/focus leaves. */
  readonly auTooltipHideDelay = input(100);

  /** Suppresses the tooltip when true. */
  readonly auTooltipDisabled = input(false);

  private static idCounter = 0;

  private readonly host = injectHostRef<HTMLElement>();
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);

  private readonly visible = signal(false);
  private pointerInside = false;
  private showTimer: ReturnType<typeof setTimeout> | undefined;
  private hideTimer: ReturnType<typeof setTimeout> | undefined;
  private bubble: HTMLElement | null = null;

  private readonly overlay = new TooltipOverlay(
    inject(DOCUMENT),
    inject(Renderer2),
    inject(PLATFORM_ID),
    this.destroyRef,
  );

  readonly tooltipId = `au-tooltip-${++AuTooltip.idCounter}`;
  readonly hasText = computed(() => this.auTooltip().trim().length > 0);
  readonly ariaDescribedBy = computed(() =>
    this.visible() && this.hasText() ? this.tooltipId : null,
  );

  private readonly syncTooltipOverlay = afterRenderEffect(() => {
    if (!this.visible() || !this.hasText()) {
      this.overlay.detach();
      this.removeBubble();
      return;
    }
    const bubble = this.ensureBubble();
    this.renderer.setProperty(bubble, 'textContent', this.auTooltip().trim());
    this.overlay.sync(bubble, this.host.nativeElement, this.auTooltipPlacement());
  });

  protected onPointerEnter(): void {
    this.pointerInside = true;
    this.scheduleShow();
  }

  protected onPointerLeave(): void {
    this.pointerInside = false;
    this.scheduleHide();
  }

  protected onFocusIn(): void {
    if (!this.shouldShowFromFocus()) {
      return;
    }
    this.scheduleShow();
  }

  protected onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget;
    const anchor = this.host.nativeElement;
    if (next instanceof Node && anchor.contains(next)) {
      return;
    }
    if (next instanceof Element && next.closest('dialog[open]')) {
      this.dismissImmediately();
      return;
    }
    this.scheduleHide();
  }

  protected onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape' || !this.visible()) {
      return;
    }
    this.clearTimers();
    this.visible.set(false);
  }

  private shouldShowFromFocus(): boolean {
    return this.host.nativeElement.matches(':focus-visible');
  }

  private shouldShow(): boolean {
    return this.pointerInside || this.shouldShowFromFocus();
  }

  private scheduleShow(): void {
    if (this.auTooltipDisabled() || !this.hasText()) {
      return;
    }
    this.clearHideTimer();
    this.clearShowTimer();
    const delay = this.auTooltipShowDelay();
    if (delay <= 0) {
      /* v8 ignore start -- pointer/focus state can only reach scheduleShow when visible */
      if (!this.shouldShow()) {
        return;
      }
      /* v8 ignore stop */
      this.visible.set(true);
      return;
    }
    this.showTimer = setTimeout(() => {
      /* v8 ignore start -- stale timer after pointer/focus left */
      if (!this.shouldShow()) {
        return;
      }
      /* v8 ignore stop */
      this.visible.set(true);
    }, delay);
  }

  private dismissImmediately(): void {
    this.clearTimers();
    this.visible.set(false);
  }

  private scheduleHide(): void {
    this.clearShowTimer();
    this.clearHideTimer();
    const delay = this.auTooltipHideDelay();
    if (delay <= 0) {
      this.visible.set(false);
      return;
    }
    this.hideTimer = setTimeout(() => this.visible.set(false), delay);
  }

  private clearTimers(): void {
    this.clearShowTimer();
    this.clearHideTimer();
  }

  private clearShowTimer(): void {
    if (this.showTimer !== undefined) {
      clearTimeout(this.showTimer);
      this.showTimer = undefined;
    }
  }

  private clearHideTimer(): void {
    if (this.hideTimer !== undefined) {
      clearTimeout(this.hideTimer);
      this.hideTimer = undefined;
    }
  }

  private ensureBubble(): HTMLElement {
    if (this.bubble) {
      return this.bubble;
    }
    const bubble = this.renderer.createElement('div') as HTMLElement;
    this.renderer.addClass(bubble, 'au-tooltip__bubble');
    this.renderer.setAttribute(bubble, 'role', 'tooltip');
    this.renderer.setAttribute(bubble, 'id', this.tooltipId);
    this.bubble = bubble;
    return bubble;
  }

  private removeBubble(): void {
    if (!this.bubble) {
      return;
    }
    if (this.bubble.parentNode) {
      this.renderer.removeChild(this.bubble.parentNode, this.bubble);
    }
    this.bubble = null;
  }
}
