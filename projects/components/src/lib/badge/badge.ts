import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type AuBadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'error' | 'info';
export type AuBadgeAppearance = 'solid' | 'glass';
/** `inline` (default) or absolute corner placement inside a `position: relative` parent. */
export type AuBadgeCorner = 'inline' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

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
    '[attr.data-au-appearance]': 'appearance()',
    '[attr.data-au-corner]': 'corner() !== "inline" ? corner() : null',
    '[attr.data-au-dot]': 'dot() ? "" : null',
  },
})
export class AuBadge {
  readonly variant = input<AuBadgeVariant>('default');
  readonly appearance = input<AuBadgeAppearance>('solid');
  readonly corner = input<AuBadgeCorner>('inline');
  readonly dot = input(false);
  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  readonly resolvedLabel = computed(() => this.label().trim());
  readonly hasLabel = computed(() => this.resolvedLabel().length > 0);
}
