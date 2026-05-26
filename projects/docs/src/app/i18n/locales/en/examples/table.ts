import { TableDemo } from '../../../../demos/previews/table.preview';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Data table',
    demoComponent: TableDemo,
    code: `import { AuTable, AuTableColumn } from '@aurea-design-system/components';

<au-table [data]="rows" title="Team">
  <au-table-column name="name" header="Name" sortable cellVariant="primary" />
  <au-table-column name="role" header="Role" />
</au-table>`,
  },
];
