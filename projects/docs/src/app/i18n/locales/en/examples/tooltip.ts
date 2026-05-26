import {
  ExampleTooltipRightDemo,
  ExampleTooltipTopDemo,
} from '../../../../demos/examples/tooltip.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Top',
    demoComponent: ExampleTooltipTopDemo,
    code: `<au-button auTooltip="Contextual help" auTooltipPlacement="top">
  Hover me
</au-button>`,
  },
  {
    title: 'End',
    demoComponent: ExampleTooltipRightDemo,
    code: `<au-button auTooltip="Appears at the end" auTooltipPlacement="end">
  End
</au-button>`,
  },
];
