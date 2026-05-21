import {
  ExampleSkeletonButtonDemo,
  ExampleSkeletonProfileDemo,
  ExampleSkeletonTextDemo,
} from '../../../../demos/examples/skeleton.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Text lines',
    description: 'Mark the loading region `aria-busy` on a parent.',
    demoComponent: ExampleSkeletonTextDemo,
    code: `<div aria-busy="true">
  <au-skeleton variant="text" width="60%" />
  <au-skeleton variant="text" />
</div>`,
  },
  {
    title: 'Profile placeholder',
    demoComponent: ExampleSkeletonProfileDemo,
    code: `<div aria-busy="true" style="display: flex; gap: 1rem">
  <au-skeleton variant="circular" size="lg" />
  <au-skeleton variant="text" width="40%" />
</div>`,
  },
  {
    title: 'Button bar',
    demoComponent: ExampleSkeletonButtonDemo,
    code: `<au-skeleton variant="button" size="md" width="8rem" />`,
  },
];
