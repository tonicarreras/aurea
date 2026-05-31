import {
  ExampleSliderBasicDemo,
  ExampleSliderErrorDemo,
} from '../../../../demos/examples/slider.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Control de volumen',
    description: 'Rango dentro de `au-form-field` con valor visible opcional.',
    demoComponent: ExampleSliderBasicDemo,
    code: `import { AuFormField, AuSlider } from '@aurea-design-system/components';

<au-form-field label="Volumen" hint="Ajusta el nivel del altavoz.">
  <au-slider [(value)]="volume" [min]="0" [max]="100" [showValue]="true" />
</au-form-field>`,
  },
  {
    title: 'Con error',
    description: 'Cromado inválido desde `au-form-field` o `errors` de signal forms.',
    demoComponent: ExampleSliderErrorDemo,
    code: `<au-form-field label="Volumen" errorMessage="Valor fuera de rango." [invalid]="true">
  <au-slider [(value)]="volume" [min]="0" [max]="100" [showValue]="true" />
</au-form-field>`,
  },
];
