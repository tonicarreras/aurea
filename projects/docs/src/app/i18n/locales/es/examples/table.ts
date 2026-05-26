import { TableDemo } from '../../../../demos/previews/table.preview';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Tabla de datos',
    demoComponent: TableDemo,
    code: `import { AuTable, AuTableColumn } from '@aurea-design-system/components';

<au-table [data]="rows" title="Equipo">
  <au-table-column name="name" header="Nombre" sortable cellVariant="primary" />
  <au-table-column name="role" header="Rol" />
</au-table>`,
  },
];
