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
    title: 'Tabla de datos',
    demoComponent: TableDemo,
    code: `import { AuTable, AuTableColumn } from '@aurea-design-system/components';

<au-table [data]="rows" title="Equipo" [(sort)]="sort">
  <au-table-column name="name" header="Nombre" sortable cellVariant="primary" />
  <au-table-column name="role" header="Rol" cellVariant="secondary" />
  <au-table-column name="score" header="Puntuación" align="end" sortable />
</au-table>`,
  },
  {
    title: 'Selección única',
    description: 'Una fila a la vez; clic en la fila o en su checkbox. Emite `[(selection)]`.',
    demoComponent: ExampleTableSingleSelectDemo,
    code: `<au-table
  [data]="rows"
  title="Elige un miembro"
  selectionMode="single"
  [(selection)]="selection"
>
  <au-table-column name="name" header="Nombre" sortable cellVariant="primary" />
  <au-table-column name="role" header="Rol" />
</au-table>`,
  },
  {
    title: 'Selección múltiple',
    description:
      'Checkbox en cabecera para seleccionar filas visibles; admite estado indeterminado.',
    demoComponent: ExampleTableMultipleSelectDemo,
    code: `<au-table
  [data]="rows"
  title="Miembros del equipo"
  selectionMode="multiple"
  [(selection)]="selection"
  striped
>
  <au-table-column name="name" header="Nombre" cellVariant="primary" />
  <au-table-column name="role" header="Rol" />
  <au-table-column name="score" header="Puntuación" align="end" sortable />
</au-table>`,
  },
  {
    title: 'Celdas custom',
    description:
      'Proyecta `ng-template[auTableCell] let-row` en la columna para badges o acciones.',
    demoComponent: ExampleTableCustomCellDemo,
    code: `import { AuTable, AuTableColumn, AuTableCellDef, AuBadge } from '@aurea-design-system/components';

<au-table [data]="rows" title="Miembros del equipo">
  <au-table-column name="name" header="Nombre" cellVariant="primary" />
  <au-table-column name="status" header="Estado" align="center">
    <ng-template auTableCell let-row>
      <au-badge [variant]="row.status === 'active' ? 'success' : 'warning'" [label]="row.status" />
    </ng-template>
  </au-table-column>
</au-table>`,
  },
  {
    title: 'Carga',
    description: 'Muestra fila de carga y pone `aria-busy` en el host mientras llegan los datos.',
    demoComponent: ExampleTableLoadingDemo,
    code: `<au-table
  [data]="[]"
  title="Miembros del equipo"
  [loading]="true"
  loadingMessage="Cargando equipo…"
>
  <au-table-column name="name" header="Nombre" />
  <au-table-column name="role" header="Rol" />
</au-table>`,
  },
];
