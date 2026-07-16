import type { Meta, StoryObj } from '@storybook/angular';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { expect, userEvent, within } from 'storybook/test';

import { AuBadge } from '../badge/badge';
import { AuButton } from '../button';
import { AuEmptyState } from '../empty-state/empty-state';
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

const storyImports = [AuTable, AuTableColumn, AuTableCellDef, AuBadge, AuEmptyState, AuButton];

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
    selectionMode: {
      control: 'select',
      options: ['none', 'single', 'multiple'],
      table: { category: 'Behavior' },
    },
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
              <au-badge
                [variant]="row.status === 'active' ? 'success' : 'warning'"
                [label]="row.status === 'active' ? 'Active' : 'Away'"
              />
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

export const SingleSelect: Story = {
  render: (args) => {
    const data = signal(rows);
    const selection = signal<readonly unknown[]>([]);
    return {
      props: { ...args, data, selection },
      moduleMetadata: { imports: storyImports },
      template: `
        <au-table
          [data]="data()"
          title="Pick one member"
          description="Single selection; only one row can be checked at a time."
          caption="Team members"
          selectionMode="single"
          [(selection)]="selection"
          [striped]="striped"
        >
          <au-table-column name="name" header="Name" [sortable]="true" cellVariant="primary" />
          <au-table-column name="role" header="Role" cellVariant="secondary" />
          <au-table-column name="score" header="Score" align="end" />
        </au-table>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checks = await canvas.findAllByRole('checkbox', { name: /select row/i });
    await userEvent.click(checks[0]);
    await expect(canvas.getByRole('row', { selected: true })).toBeVisible();
  },
};

export const MultipleSelect: Story = {
  render: (args) => {
    const data = signal(rows);
    const selection = signal<readonly unknown[]>([]);
    return {
      props: { ...args, data, selection },
      moduleMetadata: { imports: storyImports },
      template: `
        <au-table
          [data]="data()"
          title="Team members"
          description="Multi-select with header checkbox and row checkboxes."
          caption="Team members"
          selectionMode="multiple"
          [(selection)]="selection"
          [striped]="true"
        >
          <au-table-column name="name" header="Name" cellVariant="primary" />
          <au-table-column name="role" header="Role" cellVariant="secondary" />
          <au-table-column name="score" header="Score" align="end" [sortable]="true" />
          <au-table-column name="status" header="Status" align="center">
            <ng-template auTableCell let-row>
              <au-badge
                [variant]="row.status === 'active' ? 'success' : 'warning'"
                [label]="row.status === 'active' ? 'Active' : 'Away'"
              />
            </ng-template>
          </au-table-column>
        </au-table>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectAll = await canvas.findByRole('checkbox', { name: /select all rows/i });
    await userEvent.click(selectAll);
    const rowChecks = await canvas.findAllByRole('checkbox', { name: /^select row$/i });
    await expect(rowChecks[0]).toBeChecked();
    await expect(rowChecks[1]).toBeChecked();
  },
};

export const Empty: Story = {
  render: (args) => ({
    props: { ...args, data: [] as Row[] },
    moduleMetadata: { imports: storyImports },
    template: `
      <au-table
        [data]="data"
        title="Users"
        description="Manage team members."
        caption="Users"
        [striped]="striped"
      >
        <au-table-column name="name" header="Name" cellVariant="primary" />
        <au-table-column name="role" header="Role" cellVariant="secondary" />
        <au-table-column name="score" header="Score" align="end" />
        <au-empty-state
          title="No users yet"
          description="Create your first user to populate this table."
          size="sm"
          [headingLevel]="3"
        >
          <button auButton type="button">Add user</button>
        </au-empty-state>
      </au-table>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByRole('heading', { name: 'No users yet', level: 3 }),
    ).toBeVisible();
    await expect(await canvas.findByRole('button', { name: 'Add user' })).toBeVisible();
  },
};

const manyRows: Row[] = Array.from({ length: 120 }, (_, i) => ({
  name: `Member ${i + 1}`,
  role: i % 2 === 0 ? 'Engineer' : 'Designer',
  score: 70 + (i % 30),
  status: i % 3 === 0 ? 'away' : 'active',
}));

export const VirtualScroll: Story = {
  args: {
    title: 'Large roster',
    description: 'Virtual scroll keeps DOM rows bounded for long datasets.',
  },
  render: (args) => ({
    props: { ...args, data: manyRows },
    moduleMetadata: { imports: storyImports },
    template: `
      <au-table
        [data]="data"
        [title]="title"
        [description]="description"
        caption="Large roster"
        [virtualScroll]="true"
        [rowHeight]="44"
        [viewportHeight]="320"
        [virtualOverscan]="4"
        [striped]="striped"
      >
        <au-table-column name="name" header="Name" [sortable]="true" cellVariant="primary" />
        <au-table-column name="role" header="Role" cellVariant="secondary" />
        <au-table-column name="score" header="Score" align="end" [sortable]="true" />
        <au-table-column name="status" header="Status" align="center" />
      </au-table>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByRole('heading', { name: 'Large roster' })).toBeVisible();
    const rows = await canvas.findAllByRole('row');
    expect(rows.length).toBeLessThan(120);
  },
};

export const Paginated: Story = {
  args: {
    title: 'Team members',
    description: 'Client pagination slices the sorted dataset in the footer.',
  },
  render: (args) => {
    const data = signal(manyRows);
    const page = signal(1);
    const sort = signal<AuTableSortState | null>(null);
    return {
      props: { ...args, data, page, sort },
      moduleMetadata: { imports: storyImports },
      template: `
        <au-table
          [data]="data()"
          [title]="title"
          [description]="description"
          caption="Team members"
          [paginated]="true"
          [pageSize]="10"
          [(page)]="page"
          [(sort)]="sort"
          [striped]="striped"
        >
          <au-table-column name="name" header="Name" [sortable]="true" cellVariant="primary" />
          <au-table-column name="role" header="Role" cellVariant="secondary" />
          <au-table-column name="score" header="Score" align="end" [sortable]="true" />
          <au-table-column name="status" header="Status" align="center" />
        </au-table>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByRole('navigation', { name: /pagination/i })).toBeVisible();
    const page2 = await canvas.findByRole('button', { name: 'Page 2' });
    await userEvent.click(page2);
    await expect(await canvas.findByRole('cell', { name: 'Member 11' })).toBeVisible();
  },
};

export const ServerPaginated: Story = {
  args: {
    title: 'Server-backed pages',
    description: 'Pass the current page slice in data and totalRows for server pagination.',
    clientSort: false,
    striped: true,
  },
  render: (args) => ({
    props: { ...args },
    moduleMetadata: { imports: [ServerPaginatedDemo, ...storyImports] },
    template: `<server-paginated-table-demo [striped]="striped" />`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page3 = await canvas.findByRole('button', { name: 'Page 3' });
    await userEvent.click(page3);
    await expect(await canvas.findByRole('cell', { name: 'Member 21' })).toBeVisible();
  },
};

@Component({
  selector: 'server-paginated-table-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTable, AuTableColumn],
  template: `
    <au-table
      [data]="data()"
      title="Server-backed pages"
      description="Pass the current page slice in data and totalRows for server pagination."
      caption="Server-backed pages"
      [paginated]="true"
      [pageSize]="pageSize"
      [totalRows]="totalRows"
      [clientSort]="false"
      [(page)]="page"
      [striped]="striped()"
    >
      <au-table-column name="name" header="Name" cellVariant="primary" />
      <au-table-column name="role" header="Role" cellVariant="secondary" />
      <au-table-column name="score" header="Score" align="end" />
      <au-table-column name="status" header="Status" align="center" />
    </au-table>
  `,
})
class ServerPaginatedDemo {
  readonly striped = input(false);
  readonly page = signal(1);
  readonly pageSize = 10;
  readonly totalRows = manyRows.length;
  readonly data = computed(() =>
    manyRows.slice((this.page() - 1) * this.pageSize, this.page() * this.pageSize),
  );
}
