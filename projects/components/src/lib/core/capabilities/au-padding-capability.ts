import { Directive, computed, inject, input } from '@angular/core';

import { auSpacingValue, type AuSpacing } from '../../tokens/resolvers/spacing';
import { AU_STYLE_DEFAULTS, AU_STYLE_NAMESPACE } from './au-style-tokens';

/**
 * INTERNAL — writes namespaced `--au-{namespace}-padding` for section-like primitives.
 * Do not import in applications; use `[auSection]` instead.
 */
@Directive({
  selector: '[auPaddingCapability]',
  host: {
    class: 'au-padding-capability',
    '[style.--_au-padding-default]': 'paddingDefaultVar()',
    '[style.padding]': 'paddingProperty()',
    '[attr.data-au-padding]': 'resolved()',
  },
})
export class AuPaddingCapability {
  private readonly namespace = inject(AU_STYLE_NAMESPACE);
  private readonly defaults = inject(AU_STYLE_DEFAULTS);

  readonly padding = input<AuSpacing | undefined>(undefined);

  private readonly fallback = computed(() => this.defaults.padding ?? 'lg');
  protected readonly resolved = computed(() => this.padding() ?? this.fallback());

  protected readonly paddingDefaultVar = computed(() => auSpacingValue(this.fallback()));
  protected readonly paddingProperty = computed(() => {
    const padding = this.padding();
    if (padding) {
      return auSpacingValue(padding);
    }
    const ns = this.namespace;
    return `var(--au-${ns}-padding, ${auSpacingValue(this.fallback())})`;
  });
}
