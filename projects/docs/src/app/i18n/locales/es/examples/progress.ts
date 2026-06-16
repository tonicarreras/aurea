import {
  ExampleProgressBasicDemo,
  ExampleProgressStatesDemo,
} from '../../../../demos/examples/progress.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Progreso básico',
    description: 'Barra determinada con `value` y `max`; incluye nombre accesible.',
    demoComponent: ExampleProgressBasicDemo,
    code: `<au-progress [value]="62" [max]="100" aria-label="Progreso de importación" />`,
  },
  {
    title: 'Estados de avance',
    description: 'Compara inicio y finalización en el mismo bloque.',
    demoComponent: ExampleProgressStatesDemo,
    code: `<au-progress [value]="18" [max]="100" aria-label="Inicio de tarea" />
<au-progress [value]="100" [max]="100" aria-label="Tarea completada" />`,
  },
];
