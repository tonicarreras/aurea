import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputDate } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-input-date-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputDate],
  template: `
    <au-form-field label="Fecha de entrega">
      <au-input-date style="max-width: 14rem" />
    </au-form-field>
  `,
})
export class ExampleInputDateBasicDemo {}

@Component({
  selector: 'docs-example-input-date-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputDate],
  template: `
    <au-form-field
      label="Fecha de entrega"
      errorMessage="Selecciona una fecha válida."
      [invalid]="true"
    >
      <au-input-date style="max-width: 14rem" />
    </au-form-field>
  `,
})
export class ExampleInputDateErrorDemo {}

@Component({
  selector: 'docs-example-input-date-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputDate],
  template: `
    <au-form-field
      label="Fecha de entrega"
      hint="Solo entregas en 2026."
    >
      <au-input-date
        minDate="2026-01-01"
        maxDate="2026-12-31"
        style="max-width: 14rem"
      />
    </au-form-field>
  `,
})
export class ExampleInputDateHintDemo {}
