import {
  ExampleRadioGroupBasicDemo,
  ExampleRadioGroupDisabledOptionDemo,
  ExampleRadioGroupErrorDemo,
} from '../../../../demos/examples/radio-group.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
{
      title: 'Grupo de opciones',
      demoComponent: ExampleRadioGroupBasicDemo,
      code: `<au-radio-group label="Plan" [options]="plans" />`,
    },
    {
      title: 'Required with error',
      demoComponent: ExampleRadioGroupErrorDemo,
      code: `<au-radio-group
  label="Plan"
  [options]="plans"
  [required]="true"
  errorMessage="Choose a plan to continue."
/>`,
    },
    {
      title: 'Disabled option',
      description: 'Set `disabled: true` on a `RadioOption` entry.',
      demoComponent: ExampleRadioGroupDisabledOptionDemo,
      code: `plans: RadioOption[] = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro', disabled: true },
];

<au-radio-group label="Plan" [options]="plans" hint="Pro will be available soon." />`,
      language: 'typescript',
    },
];
