import { isPlatformBrowser } from '@angular/common';
import type { DestroyRef } from '@angular/core';
import { Renderer2 } from '@angular/core';

import { AuPortalOverlay, PortalRepositionListener } from './portal-overlay';

/**
 * Portals a field listbox to `document.body` with `position: fixed`, matching the
 * trigger width — same stacking behaviour as a native `<select>` popup (OS layer).
 */
export class FieldListboxOverlay {
  private activeListbox: HTMLElement | null = null;
  private activeAnchor: HTMLElement | null = null;

  private readonly portal: AuPortalOverlay;
  private readonly reposition: PortalRepositionListener;

  constructor(
    private readonly document: Document,
    private readonly renderer: Renderer2,
    private readonly platformId: object,
    destroyRef: DestroyRef,
  ) {
    this.portal = new AuPortalOverlay(document, renderer, platformId, 'au-field-listbox-anchor');
    this.reposition = new PortalRepositionListener(document, () => this.refreshPosition());
    destroyRef.onDestroy(() => this.detach());
  }

  /** @internal Re-positions the active overlay (scroll/resize handler). */
  refreshPosition(): void {
    if (this.activeListbox && this.activeAnchor) {
      this.position(this.activeListbox, this.activeAnchor);
    }
  }

  sync(listbox: HTMLElement | undefined, anchor: HTMLElement, open: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!open || !listbox) {
      this.detach();
      return;
    }
    this.portal.attach(listbox);
    this.renderer.addClass(listbox, 'au-field-listbox--overlay');
    this.activeListbox = listbox;
    this.position(listbox, anchor);
    this.reposition.bind();
  }

  detach(): void {
    this.reposition.unbind();
    const listbox = this.activeListbox;
    if (!listbox) {
      return;
    }
    this.renderer.removeClass(listbox, 'au-field-listbox--overlay');
    for (const prop of [
      'position',
      'top',
      'left',
      'width',
      'inset-inline-start',
      'inset-inline-end',
    ]) {
      listbox.style.removeProperty(prop);
    }
    this.portal.detach(listbox);
    this.activeListbox = null;
    this.activeAnchor = null;
  }

  private position(listbox: HTMLElement, anchor: HTMLElement): void {
    this.activeAnchor = anchor;
    const rect = anchor.getBoundingClientRect();
    const gap =
      Number.parseFloat(
        getComputedStyle(this.document.documentElement).getPropertyValue('--au-space-1'),
      ) || 4;
    listbox.style.position = 'fixed';
    listbox.style.top = `${rect.bottom + gap}px`;
    listbox.style.left = `${rect.left}px`;
    listbox.style.width = `${rect.width}px`;
    listbox.style.insetInlineStart = '';
    listbox.style.insetInlineEnd = '';
  }
}

/** True when focus left the control row and did not move into the (possibly portaled) listbox. */
export function focusLeftFieldControl(event: FocusEvent, listbox?: HTMLElement | null): boolean {
  if (!(event.currentTarget instanceof HTMLElement)) {
    return true;
  }
  const to = event.relatedTarget;
  if (to == null || !(to instanceof Node)) {
    return true;
  }
  if (event.currentTarget.contains(to)) {
    return false;
  }
  if (listbox?.contains(to)) {
    return false;
  }
  return true;
}
