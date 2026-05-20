import {
  ExampleDividerBasicDemo,
  ExampleDividerLabelDemo,
} from '../../../../demos/examples/divider.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
{
      title: 'Separador simple',
      demoComponent: ExampleDividerBasicDemo,
      code: `<p>Arriba</p>
<au-divider />
<p>Abajo</p>`,
    },
    {
      title: 'Con etiqueta',
      demoComponent: ExampleDividerLabelDemo,
      code: `<au-divider label="o continúa con" />`,
    },
];
