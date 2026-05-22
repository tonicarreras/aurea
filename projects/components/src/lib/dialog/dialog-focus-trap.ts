/** Focusable elements inside the dialog panel (WCAG modal pattern). */
export const DIALOG_FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Returns visible, tabbable elements within the dialog panel in document order. */
export function getDialogFocusableElements(panel: HTMLElement): HTMLElement[] {
  return Array.from(panel.querySelectorAll<HTMLElement>(DIALOG_FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hidden && el.getAttribute('aria-hidden') !== 'true',
  );
}

/**
 * Keeps Tab / Shift+Tab cycling within the panel when focus would leave it.
 * Complements native `<dialog showModal>` focus management (Storybook, polyfills).
 */
export function handleDialogTabKeydown(event: KeyboardEvent, panel: HTMLElement): void {
  if (event.key !== 'Tab') {
    return;
  }
  const focusables = getDialogFocusableElements(panel);
  if (focusables.length === 0) {
    return;
  }
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement;
  const focusLeftPanel = !(active instanceof Node && panel.contains(active));

  if (event.shiftKey) {
    if (active === first || focusLeftPanel) {
      event.preventDefault();
      last.focus();
    }
    return;
  }
  if (active === last || focusLeftPanel) {
    event.preventDefault();
    first.focus();
  }
}

/** Moves focus to the first tabbable control, or the panel when none exist. */
export function focusInitialInDialogPanel(panel: HTMLElement): void {
  const focusables = getDialogFocusableElements(panel);
  const target = focusables[0];
  if (target) {
    target.focus();
    return;
  }
  if (!panel.hasAttribute('tabindex')) {
    panel.tabIndex = -1;
  }
  panel.focus();
}
