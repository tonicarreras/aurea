import type { Meta, StoryObj } from '@storybook/angular';
import { signal } from '@angular/core';

import { AuTable, AuTableSortHeader } from './table';

const meta: Meta = {
  title: 'Aurea/Table',
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
    docs: {
      extractArgTypes: () => ({}),
      description: {
        component: 'Semantic table shell with optional striped/compact modes and sortable headers.',
      },
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
