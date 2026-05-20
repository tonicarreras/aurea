import {
  ExampleCardElevatedDemo,
  ExampleCardFilledFooterDemo,
  ExampleCardOutlinedDemo,
} from '../../../../demos/examples/card.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
{
      title: 'Elevada',
      demoComponent: ExampleCardElevatedDemo,
      code: `<au-card variant="elevated">
  <h3 auCardHeader>Título</h3>
  <p>Contenido</p>
</au-card>`,
    },
    {
      title: 'Con contorno',
      demoComponent: ExampleCardOutlinedDemo,
      code: `<au-card variant="outlined">
  <h3 auCardHeader>Título</h3>
  <p>Contenido</p>
</au-card>`,
    },
    {
      title: 'Rellena con pie',
      demoComponent: ExampleCardFilledFooterDemo,
      code: `<au-card variant="filled">
  <h3 auCardHeader>Título</h3>
  <p>Contenido</p>
  <div auCardFooter>
    <au-button size="sm">Acción</au-button>
  </div>
</au-card>`,
    },
];
