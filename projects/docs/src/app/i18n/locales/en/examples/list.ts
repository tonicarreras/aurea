import {
  ExampleListChipsDemo,
  ExampleListLabelledByDemo,
} from '../../../../demos/examples/list.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Removable chips',
    description: 'Static or removable tags in a `role="list"` container.',
    demoComponent: ExampleListChipsDemo,
    code: `<au-list ariaLabel="Selected technologies">
  <au-chip label="Angular" [removable]="true" />
  <au-chip label="TypeScript" [removable]="true" />
</au-list>`,
  },
  {
    title: 'Labelled by heading',
    demoComponent: ExampleListLabelledByDemo,
    code: `<p id="tags-heading">Tags</p>
<au-list ariaLabelledBy="tags-heading">
  <au-chip label="Design system" [removable]="true" />
</au-list>`,
  },
];
