import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import type { AuSize } from '../au-size';

let nextSpinnerLabelId = 0;

/**
 * Inline loading indicator with an accessible `role="status"`.
 *
 * @remarks
 * - Dual-ring SVG: muted track plus a rotating primary arc (~0.9s).
 * - Omit `label` for a glyph-only indicator (`aria-label="Loading"`).
 * - Set `label` to show visible status copy and name the live region.
 * - Set `decorative` when a parent control already exposes loading state (glyph only).
 */
@Component({
  selector: 'au-spinner',
  templateUrl: './spinner.html',
  styleUrl: './spinner.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-spinner',
    '[class.au-spinner--decorative]': 'decorative()',
    '[class.au-spinner--labeled]': 'showsLabel()',
    '[attr.role]': 'decorative() ? null : "status"',
    '[attr.aria-label]': 'decorative() || showsLabel() ? null : resolvedLabel()',
    '[attr.aria-labelledby]': 'showsLabel() ? labelId : null',
    '[attr.aria-busy]': 'decorative() ? null : "true"',
    '[attr.aria-hidden]': 'decorative() ? "true" : null',
    '[attr.data-au-size]': 'size()',
  },
})
export class AuSpinner {
  readonly size = input<AuSize>('md');
  /** Hides live-region semantics when a parent already exposes loading state. */
  readonly decorative = input(false);
  /** Visible status copy; omit for a glyph-only indicator. */
  readonly label = input<string>();

  protected readonly labelId = `au-spinner-label-${++nextSpinnerLabelId}`;

  readonly resolvedLabel = computed(() => {
    const text = this.label()?.trim();
    return text && text.length > 0 ? text : 'Loading';
  });

  readonly showsLabel = computed(
    () => !this.decorative() && (this.label()?.trim().length ?? 0) > 0,
  );
}
