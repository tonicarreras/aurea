import type { DestroyRef } from '@angular/core';

/** Touch-first devices — native date/time pickers must be suppressed when using Aurea panels. */
export const AU_COARSE_POINTER_MQ = '(pointer: coarse)';

export function prefersCoarsePointer(window: Window | null | undefined): boolean {
  return window?.matchMedia?.(AU_COARSE_POINTER_MQ).matches ?? false;
}

/** Keeps `coarsePointer` in sync when the user rotates a tablet or plugs in a mouse. */
export function bindCoarsePointerPreference(
  window: Window | null | undefined,
  onChange: (coarse: boolean) => void,
  destroyRef: DestroyRef,
): void {
  if (!window?.matchMedia) {
    onChange(false);
    return;
  }
  const mq = window.matchMedia(AU_COARSE_POINTER_MQ);
  const listener = (): void => {
    onChange(mq.matches);
  };
  listener();
  mq.addEventListener('change', listener);
  destroyRef.onDestroy(() => mq.removeEventListener('change', listener));
}

/** After closing a custom panel, avoid refocusing `type=date|time` on coarse pointers (opens native UI). */
export function restoreTemporalPickerFocus(
  input: HTMLInputElement,
  iconButton: HTMLButtonElement | null | undefined,
): void {
  const win = input.ownerDocument.defaultView;
  if (prefersCoarsePointer(win) && iconButton?.isConnected) {
    iconButton.focus();
    return;
  }
  if (input.isConnected) {
    input.focus();
  }
}
