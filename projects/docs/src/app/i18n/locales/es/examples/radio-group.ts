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
      title: 'Obligatorio con error',
      demoComponent: ExampleRadioGroupErrorDemo,
      code: `<au-radio-group
  label="Plan"
  [options]="plans"
  [required]="true"
  errorMessage="Elige un plan para continuar."
/>`,
    },
    {
      title: 'Opción deshabilitada',
      description: 'Marca `disabled: true` en una entrada de `AuRadioOption`.',
      demoComponent: ExampleRadioGroupDisabledOptionDemo,
      code: `plans: AuRadioOption[] = [
  { value: 'free', label: 'Gratis' },
  { value: 'pro', label: 'Pro', disabled: true },
];

<au-radio-group label="Plan" [options]="plans" hint="La opción Pro estará disponible pronto." />`,
      language: 'typescript',
    },
];
