import { Directive, computed, input } from '@angular/core';

import {
  AuGapCapability,
  AU_STYLE_DEFAULTS,
  AU_STYLE_NAMESPACE,
  type AuStyleDefaults,
} from '../core/capabilities';

export type AuSplitRatio = '1:1' | '1:2' | '2:1' | '1:3' | '3:1';
export type AuSplitCollapse = 'none' | 'sm' | 'md';

const RATIO_VALUES: Record<AuSplitRatio, string> = {
  '1:1': '1fr 1fr',
  '1:2': '1fr 2fr',
  '2:1': '2fr 1fr',
  '1:3': '1fr 3fr',
  '3:1': '3fr 1fr',
};

/**
 * Two-column grid with responsive collapse — settings rows, media + copy layouts.
 */
@Directive({
  selector: '[auSplit]',
  providers: [
    { provide: AU_STYLE_NAMESPACE, useValue: 'split' },
    { provide: AU_STYLE_DEFAULTS, useValue: { gap: 'lg' } satisfies AuStyleDefaults },
  ],
  hostDirectives: [{ directive: AuGapCapability, inputs: ['gap'] }],
  host: {
    '[attr.data-au-split]': '""',
    '[attr.data-au-collapse]': 'collapse()',
    '[style.--au-split-ratio]': 'ratioValue()',
  },
})
export class AuSplit {
  readonly ratio = input<AuSplitRatio>('1:1');
  readonly collapse = input<AuSplitCollapse>('sm');

  protected readonly ratioValue = computed(() => RATIO_VALUES[this.ratio()]);
}
