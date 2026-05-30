import { isPlatformBrowser } from '@angular/common';
import type { DestroyRef } from '@angular/core';
import { Renderer2 } from '@angular/core';

import {
  bindPortaledThemeContextObserver,
  clearPortaledThemeContext,
  syncPortaledThemeContext,
} from './portaled-theme-context';

/**
 * Portals a field listbox with `position: fixed`, matching the trigger width.
 *
 * Default target is `document.body`. When the anchor sits inside an open modal
 * `<dialog>`, the listbox is appended to that dialog so it stays in the browser
 * top layer (native `showModal()` renders above normal DOM regardless of z-index).
 */
export class FieldListboxOverlay {
  private anchor: Comment | null = null;
  private activeListbox: HTMLElement | null = null;
  private activeAnchor: HTMLElement | null = null;
  private activePortalRoot: HTMLElement | null = null;
  private unbindThemeContext: (() => void) | null = null;

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
    const portalRoot = resolveFieldListboxPortalRoot(anchor, this.document);
    this.ensurePortaled(listbox, portalRoot);
    this.renderer.addClass(listbox, 'au-field-listbox--overlay');
    this.activeListbox = listbox;
    this.activePortalRoot = portalRoot;
    syncPortaledThemeContext(listbox, anchor);
    this.unbindThemeContext?.();
    this.unbindThemeContext = bindPortaledThemeContextObserver(listbox, anchor);
    this.position(listbox, anchor);
    this.bindReposition();
  }

  detach(): void {
    this.unbindReposition();
    this.unbindThemeContext?.();
    this.unbindThemeContext = null;
    const listbox = this.activeListbox;
    if (!listbox) {
      return;
    }
    this.renderer.removeClass(listbox, 'au-field-listbox--overlay');
    clearPortaledThemeContext(listbox);
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
    } else if (
      this.activePortalRoot &&
      listbox.parentElement === this.activePortalRoot &&
      this.activePortalRoot !== this.document.body
    ) {
      listbox.remove();
    } else if (listbox.parentElement === this.document.body) {
      listbox.remove();
    }
    this.activeListbox = null;
    this.activeAnchor = null;
    this.activePortalRoot = null;
  }

  private ensurePortaled(listbox: HTMLElement, portalRoot: HTMLElement): void {
    if (listbox.parentElement === portalRoot) {
      return;
    }
    const parent = listbox.parentNode;
    if (parent) {
      this.anchor = this.document.createComment('au-field-listbox-anchor');
      parent.insertBefore(this.anchor, listbox);
    }
    this.renderer.appendChild(portalRoot, listbox);
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

/** Portal target for field listboxes — modal dialogs require top-layer placement. */
export function resolveFieldListboxPortalRoot(anchor: HTMLElement, document: Document): HTMLElement {
  const dialog = anchor.closest('dialog');
  if (dialog instanceof HTMLDialogElement && isModalDialogOpen(dialog)) {
    return dialog;
  }
  return document.body;
}

function isModalDialogOpen(dialog: HTMLDialogElement): boolean {
  return dialog.open || dialog.hasAttribute('open');
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
