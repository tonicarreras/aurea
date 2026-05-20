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
      code: `<au-input-number label="Quantity" [min]="0" [max]="10" />`,
    },
    {
      title: 'With error',
      demoComponent: ExampleInputNumberErrorDemo,
      code: `<au-input-number
  label="Quantity"
  [min]="1"
  [max]="10"
  errorMessage="Enter a value between 1 and 10."
/>`,
    },
    {
      title: 'With hint',
      demoComponent: ExampleInputNumberHintDemo,
      code: `<au-input-number
  label="Units"
  [min]="0"
  [max]="99"
  hint="Maximum 99 per order."
/>`,
    },
];
