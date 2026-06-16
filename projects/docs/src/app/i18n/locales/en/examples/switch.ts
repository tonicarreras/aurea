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
    code: `<button type="button" auSwitch label="Push notifications"></button>`,
  },
  {
    title: 'Disabled',
    demoComponent: ExampleSwitchDisabledDemo,
    code: `<button type="button" auSwitch label="Airplane mode" [checked]="true" [disabled]="true"></button>`,
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
  <button type="button" auSwitch label="I accept the privacy policy"></button>
</au-form-field>`,
  },
];
