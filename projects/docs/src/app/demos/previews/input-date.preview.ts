import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputDate } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-input-date',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputDate],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field label="Fecha de inicio">
        <au-input-date />
      </au-form-field>
    </div>
  `,
})
export class InputDateDemo {}
