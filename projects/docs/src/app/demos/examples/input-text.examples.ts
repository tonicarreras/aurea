import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuInputText } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-input-text-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputText],
  template: `<au-input-text label="Email" placeholder="tu@correo.com" style="max-width: 20rem" />`,
})
export class ExampleInputTextBasicDemo {}

@Component({
  selector: 'docs-example-input-text-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputText],
  template: `
    <au-input-text
      label="Usuario"
      hint="Entre 3 y 20 caracteres."
      placeholder="nombre"
      style="max-width: 20rem"
    />
  `,
})
export class ExampleInputTextHintDemo {}

@Component({
  selector: 'docs-example-input-text-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputText],
  template: `
    <au-input-text
      label="Email"
      errorMessage="Introduce un correo válido."
      placeholder="correo"
      style="max-width: 20rem"
    />
  `,
})
export class ExampleInputTextErrorDemo {}

// —— Textarea ——
