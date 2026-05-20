import {
  ExampleSelectBasicDemo,
  ExampleSelectErrorDemo,
  ExampleSelectHintDemo,
} from '../../../../demos/examples/select.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
{
      title: 'Select con opciones',
      demoComponent: ExampleSelectBasicDemo,
      code: `options: SelectOption[] = [
  { value: 'es', label: 'España' },
  { value: 'mx', label: 'México' },
];

<au-select label="Country" placeholder="Choose…" [options]="options" />`,
      language: 'typescript',
    },
    {
      title: 'Required with error',
      demoComponent: ExampleSelectErrorDemo,
      code: `<au-select
  label="Country"
  placeholder="Choose…"
  [options]="options"
  [required]="true"
  errorMessage="Select a country."
/>`,
      language: 'typescript',
    },
    {
      title: 'With hint',
      demoComponent: ExampleSelectHintDemo,
      code: `<au-select
  label="Country of residence"
  placeholder="Choose…"
  [options]="options"
  hint="Used for billing and shipping."
/>`,
      language: 'typescript',
    },
];
