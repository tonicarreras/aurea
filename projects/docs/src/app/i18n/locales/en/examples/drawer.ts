import { ExampleDrawerBasicDemo } from '../../../../demos/examples/drawer.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Side panel',
    description: 'Drawer with footer actions; slides in from the end edge.',
    demoComponent: ExampleDrawerBasicDemo,
    code: `<au-button (click)="open.set(true)">Open filters</au-button>

<au-drawer [(open)]="open" title="Filters" position="end">
  <p>Filter controls go here.</p>
  <div auDrawerFooter>
    <au-button variant="secondary" (click)="open.set(false)">Cancel</au-button>
    <au-button (click)="open.set(false)">Apply</au-button>
  </div>
</au-drawer>`,
    language: 'typescript',
  },
];
