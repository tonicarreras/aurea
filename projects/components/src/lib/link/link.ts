import { Directive, computed, input } from '@angular/core';

export type AuLinkVariant = 'default' | 'subtle';

/**
 * Styled inline link aligned with Aurea tokens.
 */
@Directive({
  selector: 'a[auLink]',
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
