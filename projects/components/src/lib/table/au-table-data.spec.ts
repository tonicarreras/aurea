import { describe, expect, it } from 'vitest';

import {
  compareTableRows,
  formatTableCellText,
  isTableRowSelected,
  nextTableRowSelection,
  nextTableSelectAllSelection,
  readTableCell,
  resolveTableViewRows,
  shouldIgnoreTableRowClick,
  sortTableRows,
  tableColumnSortDirection,
  tableColumnSpan,
  tableHeaderAriaSort,
  tableSelectAllChecked,
  tableSelectAllIndeterminate,
  toggleTableSortState,
} from './au-table-data';

describe('au-table-data', () => {
  const nameCol = { name: 'name' };
  const scoreCol = { name: 'score' };

  it('formats primitive cell values', () => {
    expect(formatTableCellText(null)).toBe('');
    expect(formatTableCellText('a')).toBe('a');
    expect(formatTableCellText(3)).toBe('3');
    expect(formatTableCellText({ x: 1 })).toBe('{"x":1}');
  });

  it('reads cells by accessor or property name', () => {
    expect(
      readTableCell({ name: 'id', accessor: (r) => (r as { id: number }).id }, { id: 2 }),
    ).toBe(2);
    expect(readTableCell(nameCol, { name: 'Ada' })).toBe('Ada');
  });

  it('sorts and compares rows', () => {
    const rows = [{ score: 2 }, { score: 10 }];
    expect(compareTableRows(scoreCol, rows[0], rows[1])).toBeLessThan(0);
    expect(sortTableRows(rows, scoreCol, 'desc').map((r) => r.score)).toEqual([10, 2]);
  });

  it('resolves view rows with client sort', () => {
    const rows = [
      { name: 'b', score: 1 },
      { name: 'a', score: 2 },
    ];
    const sorted = resolveTableViewRows(
      rows,
      [nameCol],
      { column: 'name', direction: 'asc' },
      true,
    );
    expect(sorted.map((r) => r.name)).toEqual(['a', 'b']);
    expect(resolveTableViewRows(rows, [nameCol], { column: 'name', direction: 'asc' }, false)).toBe(
      rows,
    );
  });

  it('toggles sort state', () => {
    expect(toggleTableSortState(null, 'name')).toEqual({ column: 'name', direction: 'asc' });
    expect(toggleTableSortState({ column: 'name', direction: 'asc' }, 'name')).toEqual({
      column: 'name',
      direction: 'desc',
    });
    expect(toggleTableSortState({ column: 'name', direction: 'desc' }, 'name')).toBeNull();
  });

  it('exposes column sort direction and aria-sort', () => {
    expect(tableColumnSortDirection({ column: 'name', direction: 'asc' }, 'name')).toBe('asc');
    expect(
      tableHeaderAriaSort({ name: 'name', sortable: true }, { column: 'name', direction: 'desc' }),
    ).toBe('descending');
    expect(tableHeaderAriaSort({ name: 'name' }, null)).toBeNull();
  });

  it('computes column span', () => {
    expect(tableColumnSpan(3, 'none')).toBe(3);
    expect(tableColumnSpan(3, 'multiple')).toBe(4);
  });

  it('tracks row selection', () => {
    const row = { id: 1 };
    const other = { id: 2 };
    const compare = (a: unknown, b: unknown) =>
      (a as { id: number }).id === (b as { id: number }).id;
    expect(isTableRowSelected(row, [row], compare)).toBe(true);
    expect(tableSelectAllChecked([row, other], [row, other], compare)).toBe(true);
    expect(tableSelectAllIndeterminate([row, other], [row], compare)).toBe(true);
    expect(nextTableRowSelection('single', other, true, [row], compare)).toEqual([other]);
    expect(nextTableSelectAllSelection('multiple', true, [row, other])).toEqual([row, other]);
  });

  it('ignores row clicks from interactive descendants', () => {
    const btn = document.createElement('button');
    document.body.append(btn);
    expect(shouldIgnoreTableRowClick(btn)).toBe(true);
    btn.remove();
    expect(shouldIgnoreTableRowClick(document.createElement('span'))).toBe(false);
    expect(shouldIgnoreTableRowClick(null)).toBe(false);
    expect(shouldIgnoreTableRowClick(document.createTextNode('x'))).toBe(false);
  });
});
