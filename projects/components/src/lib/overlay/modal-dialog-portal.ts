import type { Renderer2 } from '@angular/core';

import {
  bindPortaledThemeContextObserver,
  clearPortaledThemeContext,
  syncPortaledThemeContext,
} from './portaled-theme-context';

/** Anchor comment left in the original parent when a modal `<dialog>` is portaled. */
export type ModalDialogPortalState = {
  anchor: Comment | null;
  unbindHostContext: (() => void) | null;
};

const MODAL_HOST_ATTRS = ['data-au-size', 'data-au-position'] as const;

/** True when a modal dialog would be clipped by a non-visible overflow ancestor. */
export function needsModalDialogPortal(dialog: HTMLElement, document: Document): boolean {
  for (let node = dialog.parentElement; node && node !== document.body; node = node.parentElement) {
    const { overflow, overflowX, overflowY } = getComputedStyle(node);
    if ([overflow, overflowX, overflowY].some((value) => value === 'hidden' || value === 'clip')) {
      return true;
    }
  }
  return false;
}

/** Copy theme, density, and host layout attrs onto a portaled `<dialog>`. */
export function syncPortaledModalHostContext(dialog: HTMLElement, host: HTMLElement): void {
  syncPortaledThemeContext(dialog, host);
  for (const attr of MODAL_HOST_ATTRS) {
    const value = host.getAttribute(attr);
    if (value) {
      dialog.setAttribute(attr, value);
    } else {
      dialog.removeAttribute(attr);
    }
  }
}

/** Remove attrs copied by {@link syncPortaledModalHostContext}. */
export function clearPortaledModalHostContext(dialog: HTMLElement): void {
  clearPortaledThemeContext(dialog);
  for (const attr of MODAL_HOST_ATTRS) {
    dialog.removeAttribute(attr);
  }
}

/** Keeps a portaled modal dialog in sync when host theme/size attrs change. */
export function bindPortaledModalHostContextObserver(
  dialog: HTMLElement,
  host: HTMLElement,
): () => void {
  const unbindTheme = bindPortaledThemeContextObserver(dialog, host);
  if (typeof MutationObserver === 'undefined') {
    return unbindTheme;
  }

  const observer = new MutationObserver(() => {
    syncPortaledModalHostContext(dialog, host);
  });
  observer.observe(host, {
    attributes: true,
    attributeFilter: [...MODAL_HOST_ATTRS],
  });

  return () => {
    unbindTheme();
    observer.disconnect();
  };
}

/**
 * Moves a modal `<dialog>` to `document.body` while open so it covers the viewport
 * and is not clipped or trapped in ancestor stacking/overflow contexts.
 */
export function ensureModalDialogPortaledToBody(
  document: Document,
  renderer: Renderer2,
  dialog: HTMLDialogElement,
  portalState: ModalDialogPortalState,
  host: HTMLElement,
): void {
  if (dialog.parentElement === document.body) {
    return;
  }
  const parent = dialog.parentNode;
  if (parent) {
    portalState.anchor = document.createComment('au-modal-dialog-anchor');
    parent.insertBefore(portalState.anchor, dialog);
  }
  renderer.appendChild(document.body, dialog);
  syncPortaledModalHostContext(dialog, host);
  portalState.unbindHostContext?.();
  portalState.unbindHostContext = bindPortaledModalHostContextObserver(dialog, host);
}

/** Restores a portaled modal `<dialog>` to its original location in the component tree. */
export function restoreModalDialogPortal(
  document: Document,
  dialog: HTMLDialogElement,
  portalState: ModalDialogPortalState,
): void {
  portalState.unbindHostContext?.();
  portalState.unbindHostContext = null;
  clearPortaledModalHostContext(dialog);

  const anchor = portalState.anchor;
  if (!anchor?.parentNode || dialog.parentElement !== document.body) {
    return;
  }
  anchor.parentNode.insertBefore(dialog, anchor);
  anchor.remove();
  portalState.anchor = null;
}
