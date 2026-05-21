import { afterRenderEffect } from '@angular/core';

import { injectAuFormField } from './standalone-au-form-field';

/** Syncs a control's validation state into the parent {@link AuFormField}. */
export function linkFormFieldControl(state: {
  displayError: () => string;
  effectiveInvalid: () => boolean;
  required: () => boolean;
}): void {
  const formField = injectAuFormField();

  afterRenderEffect(() => {
    formField.updateControlState({
      displayError: state.displayError(),
      effectiveInvalid: state.effectiveInvalid(),
      required: state.required(),
    });
  });
}
