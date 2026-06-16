import {
  ExampleEmptyStateCustomMediaDemo,
  ExampleEmptyStateDefaultDemo,
  ExampleEmptyStateTableEsDemo,
} from '../../../../demos/examples/empty-state.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Búsqueda vacía',
    description: 'Icono, título, descripción y acción proyectada.',
    demoComponent: ExampleEmptyStateDefaultDemo,
    code: `import { AuButton, AuEmptyState } from '@aurea-design-system/components';

<au-empty-state
  icon="search"
  title="Sin resultados"
  description="Prueba otro término o ajusta los filtros."
>
  <button auButton variant="outline" type="button">Limpiar filtros</button>
</au-empty-state>`,
  },
  {
    title: 'Tabla vacía',
    description: 'Proyecta dentro de `au-table` con `size="sm"` y `headingLevel="3"`.',
    demoComponent: ExampleEmptyStateTableEsDemo,
    code: `import { AuButton, AuEmptyState, AuTable, AuTableColumn } from '@aurea-design-system/components';

<au-table [data]="[]" title="Usuarios">
  <au-table-column name="name" header="Nombre" cellVariant="primary" />
  <au-table-column name="role" header="Rol" />
  <au-empty-state
    title="Aún no hay usuarios"
    description="Crea el primero para rellenar esta tabla."
    size="sm"
    [headingLevel]="3"
  >
    <button auButton type="button">Añadir usuario</button>
  </au-empty-state>
</au-table>`,
  },
  {
    title: 'Ilustración custom',
    description: 'Proyecta un SVG (o img) con `[auEmptyStateMedia]` para artwork de marca.',
    demoComponent: ExampleEmptyStateCustomMediaDemo,
    code: `import { AuButton, AuEmptyState, AuEmptyStateMedia } from '@aurea-design-system/components';

<au-empty-state title="Aún no hay proyectos" description="Empieza creando el primero.">
  <svg auEmptyStateMedia aria-hidden="true" width="96" height="96" viewBox="0 0 96 96">
    <!-- paths de la ilustración -->
  </svg>
  <button auButton type="button">Crear proyecto</button>
</au-empty-state>`,
  },
];
