import {
  ExampleTooltipRightDemo,
  ExampleTooltipTopDemo,
} from '../../../../demos/examples/tooltip.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Arriba',
    demoComponent: ExampleTooltipTopDemo,
    code: `<button auButton auTooltip="Ayuda contextual" auTooltipPlacement="top">
  Pasar el cursor
</button>`,
  },
  {
    title: 'Final (end)',
    demoComponent: ExampleTooltipRightDemo,
    code: `<button auButton auTooltip="Aparece al final" auTooltipPlacement="end">
  End
</button>`,
  },
];
