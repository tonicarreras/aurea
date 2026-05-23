import { Directive, TemplateRef, inject } from '@angular/core';

/** Custom cell template: `ng-template auTableCell let-row`. */
@Directive({
  selector: 'ng-template[auTableCell]',
})
export class AuTableCellDef {
  readonly templateRef = inject(TemplateRef<{ $implicit: unknown; row: unknown }>);
}

/** Token for {@link contentChild} queries on custom table cells. */
export const AU_TABLE_CELL_DEF = AuTableCellDef;
