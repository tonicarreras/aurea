import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputText } from '@aurea-design-system/components';


@Component({
  selector: 'docs-preview-input-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputText],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field label="Nombre">
        <au-input-text placeholder="Tu nombre" />
      </au-form-field>
    </div>
  `,
})
export class InputTextDemo {}
