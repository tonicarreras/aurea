import {
  ExampleFormFieldBasicDemo,
  ExampleFormFieldErrorDemo,
  ExampleFormFieldHintDemo,
} from '../../../../demos/examples/form-field.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'With hint',
    demoComponent: ExampleFormFieldHintDemo,
    code: `<au-form-field label="Username" hint="Between 3 and 20 characters.">
  <input auInputText placeholder="name" />
</au-form-field>`,
  },
  {
    title: 'Basic field',
    demoComponent: ExampleFormFieldBasicDemo,
    code: `<au-form-field
  label="Email"
  hint="We only use your email for notifications."
  [required]="true"
>
  <input auInputText type="email" placeholder="you@company.com" />
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
  <input auInputText type="email" />
</au-form-field>`,
  },
];
