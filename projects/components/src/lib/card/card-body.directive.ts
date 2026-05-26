import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Body copy projected into `au-card`.
 *
 * Declared as `Component` (not `Directive`) to support scoped styles via `styleUrl`,
 * which is not part of the `Directive` TS type even though Angular supports it at runtime.
 */
@Component({
  selector: '[auCardBody]',
  template: '<ng-content />',
  styleUrl: './card-body.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuCardBody {}
