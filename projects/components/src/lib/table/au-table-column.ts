import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  contentChild,
  input,
} from '@angular/core';

import { AU_TABLE_CELL_DEF } from './au-table-cell-def.directive';
import type { AuTableAlign, AuTableCellVariant } from './table-types';

/**
 * Column definition for {@link AuTable}. Project an optional `ng-template[auTableCell]` for custom cells.
 *
 * Columns are automatically discovered by `AuTable` via `contentChildren` —
 * no manual registration required.
 */
@Component({
  selector: 'au-table-column',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-table__column-def',
    hidden: '',
  },
})
export class AuTableColumn {
  readonly name = input.required<string>();
  readonly header = input.required<string>();
  readonly sortable = input(false, { transform: booleanAttribute });
  readonly align = input<AuTableAlign>('start');
  readonly cellVariant = input<AuTableCellVariant>('default');
  readonly accessor = input<((row: unknown) => unknown) | undefined>(undefined);

  /* v8 ignore start — contentChild token ref is not invoked at runtime */
  readonly cellDef = contentChild(AU_TABLE_CELL_DEF);
  /* v8 ignore stop */
}
