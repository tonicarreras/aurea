import {
  ExampleSpinnerDefaultDemo,
  ExampleSpinnerLabeledDemo,
} from '../../../../demos/examples/spinner.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Glyph only',
    description: 'Omit `label` for a compact indicator (`aria-label="Loading"`).',
    demoComponent: ExampleSpinnerDefaultDemo,
    code: `import { AuSpinner } from '@aurea-design-system/components';

<au-spinner size="md" />`,
  },
  {
    title: 'With label',
    description: '`label` renders visible copy and names the live region.',
    demoComponent: ExampleSpinnerLabeledDemo,
    code: `import { AuSpinner } from '@aurea-design-system/components';

<au-spinner size="sm" label="Loading team members…" />`,
  },
];
