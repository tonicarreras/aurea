import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  model,
  output,
} from '@angular/core';

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
 * Columns are discovered automatically via `contentChildren` — the old
 * `registerColumn` / `unregisterColumn` API has been removed in favour of
 * Angular's built-in content query resolution.
 *
 * Supports client-side sorting, row selection, custom cell templates,
 * striped / compact / sticky-header variants, and `trackByFn`.
 */
@Component({
  selector: 'au-table',
  templateUrl: './table.html',
  styleUrl: './table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: {
    class: 'au-table',
    '[attr.data-au-striped]': 'striped() ? "" : null',
    '[attr.data-au-compact]': 'compact() ? "" : null',
    '[attr.data-au-sticky-header]': 'stickyHeader() ? "" : null',
  },
})
export class AuTable {
  /** Row data rendered in the table body. */
  readonly data = input.required<readonly unknown[]>();
  readonly title = input('');
  readonly description = input('');
  readonly caption = input('');
  readonly striped = input(false);
  readonly compact = input(false);
  readonly stickyHeader = input(false);
  readonly emptyMessage = input('No data');

  /** Client-side sort state; two-way binding with `[(sort)]`. */
  readonly sort = model<AuTableSortState | null>(null);
  readonly clientSort = input(true);

  /** Optional identity function — enables stable selection across data re-creations. */
  readonly trackByFn = input<((index: number, row: unknown) => unknown) | undefined>(undefined);

  // ── Row selection ──────────────────────────────────────────────────────────

  /** Selection behavior. `single` (default) toggles one row, `multiple` keeps a set. */
  readonly selectionMode = input<AuTableSelectionMode>('single');

  /** Currently selected row (`null` = none). Two-way binding with `[(selectedRow)]`. */
  readonly selectedRow = model<unknown>(null);
  /** Selected rows for `multiple` mode. Two-way binding with `[(selectedRows)]`. */
  readonly selectedRows = model<readonly unknown[]>([]);

  /** Emits the clicked row on every click regardless of selection state. */
  readonly rowClick = output<unknown>();

  /** Identity function for row comparison. Defaults to reference equality (`===`). */
  readonly rowIdentity = input<((row: unknown) => unknown) | undefined>(undefined);

  // ── Columns ────────────────────────────────────────────────────────────────

  /** Columns discovered via `contentChildren` — no manual registration needed. */
  readonly columns = contentChildren(AuTableColumn, { descendants: false });

  // ── Client sort ────────────────────────────────────────────────────────────

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

  // ── Selection helpers ──────────────────────────────────────────────────────

  protected isRowSelected(row: unknown): boolean {
    if (this.selectionMode() === 'multiple') {
      return this.selectedRows().some((selected) => this.sameRow(selected, row));
    }
    const selected = this.selectedRow();
    return selected != null && this.sameRow(selected, row);
  }

  protected handleRowClick(row: unknown): void {
    this.rowClick.emit(row);
    if (this.selectionMode() === 'multiple') {
      const current = this.selectedRows();
      const alreadySelected = current.some((selected) => this.sameRow(selected, row));
      const next = alreadySelected
        ? current.filter((selected) => !this.sameRow(selected, row))
        : [...current, row];
      this.selectedRows.set(next);
      this.selectedRow.set(next[0] ?? null);
      return;
    }

    const current = this.selectedRow();
    const isSame = current != null && this.sameRow(current, row);
    const next = isSame ? null : row;
    this.selectedRow.set(next);
    this.selectedRows.set(next == null ? [] : [next]);
  }

  protected handleRowKeydown(event: KeyboardEvent, row: unknown): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleRowClick(row);
    }
  }

  // ── Templates ──────────────────────────────────────────────────────────────

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

  // ── Sort internals ─────────────────────────────────────────────────────────

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
  }

  protected cellContext(row: unknown): { $implicit: unknown; row: unknown } {
    return { $implicit: row, row };
  }

  protected formatCell(col: AuTableColumn, row: unknown): string {
    return this.cellText(this.readCell(col, row));
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
      const key = col.name();
      const obj = row as Record<string, unknown>;
      // Support nested keys like "address.city"
      if (key.includes('.')) {
        let cursor: unknown = obj;
        for (const part of key.split('.')) {
          if (cursor == null || typeof cursor !== 'object') return undefined;
          cursor = (cursor as Record<string, unknown>)[part];
        }
        return cursor;
      }
      return obj[key];
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

  private sameRow(a: unknown, b: unknown): boolean {
    const id = this.rowIdentity();
    return id ? id(a) === id(b) : a === b;
  }
}
