import {
  ExampleRadioGroupBasicDemo,
  ExampleRadioGroupHintDemo,
  ExampleRadioGroupErrorDemo,
} from '../../../../demos/examples/radio-group.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Grupo de opciones',
    demoComponent: ExampleRadioGroupBasicDemo,
    code: `<au-form-field label="Plan">
  <au-radio-group [options]="plans" />
</au-form-field>`,
  },
  {
    title: 'Obligatorio con error',
    demoComponent: ExampleRadioGroupErrorDemo,
    code: `<au-form-field
  label="Plan"
  [required]="true"
  errorMessage="Elige un plan para continuar."
  [invalid]="true"
>
  <au-radio-group [options]="plans" />
</au-form-field>`,
  },
  {
    title: 'Con hint',
    demoComponent: ExampleRadioGroupHintDemo,
    code: `plans: AuRadioOption[] = [
  { value: 'free', label: 'Gratis' },
  { value: 'pro', label: 'Pro', disabled: true },
];

<au-form-field label="Plan" hint="Pro estará disponible pronto.">
  <au-radio-group [options]="plans" />
</au-form-field>`,
    language: 'typescript',
  },
];
