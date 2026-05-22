import type { Meta, StoryObj } from '@storybook/angular';
import { signal } from '@angular/core';

import { AuPagination } from './pagination';

const meta: Meta<AuPagination> = {
  title: 'Aurea/Pagination',
  component: AuPagination,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
    docs: {
      extractArgTypes: () => ({}),
      description: { component: 'Previous/next and numbered page controls (1-based pages).' },
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
