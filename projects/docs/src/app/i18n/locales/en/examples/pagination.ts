import { PaginationDemo } from '../../../../demos/previews/pagination.preview';
import {
  ExamplePaginationDisabledDemo,
  ExamplePaginationEdgesDemo,
  ExamplePaginationManyPagesDemo,
} from '../../../../demos/examples/pagination.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Paged list',
    demoComponent: PaginationDemo,
    code: `import { AuPagination } from '@aurea-design-system/components';

<au-pagination [page]="page()" [pageCount]="12" (pageChange)="page.set($event)" />`,
  },
  {
    title: 'Many pages',
    description: 'When `pageCount` exceeds seven, ellipsis compress the page number strip.',
    demoComponent: ExamplePaginationManyPagesDemo,
    code: `<au-pagination [page]="page()" [pageCount]="24" (pageChange)="page.set($event)" />`,
  },
  {
    title: 'First and last page',
    description: 'Previous/next disable at the boundaries; page numbers clamp to `[1, pageCount]`.',
    demoComponent: ExamplePaginationEdgesDemo,
    code: `<au-pagination [page]="1" [pageCount]="8" />
<au-pagination [page]="8" [pageCount]="8" />`,
  },
  {
    title: 'Disabled',
    description: 'Use while a fetch is in flight or the list is temporarily unavailable.',
    demoComponent: ExamplePaginationDisabledDemo,
    code: `<au-pagination [page]="3" [pageCount]="8" [disabled]="true" />`,
  },
];
