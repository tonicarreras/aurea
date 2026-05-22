import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Design-system **chip group**: accessible wrapper for selectable filter chips.
 *
 * @remarks
 * - Sets `role="group"` (toggle filters, not a list of static tags).
 * - Pair with `au-chip` `selectable` chips — use {@link AuList} for removable/static tags.
 *
 * @example
 * ```html
 * <au-chip-group ariaLabel="Status filters">
 *   <au-chip label="Draft" selectable [(selected)]="draftOnly" />
 *   <au-chip label="Published" selectable [(selected)]="publishedOnly" />
 * </au-chip-group>
 * ```
 */
@Component({
  selector: 'au-chip-group',
  templateUrl: './chip-group.html',
  styleUrl: './chip-group.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-chip-group',
    role: 'group',
    '[attr.aria-label]': 'resolvedAriaLabel()',
    '[attr.aria-labelledby]': 'resolvedAriaLabelledBy()',
  },
})
export class AuChipGroup {
  readonly ariaLabel = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });

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
