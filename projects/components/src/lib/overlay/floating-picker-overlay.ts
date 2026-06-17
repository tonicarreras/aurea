import { isPlatformBrowser } from '@angular/common';
import type { DestroyRef } from '@angular/core';
import { Renderer2 } from '@angular/core';

import { resolveFieldListboxPortalRoot } from './field-listbox-overlay';
import {
  bindPortaledThemeContextObserver,
  clearPortaledThemeContext,
  syncPortaledThemeContext,
} from './portaled-theme-context';
import { TooltipOverlay } from './tooltip-overlay';
import type { AuTooltipPlacement } from './tooltip-position';

/** Narrow viewports — calendar/time pickers use a bottom-sheet modal instead of a popover. */
export const AU_RESPONSIVE_FLOATING_MODAL_MQ = '(max-width: 42rem)';

export function prefersResponsiveFloatingModal(window: Window | null | undefined): boolean {
  return window?.matchMedia?.(AU_RESPONSIVE_FLOATING_MODAL_MQ).matches ?? false;
}

const BACKDROP_CLASS = 'au-floating-panel-backdrop';
const MODAL_CLASS = 'au-floating-panel--responsive-modal';

/**
 * Date/time picker overlay: popover on wide viewports, modal bottom sheet when narrow.
 */
export class FloatingPickerOverlay {
  private readonly tooltipOverlay: TooltipOverlay;
  private backdrop: HTMLElement | null = null;
  private anchorComment: Comment | null = null;
  private activePanel: HTMLElement | null = null;
  private activeAnchor: HTMLElement | null = null;
  private activePlacement: AuTooltipPlacement = 'bottom';
  private unbindThemeContext: (() => void) | null = null;
  private unbindLayoutMedia: (() => void) | null = null;

  constructor(
    private readonly document: Document,
    private readonly renderer: Renderer2,
    private readonly platformId: object,
    destroyRef: DestroyRef,
  ) {
    this.tooltipOverlay = new TooltipOverlay(document, renderer, platformId, destroyRef);
    destroyRef.onDestroy(() => this.detach());
  }

  sync(
    panel: HTMLElement | undefined,
    anchor: HTMLElement,
    placement: AuTooltipPlacement = 'bottom',
  ): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (!panel) {
      this.detach();
      return;
    }

    this.activePanel = panel;
    this.activeAnchor = anchor;
    this.activePlacement = placement;
    this.bindLayoutMedia();

    if (prefersResponsiveFloatingModal(this.document.defaultView)) {
      this.syncResponsiveModal(panel, anchor);
      return;
    }

    this.teardownResponsiveModal(panel);
    this.renderer.addClass(panel, 'au-floating-panel');
    this.tooltipOverlay.sync(panel, anchor, placement);
  }

  detach(): void {
    this.unbindLayoutMedia?.();
    this.unbindLayoutMedia = null;
    this.unbindThemeContext?.();
    this.unbindThemeContext = null;

    const panel = this.activePanel;
    if (panel) {
      this.teardownResponsiveModal(panel);
    }

    this.tooltipOverlay.detach();

    if (panel?.isConnected) {
      panel.remove();
    }
    this.anchorComment?.remove();
    this.anchorComment = null;

    this.activePanel = null;
    this.activeAnchor = null;
  }

  private syncResponsiveModal(panel: HTMLElement, anchor: HTMLElement): void {
    this.tooltipOverlay.detach();
    const portalRoot = resolveFieldListboxPortalRoot(anchor, this.document);
    this.ensureBackdrop(portalRoot);
    this.portalPanel(panel, portalRoot);
    portalRoot.insertBefore(this.backdrop!, panel);

    this.renderer.addClass(panel, 'au-floating-panel');
    this.renderer.addClass(panel, MODAL_CLASS);
    this.renderer.addClass(panel, 'au-tooltip__bubble--overlay');
    panel.style.removeProperty('top');
    panel.style.removeProperty('left');
    panel.style.removeProperty('width');
    panel.removeAttribute('data-au-placement');

    syncPortaledThemeContext(panel, anchor);
    this.unbindThemeContext?.();
    this.unbindThemeContext = bindPortaledThemeContextObserver(panel, anchor);
  }

  private teardownResponsiveModal(panel: HTMLElement): void {
    if (this.backdrop?.isConnected) {
      this.backdrop.remove();
    }
    this.renderer.removeClass(panel, MODAL_CLASS);
    clearPortaledThemeContext(panel);
  }

  private ensureBackdrop(portalRoot: HTMLElement): void {
    if (!this.backdrop) {
      this.backdrop = this.renderer.createElement('div') as HTMLDivElement;
      this.renderer.addClass(this.backdrop, BACKDROP_CLASS);
      this.renderer.setAttribute(this.backdrop, 'aria-hidden', 'true');
      this.renderer.appendChild(portalRoot, this.backdrop);
      return;
    }
    if (this.backdrop.parentElement !== portalRoot) {
      this.renderer.appendChild(portalRoot, this.backdrop);
    }
  }

  private portalPanel(panel: HTMLElement, portalRoot: HTMLElement): void {
    if (panel.parentElement === portalRoot) {
      return;
    }
    const parent = panel.parentNode;
    if (parent && !this.anchorComment) {
      this.anchorComment = this.document.createComment('au-floating-picker-anchor');
      parent.insertBefore(this.anchorComment, panel);
    }
    this.renderer.appendChild(portalRoot, panel);
  }

  private bindLayoutMedia(): void {
    if (this.unbindLayoutMedia) {
      return;
    }
    const view = this.document.defaultView;
    const mq = view?.matchMedia?.(AU_RESPONSIVE_FLOATING_MODAL_MQ);
    if (!mq) {
      return;
    }
    const onChange = (): void => {
      const panel = this.activePanel;
      const anchor = this.activeAnchor;
      if (!panel || !anchor) {
        return;
      }
      this.sync(panel, anchor, this.activePlacement);
    };
    mq.addEventListener('change', onChange);
    this.unbindLayoutMedia = () => mq.removeEventListener('change', onChange);
  }
}
