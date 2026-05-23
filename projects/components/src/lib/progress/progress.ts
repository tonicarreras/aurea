import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type AuProgressMode = 'determinate' | 'indeterminate';

/**
 * Progress indicator for determinate or indeterminate loading.
 */
@Component({
  selector: 'au-progress',
  templateUrl: './progress.html',
  styleUrl: './progress.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-progress',
    role: 'progressbar',
    '[attr.aria-valuemin]': 'mode() === "determinate" ? 0 : null',
    '[attr.aria-valuemax]': 'mode() === "determinate" ? max() : null',
    '[attr.aria-valuenow]': 'mode() === "determinate" ? value() : null',
    '[attr.aria-valuetext]': 'ariaValueText()',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.data-au-mode]': 'mode()',
  },
})
export class AuProgress {
  readonly mode = input<AuProgressMode>('determinate');
  readonly value = input(0);
  readonly max = input(100);
  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  readonly percent = computed(() => {
    const max = Math.max(1, this.max());
    const clamped = Math.min(Math.max(0, this.value()), max);
    return (clamped / max) * 100;
  });

  readonly ariaValueText = computed(() => {
    const text = this.label().trim();
    if (text) {
      return text;
    }
    if (this.mode() === 'indeterminate') {
      return 'Loading';
    }
    return `${Math.round(this.percent())}%`;
  });

  /** Accessible name for `role="progressbar"` (axe `aria-progressbar-name`). */
  readonly ariaLabel = computed(() => {
    const text = this.label().trim();
    if (text) {
      return text;
    }
    if (this.mode() === 'indeterminate') {
      return 'Loading';
    }
    return `Progress, ${Math.round(this.percent())}%`;
  });
}
