import {
  ExampleInputDateBasicDemo,
  ExampleInputDateErrorDemo,
  ExampleInputDateHintDemo,
} from '../../../../demos/examples/input-date.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Date',
    demoComponent: ExampleInputDateBasicDemo,
    code: `<au-form-field label="Delivery date">
  <au-input-date />
</au-form-field>`,
  },
  {
    title: 'With error',
    demoComponent: ExampleInputDateErrorDemo,
    code: `<au-form-field
  label="Delivery date"
  errorMessage="Select a valid date."
  [invalid]="true"
>
  <au-input-date />
</au-form-field>`,
  },
  {
    title: 'Date range',
    description: 'Use `minDate` and `maxDate` (ISO `YYYY-MM-DD`) for native `min`/`max`.',
    demoComponent: ExampleInputDateHintDemo,
    code: `<au-form-field label="Delivery date" hint="Deliveries in 2026 only.">
  <au-input-date minDate="2026-01-01" maxDate="2026-12-31" />
</au-form-field>`,
  },
];
