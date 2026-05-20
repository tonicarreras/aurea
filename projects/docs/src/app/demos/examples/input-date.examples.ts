import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuInputDate } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-input-date-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputDate],
  template: `<au-input-date label="Fecha de entrega" style="max-width: 14rem" />`,
})
export class ExampleInputDateBasicDemo {}

@Component({
  selector: 'docs-example-input-date-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputDate],
  template: `
    <au-input-date
      label="Fecha de entrega"
      errorMessage="Selecciona una fecha válida."
      style="max-width: 14rem"
    />
  `,
})
export class ExampleInputDateErrorDemo {}

@Component({
  selector: 'docs-example-input-date-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputDate],
  template: `
    <au-input-date
      label="Fecha de entrega"
      minDate="2026-01-01"
      maxDate="2026-12-31"
      hint="Solo entregas en 2026."
      style="max-width: 14rem"
    />
  `,
})
export class ExampleInputDateRangeDemo {}

// —— Dialog ——
