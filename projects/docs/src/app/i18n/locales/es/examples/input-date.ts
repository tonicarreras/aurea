import {
  ExampleInputDateBasicDemo,
  ExampleInputDateErrorDemo,
  ExampleInputDateHintDemo,
} from '../../../../demos/examples/input-date.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Fecha',
    demoComponent: ExampleInputDateBasicDemo,
    code: `<au-form-field label="Fecha de entrega">
  <au-input-date />
</au-form-field>`,
  },
  {
    title: 'Con error',
    demoComponent: ExampleInputDateErrorDemo,
    code: `<au-form-field
  label="Fecha de entrega"
  errorMessage="Selecciona una fecha válida."
  [invalid]="true"
>
  <au-input-date />
</au-form-field>`,
  },
  {
    title: 'Rango de fechas',
    demoComponent: ExampleInputDateHintDemo,
    code: `<au-form-field label="Fecha de entrega" hint="Solo entregas en 2026.">
  <au-input-date minDate="2026-01-01" maxDate="2026-12-31" />
</au-form-field>`,
  },
];
