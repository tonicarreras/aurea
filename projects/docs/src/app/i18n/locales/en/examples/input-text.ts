import {
  ExampleInputTextBasicDemo,
  ExampleInputTextErrorDemo,
  ExampleInputTextHintDemo,
  ExampleInputTextSizesDemo,
} from '../../../../demos/examples/input-text.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'With hint',
    description: 'Hint under the label; the control stays within a readable field width.',
    demoComponent: ExampleInputTextHintDemo,
    code: `<au-form-field label="Username" hint="Between 3 and 20 characters.">
  <au-input-text placeholder="name" />
</au-form-field>`,
  },
  {
    title: 'Basic field',
    demoComponent: ExampleInputTextBasicDemo,
    code: `<au-form-field
  label="Email"
  hint="We only use your email for notifications."
>
  <au-input-text type="email" placeholder="you@company.com" />
</au-form-field>`,
  },
  {
    title: 'Sizes',
    description: '`size` prop: sm, md (default), and lg.',
    demoComponent: ExampleInputTextSizesDemo,
    code: `<au-form-field label="Small">
  <au-input-text size="sm" placeholder="name" />
</au-form-field>
<au-form-field label="Large">
  <au-input-text size="lg" placeholder="name" />
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
