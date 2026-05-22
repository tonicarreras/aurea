import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputText } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-form-field-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputText],
  template: `
    <au-form-field
      label="Email"
      [required]="true"
    >
      <au-input-text
        type="email"
        placeholder="tu@correo.com"
        style="max-width: 20rem"
      />
    </au-form-field>
  `,
})
export class ExampleFormFieldBasicDemo {}

@Component({
  selector: 'docs-example-form-field-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputText],
  template: `
    <au-form-field
      label="Usuario"
      hint="Entre 3 y 20 caracteres."
    >
      <au-input-text
        placeholder="nombre"
        style="max-width: 20rem"
      />
    </au-form-field>
  `,
})
export class ExampleFormFieldHintDemo {}

@Component({
  selector: 'docs-example-form-field-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputText],
  template: `
    <au-form-field
      label="Email"
      errorMessage="Introduce un correo válido."
      [invalid]="true"
    >
      <au-input-text
        type="email"
        placeholder="correo"
        style="max-width: 20rem"
      />
    </au-form-field>
  `,
})
export class ExampleFormFieldErrorDemo {}
