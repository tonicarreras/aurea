import type { Meta, StoryObj } from '@storybook/angular';
import { signal } from '@angular/core';

import { buildStoryDocsOverview } from '../story-docs/build-story-docs-overview';
import { AuPagination } from './pagination';

const docsOverview = buildStoryDocsOverview({
  overview:
    '`au-pagination` navigates **1-based** pages in tables and lists. Emits **`pageChange`** when the user picks a page; collapses long ranges with ellipses when `pageCount` > 7.',
  whenToUse: {
    use: [
      'Server- or client-paginated tables and card grids',
      'When users need direct jumps to numbered pages',
    ],
    avoid: [
      'Infinite scroll feeds → load-more pattern',
      'Very small lists → show all rows',
    ],
  },
  anatomy: [
    { region: 'Nav landmark', notes: '`role="navigation"`, `aria-label="Pagination"`.' },
    { region: 'Prev / next', notes: '`au-button` ghost controls.' },
    { region: 'Page buttons', notes: 'Numbered pages; current page styled as active.' },
  ],
  accessibility: [
    {
      topic: 'Landmark',
      detail: 'Navigation region with a default accessible name.',
    },
    {
      topic: 'Current page',
      detail: 'Visually distinct; wire `aria-current="page"` in app if you customize buttons.',
    },
  ],
  keyboard: [
    {
      interaction: 'Tab',
      behavior: 'Moves through prev, page numbers, and next.',
    },
    {
      interaction: 'Enter / Space',
      behavior: 'Activates the focused `au-button`.',
    },
  ],
  tokens: [
    { concern: 'Layout', examples: '`--au-space-2`, `--au-text-sm`' },
    { concern: 'Ellipsis', examples: '`--au-color-text-tertiary`' },
  ],
});

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
