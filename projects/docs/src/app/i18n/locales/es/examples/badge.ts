import {
  ExampleBadgeDotDemo,
  ExampleBadgeVariantsDemo,
} from '../../../../demos/examples/badge.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Variantes semánticas',
    description: 'Etiquetas compactas para estado, categoría o contadores.',
    demoComponent: ExampleBadgeVariantsDemo,
    code: `<au-badge variant="default" label="Borrador" />
<au-badge variant="accent" label="Nuevo" />
<au-badge variant="success" label="Activo" />
<au-badge variant="warning" label="Pendiente" />
<au-badge variant="error" label="Error" />`,
  },
  {
    title: 'Punto indicador',
    description: 'Solo punto o punto con etiqueta para notificaciones discretas.',
    demoComponent: ExampleBadgeDotDemo,
    code: `<au-badge variant="accent" [dot]="true" />
<au-badge variant="error" [dot]="true" label="Error" />`,
  },
];
