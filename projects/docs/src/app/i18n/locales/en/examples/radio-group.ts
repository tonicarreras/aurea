import {
  ExampleRadioGroupBasicDemo,
  ExampleRadioGroupHintDemo,
  ExampleRadioGroupErrorDemo,
} from '../../../../demos/examples/radio-group.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Option group',
    demoComponent: ExampleRadioGroupBasicDemo,
    code: `<au-form-field label="Plan">
  <au-radio-group [options]="plans" />
</au-form-field>`,
  },
  {
    title: 'Required with error',
    demoComponent: ExampleRadioGroupErrorDemo,
    code: `<au-form-field
  label="Plan"
  [required]="true"
  errorMessage="Choose a plan to continue."
  [invalid]="true"
>
  <au-radio-group [options]="plans" />
</au-form-field>`,
  },
  {
    title: 'With hint',
    demoComponent: ExampleRadioGroupHintDemo,
    code: `plans: AuRadioOption[] = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro', disabled: true },
];

<au-form-field label="Plan" hint="Pro will be available soon.">
  <au-radio-group [options]="plans" />
</au-form-field>`,
    language: 'typescript',
  },
];
