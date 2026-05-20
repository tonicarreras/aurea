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
      code: `<au-input-date label="Delivery date" />`,
    },
    {
      title: 'With error',
      demoComponent: ExampleInputDateErrorDemo,
      code: `<au-input-date
  label="Delivery date"
  errorMessage="Select a valid date."
/>`,
    },
    {
      title: 'Date range',
      description: 'Use `minDate` and `maxDate` (ISO `YYYY-MM-DD`) for native `min`/`max`.',
      demoComponent: ExampleInputDateRangeDemo,
      code: `<au-input-date
  label="Delivery date"
  minDate="2026-01-01"
  maxDate="2026-12-31"
  hint="Deliveries in 2026 only."
/>`,
    },
];
