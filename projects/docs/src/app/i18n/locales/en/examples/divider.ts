import {
  ExampleDividerBasicDemo,
  ExampleDividerLabelDemo,
} from '../../../../demos/examples/divider.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Simple divider',
    demoComponent: ExampleDividerBasicDemo,
    code: `<p>Above</p>
<au-divider />
<p>Below</p>`,
  },
  {
    title: 'With label',
    demoComponent: ExampleDividerLabelDemo,
    code: `<au-divider label="or continue with" />`,
  },
];
