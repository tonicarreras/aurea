import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Full-bleed media region projected into `au-card`.
 *
 * Declared as `Component` (not `Directive`) to support scoped styles via `styleUrl`,
 * which is not part of the `Directive` TS type even though Angular supports it at runtime.
 */
@Component({
  selector: '[auCardMedia]',
  template: '<ng-content />',
  styleUrl: './card-media.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuCardMedia {}
