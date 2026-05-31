import { Directive } from '@angular/core';

/** Marks projected footer actions for `au-dialog` or `au-drawer`. */
@Directive({ selector: '[auDialogFooter], [auDrawerFooter]' })
export class AuDialogFooter {}
