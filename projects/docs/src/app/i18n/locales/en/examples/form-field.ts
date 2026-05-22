import {
  ExampleFormFieldBasicDemo,
  ExampleFormFieldErrorDemo,
  ExampleFormFieldHintDemo,
} from '../../../../demos/examples/form-field.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Basic field',
    demoComponent: ExampleFormFieldBasicDemo,
    code: `<au-form-field label="Email" [required]="true">
  <au-input-text type="email" placeholder="you@company.com" />
</au-form-field>`,
  },
  {
    title: 'With hint',
    demoComponent: ExampleFormFieldHintDemo,
    code: `<au-form-field label="Username" hint="Between 3 and 20 characters.">
  <au-input-text placeholder="name" />
</au-form-field>`,
  },
  {
    title: 'With error',
    demoComponent: ExampleFormFieldErrorDemo,
    code: `<au-form-field
  label="Email"
  errorMessage="Enter a valid email address."
  [invalid]="true"
>
  <au-input-text type="email" />
</au-form-field>`,
  },
];
