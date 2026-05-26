import { isPlatformBrowser } from '@angular/common';
import type { Renderer2 } from '@angular/core';

/**
 * Portals a DOM node to `document.body`, leaving a comment anchor in the original parent
 * so the node can be restored on detach (tooltips, listboxes, snackbars).
 */
export class AuPortalOverlay {
  private anchor: Comment | null = null;

  constructor(
    private readonly document: Document,
    private readonly renderer: Renderer2,
    private readonly platformId: object,
    private readonly anchorComment: string,
  ) {}

  attach(element: HTMLElement): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (element.parentElement === this.document.body) {
      return;
    }
    const parent = element.parentNode;
    if (parent) {
      this.anchor = this.document.createComment(this.anchorComment);
      parent.insertBefore(this.anchor, element);
    }
    this.renderer.appendChild(this.document.body, element);
  }

  detach(element: HTMLElement): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (this.anchor?.parentNode && element.isConnected) {
      this.anchor.parentNode.insertBefore(element, this.anchor);
      this.anchor.remove();
      this.anchor = null;
    } else if (element.parentElement === this.document.body) {
      element.remove();
    }
  }

  /** @internal Simulates a lost anchor (unit tests). */
  clearAnchor(): void {
    this.anchor = null;
  }
}

/** Scroll/resize listener for repositioning portaled overlays. */
export class PortalRepositionListener {
  constructor(
    private readonly document: Document,
    private readonly onChange: () => void,
  ) {}

  bind(): void {
    this.unbind();
    this.document.defaultView?.addEventListener('scroll', this.onChange, true);
    this.document.defaultView?.addEventListener('resize', this.onChange);
  }

  unbind(): void {
    this.document.defaultView?.removeEventListener('scroll', this.onChange, true);
    this.document.defaultView?.removeEventListener('resize', this.onChange);
  }
}
