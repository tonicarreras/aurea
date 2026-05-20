import {
  ExampleInputDateBasicDemo,
  ExampleInputDateErrorDemo,
  ExampleInputDateRangeDemo,
} from '../../../../demos/examples/input-date.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
{
      title: 'Fecha',
      demoComponent: ExampleInputDateBasicDemo,
      code: `<au-input-date label="Fecha de entrega" />`,
    },
    {
      title: 'Con error',
      demoComponent: ExampleInputDateErrorDemo,
      code: `<au-input-date
  label="Fecha de entrega"
  errorMessage="Selecciona una fecha válida."
/>`,
    },
    {
      title: 'Rango de fechas',
      description: 'Usa `minDate` y `maxDate` (ISO `YYYY-MM-DD`) para el atributo nativo `min`/`max`.',
      demoComponent: ExampleInputDateRangeDemo,
      code: `<au-input-date
  label="Fecha de entrega"
  minDate="2026-01-01"
  maxDate="2026-12-31"
  hint="Solo entregas en 2026."
/>`,
    },
];
