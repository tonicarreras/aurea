import { Component, input } from '@angular/core';

import { AuFormField } from './form-field';

/**
 * Test/story wrapper — not exported from `public-api.ts`.
 *
 * @example
 * ```html
 * <au-form-field-harness label="Email">
 *   <au-input-text />
 * </au-form-field-harness>
 * ```
 */
@Component({
  selector: 'au-form-field-harness',
  imports: [AuFormField],
  template: `
    <au-form-field
      [label]="label()"
      [hint]="hint()"
      [errorMessage]="errorMessage()"
      [invalid]="invalid()"
      [required]="required()"
      [showRequired]="showRequired()"
      [controlIdInput]="controlId()"
    >
      <ng-content />
    </au-form-field>
  `,
})
export class AuFormFieldHarness {
  readonly label = input('Field');
  readonly hint = input('');
  readonly errorMessage = input('');
  readonly invalid = input(false);
  readonly required = input(false);
  readonly showRequired = input(true);
  readonly controlId = input('');
}
