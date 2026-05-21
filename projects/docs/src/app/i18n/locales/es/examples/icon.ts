import {
  ExampleIconBasicDemo,
  ExampleIconSizesDemo,
} from '../../../../demos/examples/icon.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Icono básico',
    demoComponent: ExampleIconBasicDemo,
    code: `<au-icon name="info" size="md" />`,
  },
  {
    title: 'Tamaños',
    demoComponent: ExampleIconSizesDemo,
    code: `<au-icon name="check-circle" size="sm" />
<au-icon name="check-circle" size="md" />
<au-icon name="check-circle" size="lg" />`,
  },
];
