import {
  ExampleListChipsDemo,
  ExampleListLabelledByDemo,
} from '../../../../demos/examples/list.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Chips removibles',
    description: 'Etiquetas estáticas o removibles en un contenedor `role="list"`.',
    demoComponent: ExampleListChipsDemo,
    code: `<au-list ariaLabel="Tecnologías seleccionadas">
  <au-chip label="Angular" [removable]="true" />
  <au-chip label="TypeScript" [removable]="true" />
</au-list>`,
  },
  {
    title: 'Etiquetado por encabezado',
    demoComponent: ExampleListLabelledByDemo,
    code: `<p id="tags-heading">Etiquetas</p>
<au-list ariaLabelledBy="tags-heading">
  <au-chip label="Design system" [removable]="true" />
</au-list>`,
  },
];
