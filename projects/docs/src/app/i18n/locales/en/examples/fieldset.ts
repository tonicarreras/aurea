import {
  ExampleFieldsetBasicDemo,
  ExampleFieldsetDisabledDemo,
} from '../../../../demos/examples/fieldset.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Grouped fields',
    description: 'Native `fieldset` with legend, description, and projected form fields.',
    demoComponent: ExampleFieldsetBasicDemo,
    code: `import { AuFieldset, AuFormField, AuInputText } from '@aurea-design-system/components';

<au-fieldset legend="Shipping address" description="Where we deliver your order.">
  <au-form-field label="Street">
    <input auInputText />
  </au-form-field>
</au-fieldset>`,
  },
  {
    title: 'Disabled group',
    description: 'Disables all nested controls via the native `fieldset` attribute.',
    demoComponent: ExampleFieldsetDisabledDemo,
    code: `<au-fieldset legend="Shipping address" [disabled]="true">
  <au-form-field label="Street">
    <input auInputText />
  </au-form-field>
</au-fieldset>`,
  },
];
