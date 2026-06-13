import {
  ExampleInputDateBasicDemo,
  ExampleInputDateErrorDemo,
  ExampleInputDateHintDemo,
} from '../../../../demos/examples/input-date.examples';
import { ExampleInputDateRangeDemo } from '../../../../demos/examples/input-date-range.example';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Date',
    demoComponent: ExampleInputDateBasicDemo,
    code: `<au-form-field label="Delivery date">
  <input auInputDate />
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
  <input auInputDate />
</au-form-field>`,
  },
  {
    title: 'With hint',
    demoComponent: ExampleInputDateHintDemo,
    code: `<au-form-field label="Delivery date" hint="Optional — leave blank for the earliest slot.">
  <input auInputDate />
</au-form-field>`,
  },
  {
    title: 'Date range',
    description: 'Use minDate and maxDate (ISO YYYY-MM-DD) for native min and max attributes.',
    demoComponent: ExampleInputDateRangeDemo,
    code: `<au-form-field label="Delivery date" hint="Deliveries in 2026 only.">
  <input auInputDate minDate="2026-01-01" maxDate="2026-12-31" />
</au-form-field>`,
  },
];
