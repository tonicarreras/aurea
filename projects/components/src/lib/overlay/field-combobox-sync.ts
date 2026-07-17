import { effect, untracked, type ModelSignal } from '@angular/core';

import type { AuFieldOption } from '../field-option';
import {
  listboxSelectionToValue,
  listboxSelectionsEqual,
  valueToListboxSelection,
} from './au-listbox-value';

/** Shared value ↔ listbox selection sync for `au-select` and `au-autocomplete`. */
export type FieldComboboxListboxSync = {
  value: ModelSignal<string | null>;
  listboxValue: ModelSignal<string[]>;
  hasPlaceholder: () => boolean;
  applyValue: (next: string | null) => void;
  onReselectSameOption: () => void;
  onSelectionComplete: () => void;
};

export function installFieldComboboxListboxSync(sync: FieldComboboxListboxSync): void {
  effect(() => {
    const next = valueToListboxSelection(sync.value(), sync.hasPlaceholder());
    untracked(() => {
      const current = sync.listboxValue();
      if (!listboxSelectionsEqual(next, current)) {
        sync.listboxValue.set(next);
      }
    });
  });

  effect(() => {
    const selected = sync.listboxValue();
    untracked(() => {
      const expected = valueToListboxSelection(sync.value(), sync.hasPlaceholder());
      if (listboxSelectionsEqual(selected, expected)) {
        return;
      }
      const nextValue = listboxSelectionToValue(selected);
      if (nextValue === null && selected.length === 0 && sync.value() !== null) {
        sync.onReselectSameOption();
        return;
      }
      sync.applyValue(nextValue);
      sync.onSelectionComplete();
    });
  });
}

/** Detaches the portaled listbox overlay whenever the combobox popup closes. */
export function installFieldComboboxOverlayDetach(
  panelOpen: () => boolean,
  detach: () => void,
): void {
  effect(() => {
    if (!panelOpen()) {
      untracked(() => detach());
    }
  });
}

/** Whether the listbox popup may render (shared guard for disabled/read-only fields). */
export function isFieldComboboxInteractive(disabled: boolean, readOnly: boolean): boolean {
  return !disabled && !readOnly;
}

/** Keeps the visible combobox text aligned with `value` while the popup is closed. */
export function installComboboxDisplaySync(options: {
  value: () => string | null;
  options: () => readonly AuFieldOption[];
  panelOpen: () => boolean;
  comboboxValue: ModelSignal<string>;
}): void {
  effect(() => {
    options.value();
    options.options();
    const open = options.panelOpen();
    untracked(() => {
      if (open) {
        return;
      }
      const v = options.value();
      const opt = options.options().find((entry) => entry.value === v);
      const next = opt ? (opt.label ?? String(v ?? '')) : (v ?? '');
      if (options.comboboxValue() !== next) {
        options.comboboxValue.set(next || '');
      }
    });
  });
}
