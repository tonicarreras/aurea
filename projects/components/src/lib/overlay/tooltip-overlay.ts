import { isPlatformBrowser } from '@angular/common';
import type { DestroyRef } from '@angular/core';
import { Renderer2 } from '@angular/core';

import { AuPortalOverlay, PortalRepositionListener } from './portal-overlay';
import { computeTooltipPosition, type AuTooltipPlacement } from './tooltip-position';

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
  private activeBubble: HTMLElement | null = null;
  private activeAnchor: HTMLElement | null = null;
  private resolvedPlacement: AuTooltipPlacement = 'top';

  private readonly portal: AuPortalOverlay;
  private readonly reposition: PortalRepositionListener;

  constructor(
    private readonly document: Document,
    private readonly renderer: Renderer2,
    private readonly platformId: object,
    destroyRef: DestroyRef,
  ) {
    this.portal = new AuPortalOverlay(document, renderer, platformId, 'au-tooltip-anchor');
    this.reposition = new PortalRepositionListener(document, () => this.refreshPosition());
    destroyRef.onDestroy(() => this.detach());
  }

  /** @internal Re-positions the active tooltip (scroll/resize handler). */
  refreshPosition(): void {
    if (this.activeBubble && this.activeAnchor) {
      this.position(this.activeBubble, this.activeAnchor, this.resolvedPlacement);
    }
  }

  sync(
    bubble: HTMLElement | undefined,
    anchor: HTMLElement,
    placement: AuTooltipPlacement,
  ): AuTooltipPlacement {
    if (!isPlatformBrowser(this.platformId)) return placement;
    if (!bubble) {
      this.detach();
      return placement;
    }
    this.portal.attach(bubble);
    this.renderer.addClass(bubble, 'au-tooltip__bubble--overlay');
    this.activeBubble = bubble;
    const resolved = this.position(bubble, anchor, placement);
    this.reposition.bind();
    return resolved;
  }

  detach(): void {
    this.reposition.unbind();
    const bubble = this.activeBubble;
    if (!bubble) {
      return;
    }
    this.renderer.removeClass(bubble, 'au-tooltip__bubble--overlay');
    for (const prop of ['position', 'top', 'left', 'inset-inline-start', 'inset-inline-end']) {
      bubble.style.removeProperty(prop);
    }
    this.portal.detach(bubble);
    this.activeBubble = null;
    this.activeAnchor = null;
  }

  private position(
    bubble: HTMLElement,
    anchor: HTMLElement,
    placement: AuTooltipPlacement,
  ): AuTooltipPlacement {
    this.activeAnchor = anchor;
    this.resolvedPlacement = placement;
    const gap = readCssLengthPx(this.document, '--au-tooltip-gap', 12);
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
    return result.placement;
  }

  private measureBubble(bubble: HTMLElement): DOMRect {
    bubble.style.visibility = 'hidden';
    bubble.style.position = 'fixed';
    bubble.style.top = '0px';
    bubble.style.left = '0px';
    void bubble.offsetHeight;
    return bubble.getBoundingClientRect();
  }
}
