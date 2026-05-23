import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  booleanAttribute,
  contentChild,
  inject,
  input,
} from '@angular/core';

import { AuTableCellDef } from './au-table-cell-def.directive';
import { AuTable } from './table';
import type { AuTableAlign, AuTableCellVariant } from './table-types';

/**
 * Column definition for {@link AuTable}. Project an optional `ng-template[auTableCell]` for custom cells.
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
  private readonly table = inject(AuTable);
  private readonly destroyRef = inject(DestroyRef);

  readonly name = input.required<string>();
  readonly header = input.required<string>();
  readonly sortable = input(false, { transform: booleanAttribute });
  readonly align = input<AuTableAlign>('start');
  readonly cellVariant = input<AuTableCellVariant>('default');
  readonly accessor = input<((row: unknown) => unknown) | undefined>(undefined);

  readonly cellDef = contentChild(AuTableCellDef);

  private readonly registerWhenReady = afterNextRender(() => {
    this.table.registerColumn(this);
  });

  private readonly unregisterOnDestroy = this.destroyRef.onDestroy(() => {
    this.table.unregisterColumn(this);
  });
}
