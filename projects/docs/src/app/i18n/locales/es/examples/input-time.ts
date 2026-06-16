import {
  ExampleInputTimeBasicDemo,
  ExampleInputTimeBoundsDemo,
} from '../../../../demos/examples/input-time.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Hora',
    demoComponent: ExampleInputTimeBasicDemo,
    code: `<au-form-field label="Hora de inicio">
  <input auInputTime />
</au-form-field>`,
  },
  {
    title: 'Con límites',
    description: 'Usa minTime y maxTime (HH:mm) para los atributos nativos min y max.',
    demoComponent: ExampleInputTimeBoundsDemo,
    code: `<au-form-field label="Hora de reserva" hint="Solo horario laboral.">
  <input auInputTime minTime="08:00" maxTime="20:00" />
</au-form-field>`,
  },
];
