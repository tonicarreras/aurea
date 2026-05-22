import {
  ExampleSwitchBasicDemo,
  ExampleSwitchDisabledDemo,
  ExampleSwitchErrorDemo,
} from '../../../../demos/examples/switch.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Basic switch',
    demoComponent: ExampleSwitchBasicDemo,
    code: `<au-switch label="Push notifications" />`,
  },
  {
    title: 'Disabled',
    demoComponent: ExampleSwitchDisabledDemo,
    code: `<au-switch label="Airplane mode" [checked]="true" [disabled]="true" />`,
  },
  {
    title: 'Required with error',
    description: 'Inline `label` on the switch; hint and error on `au-form-field`.',
    demoComponent: ExampleSwitchErrorDemo,
    code: `<au-form-field
  errorMessage="You must enable this option to continue."
  [required]="true"
  [invalid]="true"
>
  <au-switch label="I accept the privacy policy" />
</au-form-field>`,
  },
];
