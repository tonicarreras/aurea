import { PopoverDemo } from '../../../../demos/previews/popover.preview';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Filter popover',
    demoComponent: PopoverDemo,
    code: `import { AuPopover, AuPopoverTrigger, AuButton } from '@aurea-design-system/components';

<au-popover>
  <au-button auPopoverTrigger>Filters</au-button>
  <!-- panel content -->
</au-popover>`,
  },
];
