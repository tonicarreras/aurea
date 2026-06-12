import {
  ExampleIconBasicDemo,
  ExampleIconSetDemo,
  ExampleIconSizesDemo,
} from '../../../../demos/examples/icon.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Basic icon',
    description: 'Decorative glyph (`aria-hidden`). Name the parent control for screen readers.',
    demoComponent: ExampleIconBasicDemo,
    code: `<au-icon name="info" size="md" />`,
  },
  {
    title: 'Sizes',
    demoComponent: ExampleIconSizesDemo,
    code: `<au-icon name="check-circle" size="sm" />
<au-icon name="check-circle" size="md" />
<au-icon name="check-circle" size="lg" />`,
  },
  {
    title: 'Common set',
    description: 'Glyphs used in messages, states, and system actions.',
    demoComponent: ExampleIconSetDemo,
    code: `<au-icon name="check-circle" size="md" />
<au-icon name="warning" size="md" />
<au-icon name="error" size="md" />
<au-icon name="info" size="md" />`,
  },
];
