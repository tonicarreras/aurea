import {
  ExampleInputNumberBasicDemo,
  ExampleInputNumberErrorDemo,
  ExampleInputNumberHintDemo,
} from '../../../../demos/examples/input-number.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Con límites',
    demoComponent: ExampleInputNumberBasicDemo,
    code: `<au-form-field label="Cantidad">
  <input auInputNumber [min]="0" [max]="10" />
</au-form-field>`,
  },
  {
    title: 'Con error',
    demoComponent: ExampleInputNumberErrorDemo,
    code: `<au-form-field
  label="Cantidad"
  errorMessage="Introduce un valor entre 1 y 10."
  [invalid]="true"
>
  <input auInputNumber [min]="1" [max]="10" />
</au-form-field>`,
  },
  {
    title: 'Con hint',
    demoComponent: ExampleInputNumberHintDemo,
    code: `<au-form-field label="Unidades" hint="Máximo 99 por pedido.">
  <input auInputNumber [min]="0" [max]="99" />
</au-form-field>`,
  },
];
