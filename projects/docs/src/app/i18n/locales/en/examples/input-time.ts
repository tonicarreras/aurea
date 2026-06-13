import {
  ExampleInputTimeBasicDemo,
  ExampleInputTimeBoundsDemo,
} from '../../../../demos/examples/input-time.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Time',
    demoComponent: ExampleInputTimeBasicDemo,
    code: `<au-form-field label="Start time">
  <input auInputTime />
</au-form-field>`,
  },
  {
    title: 'With bounds',
    description: 'Use minTime and maxTime (HH:mm) for native min and max attributes.',
    demoComponent: ExampleInputTimeBoundsDemo,
    code: `<au-form-field label="Booking time" hint="Business hours only.">
  <input auInputTime minTime="08:00" maxTime="20:00" />
</au-form-field>`,
  },
];
