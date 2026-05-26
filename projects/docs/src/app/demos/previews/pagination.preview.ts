import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuPagination } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuPagination],
  template: `
    <div class="docs-preview docs-preview--inline">
      <au-pagination
        [page]="page()"
        [pageCount]="8"
        (pageChange)="page.set($event)"
      />
    </div>
  `,
})
export class PaginationDemo {
  readonly page = signal(2);
}
