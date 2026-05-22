import { ExampleChipGroupFiltersDemo } from '../../../../demos/examples/chip-group.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Filter chips',
    description: 'Use `au-chip-group` with `selectable` chips — not `au-list`.',
    demoComponent: ExampleChipGroupFiltersDemo,
    code: `<au-chip-group ariaLabel="Status filters">
  <au-chip label="Draft" [selectable]="true" />
  <au-chip label="Published" [selectable]="true" [(selected)]="publishedOnly" variant="accent" />
  <au-chip label="Archived" [selectable]="true" />
</au-chip-group>`,
  },
];
