import type { Meta, StoryObj } from '@storybook/angular';
import { signal } from '@angular/core';
import { expect, userEvent, within } from 'storybook/test';

import { AuBadge } from '../badge/badge';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuTableCellDef } from './au-table-cell-def.directive';
import { AuTableColumn } from './au-table-column';
import { AuTable } from './table';
import type { AuTableSortState } from './table-types';


type Row = {
  name: string;
  role: string;
  score: number;
  status: 'active' | 'away';
};

const rows: Row[] = [
  { name: 'Ada Lovelace', role: 'Engineer', score: 98, status: 'active' },
  { name: 'Grace Hopper', role: 'Admiral', score: 94, status: 'active' },
  { name: 'Katherine Johnson', role: 'Mathematician', score: 97, status: 'away' },
];

const storyImports = [AuTable, AuTableColumn, AuTableCellDef, AuBadge];

const meta: Meta<AuTable> = {
  title: 'Aurea/Table',
  component: AuTable,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('table'),
  argTypes: {
    title: { control: 'text', table: { category: 'Content' } },
    description: { control: 'text', table: { category: 'Content' } },
    striped: { control: 'boolean', table: { category: 'Appearance' } },
    compact: { control: 'boolean', table: { category: 'Appearance' } },
    stickyHeader: { control: 'boolean', table: { category: 'Layout' } },
    clientSort: { control: 'boolean', table: { category: 'Behavior' } },
  },
  args: {
    title: 'Team members',
    description: 'Declare columns with au-table-column; optional auTableCell templates.',
    striped: false,
    compact: false,
    stickyHeader: false,
    clientSort: true,
  },
};

export default meta;
type Story = StoryObj<AuTable>;

export const Default: Story = {
  render: (args) => {
    const data = signal(rows);
    const sort = signal<AuTableSortState | null>(null);
    return {
      props: { ...args, data, sort },
      moduleMetadata: { imports: storyImports },
      template: `
        <au-table
          [data]="data()"
          [title]="title"
          [description]="description"
          caption="Team members"
          [striped]="striped"
          [compact]="compact"
          [stickyHeader]="stickyHeader"
          [clientSort]="clientSort"
          [(sort)]="sort"
        >
          <au-table-column name="name" header="Name" [sortable]="true" cellVariant="primary" />
          <au-table-column name="role" header="Role" cellVariant="secondary" />
          <au-table-column name="score" header="Score" align="end" [sortable]="true" />
          <au-table-column name="status" header="Status" align="center">
            <ng-template auTableCell let-row>
              <au-badge [variant]="row.status === 'active' ? 'success' : 'default'">
                {{ row.status === 'active' ? 'Active' : 'Away' }}
              </au-badge>
            </ng-template>
          </au-table-column>
        </au-table>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByRole('heading', { name: 'Team members' })).toBeVisible();
    const sortBtn = await canvas.findByRole('button', { name: /sort by name/i });
    await userEvent.click(sortBtn);
    const cells = await canvas.findAllByRole('cell');
    await expect(cells[0]).toHaveTextContent('Ada Lovelace');
  },
};

export const Striped: Story = {
  args: { striped: true },
  render: Default.render,
};
