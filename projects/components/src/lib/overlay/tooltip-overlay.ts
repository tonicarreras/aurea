import { isPlatformBrowser } from '@angular/common';
import type { DestroyRef } from '@angular/core';
import { Renderer2 } from '@angular/core';

import { resolveFieldListboxPortalRoot } from './field-listbox-overlay';
import { shouldSkipRepositionOnScroll } from './overlay-reposition';
import { computeTooltipPosition, type AuTooltipPlacement } from './tooltip-position';
import {
  bindPortaledThemeContextObserver,
  clearPortaledThemeContext,
  syncPortaledThemeContext,
} from './portaled-theme-context';

/** Resolves a length custom property to pixels (handles `var()` chains). */
export function readCssLengthPx(
  document: Document,
  customProp: string,
  fallbackPx: number,
): number {
  const probe = document.createElement('div');
  probe.style.cssText =
    'position:absolute;visibility:hidden;pointer-events:none;margin:0;padding:0;border:0;height:0;width:0;';
  probe.style.marginTop = `var(${customProp}, ${fallbackPx}px)`;
  document.body.appendChild(probe);
  const px = Number.parseFloat(getComputedStyle(probe).marginTop);
  probe.remove();
  return Number.isFinite(px) && px > 0 ? px : fallbackPx;
}

/** Like {@link readCssLengthPx} but allows zero and negative gaps (field listboxes). */
export function readCssGapPx(document: Document, customProp: string, fallbackPx: number): number {
  const probe = document.createElement('div');
  probe.style.cssText =
    'position:absolute;visibility:hidden;pointer-events:none;margin:0;padding:0;border:0;height:0;width:0;';
  probe.style.marginTop = `var(${customProp}, ${fallbackPx}px)`;
  document.body.appendChild(probe);
  const px = Number.parseFloat(getComputedStyle(probe).marginTop);
  probe.remove();
  return Number.isFinite(px) ? px : fallbackPx;
}

export interface TooltipOverlaySyncOptions {
  /** Aligns panel width and horizontal origin to the anchor (select/autocomplete). */
  matchAnchorWidth?: boolean;
  /** CSS custom property for anchor↔panel gap (default `--au-floating-gap`). */
  gapCssVar?: string;
  /** When false, skips floating-arrow CSS variables (field listboxes). */
  showArrow?: boolean;
}

/**
 * Portals a tooltip bubble with `position: fixed`.
 * Default target is `document.body`; when the anchor sits inside an open modal
 * `<dialog>`, the bubble is appended to that dialog (top-layer stacking).
 */
export class TooltipOverlay {
  private anchor: Comment | null = null;
  private activeBubble: HTMLElement | null = null;
  private activeAnchor: HTMLElement | null = null;
  private activePortalRoot: HTMLElement | null = null;
  private resolvedPlacement: AuTooltipPlacement = 'top';
  private syncOptions: TooltipOverlaySyncOptions | null = null;
  private unbindThemeContext: (() => void) | null = null;

  private readonly onWindowChange = (event?: Event): void => {
    if (!this.activeBubble || !this.activeAnchor) {
      return;
    }
    if (shouldSkipRepositionOnScroll(event, this.activeBubble)) {
      return;
    }
    this.position(this.activeBubble, this.activeAnchor, this.resolvedPlacement);
  };

  constructor(
    private readonly document: Document,
    private readonly renderer: Renderer2,
    private readonly platformId: object,
    destroyRef: DestroyRef,
  ) {
    destroyRef.onDestroy(() => this.detach());
  }

  sync(
    bubble: HTMLElement | undefined,
    anchor: HTMLElement,
    placement: AuTooltipPlacement,
    options?: TooltipOverlaySyncOptions,
  ): AuTooltipPlacement {
    if (!isPlatformBrowser(this.platformId)) {
      return placement;
    }
    if (!bubble) {
      this.detach();
      return placement;
    }
    this.syncOptions = options ?? null;
    const portalRoot = resolveFieldListboxPortalRoot(anchor, this.document);
    this.ensurePortaled(bubble, portalRoot);
    this.activePortalRoot = portalRoot;
    syncPortaledThemeContext(bubble, anchor);
    this.unbindThemeContext?.();
    this.unbindThemeContext = bindPortaledThemeContextObserver(bubble, anchor);
    this.renderer.addClass(bubble, 'au-tooltip__bubble--overlay');
    this.activeBubble = bubble;
    const resolved = this.position(bubble, anchor, placement);
    this.bindReposition();
    return resolved;
  }

