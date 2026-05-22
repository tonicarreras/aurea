import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputText } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-input-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputText],
  template: `
    <au-form-field label="Nombre">
      <au-input-text
        placeholder="Tu nombre"
        style="max-width: 20rem"
      />
    </au-form-field>
  `,
})
export class InputTextDemo {}
