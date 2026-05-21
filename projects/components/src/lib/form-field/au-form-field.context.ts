import { InjectionToken, type Signal } from '@angular/core';

/** Validation state reported by a projected field control. */
export interface AuFormFieldControlState {
  displayError: string;
  effectiveInvalid: boolean;
  required: boolean;
}

/** Context provided by {@link AuFormField} to projected controls. */
export interface AuFormFieldContext {
  readonly label: Signal<string>;
  readonly controlId: Signal<string>;
  readonly hintId: Signal<string>;
  readonly errorId: Signal<string>;
  readonly hint: Signal<string>;
  readonly errorMessage: Signal<string>;
  readonly invalid: Signal<boolean>;
  readonly showRequired: Signal<boolean>;
  readonly required: Signal<boolean>;
  readonly isInvalid: Signal<boolean>;
  updateControlState(state: AuFormFieldControlState): void;
}

export const AU_FORM_FIELD = new InjectionToken<AuFormFieldContext>('AU_FORM_FIELD');
