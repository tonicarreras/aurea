import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputNumber } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-input-number',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputNumber],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field label="Cantidad">
        <au-input-number
          [min]="0"
          [max]="10"
        />
      </au-form-field>
    </div>
  `,
})
export class InputNumberDemo {}
