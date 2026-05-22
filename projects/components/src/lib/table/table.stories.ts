import type { Meta, StoryObj } from '@storybook/angular';
import { signal } from '@angular/core';

import { buildStoryDocsOverview } from '../story-docs/build-story-docs-overview';
import { AuTable, AuTableSortHeader } from './table';

const docsOverview = buildStoryDocsOverview({
  overview:
    '`au-table` wraps native **`<table>`** markup with optional **`striped`** and **`compact`** modes. Sortable columns use **`th[auTableSortHeader]`** with `aria-sort` and a none → asc → desc cycle.',
  whenToUse: {
    use: [
      'Tabular data with headers and body rows',
      'Sortable columns when the parent owns sort state',
    ],
    avoid: [
      'Layout-only grids → CSS grid',
      'Very wide responsive lists → card list patterns',
    ],
  },
  anatomy: [
    { region: 'Host `au-table`', notes: 'Projects `<table>`; `data-au-striped` / `data-au-compact`.' },
    {
      region: 'Sort header',
      notes: 'Button in `<th>` with `aria-sort` and direction icon.',
    },
  ],
  accessibility: [
    {
      topic: 'Semantics',
      detail: 'Keep `thead`, `tbody`, and `th scope` on native table markup.',
    },
    {
      topic: 'Sort',
      detail: '`aria-sort` reflects asc, desc, or none on the sort button.',
    },
  ],
  keyboard: [
    {
      interaction: 'Tab / Enter / Space',
      behavior: 'Focus and activate sort buttons in column headers.',
    },
  ],
  tokens: [
    {
      concern: 'Shell',
      examples: '`--au-color-surface-raised`, `--au-color-border-subtle`',
    },
    { concern: 'Cells', examples: '`--au-text-sm`, `--au-space-3` (compact: `--au-space-2`)' },
  ],
});

const meta: Meta<AuTable> = {
  title: 'Aurea/Table',
  component: AuTable,
  tags: ['autodocs', 'au', 'stable'],
  parameters: {
    layout: 'padded',
    docs: {
      extractArgTypes: () => ({}),
      description: { component: docsOverview },
    },
  },
  argTypes: {
    striped: {
      control: 'boolean',
      description: 'Alternating row background.',
      table: { category: 'Appearance' },
    },
    compact: {
      control: 'boolean',
      description: 'Reduced cell padding.',
      table: { category: 'Appearance' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const nameSort = signal<'asc' | 'desc' | null>(null);
    const rows = [
      { name: 'Ada Lovelace', role: 'Engineer' },
      { name: 'Grace Hopper', role: 'Admiral' },
      { name: 'Katherine Johnson', role: 'Mathematician' },
    ];
    return {
      props: { nameSort, rows },
      moduleMetadata: { imports: [AuTable, AuTableSortHeader] },
      template: `
        <au-table striped>
          <thead>
            <tr>
              <th auTableSortHeader [sortDirection]="nameSort()" (sort)="nameSort.set($event)">Name</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            @for (row of rows; track row.name) {
              <tr>
                <td>{{ row.name }}</td>
                <td>{{ row.role }}</td>
              </tr>
            }
          </tbody>
        </au-table>
      `,
    };
  },
};
