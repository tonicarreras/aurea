import {
  ExampleInputDateBasicDemo,
  ExampleInputDateErrorDemo,
  ExampleInputDateHintDemo,
} from '../../../../demos/examples/input-date.examples';
import { ExampleInputDateRangeDemo } from '../../../../demos/examples/input-date-range.example';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Fecha',
    demoComponent: ExampleInputDateBasicDemo,
    code: `<au-form-field label="Fecha de entrega">
  <input auInputDate />
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
  <input auInputDate />
</au-form-field>`,
  },
  {
    title: 'Con hint',
    demoComponent: ExampleInputDateHintDemo,
    code: `<au-form-field label="Fecha de entrega" hint="Opcional — déjalo vacío para la primera franja disponible.">
  <input auInputDate />
</au-form-field>`,
  },
  {
    title: 'Rango de fechas',
    description:
      'Usa minDate y maxDate (ISO YYYY-MM-DD) para los atributos nativos min y max.',
    demoComponent: ExampleInputDateRangeDemo,
    code: `<au-form-field label="Fecha de entrega" hint="Solo entregas en 2026.">
  <input auInputDate minDate="2026-01-01" maxDate="2026-12-31" />
</au-form-field>`,
  },
];
