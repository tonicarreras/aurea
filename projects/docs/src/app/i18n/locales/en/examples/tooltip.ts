import {
  ExampleTooltipRightDemo,
  ExampleTooltipTopDemo,
} from '../../../../demos/examples/tooltip.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Arriba',
    demoComponent: ExampleTooltipTopDemo,
    code: `<au-button auTooltip="Ayuda contextual" auTooltipPlacement="top">
  Pasar el cursor
</au-button>`,
  },
  {
    title: 'Final (end)',
    demoComponent: ExampleTooltipRightDemo,
    code: `<au-button auTooltip="Appears at the end" auTooltipPlacement="end">
  End
</au-button>`,
  },
];
