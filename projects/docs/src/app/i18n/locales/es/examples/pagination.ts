import { PaginationDemo } from '../../../../demos/previews/pagination.preview';
import {
  ExamplePaginationDisabledDemo,
  ExamplePaginationEdgesDemo,
  ExamplePaginationManyPagesDemo,
} from '../../../../demos/examples/pagination.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Lista paginada',
    demoComponent: PaginationDemo,
    code: `import { AuPagination } from '@aurea-design-system/components';

<au-pagination [page]="page()" [pageCount]="12" (pageChange)="page.set($event)" />`,
  },
  {
    title: 'Muchas páginas',
    description: 'Con más de siete páginas, los puntos suspensivos comprimen la tira de números.',
    demoComponent: ExamplePaginationManyPagesDemo,
    code: `<au-pagination [page]="page()" [pageCount]="24" (pageChange)="page.set($event)" />`,
  },
  {
    title: 'Primera y última página',
    description: 'Anterior/siguiente se deshabilitan en los extremos; los números se acotan a `[1, pageCount]`.',
    demoComponent: ExamplePaginationEdgesDemo,
    code: `<au-pagination [page]="1" [pageCount]="8" />
<au-pagination [page]="8" [pageCount]="8" />`,
  },
  {
    title: 'Deshabilitado',
    description: 'Úsalo mientras llegan datos o la lista no está disponible temporalmente.',
    demoComponent: ExamplePaginationDisabledDemo,
    code: `<au-pagination [page]="3" [pageCount]="8" [disabled]="true" />`,
  },
];
