import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type AuLinkVariant = 'default' | 'subtle';

/**
 * Styled inline link aligned with Aurea tokens.
 *
 * @remarks
 * Use on a **native** `<a>` so navigation, keyboard, and auxiliary-click
 * semantics stay correct. The host element remains the anchor.
 *
 * Declared as `Component` (not `Directive`) to support encapsulated `styleUrl`;
 * selector is `a[auLink]` (see project ESLint override for this file).
 *
 * @example
 * ```html
 * <a auLink href="/docs">Documentation</a>
 * <a auLink href="https://angular.dev" [external]="true">Angular</a>
 * ```
 */
@Component({
  selector: 'a[auLink]',
  template: '<ng-content />',
  styleUrl: './link.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-link',
    '[attr.href]': 'href()',
    '[attr.data-au-variant]': 'variant()',
    '[attr.target]': 'external() ? "_blank" : null',
    '[attr.rel]': 'external() ? "noopener noreferrer" : null',
  },
})
export class AuLink {
  readonly variant = input<AuLinkVariant>('default');
  readonly external = input(false);

  readonly href = input<string, string>('#', {
    transform: (v) => (v == null || v === '' ? '#' : String(v)),
  });

  readonly hasCustomHref = computed(() => this.href() !== '#');
}
