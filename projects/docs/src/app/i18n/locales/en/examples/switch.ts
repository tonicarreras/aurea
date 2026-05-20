import {
  ExampleSwitchBasicDemo,
  ExampleSwitchDisabledDemo,
  ExampleSwitchErrorDemo,
} from '../../../../demos/examples/switch.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
{
      title: 'Switch básico',
      demoComponent: ExampleSwitchBasicDemo,
      code: `<au-switch label="Notificaciones push" />`,
    },
    {
      title: 'Disabled',
      demoComponent: ExampleSwitchDisabledDemo,
      code: `<au-switch label="Airplane mode" [checked]="true" [disabled]="true" />`,
    },
    {
      title: 'Required with error',
      description: 'Combine `[required]` and `errorMessage` for consent or critical toggles.',
      demoComponent: ExampleSwitchErrorDemo,
      code: `<au-switch
  label="I accept the privacy policy"
  [required]="true"
  errorMessage="You must enable this option to continue."
/>`,
    },
];
