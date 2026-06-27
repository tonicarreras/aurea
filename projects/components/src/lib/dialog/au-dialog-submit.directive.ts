import { Directive, input } from '@angular/core';

/**
 * Submit button for a `<form>` rendered outside `auDialogFooter` / `auDrawerFooter`.
 *
 * @example
 * ```html
 * <form id="reservation-form" auForm [formRoot]="form">…</form>
 * <div auDialogFooter>
 *   <button auButton variant="primary" auDialogSubmit="reservation-form">Reservar</button>
 * </div>
 * ```
 */
@Directive({
  selector: 'button[auDialogSubmit]',
  host: {
    type: 'submit',
    '[attr.form]': 'formId()',
  },
})
export class AuDialogSubmit {
  /** Target form id (matches the `<form id="…">` attribute). */
  readonly formId = input.required<string>({ alias: 'auDialogSubmit' });
}
