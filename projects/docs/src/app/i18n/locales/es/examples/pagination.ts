import { PaginationDemo } from '../../../../demos/previews/pagination.preview';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Listado paginado',
    demoComponent: PaginationDemo,
    code: `import { AuPagination } from '@aurea-design-system/components';

<au-pagination [page]="page()" [pageCount]="12" (pageChange)="page.set($event)" />`,
  },
];
