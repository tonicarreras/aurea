import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';

import { AuCheckbox } from '../checkbox/checkbox';
import { AuIcon } from '../icon/icon';
import { AuSpinner } from '../spinner/spinner';
import { AuTableColumn } from './au-table-column';
import type { AuTableSelectionMode, AuTableSortDirection, AuTableSortState } from './table-types';

export type {
  AuTableAlign,
  AuTableCellVariant,
  AuTableSelectionMode,
  AuTableSortDirection,
  AuTableSortState,
} from './table-types';

/**
 * Data table with column definitions (`au-table-column`), Material-style.
 */
@Component({
  selector: 'au-table',
  templateUrl: './table.html',
  styleUrl: './table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [AuCheckbox, AuIcon, AuSpinner, NgTemplateOutlet],
  host: {
    class: 'au-table',
    '[attr.data-au-striped]': 'striped() ? "" : null',
    '[attr.data-au-compact]': 'compact() ? "" : null',
    '[attr.data-au-sticky-header]': 'stickyHeader() ? "" : null',
    '[attr.data-au-loading]': 'loading() ? "" : null',
    '[attr.data-au-selection]': 'selectionMode() !== "none" ? selectionMode() : null',
    '[attr.aria-busy]': 'loading() ? "true" : null',
  },
})
export class AuTable {
  private readonly columnRegistry = signal<readonly AuTableColumn[]>([]);

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
  readonly clientSort = input(true);
  readonly sortChange = output<AuTableSortState | null>();
  readonly trackByFn = input<((index: number, row: unknown) => unknown) | undefined>(undefined);

  /** Row selection: `none`, one row (`single`), or many (`multiple`). */
  readonly selectionMode = input<AuTableSelectionMode>('none');
  /** Selected row objects (0–1 item when `selectionMode` is `single`). */
  readonly selection = model<readonly unknown[]>([]);
  readonly selectionChange = output<readonly unknown[]>();
  /** Equality for matching rows in `selection`. */
  readonly compareSelection = input<(a: unknown, b: unknown) => boolean>((a, b) => a === b);
  readonly selectAllLabel = input('Select all rows');
  readonly selectRowLabel = input('Select row');

  readonly columns = computed(() => this.columnRegistry());

  readonly viewRows = computed(() => {
    const rows = this.data();
    const state = this.sort();
    if (!this.clientSort() || !state?.direction) {
      return rows;
    }
    const col = this.columns().find((c) => c.name() === state.column);
    if (!col) {
      return rows;
    }
    const dir = state.direction === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => dir * this.compareRows(col, a, b));
  });

  readonly columnSpan = computed(() => {
    const count = this.columns().length;
    return this.selectionMode() === 'none' ? count : count + 1;
  });

  registerColumn(column: AuTableColumn): void {
    this.columnRegistry.update((list) => (list.includes(column) ? list : [...list, column]));
  }

  unregisterColumn(column: AuTableColumn): void {
    this.columnRegistry.update((list) => list.filter((c) => c !== column));
  }

  protected trackRow(index: number, row: unknown): unknown {
    const trackBy = this.trackByFn();
    return trackBy ? trackBy(index, row) : index;
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
    if (!col.sortable()) {
      return null;
    }
    const dir = this.columnSortDirection(col.name());
    if (dir === 'asc') {
      return 'ascending';
    }
    if (dir === 'desc') {
      return 'descending';
    }
    return 'none';
  }

  protected columnSortDirection(column: string): AuTableSortDirection {
    const state = this.sort();
    if (!state || state.column !== column) {
      return null;
    }
    return state.direction;
  }

  protected toggleSort(column: string): void {
    const current = this.sort();
    let next: AuTableSortState | null;
    if (!current || current.column !== column) {
      next = { column, direction: 'asc' };
    } else if (current.direction === 'asc') {
      next = { column, direction: 'desc' };
    } else if (current.direction === 'desc') {
      next = null;
    } else {
      next = { column, direction: 'asc' };
    }
    this.sort.set(next);
    this.sortChange.emit(next);
  }

  protected isRowSelected(row: unknown): boolean {
    const compare = this.compareSelection();
    return this.selection().some((selected) => compare(selected, row));
  }

  protected selectAllChecked(): boolean {
    const rows = this.viewRows();
    if (rows.length === 0) {
      return false;
    }
    return rows.every((row) => this.isRowSelected(row));
  }

  protected selectAllIndeterminate(): boolean {
    const rows = this.viewRows();
    const selectedCount = rows.filter((row) => this.isRowSelected(row)).length;
    return selectedCount > 0 && selectedCount < rows.length;
  }

  protected setSelectAll(checked: boolean): void {
    if (this.selectionMode() !== 'multiple') {
      return;
    }
    const rows = this.viewRows();
    this.setSelection(checked ? [...rows] : []);
  }

  protected setRowSelected(row: unknown, checked: boolean): void {
    const mode = this.selectionMode();
    if (mode === 'none') {
      return;
    }

    const current = this.selection();
    const compare = this.compareSelection();
    const isSelected = current.some((selected) => compare(selected, row));

    if (checked) {
      if (isSelected) {
        return;
      }
      if (mode === 'single') {
        this.setSelection([row]);
      } else {
        this.setSelection([...current, row]);
      }
      return;
    }

    if (isSelected) {
      this.setSelection(current.filter((selected) => !compare(selected, row)));
    }
  }

  protected toggleRowSelection(row: unknown): void {
    this.setRowSelected(row, !this.isRowSelected(row));
  }

  protected onRowClick(row: unknown, event: MouseEvent): void {
    if (this.selectionMode() === 'none') {
      return;
    }
    const target = event.target as HTMLElement;
    if (target.closest('button, a, input, select, textarea, label, [role="button"], au-checkbox')) {
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
    return this.cellText(this.readCell(col, row));
  }

  private setSelection(next: readonly unknown[]): void {
    this.selection.set(next);
    this.selectionChange.emit(next);
  }

  private cellText(value: unknown): string {
    if (value == null) {
      return '';
    }
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      typeof value === 'bigint'
    ) {
      return String(value);
    }
    return JSON.stringify(value);
  }

  private readCell(col: AuTableColumn, row: unknown): unknown {
    const accessor = col.accessor();
    if (accessor) {
      return accessor(row);
    }
    if (row && typeof row === 'object') {
      return (row as Record<string, unknown>)[col.name()];
    }
    return undefined;
  }

  private compareRows(col: AuTableColumn, a: unknown, b: unknown): number {
    const left = this.readCell(col, a);
    const right = this.readCell(col, b);
    if (typeof left === 'number' && typeof right === 'number') {
      return left - right;
    }
    return this.cellText(left).localeCompare(this.cellText(right), undefined, {
      numeric: true,
    });
  }
}
