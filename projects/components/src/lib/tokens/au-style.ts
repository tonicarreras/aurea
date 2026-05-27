import { Directive, input } from '@angular/core';

/**
 * Global Aurea style mode on a container host.
 *
 * - `default`: Aurea default theme/look.
 * - `unstyled`: keeps component behavior/a11y APIs while neutralizing visual skin
 *   when `au-primitives.css` is also imported.
 */
export type AuStyleMode = 'default' | 'unstyled';

@Directive({
  selector: '[auStyle]',
  host: {
    '[attr.data-au-style]': 'auStyle()',
  },
})
export class AuStyleDirective {
  readonly auStyle = input<AuStyleMode>('default');
}
