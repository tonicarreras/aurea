import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuInputNumber } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-input-number-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputNumber],
  template: `<au-input-number label="Cantidad" [min]="0" [max]="10" style="max-width: 12rem" />`,
})
export class ExampleInputNumberBasicDemo {}

@Component({
  selector: 'docs-example-input-number-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputNumber],
  template: `
    <au-input-number
      label="Cantidad"
      [min]="1"
      [max]="10"
      errorMessage="Introduce un valor entre 1 y 10."
      style="max-width: 12rem"
    />
  `,
})
export class ExampleInputNumberErrorDemo {}

@Component({
  selector: 'docs-example-input-number-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputNumber],
  template: `
    <au-input-number
      label="Unidades"
      [min]="0"
      [max]="99"
      hint="Máximo 99 por pedido."
      style="max-width: 12rem"
    />
  `,
})
export class ExampleInputNumberHintDemo {}
