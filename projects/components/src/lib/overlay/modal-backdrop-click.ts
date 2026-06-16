/** Portaled pickers/listboxes live on `<dialog>` but outside `.au-dialog__panel`. */
const MODAL_FLOATING_OVERLAY_SELECTORS = '.au-floating-panel, .au-field-listbox--overlay';

/** True when the click target is inside the modal panel or a portaled field overlay. */
export function isModalPanelOrFloatingOverlayClick(
  target: EventTarget | null,
  panelSelector: string,
): boolean {
  if (!(target instanceof Element)) {
    return false;
  }
  return (
    target.closest(panelSelector) !== null ||
    target.closest(MODAL_FLOATING_OVERLAY_SELECTORS) !== null
  );
}

/** Allows pointer interaction only inside an open modal `<dialog>` subtree. */
export function createModalDialogInteractionAllowPredicate(
  getDialog: () => HTMLDialogElement | null,
): (target: EventTarget | null) => boolean {
  return (target) => {
    if (!(target instanceof Node)) {
      return false;
    }
    const dialog = getDialog();
    return !!dialog && dialog.contains(target);
  };
}
