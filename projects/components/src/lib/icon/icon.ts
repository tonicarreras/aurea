import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type AuIconName = 'check-circle' | 'warning' | 'error' | 'info' | 'close' | 'spinner';

export type AuIconSize = 'sm' | 'md' | 'lg';

/**
 * Design-system **icon**: shared SVG glyphs (Material-style outlines).
 *
 * @remarks
 * Decorative by default (`aria-hidden`). Use on buttons with an accessible name on the control.
 */
@Component({
  selector: 'au-icon',
  templateUrl: './icon.html',
  styleUrl: './icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-icon',
    '[attr.data-au-icon]': 'name()',
    '[attr.data-au-size]': 'size()',
    'aria-hidden': 'true',
  },
})
export class AuIcon {
  readonly name = input.required<AuIconName>();
  readonly size = input<AuIconSize>('md');

  /** Scales warning triangle only; exclamation stays fixed in the glyph. */
  readonly warningScale = input(1.1);

  readonly warningTransform = computed(
    () => `translate(12 12) scale(${this.warningScale()}) translate(-12 -12)`,
  );
}
