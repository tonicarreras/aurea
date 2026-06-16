import {
  ExampleBadgeDotDemo,
  ExampleBadgeVariantsDemo,
} from '../../../../demos/examples/badge.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Semantic variants',
    description: 'Compact labels for status, category, or counts.',
    demoComponent: ExampleBadgeVariantsDemo,
    code: `<au-badge variant="default" label="Draft" />
<au-badge variant="accent" label="New" />
<au-badge variant="success" label="Active" />
<au-badge variant="warning" label="Pending" />
<au-badge variant="error" label="Error" />`,
  },
  {
    title: 'Dot indicator',
    description: 'Dot-only or dot with label for subtle notifications.',
    demoComponent: ExampleBadgeDotDemo,
    code: `<au-badge variant="accent" [dot]="true" />
<au-badge variant="error" [dot]="true" label="Error" />`,
  },
];
