/** Sentinel `ngOption` value for nullable placeholder rows in single-select listboxes. */
export const AU_LISTBOX_PLACEHOLDER = '__aurea_placeholder__';

export function valueToListboxSelection(
  value: string | null | undefined,
  hasPlaceholder: boolean,
): string[] {
  if (value === null || value === undefined) {
    return hasPlaceholder ? [AU_LISTBOX_PLACEHOLDER] : [];
  }
  return [value];
}

export function listboxSelectionToValue(selected: readonly string[]): string | null {
  if (selected.length === 0) {
    return null;
  }
  const last = selected[selected.length - 1];
  return last === AU_LISTBOX_PLACEHOLDER ? null : last;
}

export function listboxSelectionsEqual(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((entry, index) => entry === b[index]);
}
