import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  AuButton,
  AuEmptyState,
  AuEmptyStateMedia,
  AuTable,
  AuTableColumn,
} from '@aurea-design-system/components';

const demoStyles = `
  .docs-empty-state-demo {
    padding: 1rem;
  }
`;

@Component({
  selector: 'docs-example-empty-state-default',
  imports: [AuEmptyState, AuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="docs-empty-state-demo">
    <au-empty-state
      icon="search"
      title="No results found"
      description="Try adjusting your filters or search term."
    >
      <button
        auButton
        variant="outline"
        type="button"
      >
        Clear filters
      </button>
    </au-empty-state>
  </div>`,
  styles: demoStyles,
})
export class ExampleEmptyStateDefaultDemo {}

@Component({
  selector: 'docs-example-empty-state-table',
  imports: [AuTable, AuTableColumn, AuEmptyState, AuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="docs-empty-state-demo">
    <au-table
      [data]="[]"
      title="Users"
      description="Manage team members."
    >
      <au-table-column
        name="name"
        header="Name"
        cellVariant="primary"
      />
      <au-table-column
        name="role"
        header="Role"
      />
      <au-empty-state
        title="No users yet"
        description="Create your first user to populate this table."
        size="sm"
        [headingLevel]="3"
      >
        <button
          auButton
          type="button"
        >
          Add user
        </button>
      </au-empty-state>
    </au-table>
  </div>`,
  styles: demoStyles,
})
export class ExampleEmptyStateTableDemo {}

@Component({
  selector: 'docs-example-empty-state-table-es',
  imports: [AuTable, AuTableColumn, AuEmptyState, AuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="docs-empty-state-demo">
    <au-table
      [data]="[]"
      title="Usuarios"
      description="Gestiona los miembros del equipo."
    >
      <au-table-column
        name="name"
        header="Nombre"
        cellVariant="primary"
      />
      <au-table-column
        name="role"
        header="Rol"
      />
      <au-empty-state
        title="Aún no hay usuarios"
        description="Crea el primero para rellenar esta tabla."
        size="sm"
        [headingLevel]="3"
      >
        <button
          auButton
          type="button"
        >
          Añadir usuario
        </button>
      </au-empty-state>
    </au-table>
  </div>`,
  styles: demoStyles,
})
export class ExampleEmptyStateTableEsDemo {}

@Component({
  selector: 'docs-example-empty-state-custom-media',
  imports: [AuEmptyState, AuEmptyStateMedia, AuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="docs-empty-state-demo">
    <au-empty-state
      title="No projects yet"
      description="Start by creating your first project."
    >
      <svg
        auEmptyStateMedia
        aria-hidden="true"
        width="96"
        height="96"
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="12"
          y="20"
          width="72"
          height="56"
          rx="8"
          stroke="currentColor"
          stroke-width="2"
        />
        <path
          d="M32 44h32M32 52h20"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
      <button
        auButton
        type="button"
      >
        Create project
      </button>
    </au-empty-state>
  </div>`,
  styles: demoStyles,
})
export class ExampleEmptyStateCustomMediaDemo {}
