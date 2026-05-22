import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputNumber } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-input-number-basic',
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
export class ExampleInputNumberBasicDemo {}

@Component({
  selector: 'docs-example-input-number-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputNumber],
  template: `
    <au-form-field
      label="Cantidad"
      errorMessage="Introduce un valor entre 1 y 10."
      [invalid]="true"
    >
      <au-input-number
        [min]="1"
        [max]="10"
        style="max-width: 12rem"
      />
    </au-form-field>
  `,
})
export class ExampleInputNumberErrorDemo {}

@Component({
  selector: 'docs-example-input-number-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputNumber],
  template: `
    <au-form-field
      label="Unidades"
      hint="Máximo 99 por pedido."
    >
      <au-input-number
        [min]="0"
        [max]="99"
        style="max-width: 12rem"
      />
    </au-form-field>
  `,
})
export class ExampleInputNumberHintDemo {}
