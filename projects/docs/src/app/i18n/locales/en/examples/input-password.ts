import {
  ExampleInputPasswordBasicDemo,
  ExampleInputPasswordSignUpDemo,
} from '../../../../demos/examples/input-password.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Sign in',
    demoComponent: ExampleInputPasswordBasicDemo,
    code: `<au-form-field label="Password" hint="Use at least 12 characters.">
  <input auInputPassword autocomplete="current-password" />
</au-form-field>`,
  },
  {
    title: 'Sign up',
    description: 'Use `autocomplete="new-password"` for account creation flows.',
    demoComponent: ExampleInputPasswordSignUpDemo,
    code: `<au-form-field label="Create password" [required]="true">
  <input auInputPassword autocomplete="new-password" [required]="true" />
</au-form-field>`,
  },
];
