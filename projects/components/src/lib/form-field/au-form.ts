import { Directive, forwardRef, input, InjectionToken, type Signal } from '@angular/core';

/** Form-level chrome settings inherited by descendant {@link AuFormField}s. */
export interface AuFormContext {
  /** App-controlled gate: when set, authorizes validation chrome on descendant fields. */
  readonly showValidation: Signal<boolean | undefined>;
}

export const AU_FORM = new InjectionToken<AuFormContext>('AU_FORM');

/** Merge field-level and form-level `showValidation`; field wins when set. */
export function resolveFormFieldShowValidation(
  local: boolean | undefined,
  parent: boolean | undefined,
): boolean | undefined {
  if (local !== undefined) {
    return local;
  }
  return parent;
}

/**
 * Opt-in form shell: set `[showValidation]` once for validate-on-submit or server validation.
 * Works alongside Angular `[formRoot]`; individual `au-form-field` can still override.
 *
 * @example
 * ```html
 * <form auForm [formRoot]="profileForm" [showValidation]="submitAttempted()">
 *   <au-form-field label="Name">
 *     <input auInputText [formField]="profileForm.name" />
 *   </au-form-field>
 * </form>
 * ```
 */
@Directive({
  selector: 'form[auForm]',
  providers: [{ provide: AU_FORM, useExisting: forwardRef(auFormSelfRef) }],
})
export class AuFormDirective implements AuFormContext {
  /**
   * Authorizes validation chrome on all descendant fields.
   * Overridden by `[showValidation]` on an individual {@link AuFormField}.
   */
  readonly showValidation = input<boolean | undefined>(undefined);
}

/** Lazy ref for `useExisting` so the directive can register as its own `AU_FORM`. */
export function auFormSelfRef(): typeof AuFormDirective {
  return AuFormDirective;
}
