import { PopoverDemo } from '../../../../demos/previews/popover.preview';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Popover de filtros',
    demoComponent: PopoverDemo,
    code: `import { AuPopover, AuPopoverTrigger, AuButton } from '@aurea-design-system/components';

<au-popover>
  <au-button auPopoverTrigger>Filtros</au-button>
  <!-- contenido del panel -->
</au-popover>`,
  },
];
