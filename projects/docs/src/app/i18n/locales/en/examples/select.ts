import {
  ExampleSelectBasicDemo,
  ExampleSelectErrorDemo,
  ExampleSelectHintDemo,
} from '../../../../demos/examples/select.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Select with options',
    demoComponent: ExampleSelectBasicDemo,
    code: `options: AuSelectOption[] = [
  { value: 'es', label: 'Spain' },
  { value: 'mx', label: 'Mexico' },
];

<au-form-field label="Country">
  <au-select placeholder="Choose…" [options]="options" />
</au-form-field>`,
    language: 'typescript',
  },
  {
    title: 'Required with error',
    demoComponent: ExampleSelectErrorDemo,
    code: `<au-form-field
  label="Country"
  [required]="true"
  errorMessage="Select a country."
  [invalid]="true"
>
  <au-select placeholder="Choose…" [options]="options" />
</au-form-field>`,
    language: 'typescript',
  },
  {
    title: 'With hint',
    demoComponent: ExampleSelectHintDemo,
    code: `<au-form-field
  label="Country of residence"
  hint="Used for billing and shipping."
>
  <au-select placeholder="Choose…" [options]="options" />
</au-form-field>`,
    language: 'typescript',
  },
];