  detach(): void {
    this.unbindReposition();
    this.unbindThemeContext?.();
    this.unbindThemeContext = null;
    this.syncOptions = null;
    const bubble = this.activeBubble;
    if (!bubble) {
      return;
    }
    this.renderer.removeClass(bubble, 'au-tooltip__bubble--overlay');
    clearPortaledThemeContext(bubble);
    for (const prop of [
      'position',
      'top',
      'left',
      'width',
      'inset-inline-start',
      'inset-inline-end',
    ]) {
      bubble.style.removeProperty(prop);
    }
    bubble.style.removeProperty('--au-floating-arrow-x');
    bubble.style.removeProperty('--au-floating-arrow-y');
    bubble.removeAttribute('data-au-placement');
    if (this.anchor?.parentNode && bubble.isConnected) {
      this.anchor.parentNode.insertBefore(bubble, this.anchor);
      this.anchor.remove();
      this.anchor = null;
    } else if (
      this.activePortalRoot &&
      bubble.parentElement === this.activePortalRoot &&
      this.activePortalRoot !== this.document.body
    ) {
      bubble.remove();
    } else if (bubble.parentElement === this.document.body) {
      bubble.remove();
    }
    this.activeBubble = null;
    this.activeAnchor = null;
    this.activePortalRoot = null;
  }

  private ensurePortaled(bubble: HTMLElement, portalRoot: HTMLElement): void {
    if (bubble.parentElement === portalRoot) {
      return;
    }
    const parent = bubble.parentNode;
    if (parent) {
      this.anchor = this.document.createComment('au-tooltip-anchor');
      parent.insertBefore(this.anchor, bubble);
    }
    this.renderer.appendChild(portalRoot, bubble);
  }

  private position(
    bubble: HTMLElement,
    anchor: HTMLElement,
    placement: AuTooltipPlacement,
  ): AuTooltipPlacement {
    this.activeAnchor = anchor;
    this.resolvedPlacement = placement;
    const gapVar = this.syncOptions?.gapCssVar ?? '--au-floating-gap';
    const gap =
      gapVar === '--au-floating-gap'
        ? readCssLengthPx(this.document, gapVar, 10)
        : readCssGapPx(this.document, gapVar, 0);
    const anchorRect = anchor.getBoundingClientRect();
    if (this.syncOptions?.matchAnchorWidth) {
      bubble.style.width = `${anchorRect.width}px`;
    } else {
      bubble.style.removeProperty('width');
    }
    const bubbleRect = this.readBubbleRect(bubble);
    const view = this.document.defaultView;
    const viewport = {
      width: view?.innerWidth ?? 0,
      height: view?.innerHeight ?? 0,
    };
    const result = computeTooltipPosition(anchorRect, bubbleRect, placement, gap, viewport);
    this.resolvedPlacement = result.placement;
    bubble.style.visibility = '';
    bubble.style.position = 'fixed';
    bubble.style.top = `${result.top}px`;
    bubble.style.left = `${this.syncOptions?.matchAnchorWidth ? anchorRect.left : result.left}px`;
    bubble.style.insetInlineStart = '';
    bubble.style.insetInlineEnd = '';
    bubble.setAttribute('data-au-placement', result.placement);
    if (this.shouldSyncArrow(bubble)) {
      this.syncFloatingArrow(bubble, anchorRect, result, bubbleRect);
    }
    return result.placement;
  }

  private shouldSyncArrow(bubble: HTMLElement): boolean {
    if (this.syncOptions?.showArrow === false) {
      return false;
    }
    return (
      bubble.classList.contains('au-floating-panel') ||
      bubble.classList.contains('au-tooltip__bubble')
    );
  }

  private syncFloatingArrow(
    bubble: HTMLElement,
    anchorRect: DOMRect,
    coords: { top: number; left: number },
    bubbleRect: DOMRect,
  ): void {
    const inset = readCssLengthPx(this.document, '--au-floating-arrow-inset', 22);
    const anchorCenterX = anchorRect.left + anchorRect.width / 2;
    const anchorCenterY = anchorRect.top + anchorRect.height / 2;
    const panelLeft = this.syncOptions?.matchAnchorWidth ? anchorRect.left : coords.left;
    const x = clampValue(anchorCenterX - panelLeft, inset, bubbleRect.width - inset);
    const y = clampValue(anchorCenterY - coords.top, inset, bubbleRect.height - inset);
    bubble.style.setProperty('--au-floating-arrow-x', `${x}px`);
    bubble.style.setProperty('--au-floating-arrow-y', `${y}px`);
  }

  private readBubbleRect(bubble: HTMLElement): DOMRect {
    if (
      bubble.style.position === 'fixed' &&
      bubble.style.visibility !== 'hidden' &&
      bubble.isConnected
    ) {
      const rect = bubble.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        return rect;
      }
    }
    return this.measureBubble(bubble);
  }

  private measureBubble(bubble: HTMLElement): DOMRect {
    bubble.style.visibility = 'hidden';
    bubble.style.position = 'fixed';
    bubble.style.top = '0px';
    bubble.style.left = '0px';
    void bubble.offsetHeight;
    return bubble.getBoundingClientRect();
  }

  private bindReposition(): void {
    this.unbindReposition();
    this.document.defaultView?.addEventListener('scroll', this.onWindowChange, true);
    this.document.defaultView?.addEventListener('resize', this.onWindowChange);
  }

  private unbindReposition(): void {
    this.document.defaultView?.removeEventListener('scroll', this.onWindowChange, true);
    this.document.defaultView?.removeEventListener('resize', this.onWindowChange);
  }
}

function clampValue(value: number, min: number, max: number): number {
  if (max < min) {
    return (min + max) / 2;
  }
  return Math.min(Math.max(value, min), max);
}
