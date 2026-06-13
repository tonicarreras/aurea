import { PopoverDemo } from '../../../../demos/previews/popover.preview';
import {
  ExamplePopoverControlledDemo,
  ExamplePopoverFiltersDemo,
  ExamplePopoverPlacementDemo,
} from '../../../../demos/examples/popover.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Filter popover',
    demoComponent: PopoverDemo,
    code: `import { AuPopover, AuPopoverTrigger, AuButton } from '@aurea-design-system/components';

<au-popover [(open)]="open">
  <button auButton auPopoverTrigger>Filters</button>
  <p>Compact panel content.</p>
</au-popover>`,
  },
  {
    title: 'Placement',
    description: 'Align the panel to `start` or `end` when space is tight on the inline axis.',
    demoComponent: ExamplePopoverPlacementDemo,
    code: `<au-popover [(open)]="open" placement="end">
  <button auButton auPopoverTrigger>Filters</button>
  <p>Panel content</p>
</au-popover>`,
  },
  {
    title: 'Inline filters',
    description: 'Project form controls inside the panel; dismiss with Apply or outside click.',
    demoComponent: ExamplePopoverFiltersDemo,
    code: `<au-popover [(open)]="filtersOpen">
  <button auButton auPopoverTrigger>Filters</button>
  <au-form-field label="Status">
    <input type="checkbox" auCheckbox>Active only
  </au-form-field>
</au-popover>`,
  },
  {
    title: 'Controlled open',
    description: 'Open from elsewhere with `[(open)]` — useful for contextual help buttons.',
    demoComponent: ExamplePopoverControlledDemo,
    code: `<button auButton type="button" (click)="open.set(true)">Open help</button>
<au-popover [(open)]="open">
  <button auButton auPopoverTrigger>Help</button>
  <p>Short help text.</p>
</au-popover>`,
  },
];
