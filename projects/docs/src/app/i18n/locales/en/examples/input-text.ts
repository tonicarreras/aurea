import {
  ExampleInputTextBasicDemo,
  ExampleInputTextErrorDemo,
  ExampleInputTextHintDemo,
} from '../../../../demos/examples/input-text.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Basic field',
    demoComponent: ExampleInputTextBasicDemo,
    code: `<au-form-field label="Email">
  <au-input-text type="email" placeholder="you@company.com" />
</au-form-field>`,
  },
  {
    title: 'With hint',
    demoComponent: ExampleInputTextHintDemo,
    code: `<au-form-field label="Username" hint="Between 3 and 20 characters.">
  <au-input-text placeholder="name" />
</au-form-field>`,
  },
  {
    title: 'With error',
    demoComponent: ExampleInputTextErrorDemo,
    code: `<au-form-field
  label="Email"
  errorMessage="Enter a valid email address."
  [invalid]="true"
>
  <au-input-text type="email" />
</au-form-field>`,
  },
];
