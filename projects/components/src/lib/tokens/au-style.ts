import { Directive, input } from '@angular/core';

/**
 * Global Aurea style mode on a container host.
 *
 * - `default`: Aurea default (Apple-monochrome) theme from `au-primitives.css`.
 * - `unstyled`: keeps component behavior/a11y APIs while neutralizing visual skin
 *   when `au-primitives.css` is also imported.
 * - `aurea-blue`: Blue-accent opt-in theme from `au-aurea-blue.css`.
 */
export type AuStyleMode = 'default' | 'unstyled' | 'aurea-blue';

@Directive({
  selector: '[auStyle]',
  host: {
    '[attr.data-au-style]': 'auStyle()',
  },
})
export class AuStyleDirective {
  readonly auStyle = input<AuStyleMode>('default');
}
