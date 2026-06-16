import {
  ExampleTooltipRightDemo,
  ExampleTooltipTopDemo,
} from '../../../../demos/examples/tooltip.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Top',
    demoComponent: ExampleTooltipTopDemo,
    code: `<button auButton auTooltip="Contextual help" auTooltipPlacement="top">
  Hover me
</button>`,
  },
  {
    title: 'End',
    demoComponent: ExampleTooltipRightDemo,
    code: `<button auButton auTooltip="Appears at the end" auTooltipPlacement="end">
  End
</button>`,
  },
];
