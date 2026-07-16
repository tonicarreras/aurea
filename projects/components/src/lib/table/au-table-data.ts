import type { AuTableSelectionMode, AuTableSortDirection, AuTableSortState } from './table-types';

/** Column slice used by headless table helpers (no Angular component coupling). */
export interface AuTableColumnReader {
  readonly name: string;
  readonly accessor?: (row: unknown) => unknown;
  readonly sortable?: boolean;
}

export interface AuTableVirtualWindow {
  readonly startIndex: number;
  readonly endIndex: number;
  readonly topSpacerPx: number;
  readonly bottomSpacerPx: number;
  readonly visibleRows: readonly unknown[];
}

export function formatTableCellText(value: unknown): string {
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

export function readTableCell(col: AuTableColumnReader, row: unknown): unknown {
  if (col.accessor) {
    return col.accessor(row);
  }
  if (row && typeof row === 'object') {
    return (row as Record<string, unknown>)[col.name];
  }
  return undefined;
}

export function compareTableRows(col: AuTableColumnReader, a: unknown, b: unknown): number {
  const left = readTableCell(col, a);
  const right = readTableCell(col, b);
  if (typeof left === 'number' && typeof right === 'number') {
    return left - right;
  }
  return formatTableCellText(left).localeCompare(formatTableCellText(right), undefined, {
    numeric: true,
  });
}

export function sortTableRows<T>(
  rows: readonly T[],
  col: AuTableColumnReader,
  direction: Exclude<AuTableSortDirection, null>,
): T[] {
  const dir = direction === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => dir * compareTableRows(col, a, b));
}

export function resolveTableViewRows<T>(
  rows: readonly T[],
  columns: readonly AuTableColumnReader[],
  sort: AuTableSortState | null,
  clientSort: boolean,
): readonly T[] {
  if (!clientSort || !sort?.direction) {
    return rows;
  }
  const col = columns.find((c) => c.name === sort.column);
  if (!col) {
    return rows;
  }
  return sortTableRows(rows, col, sort.direction);
}

/** Total rows for pagination (explicit server total or local row count). */
export function resolveTableTotalRows(rowCount: number, totalRows?: number): number {
  return totalRows ?? rowCount;
}

export function tablePageCount(totalRows: number, pageSize: number): number {
  const size = Math.max(1, pageSize);
  return Math.max(1, Math.ceil(Math.max(0, totalRows) / size));
}

/** Slice rows for the active page (client pagination). */
export function resolveTablePaginatedRows<T>(
  rows: readonly T[],
  page: number,
  pageSize: number,
): readonly T[] {
  const size = Math.max(1, pageSize);
  const safePage = Math.min(Math.max(1, page), tablePageCount(rows.length, size));
  const start = (safePage - 1) * size;
  return rows.slice(start, start + size);
}

export function resolveTableVirtualWindow(
  rows: readonly unknown[],
  scrollTop: number,
  viewportHeight: number,
  rowHeight: number,
  overscan: number,
): AuTableVirtualWindow {
  const total = rows.length;
  const safeRowHeight = Math.max(1, rowHeight);
  const safeViewport = Math.max(0, viewportHeight);
  if (total === 0) {
    return {
      startIndex: 0,
      endIndex: 0,
      topSpacerPx: 0,
      bottomSpacerPx: 0,
      visibleRows: [],
    };
  }
  const startIndex = Math.max(0, Math.floor(scrollTop / safeRowHeight) - Math.max(0, overscan));
  const visibleCount = Math.ceil(safeViewport / safeRowHeight) + Math.max(0, overscan) * 2;
  const endIndex = Math.min(total, startIndex + visibleCount);
  return {
    startIndex,
    endIndex,
    topSpacerPx: startIndex * safeRowHeight,
    bottomSpacerPx: (total - endIndex) * safeRowHeight,
    visibleRows: rows.slice(startIndex, endIndex),
  };
}

export function createTableSelectionLookup(
  selection: readonly unknown[],
  compare: (a: unknown, b: unknown) => boolean,
): (row: unknown) => boolean {
  if (selection.length === 0) {
    return () => false;
  }
  const identity = new Set(selection);
  return (row) => identity.has(row) || selection.some((selected) => compare(selected, row));
}

export function toggleTableSortState(
  current: AuTableSortState | null,
  column: string,
): AuTableSortState | null {
  if (!current || current.column !== column) {
    return { column, direction: 'asc' };
  }
  if (current.direction === 'asc') {
    return { column, direction: 'desc' };
  }
  if (current.direction === 'desc') {
    return null;
  }
  return { column, direction: 'asc' };
}

export function tableColumnSortDirection(
  sort: AuTableSortState | null,
  column: string,
): AuTableSortDirection {
  if (!sort || sort.column !== column) {
    return null;
  }
  return sort.direction;
}

export function tableHeaderAriaSort(
  col: AuTableColumnReader,
  sort: AuTableSortState | null,
): string | null {
  if (!col.sortable) {
    return null;
  }
  const dir = tableColumnSortDirection(sort, col.name);
  if (dir === 'asc') {
    return 'ascending';
  }
  if (dir === 'desc') {
    return 'descending';
  }
  return 'none';
}

export function tableColumnSpan(columnCount: number, selectionMode: AuTableSelectionMode): number {
  return selectionMode === 'none' ? columnCount : columnCount + 1;
}

export function isTableRowSelected(
  row: unknown,
  selection: readonly unknown[],
  compare: (a: unknown, b: unknown) => boolean,
): boolean {
  return selection.some((selected) => compare(selected, row));
}

export function tableSelectAllChecked(
  rows: readonly unknown[],
  selection: readonly unknown[],
  compare: (a: unknown, b: unknown) => boolean,
): boolean {
  if (rows.length === 0) {
    return false;
  }
  return rows.every((row) => isTableRowSelected(row, selection, compare));
}

export function tableSelectAllIndeterminate(
  rows: readonly unknown[],
  selection: readonly unknown[],
  compare: (a: unknown, b: unknown) => boolean,
): boolean {
  const selectedCount = rows.filter((row) => isTableRowSelected(row, selection, compare)).length;
  return selectedCount > 0 && selectedCount < rows.length;
}

export function nextTableRowSelection(
  mode: AuTableSelectionMode,
  row: unknown,
  checked: boolean,
  current: readonly unknown[],
  compare: (a: unknown, b: unknown) => boolean,
): readonly unknown[] {
  if (mode === 'none') {
    return current;
  }

  const isSelected = current.some((selected) => compare(selected, row));

  if (checked) {
    if (isSelected) {
      return current;
    }
    return mode === 'single' ? [row] : [...current, row];
  }

  if (!isSelected) {
    return current;
  }
  return current.filter((selected) => !compare(selected, row));
}

export function nextTableSelectAllSelection(
  mode: AuTableSelectionMode,
  checked: boolean,
  rows: readonly unknown[],
): readonly unknown[] {
  if (mode !== 'multiple') {
    return [];
  }
  return checked ? [...rows] : [];
}

/** Ignore row clicks that originate from interactive descendants. */
export function shouldIgnoreTableRowClick(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  return !!target.closest(
    'button, a, input, select, textarea, label, dialog, [role="button"], [role="combobox"], [role="listbox"], [role="option"], input[auCheckbox], .au-field-listbox, au-select, au-menu, au-dialog, au-drawer',
  );
}
