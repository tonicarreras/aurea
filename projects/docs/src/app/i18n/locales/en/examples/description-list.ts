import {
  ExampleDescriptionListColumnsDemo,
  ExampleDescriptionListVerticalDemo,
} from '../../../../demos/examples/description-list.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Vertical',
    demoComponent: ExampleDescriptionListVerticalDemo,
    code: `<au-description-list>
  <au-description-item term="Name">Ada Lovelace</au-description-item>
  <au-description-item term="Role">Engineer</au-description-item>
</au-description-list>`,
  },
  {
    title: 'Two columns',
    description: 'Use `columns` for responsive multi-column grids.',
    demoComponent: ExampleDescriptionListColumnsDemo,
    code: `<au-description-list [columns]="2">
  <au-description-item term="Name">Ada Lovelace</au-description-item>
  <au-description-item term="Email">ada@example.com</au-description-item>
  <au-description-item term="Role">Engineer</au-description-item>
</au-description-list>`,
  },
];
