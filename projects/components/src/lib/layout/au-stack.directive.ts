import { Directive, input } from '@angular/core';

import {
  AuGapCapability,
  AU_STYLE_DEFAULTS,
  AU_STYLE_NAMESPACE,
  type AuStyleDefaults,
} from '../core/capabilities';

export type AuStackAlign = 'stretch' | 'start' | 'center' | 'end';
export type AuStackJustify = 'start' | 'center' | 'end' | 'between';
export type AuStackSeparator = 'none' | 'solid';

/**
 * Vertical flex stack with token-driven gap. Use for form sections, card bodies, and lists.
 *
 * @example
 * ```html
 * <div auStack gap="md" separator="solid">
 *   <p>First</p>
 *   <p>Second</p>
 * </div>
 * ```
 */
@Directive({
  selector: '[auStack]',
  providers: [
    { provide: AU_STYLE_NAMESPACE, useValue: 'stack' },
    { provide: AU_STYLE_DEFAULTS, useValue: { gap: 'md' } satisfies AuStyleDefaults },
  ],
  hostDirectives: [{ directive: AuGapCapability, inputs: ['gap'] }],
  host: {
    '[attr.data-au-stack]': '""',
    '[attr.data-au-align]': 'align()',
    '[attr.data-au-justify]': 'justify()',
    '[attr.data-au-separator]': 'separator()',
  },
})
export class AuStack {
  readonly align = input<AuStackAlign>('stretch');
  readonly justify = input<AuStackJustify>('start');
  readonly separator = input<AuStackSeparator>('none');
}
