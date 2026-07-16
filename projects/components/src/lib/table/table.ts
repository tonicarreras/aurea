import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  signal,
  untracked,
} from '@angular/core';

import { AuCheckbox } from '../checkbox/au-checkbox.directive';
import { AuIcon } from '../icon/icon';
import { AuPagination } from '../pagination/pagination';
import { AuSpinner } from '../spinner/spinner';
import {
  createTableSelectionLookup,
  formatTableCellText,
  nextTableRowSelection,
  nextTableSelectAllSelection,
  readTableCell,
  resolveTablePaginatedRows,
  resolveTableTotalRows,
  resolveTableViewRows,
  resolveTableVirtualWindow,
  shouldIgnoreTableRowClick,
  tableColumnSortDirection,
  tableColumnSpan,
  tableHeaderAriaSort,
  tablePageCount,
  tableSelectAllChecked,
  tableSelectAllIndeterminate,
  toggleTableSortState,
  type AuTableColumnReader,
} from './au-table-data';
import { AuTableColumn } from './au-table-column';
import type { AuTableSelectionMode, AuTableSortDirection, AuTableSortState } from './table-types';

export type {
  AuTableAlign,
  AuTableCellVariant,
  AuTableSelectionMode,
  AuTableSortDirection,
  AuTableSortState,
} from './table-types';

export type { AuTableColumnReader, AuTableVirtualWindow } from './au-table-data';
export {
  compareTableRows,
  createTableSelectionLookup,
  formatTableCellText,
  isTableRowSelected,
  nextTableRowSelection,
  nextTableSelectAllSelection,
  readTableCell,
  resolveTablePaginatedRows,
  resolveTableTotalRows,
  resolveTableViewRows,
  resolveTableVirtualWindow,
  shouldIgnoreTableRowClick,
  sortTableRows,
  tableColumnSortDirection,
  tableColumnSpan,
  tableHeaderAriaSort,
  tablePageCount,
  tableSelectAllChecked,
  tableSelectAllIndeterminate,
  toggleTableSortState,
} from './au-table-data';

/**
 * Data table with column definitions (`au-table-column`).
 * Sort/selection logic lives in {@link ./au-table-data} (headless helpers).
 */
@Component({
  selector: 'au-table',
  templateUrl: './table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCheckbox, AuIcon, AuPagination, AuSpinner, NgTemplateOutlet],
  host: {
    class: 'au-table',
    '[attr.data-au-striped]': 'striped() ? "" : null',
    '[attr.data-au-compact]': 'compact() ? "" : null',
    '[attr.data-au-sticky-header]': 'stickyHeader() ? "" : null',
    '[attr.data-au-loading]': 'loading() ? "" : null',
    '[attr.data-au-virtual]': 'virtualScroll() ? "" : null',
    '[attr.data-au-paginated]': 'paginated() ? "" : null',
    '[attr.data-au-selection]': 'selectionMode() !== "none" ? selectionMode() : null',
    '[attr.aria-busy]': 'loading() ? "true" : null',
  },
})
export class AuTable {
  private readonly columnRegistry = signal<readonly AuTableColumn[]>([]);
  private readonly scrollTop = signal(0);

  /** Row data rendered in the table body. */
  readonly data = input.required<readonly unknown[]>();
  readonly title = input('');
  readonly description = input('');
  readonly caption = input('');
  readonly striped = input(false);
  readonly compact = input(false);
  readonly stickyHeader = input(false);
  readonly loading = input(false);
  readonly loadingMessage = input('Loading…');
  readonly emptyMessage = input('No data');
  readonly sort = model<AuTableSortState | null>(null);
  /** When false, `data` order is preserved and `sort` is emitted for server-side sorting. */
  readonly clientSort = input(true);
  readonly trackByFn = input<((index: number, row: unknown) => unknown) | undefined>(undefined);

  /** Render only visible rows inside a fixed-height scroll viewport. */
  readonly virtualScroll = input(false);
  /** Uniform row height (px) required for virtual scroll. */
  readonly rowHeight = input(44);
  /** Scroll viewport height (px) when `virtualScroll` is true. */
  readonly viewportHeight = input(400);
  /** Extra rows rendered above/below the viewport while virtual scrolling. */
  readonly virtualOverscan = input(3);

  /** Show pagination footer and slice rows per page. */
  readonly paginated = input(false);
  /** Active page (1-based). */
  readonly page = model(1);
  /** Rows per page for client pagination. */
  readonly pageSize = input(25);
  /**
   * Total row count for server pagination.
   * When set, `data` is treated as the current page slice from the server.
   */
  readonly totalRows = input<number | undefined>(undefined);

  /** Row selection: `none`, one row (`single`), or many (`multiple`). */
  readonly selectionMode = input<AuTableSelectionMode>('none');
  /** Selected row objects (0–1 item when `selectionMode` is `single`). */
  readonly selection = model<readonly unknown[]>([]);
  /** Equality for matching rows in `selection`. */
  readonly compareSelection = input<(a: unknown, b: unknown) => boolean>((a, b) => a === b);
  readonly selectAllLabel = input('Select all rows');
  readonly selectRowLabel = input('Select row');

  readonly columns = computed(() => this.columnRegistry());

  private readonly columnReaders = computed((): readonly AuTableColumnReader[] =>
    this.columns().map((col) => ({
      name: col.name(),
      accessor: col.accessor(),
      sortable: col.sortable(),
    })),
  );

  readonly viewRows = computed(() =>
    resolveTableViewRows(this.data(), this.columnReaders(), this.sort(), this.clientSort()),
  );

  readonly totalRowCount = computed(() =>
    resolveTableTotalRows(this.viewRows().length, this.totalRows()),
  );

