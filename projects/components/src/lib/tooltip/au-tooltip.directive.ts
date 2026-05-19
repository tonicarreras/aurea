import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  PLATFORM_ID,
  Renderer2,
  afterRenderEffect,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { TooltipOverlay } from '../theme/tooltip-overlay';
import type { TooltipPlacement } from '../theme/tooltip-position';

/**
 * Design-system **tooltip**: supplementary label on hover or keyboard focus.
 *
 * @remarks
 * - Apply to the **focusable trigger** (button, link, icon control).
 * - **Accessibility:** `role="tooltip"` + `aria-describedby` on the host while open.
 * - **Pointer:** show delay / hide delay avoid flicker when crossing the trigger.
 * - **Portal:** bubble is fixed on `document.body` so it is not clipped by overflow.
 *
 * @example
 * ```html
 * <au-button auTooltip="Save changes">Save</au-button>
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
  readonly auTooltip = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  /** Preferred placement; flips when there is not enough viewport space. */
  readonly auTooltipPlacement = input<TooltipPlacement>('top');

  /** Milliseconds before showing after hover/focus. */
  readonly auTooltipShowDelay = input(200);

  /** Milliseconds before hiding after pointer/focus leaves. */
  readonly auTooltipHideDelay = input(100);

  /** Suppresses the tooltip when true. */
  readonly auTooltipDisabled = input(false);

  private static idCounter = 0;

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);

  private readonly visible = signal(false);
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

  constructor() {
    afterRenderEffect(() => {
      if (!this.visible() || !this.hasText()) {
        this.overlay.detach();
        this.removeBubble();
        return;
      }
      const bubble = this.ensureBubble();
      this.renderer.setProperty(bubble, 'textContent', this.auTooltip().trim());
      this.overlay.sync(bubble, this.host.nativeElement, this.auTooltipPlacement());
    });
  }

  protected onPointerEnter(): void {
    this.scheduleShow();
  }

  protected onPointerLeave(): void {
    this.scheduleHide();
  }

  protected onFocusIn(): void {
    this.scheduleShow();
  }

  protected onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget;
    const anchor = this.host.nativeElement;
    if (next instanceof Node && anchor.contains(next)) {
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

  private scheduleShow(): void {
    if (this.auTooltipDisabled() || !this.hasText()) {
      return;
    }
    this.clearHideTimer();
    this.clearShowTimer();
    const delay = this.auTooltipShowDelay();
    if (delay <= 0) {
      this.visible.set(true);
      return;
    }
    this.showTimer = setTimeout(() => this.visible.set(true), delay);
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
    const bubble = this.renderer.createElement('div');
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
