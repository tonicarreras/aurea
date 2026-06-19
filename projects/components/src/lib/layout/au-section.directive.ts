import { Directive, input } from '@angular/core';

import {
  AuPaddingCapability,
  AU_STYLE_DEFAULTS,
  AU_STYLE_NAMESPACE,
  type AuStyleDefaults,
} from '../core/capabilities';

export type AuSectionDivider = 'none' | 'top' | 'bottom' | 'both';

/**
 * Padded content region with optional dividers — card sections, page blocks.
 */
@Directive({
  selector: '[auSection]',
  providers: [
    { provide: AU_STYLE_NAMESPACE, useValue: 'section' },
    { provide: AU_STYLE_DEFAULTS, useValue: { padding: 'lg' } satisfies AuStyleDefaults },
  ],
  hostDirectives: [{ directive: AuPaddingCapability, inputs: ['padding'] }],
  host: {
    '[attr.data-au-section]': '""',
    '[attr.data-au-divider]': 'divider()',
  },
})
export class AuSection {
  readonly divider = input<AuSectionDivider>('none');
}
