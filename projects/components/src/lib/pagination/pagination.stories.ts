import type { Meta, StoryObj } from '@storybook/angular';
import { getStoryOverview } from '../story-docs/get-story-overview';
import { signal } from '@angular/core';

import { AuPagination } from './pagination';

const docsOverview = getStoryOverview('pagination');

const meta: Meta<AuPagination> = {
  title: 'Aurea/Pagination',
  component: AuPagination,
  tags: ['autodocs', 'au', 'stable'],
  parameters: {
    layout: 'padded',
    docs: {
      extractArgTypes: () => ({}),
      description: { component: docsOverview },
    },
  },
  argTypes: {
    page: {
      control: { type: 'number', min: 1 },
      description: 'Current page (1-based).',
      table: { category: 'State' },
    },
    pageCount: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages.',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables prev, next, and page buttons.',
      table: { category: 'State' },
    },
    pageChange: {
      description: 'Emits the selected page (1-based).',
      table: { category: 'Events' },
    },
  },
  args: { page: 3, pageCount: 12, disabled: false },
};

export default meta;
type Story = StoryObj<AuPagination>;

export const Default: Story = {
  render: (args) => {
    const page = signal(args.page ?? 1);
    return {
      props: { ...args, page, onPage: (p: number) => page.set(p) },
      moduleMetadata: { imports: [AuPagination] },
      template: `<au-pagination [page]="page()" [pageCount]="pageCount" [disabled]="disabled" (pageChange)="onPage($event)" />`,
    };
  },
};
