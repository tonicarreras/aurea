import {
  ExampleCheckboxBasicDemo,
  ExampleCheckboxCheckedDemo,
  ExampleCheckboxIndeterminateDemo,
} from '../../../../demos/examples/checkbox.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Unchecked',
    demoComponent: ExampleCheckboxBasicDemo,
    code: `<input type="checkbox" auCheckbox label="I accept the terms" />`,
  },
  {
    title: 'Checked',
    demoComponent: ExampleCheckboxCheckedDemo,
    code: `<input type="checkbox" auCheckbox label="Newsletter" [checked]="true" />`,
  },
  {
    title: 'Indeterminate',
    description: 'Useful for “select all” patterns with partial selection.',
    demoComponent: ExampleCheckboxIndeterminateDemo,
    code: `<input type="checkbox" auCheckbox label="Select all" [indeterminate]="true" />`,
  },
];
