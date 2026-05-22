import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export type AuTableSortDirection = 'asc' | 'desc' | null;

/**
 * Styled data table wrapper. Use native `<table>` semantics inside projected content.
 */
@Component({
  selector: 'au-table',
  templateUrl: './table.html',
  styleUrl: './table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-table',
    '[attr.data-au-striped]': 'striped() ? "" : null',
    '[attr.data-au-compact]': 'compact() ? "" : null',
  },
})
export class AuTable {
  readonly striped = input(false);
  readonly compact = input(false);
}

/**
 * Sortable column header cell — emits when the user activates sort.
 */
@Component({
  selector: 'th[auTableSortHeader]',
  template: `<button
    type="button"
    class="au-table__sort-btn"
    [attr.aria-sort]="ariaSort()"
    (click)="onSort()"
  >
    <ng-content />
    <span
      class="au-table__sort-icon"
      aria-hidden="true"
      >{{ sortIcon() }}</span
    >
  </button>`,
  styleUrl: './table-sort-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-table__sort-header',
    scope: 'col',
  },
})
export class AuTableSortHeader {
  readonly sortDirection = input<AuTableSortDirection>(null);
  readonly sort = output<AuTableSortDirection>();

  readonly ariaSort = computed(() => {
    const d = this.sortDirection();
    if (d === 'asc') {
      return 'ascending';
    }
    if (d === 'desc') {
      return 'descending';
    }
    return 'none';
  });

  readonly sortIcon = computed(() => {
    const d = this.sortDirection();
    if (d === 'asc') {
      return '↑';
    }
    if (d === 'desc') {
      return '↓';
    }
    return '↕';
  });

  protected onSort(): void {
    const current = this.sortDirection();
    const next: AuTableSortDirection =
      current === null ? 'asc' : current === 'asc' ? 'desc' : null;
    this.sort.emit(next);
  }
}
