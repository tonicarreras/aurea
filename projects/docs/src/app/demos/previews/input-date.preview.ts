import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputDate } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-input-date',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputDate],
  template: `
    <au-form-field label="Fecha de inicio">
      <au-input-date style="max-width: 14rem" />
    </au-form-field>
  `,
})
export class InputDateDemo {}
