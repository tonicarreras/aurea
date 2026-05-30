import { isPlatformBrowser } from '@angular/common';
import type { DestroyRef } from '@angular/core';
import { Renderer2 } from '@angular/core';

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

/** Portals a tooltip bubble to `document.body` with `position: fixed`. */
export class TooltipOverlay {
  private anchor: Comment | null = null;
  private activeBubble: HTMLElement | null = null;
  private activeAnchor: HTMLElement | null = null;
  private resolvedPlacement: AuTooltipPlacement = 'top';
  private unbindThemeContext: (() => void) | null = null;

  private readonly onWindowChange = (): void => {
    if (this.activeBubble && this.activeAnchor) {
      this.position(this.activeBubble, this.activeAnchor, this.resolvedPlacement);
    }
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
  ): AuTooltipPlacement {
    if (!isPlatformBrowser(this.platformId)) {
      return placement;
    }
    if (!bubble) {
      this.detach();
      return placement;
    }
    this.ensurePortaled(bubble);
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
    const bubble = this.activeBubble;
    if (!bubble) {
      return;
    }
    this.renderer.removeClass(bubble, 'au-tooltip__bubble--overlay');
    clearPortaledThemeContext(bubble);
    for (const prop of ['position', 'top', 'left', 'inset-inline-start', 'inset-inline-end']) {
      bubble.style.removeProperty(prop);
    }
    bubble.style.removeProperty('--au-floating-arrow-x');
    bubble.style.removeProperty('--au-floating-arrow-y');
    bubble.removeAttribute('data-au-placement');
    if (this.anchor?.parentNode && bubble.isConnected) {
      this.anchor.parentNode.insertBefore(bubble, this.anchor);
      this.anchor.remove();
      this.anchor = null;
    } else if (bubble.parentElement === this.document.body) {
      bubble.remove();
    }
    this.activeBubble = null;
    this.activeAnchor = null;
  }

  private ensurePortaled(bubble: HTMLElement): void {
    if (bubble.parentElement === this.document.body) {
      return;
    }
    const parent = bubble.parentNode;
    if (parent) {
      this.anchor = this.document.createComment('au-tooltip-anchor');
      parent.insertBefore(this.anchor, bubble);
    }
    this.renderer.appendChild(this.document.body, bubble);
  }

  private position(
    bubble: HTMLElement,
    anchor: HTMLElement,
    placement: AuTooltipPlacement,
  ): AuTooltipPlacement {
    this.activeAnchor = anchor;
    this.resolvedPlacement = placement;
    const isFloatingPanel = bubble.classList.contains('au-floating-panel');
    const gap = isFloatingPanel
      ? readCssLengthPx(this.document, '--au-floating-gap', 10)
      : readCssLengthPx(this.document, '--au-tooltip-gap', 12);
    const anchorRect = anchor.getBoundingClientRect();
    const bubbleRect = this.measureBubble(bubble);
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
    bubble.style.left = `${result.left}px`;
    bubble.style.insetInlineStart = '';
    bubble.style.insetInlineEnd = '';
    bubble.setAttribute('data-au-placement', result.placement);
    if (isFloatingPanel) {
      this.syncFloatingArrow(bubble, anchorRect, result, bubbleRect);
    }
    return result.placement;
  }

  private syncFloatingArrow(
    bubble: HTMLElement,
    anchorRect: DOMRect,
    coords: { top: number; left: number },
    bubbleRect: DOMRect,
  ): void {
    const arrowSize = readCssLengthPx(this.document, '--au-floating-arrow-size', 10);
    const inset = arrowSize + 12;
    const anchorCenterX = anchorRect.left + anchorRect.width / 2;
    const anchorCenterY = anchorRect.top + anchorRect.height / 2;
    const x = clampValue(anchorCenterX - coords.left, inset, bubbleRect.width - inset);
    const y = clampValue(anchorCenterY - coords.top, inset, bubbleRect.height - inset);
    bubble.style.setProperty('--au-floating-arrow-x', `${x}px`);
    bubble.style.setProperty('--au-floating-arrow-y', `${y}px`);
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
