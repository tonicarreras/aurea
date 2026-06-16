import { ExampleDrawerBasicDemo } from '../../../../demos/examples/drawer.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Side panel',
    description: 'Drawer with footer actions; slides in from the end edge.',
    demoComponent: ExampleDrawerBasicDemo,
    code: `<button auButton (click)="open.set(true)">Open filters</button>

<au-drawer [(open)]="open" title="Filters" position="end">
  <p>Filter controls go here.</p>
  <div auDrawerFooter>
    <button auButton variant="secondary" (click)="open.set(false)">Cancel</button>
    <button auButton (click)="open.set(false)">Apply</button>
  </div>
</au-drawer>`,
    language: 'typescript',
  },
];
