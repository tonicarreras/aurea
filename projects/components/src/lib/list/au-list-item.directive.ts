import { Directive, computed, inject, input } from '@angular/core';

import { AU_LIST } from './au-list.token';

/**
 * Marks a host as `role="listitem"` when it is projected inside {@link AuList}.
 *
 * @remarks
 * Applied automatically on `au-chip` (disabled when `selectable`). Use on custom hosts:
 * `&lt;div auListItem&gt;…&lt;/div&gt;` inside `&lt;au-list&gt;`.
 */
@Directive({
  selector: '[auListItem]',
  host: {
    '[attr.role]': 'itemRole()',
  },
})
export class AuListItem {
  private readonly list = inject(AU_LIST, { optional: true, skipSelf: true });

  /** When true, suppresses `listitem` even inside `au-list`. */
  readonly auListItemDisabled = input(false);

  readonly itemRole = computed((): string | null => {
    if (this.auListItemDisabled() || this.list == null) {
      return null;
    }
    return 'listitem';
  });
}
