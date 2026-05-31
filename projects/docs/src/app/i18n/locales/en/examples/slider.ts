import {
  ExampleSliderBasicDemo,
  ExampleSliderErrorDemo,
} from '../../../../demos/examples/slider.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Volume control',
    description: 'Range input inside `au-form-field` with optional live value output.',
    demoComponent: ExampleSliderBasicDemo,
    code: `import { AuFormField, AuSlider } from '@aurea-design-system/components';

<au-form-field label="Volume" hint="Adjust speaker level.">
  <au-slider [(value)]="volume" [min]="0" [max]="100" [showValue]="true" />
</au-form-field>`,
  },
  {
    title: 'With error',
    description: 'Invalid chrome from `au-form-field` or signal-form `errors`.',
    demoComponent: ExampleSliderErrorDemo,
    code: `<au-form-field label="Volume" errorMessage="Value out of range." [invalid]="true">
  <au-slider [(value)]="volume" [min]="0" [max]="100" [showValue]="true" />
</au-form-field>`,
  },
];
