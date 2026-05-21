import {
  ExampleInputNumberBasicDemo,
  ExampleInputNumberErrorDemo,
  ExampleInputNumberHintDemo,
} from '../../../../demos/examples/input-number.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'With limits',
    demoComponent: ExampleInputNumberBasicDemo,
    code: `<au-form-field label="Quantity">
  <au-input-number [min]="0" [max]="10" />
</au-form-field>`,
  },
  {
    title: 'With error',
    demoComponent: ExampleInputNumberErrorDemo,
    code: `<au-form-field
  label="Quantity"
  errorMessage="Enter a value between 1 and 10."
  [invalid]="true"
>
  <au-input-number [min]="1" [max]="10" />
</au-form-field>`,
  },
  {
    title: 'With hint',
    demoComponent: ExampleInputNumberHintDemo,
    code: `<au-form-field label="Units" hint="Maximum 99 per order.">
  <au-input-number [min]="0" [max]="99" />
</au-form-field>`,
  },
];
