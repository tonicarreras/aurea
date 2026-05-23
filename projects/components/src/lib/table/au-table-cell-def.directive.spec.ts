import { describe, expect, it } from 'vitest';

import { AU_TABLE_CELL_DEF, AuTableCellDef } from './au-table-cell-def.directive';

describe('AuTableCellDef', () => {
  it('exports a contentChild token for table columns', () => {
    expect(AU_TABLE_CELL_DEF).toBe(AuTableCellDef);
  });
});
