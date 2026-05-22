import { isPlatformBrowser } from '@angular/common';
import type { DestroyRef } from '@angular/core';
import { Renderer2 } from '@angular/core';

/**
 * Portals a field listbox to `document.body` with `position: fixed`, matching the
 * trigger width — same stacking behaviour as a native `<select>` popup (OS layer).
 */
export class FieldListboxOverlay {
  private anchor: Comment | null = null;
  private activeListbox: HTMLElement | null = null;
  private activeAnchor: HTMLElement | null = null;

  private readonly onWindowChange = (): void => {
    if (this.activeListbox && this.activeAnchor) {
      this.position(this.activeListbox, this.activeAnchor);
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

  sync(listbox: HTMLElement | undefined, anchor: HTMLElement, open: boolean): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (!open || !listbox) {
      this.detach();
      return;
    }
    this.ensurePortaled(listbox);
    this.renderer.addClass(listbox, 'au-field-listbox--overlay');
    this.activeListbox = listbox;
    this.position(listbox, anchor);
    this.bindReposition();
  }

  detach(): void {
    this.unbindReposition();
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
    if (this.anchor?.parentNode && listbox.isConnected) {
      this.anchor.parentNode.insertBefore(listbox, this.anchor);
      this.anchor.remove();
      this.anchor = null;
    } else if (listbox.parentElement === this.document.body) {
      listbox.remove();
    }
    this.activeListbox = null;
    this.activeAnchor = null;
  }

  private ensurePortaled(listbox: HTMLElement): void {
    if (listbox.parentElement === this.document.body) {
      return;
    }
    const parent = listbox.parentNode;
    if (parent) {
      this.anchor = this.document.createComment('au-field-listbox-anchor');
      parent.insertBefore(this.anchor, listbox);
    }
    this.renderer.appendChild(this.document.body, listbox);
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
