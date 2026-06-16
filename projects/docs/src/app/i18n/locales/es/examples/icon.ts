import {
  ExampleIconBasicDemo,
  ExampleIconSetDemo,
  ExampleIconSizesDemo,
} from '../../../../demos/examples/icon.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Icono básico',
    description:
      'Glifo decorativo (`aria-hidden`). Nombra el control padre para lectores de pantalla.',
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
  {
    title: 'Set habitual',
    description: 'Glifos usados en mensajes, estados y acciones del sistema.',
    demoComponent: ExampleIconSetDemo,
    code: `<au-icon name="check-circle" size="md" />
<au-icon name="warning" size="md" />
<au-icon name="error" size="md" />
<au-icon name="info" size="md" />`,
  },
];
