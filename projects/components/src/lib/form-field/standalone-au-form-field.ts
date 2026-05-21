import { computed, inject, signal } from '@angular/core';

import {
  AU_FORM_FIELD,
  type AuFormFieldContext,
  type AuFormFieldControlState,
} from './au-form-field.context';

let nextStandaloneFieldId = 0;

/** Minimal {@link AuFormFieldContext} when checkbox/switch are not wrapped in `au-form-field`. */
export function createStandaloneAuFormFieldContext(): AuFormFieldContext {
  const autoId = `au-field-${++nextStandaloneFieldId}`;
  const controlState = signal<AuFormFieldControlState | null>(null);

  const label = signal('');
  const hint = signal('');
  const errorMessage = signal('');
  const invalid = signal(false);
  const required = signal(false);
  const showRequired = signal(true);

  const controlId = computed(() => autoId);
  const hintId = computed(() => `${autoId}-hint`);
  const errorId = computed(() => `${autoId}-error`);

  const displayError = computed(() => {
    const manual = errorMessage().trim();
    if (manual.length > 0) {
      return manual;
    }
    return controlState()?.displayError ?? '';
  });

  const isInvalid = computed(
    () =>
      invalid() ||
      (controlState()?.effectiveInvalid ?? false) ||
      displayError().length > 0,
  );

  return {
    label,
    controlId,
    hintId,
    errorId,
    hint,
    errorMessage,
    invalid,
    showRequired,
    required,
    isInvalid,
    updateControlState(state: AuFormFieldControlState): void {
      controlState.set(state);
    },
  };
}

/** Prefer parent `au-form-field`; otherwise use the host's standalone provider. */
export function injectAuFormField(): AuFormFieldContext {
  const ancestor = inject(AU_FORM_FIELD, { optional: true, skipSelf: true });
  if (ancestor) {
    return ancestor;
  }
  return inject(AU_FORM_FIELD);
}
