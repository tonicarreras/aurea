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
      code: `<au-input-number label="Cantidad" [min]="0" [max]="10" />`,
    },
    {
      title: 'Con error',
      demoComponent: ExampleInputNumberErrorDemo,
      code: `<au-input-number
  label="Cantidad"
  [min]="1"
  [max]="10"
  errorMessage="Introduce un valor entre 1 y 10."
/>`,
    },
    {
      title: 'Con hint',
      demoComponent: ExampleInputNumberHintDemo,
      code: `<au-input-number
  label="Unidades"
  [min]="0"
  [max]="99"
  hint="Máximo 99 por pedido."
/>`,
    },
];
