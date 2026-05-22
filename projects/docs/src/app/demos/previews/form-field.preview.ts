import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputText } from '@aurea-design-system/components';


@Component({
  selector: 'docs-preview-form-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputText],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field
        label="Email"
        hint="Usamos tu correo solo para avisos."
        [required]="true"
      >
        <au-input-text
          type="email"
          placeholder="tu@correo.com"
        />
      </au-form-field>
    </div>
  `,
})
export class FormFieldDemo {}
