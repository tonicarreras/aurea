import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuPagination } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuPagination],
  template: `<au-pagination
    [page]="page()"
    [pageCount]="8"
    (pageChange)="page.set($event)"
  />`,
})
export class PaginationDemo {
  readonly page = signal(2);
}
