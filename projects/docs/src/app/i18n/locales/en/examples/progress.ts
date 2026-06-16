import {
  ExampleProgressBasicDemo,
  ExampleProgressStatesDemo,
} from '../../../../demos/examples/progress.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Basic progress',
    description: 'Determinate bar with `value` and `max`; include an accessible name.',
    demoComponent: ExampleProgressBasicDemo,
    code: `<au-progress [value]="62" [max]="100" aria-label="Import progress" />`,
  },
  {
    title: 'Progress states',
    description: 'Compare start and completion in the same block.',
    demoComponent: ExampleProgressStatesDemo,
    code: `<au-progress [value]="18" [max]="100" aria-label="Task started" />
<au-progress [value]="100" [max]="100" aria-label="Task completed" />`,
  },
];
