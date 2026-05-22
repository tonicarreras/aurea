import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputNumber } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-input-number',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputNumber],
  template: `
    <au-form-field label="Cantidad">
      <au-input-number
        [min]="0"
        [max]="10"
        style="max-width: 12rem"
      />
    </au-form-field>
  `,
})
export class InputNumberDemo {}
