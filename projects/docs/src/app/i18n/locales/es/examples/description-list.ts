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
  <au-description-item term="Nombre">Ada Lovelace</au-description-item>
  <au-description-item term="Rol">Ingeniera</au-description-item>
</au-description-list>`,
  },
  {
    title: 'Dos columnas',
    description: 'Usa `columns` para rejillas de varias columnas.',
    demoComponent: ExampleDescriptionListColumnsDemo,
    code: `<au-description-list [columns]="2">
  <au-description-item term="Nombre">Ada Lovelace</au-description-item>
  <au-description-item term="Email">ada@example.com</au-description-item>
  <au-description-item term="Rol">Ingeniera</au-description-item>
</au-description-list>`,
  },
];
