import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { AU_LIST } from './au-list.token';

/**
 * Design-system **list**: accessible wrapper for a collection of related items.
 *
 * @remarks
 * - Sets `role="list"` and provides context for {@link AuListItem} (`role="listitem"`).
 * - Use for static/removable chip groups, tag clouds, or any repeated row of peers.
 * - Filter/toggle chips: use {@link AuChipGroup} instead of `au-list`.
 *
 * @example
 * ```html
 * <au-list ariaLabel="Selected technologies">
 *   <au-chip label="Angular" removable />
 *   <au-chip label="TypeScript" removable />
 * </au-list>
 * ```
 */
@Component({
  selector: 'au-list',
  templateUrl: './list.html',
  styleUrl: './list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-list',
    role: 'list',
    '[attr.aria-label]': 'resolvedAriaLabel()',
    '[attr.aria-labelledby]': 'resolvedAriaLabelledBy()',
  },
  providers: [{ provide: AU_LIST, useValue: true }],
})
export class AuList {
  /** Accessible name when the list has no visible caption. */
  readonly ariaLabel = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });

  /** ID of an element that labels this list. */
  readonly ariaLabelledBy = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });

  readonly resolvedAriaLabel = computed(() => {
    const label = this.ariaLabel().trim();
    return label.length > 0 ? label : null;
  });

  readonly resolvedAriaLabelledBy = computed(() => {
    const id = this.ariaLabelledBy().trim();
    return id.length > 0 ? id : null;
  });
}