  readonly pageCount = computed(() => {
    if (!this.paginated()) {
      return 1;
    }
    return tablePageCount(this.totalRowCount(), this.pageSize());
  });

  readonly paginatedRows = computed(() => {
    if (!this.paginated()) {
      return this.viewRows();
    }
    if (this.totalRows() !== undefined) {
      return this.viewRows();
    }
    return resolveTablePaginatedRows(this.viewRows(), this.page(), this.pageSize());
  });

  readonly virtualWindow = computed(() => {
    if (!this.virtualScroll()) {
      return {
        startIndex: 0,
        endIndex: this.paginatedRows().length,
        topSpacerPx: 0,
        bottomSpacerPx: 0,
        visibleRows: this.paginatedRows(),
      };
    }
    return resolveTableVirtualWindow(
      this.paginatedRows(),
      this.scrollTop(),
      this.viewportHeight(),
      this.rowHeight(),
      this.virtualOverscan(),
    );
  });

  readonly bodyRows = computed(() => this.virtualWindow().visibleRows);

  readonly virtualTopSpacer = computed(() => this.virtualWindow().topSpacerPx);
  readonly virtualBottomSpacer = computed(() => this.virtualWindow().bottomSpacerPx);

  readonly selectionLookup = computed(() =>
    createTableSelectionLookup(this.selection(), this.compareSelection()),
  );

  readonly columnSpan = computed(() =>
    tableColumnSpan(this.columns().length, this.selectionMode()),
  );

  constructor() {
    effect(() => {
      this.data();
      this.sort();
      this.page();
      this.paginated();
      this.virtualScroll();
      untracked(() => {
        if (this.scrollTop() !== 0) {
          this.scrollTop.set(0);
        }
      });
    });

    effect(() => {
      const count = this.pageCount();
      untracked(() => {
        if (this.page() > count) {
          this.page.set(count);
        }
      });
    });
  }

  registerColumn(column: AuTableColumn): void {
    this.columnRegistry.update((list) => (list.includes(column) ? list : [...list, column]));
  }

  unregisterColumn(column: AuTableColumn): void {
    this.columnRegistry.update((list) => list.filter((c) => c !== column));
  }

  protected onScroll(event: Event): void {
    if (!this.virtualScroll()) {
      return;
    }
    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    this.scrollTop.set(target.scrollTop);
  }

  protected onPageChange(next: number): void {
    this.page.set(next);
  }

  protected trackRow(index: number, row: unknown): unknown {
    const trackBy = this.trackByFn();
    const baseIndex = this.virtualWindow().startIndex + index;
    return trackBy ? trackBy(baseIndex, row) : baseIndex;
  }

  protected headerClasses(col: AuTableColumn): string {
    const align = col.align();
    return [
      'au-table__header-cell',
      align === 'end' ? 'au-table__header-cell--end' : '',
      align === 'center' ? 'au-table__header-cell--center' : '',
      this.columnSortDirection(col.name()) ? 'au-table__header-cell--sorted' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected cellClasses(col: AuTableColumn): string {
    const align = col.align();
    const variant = col.cellVariant();
    return [
      'au-table__cell',
      align === 'end' ? 'au-table__cell--end' : '',
      align === 'center' ? 'au-table__cell--center' : '',
      variant === 'primary' ? 'au-table__cell--primary' : '',
      variant === 'secondary' ? 'au-table__cell--secondary' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected rowClasses(row: unknown): string {
    return [
      'au-table__row',
      this.selectionMode() !== 'none' ? 'au-table__row--selectable' : '',
      this.isRowSelected(row) ? 'au-table__row--selected' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected headerAriaSort(col: AuTableColumn): string | null {
    return tableHeaderAriaSort({ name: col.name(), sortable: col.sortable() }, this.sort());
  }

  protected columnSortDirection(column: string): AuTableSortDirection {
    return tableColumnSortDirection(this.sort(), column);
  }

  protected toggleSort(column: string): void {
    this.sort.set(toggleTableSortState(this.sort(), column));
  }

  protected isRowSelected(row: unknown): boolean {
    return this.selectionLookup()(row);
  }

  protected selectAllChecked(): boolean {
    return tableSelectAllChecked(
      this.paginatedRows(),
      this.selection(),
      this.compareSelection(),
    );
  }

  protected selectAllIndeterminate(): boolean {
    return tableSelectAllIndeterminate(
      this.paginatedRows(),
      this.selection(),
      this.compareSelection(),
    );
  }

  protected setSelectAll(checked: boolean): void {
    this.selection.set(
      nextTableSelectAllSelection(this.selectionMode(), checked, this.paginatedRows()),
    );
  }

  protected setRowSelected(row: unknown, checked: boolean): void {
    this.selection.set(
      nextTableRowSelection(
        this.selectionMode(),
        row,
        checked,
        this.selection(),
        this.compareSelection(),
      ),
    );
  }

  protected toggleRowSelection(row: unknown): void {
    this.setRowSelected(row, !this.isRowSelected(row));
  }

  protected onRowClick(row: unknown, event: MouseEvent): void {
    if (this.selectionMode() === 'none' || shouldIgnoreTableRowClick(event.target)) {
      return;
    }
    this.toggleRowSelection(row);
  }

  protected rowAriaSelected(row: unknown): 'true' | 'false' | null {
    return this.selectionMode() === 'none' ? null : this.isRowSelected(row) ? 'true' : 'false';
  }

  protected cellContext(row: unknown): { $implicit: unknown; row: unknown } {
    return { $implicit: row, row };
  }

  protected formatCell(col: AuTableColumn, row: unknown): string {
    return formatTableCellText(readTableCell({ name: col.name(), accessor: col.accessor() }, row));
  }
}
