import { computed, type Signal } from '@angular/core';
import type { ValidationError } from '@angular/forms/signals';

import type { AuFormFieldContext } from './au-form-field.context';

/** First visible message from signal-form `errors` on a control. */
export function displayErrorFromErrors(
  errors: Signal<readonly ValidationError.WithOptionalFieldTree[]>,
): Signal<string> {
  return computed(() => {
    const list = errors();
    if (list.length === 0) {
      return '';
    }
    const first = list[0]!;
    return (first.message ?? first.kind) || '';
  });
}

/** Control invalid state including manual errors on the wrapping {@link AuFormField}. */
export function effectiveInvalidWithField(
  formField: AuFormFieldContext,
  state: { invalid: () => boolean; isInvalid: () => boolean },
): Signal<boolean> {
  return computed(
    () =>
      state.invalid() ||
      state.isInvalid() ||
      formField.invalid() ||
      formField.errorMessage().trim().length > 0,
  );
}
