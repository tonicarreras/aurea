import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type AuBadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'error' | 'info';

/**
 * Compact label for status, counts, or categories.
 */
@Component({
  selector: 'au-badge',
  templateUrl: './badge.html',
  styleUrl: './badge.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-badge',
    '[attr.data-au-variant]': 'variant()',
    '[attr.data-au-dot]': 'dot() ? "" : null',
  },
})
export class AuBadge {
  readonly variant = input<AuBadgeVariant>('default');
  readonly dot = input(false);
  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  readonly resolvedLabel = computed(() => this.label().trim());
  readonly hasLabel = computed(() => this.resolvedLabel().length > 0);
}
