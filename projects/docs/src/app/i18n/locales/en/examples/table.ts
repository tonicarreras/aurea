import { TableDemo } from '../../../../demos/previews/table.preview';
import {
  ExampleTableCustomCellDemo,
  ExampleTableLoadingDemo,
  ExampleTableMultipleSelectDemo,
  ExampleTableSingleSelectDemo,
} from '../../../../demos/examples/table.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Data table',
    demoComponent: TableDemo,
    code: `import { AuTable, AuTableColumn } from '@aurea-design-system/components';

<au-table [data]="rows" title="Team" [(sort)]="sort">
  <au-table-column name="name" header="Name" sortable cellVariant="primary" />
  <au-table-column name="role" header="Role" cellVariant="secondary" />
  <au-table-column name="score" header="Score" align="end" sortable />
</au-table>`,
  },
  {
    title: 'Single selection',
    description: 'One row at a time; click the row or its checkbox. Emits `[(selection)]`.',
    demoComponent: ExampleTableSingleSelectDemo,
    code: `<au-table
  [data]="rows"
  title="Pick one member"
  selectionMode="single"
  [(selection)]="selection"
>
  <au-table-column name="name" header="Name" sortable cellVariant="primary" />
  <au-table-column name="role" header="Role" />
</au-table>`,
  },
  {
    title: 'Multiple selection',
    description: 'Header checkbox selects all visible rows; supports indeterminate state.',
    demoComponent: ExampleTableMultipleSelectDemo,
    code: `<au-table
  [data]="rows"
  title="Team members"
  selectionMode="multiple"
  [(selection)]="selection"
  striped
>
  <au-table-column name="name" header="Name" cellVariant="primary" />
  <au-table-column name="role" header="Role" />
  <au-table-column name="score" header="Score" align="end" sortable />
</au-table>`,
  },
  {
    title: 'Custom cells',
    description:
      'Project `ng-template[auTableCell] let-row` inside a column for badges or actions.',
    demoComponent: ExampleTableCustomCellDemo,
    code: `import { AuTable, AuTableColumn, AuTableCellDef, AuBadge } from '@aurea-design-system/components';

<au-table [data]="rows" title="Team members">
  <au-table-column name="name" header="Name" cellVariant="primary" />
  <au-table-column name="status" header="Status" align="center">
    <ng-template auTableCell let-row>
      <au-badge [variant]="row.status === 'active' ? 'success' : 'warning'" [label]="row.status" />
    </ng-template>
  </au-table-column>
</au-table>`,
  },
  {
    title: 'Loading',
    description: 'Shows a loading row and sets `aria-busy` on the host while data is fetched.',
    demoComponent: ExampleTableLoadingDemo,
    code: `<au-table
  [data]="[]"
  title="Team members"
  [loading]="true"
  loadingMessage="Loading team…"
>
  <au-table-column name="name" header="Name" />
  <au-table-column name="role" header="Role" />
</au-table>`,
  },
];
