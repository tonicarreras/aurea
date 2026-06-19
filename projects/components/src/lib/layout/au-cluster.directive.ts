import { Directive, input } from '@angular/core';

import {
  AuGapCapability,
  AU_STYLE_DEFAULTS,
  AU_STYLE_NAMESPACE,
  type AuStyleDefaults,
} from '../core/capabilities';

export type AuClusterAlign = 'start' | 'center' | 'end';
export type AuClusterJustify = 'start' | 'center' | 'end' | 'between';
export type AuClusterSeparator = 'none' | 'solid';

/**
 * Inline flex row with wrap — toolbars, chip rows, filter bars.
 */
@Directive({
  selector: '[auCluster]',
  providers: [
    { provide: AU_STYLE_NAMESPACE, useValue: 'cluster' },
    { provide: AU_STYLE_DEFAULTS, useValue: { gap: 'sm' } satisfies AuStyleDefaults },
  ],
  hostDirectives: [{ directive: AuGapCapability, inputs: ['gap'] }],
  host: {
    '[attr.data-au-cluster]': '""',
    '[attr.data-au-align]': 'align()',
    '[attr.data-au-justify]': 'justify()',
    '[attr.data-au-separator]': 'separator()',
  },
})
export class AuCluster {
  readonly align = input<AuClusterAlign>('center');
  readonly justify = input<AuClusterJustify>('start');
  readonly separator = input<AuClusterSeparator>('none');
}
