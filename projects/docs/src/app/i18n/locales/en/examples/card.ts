import {
  ExampleCardElevatedDemo,
  ExampleCardFilledFooterDemo,
  ExampleCardOutlinedDemo,
} from '../../../../demos/examples/card.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Elevated',
    demoComponent: ExampleCardElevatedDemo,
    code: `<au-card variant="elevated">
  <h3 auCardHeader>Title</h3>
  <p>Content</p>
</au-card>`,
  },
  {
    title: 'Outlined',
    demoComponent: ExampleCardOutlinedDemo,
    code: `<au-card variant="outlined">
  <h3 auCardHeader>Title</h3>
  <p>Content</p>
</au-card>`,
  },
  {
    title: 'Filled with footer',
    demoComponent: ExampleCardFilledFooterDemo,
    code: `<au-card variant="filled">
  <h3 auCardHeader>Title</h3>
  <p>Content</p>
  <div auCardFooter>
    <button auButton size="sm">Action</button>
  </div>
</au-card>`,
  },
];
