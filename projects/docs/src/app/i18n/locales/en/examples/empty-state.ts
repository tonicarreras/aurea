import {
  ExampleEmptyStateCustomMediaDemo,
  ExampleEmptyStateDefaultDemo,
  ExampleEmptyStateTableDemo,
} from '../../../../demos/examples/empty-state.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Search empty',
    description: 'Icon, title, description, and a projected action.',
    demoComponent: ExampleEmptyStateDefaultDemo,
    code: `import { AuButton, AuEmptyState } from '@aurea-design-system/components';

<au-empty-state
  icon="search"
  title="No results found"
  description="Try adjusting your filters or search term."
>
  <button auButton variant="outline" type="button">Clear filters</button>
</au-empty-state>`,
  },
  {
    title: 'Table empty',
    description: 'Project inside `au-table` with `size="sm"` and `headingLevel="3"`.',
    demoComponent: ExampleEmptyStateTableDemo,
    code: `import { AuButton, AuEmptyState, AuTable, AuTableColumn } from '@aurea-design-system/components';

<au-table [data]="[]" title="Users">
  <au-table-column name="name" header="Name" cellVariant="primary" />
  <au-table-column name="role" header="Role" />
  <au-empty-state
    title="No users yet"
    description="Create your first user to populate this table."
    size="sm"
    [headingLevel]="3"
  >
    <button auButton type="button">Add user</button>
  </au-empty-state>
</au-table>`,
  },
  {
    title: 'Custom illustration',
    description: 'Project an SVG (or img) with `[auEmptyStateMedia]` for brand artwork.',
    demoComponent: ExampleEmptyStateCustomMediaDemo,
    code: `import { AuButton, AuEmptyState, AuEmptyStateMedia } from '@aurea-design-system/components';

<au-empty-state title="No projects yet" description="Start by creating your first project.">
  <svg auEmptyStateMedia aria-hidden="true" width="96" height="96" viewBox="0 0 96 96">
    <!-- illustration paths -->
  </svg>
  <button auButton type="button">Create project</button>
</au-empty-state>`,
  },
];
