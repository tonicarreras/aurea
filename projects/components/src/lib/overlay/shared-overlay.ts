import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  PLATFORM_ID,
  Renderer2,
  afterRenderEffect,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { bindDocumentDismiss } from './document-dismiss';
import { TooltipOverlay } from './tooltip-overlay';
import type { AuTooltipPlacement } from './tooltip-position';

/**
 * Shared abstract base for components that portal a floating panel to
 * `document.body` anchored to a registered trigger element.
 *
 * Encapsulates:
 * - `TooltipOverlay` setup (portal + position)
 * - Document click/keyboard dismiss
 * - Scroll-close behaviour
 * - Trigger registration
 * - Open/close state management
 *
 * @remarks
 * Subclasses must provide:
 * - The `@Component` decorator (selector, template, style, providers)
 * - `overlayPanelClass` — the BEM panel class (`au-menu__panel`, etc.)
 */
@Directive()
export abstract class SharedOverlay {
  /** Two-way bound open state. */
  readonly open = model(false);

  /** Preferred placement relative to the trigger. Falls back on overflow. */
  readonly placement = input<AuTooltipPlacement>('bottom');

  /** When `true`, `toggle()` is a no-op. */
  readonly disabled = input(false);

  /** Emits when open state changes. */
  readonly openChange = output<boolean>();

  // ── Dependencies ──────────────────────────────────────────────
  protected readonly host = inject(ElementRef<HTMLElement>);
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly document = inject(DOCUMENT);
  protected readonly renderer = inject(Renderer2);

  // ── Overlay ───────────────────────────────────────────────────
  protected readonly overlay = new TooltipOverlay(
    this.document,
    this.renderer,
    inject(PLATFORM_ID),
    this.destroyRef,
  );

  // ── Template references ───────────────────────────────────────
  protected readonly panelRef = viewChild<ElementRef<HTMLElement>>('panel');
  protected readonly triggerHost = signal<HTMLElement | null>(null);

  constructor() {
    bindDocumentDismiss(this.document, this.renderer, this.destroyRef, {
      onClick: (event) => this.onDocumentClick(event),
      onKeydown: (event) => this.onDocumentKeydown(event),
    });
    this.bindScrollDismiss();
  }

  /**
   * Subclass must provide the BEM panel class (e.g. `'au-menu__panel'`).
   * Used by `syncPanelOverlay` when portaling the panel to the overlay.
   */
  protected abstract readonly overlayPanelClass: string;

  /**
   * Portals the panel to `document.body` and positions it relative to the
   * trigger each time the open state, trigger, or panel element changes.
   */
  private readonly syncPanelOverlay = afterRenderEffect(() => {
    const panel = this.panelRef()?.nativeElement;
    const trigger = this.triggerHost();
    if (!this.open() || !panel || !trigger) {
      this.overlay.detach();
      return;
    }
    this.renderer.addClass(panel, 'au-floating-panel');
    this.renderer.addClass(panel, this.overlayPanelClass);
    this.overlay.sync(panel, trigger, this.placement());
  });

  // ── Scroll dismiss ────────────────────────────────────────────
  /**
   * Closes the overlay on window scroll — follows the standard UX pattern
   * where menus / popovers dismiss on scroll instead of repositioning.
   */
  private bindScrollDismiss(): void {
    const win = this.document.defaultView;
    if (!win) return;
    const unlisten = this.renderer.listen(win, 'scroll', () => {
      if (!this.open()) {
        return;
      }
      this.overlay.detach();
      this.setOpen(false);
    });
    this.destroyRef.onDestroy(() => unlisten());
  }

  // ── Public API ────────────────────────────────────────────────

  /** Register the trigger element that anchors the overlay. */
  registerTrigger(el: HTMLElement): void {
    this.triggerHost.set(el);
  }

  /** Toggle open/closed (no-op when `disabled`). */
  toggle(): void {
    if (this.disabled()) {
      return;
    }
    this.setOpen(!this.open());
  }

  /** Close the overlay (no-op when already closed). */
  close(): void {
    if (!this.open()) {
      return;
    }
    this.setOpen(false);
  }

  /** Set open state and emit change. */
  private setOpen(value: boolean): void {
    this.open.set(value);
    this.openChange.emit(value);
  }

  // ── Document dismiss handlers ─────────────────────────────────

  /**
   * Closes when a click occurs outside both the component host
   * and the portaled panel.
   */
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.open()) {
      return;
    }
    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }
    const hostEl = this.host.nativeElement as HTMLElement;
    const panel = this.panelRef()?.nativeElement;
    if (hostEl.contains(target) || panel?.contains(target)) {
      return;
    }
    this.close();
  }

  /** Closes on Escape key. */
  protected onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.open() || event.key !== 'Escape') {
      return;
    }
    event.preventDefault();
    this.close();
  }
}
