import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuPagination } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-pagination-many-pages',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuPagination],
  template: `
    <div class="docs-demo-stack">
      <p class="docs-example-caption">{{ t().manyPagesHint }}</p>
      <au-pagination
        [page]="page()"
        [pageCount]="24"
        (pageChange)="page.set($event)"
      />
    </div>
  `,
  styles: `
    .docs-example-caption {
      margin: 0;
      font-size: var(--au-text-sm);
      color: var(--au-color-text-secondary);
    }
  `,
})
export class ExamplePaginationManyPagesDemo {
  readonly t = docsExampleLive('pagination');
  readonly page = signal(12);
}

@Component({
  selector: 'docs-example-pagination-edges',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuPagination],
  template: `
    <div class="docs-demo-row">
      <au-pagination
        [page]="firstPage()"
        [pageCount]="8"
        (pageChange)="firstPage.set($event)"
      />
      <au-pagination
        [page]="lastPage()"
        [pageCount]="8"
        (pageChange)="lastPage.set($event)"
      />
    </div>
  `,
})
export class ExamplePaginationEdgesDemo {
  readonly t = docsExampleLive('pagination');
  readonly firstPage = signal(1);
  readonly lastPage = signal(8);
}

@Component({
  selector: 'docs-example-pagination-disabled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuPagination],
  template: `
    <au-pagination
      [page]="3"
      [pageCount]="8"
      [disabled]="true"
    />
  `,
})
export class ExamplePaginationDisabledDemo {
  readonly t = docsExampleLive('pagination');
}
