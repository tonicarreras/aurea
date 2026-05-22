import { ExampleChipGroupFiltersDemo } from '../../../../demos/examples/chip-group.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Chips de filtro',
    demoComponent: ExampleChipGroupFiltersDemo,
    code: `<au-chip-group ariaLabel="Filtros de estado">
  <au-chip label="Borrador" [selectable]="true" />
  <au-chip label="Publicado" [selectable]="true" [(selected)]="soloPublicados" variant="accent" />
  <au-chip label="Archivado" [selectable]="true" />
</au-chip-group>`,
  },
];
