import { Directive, computed, inject, input } from '@angular/core';

import { auSpacingValue, type AuSpacing } from '../../tokens/resolvers/spacing';
import { AU_STYLE_DEFAULTS, AU_STYLE_NAMESPACE } from './au-style-tokens';

/**
 * INTERNAL — writes namespaced `--au-{namespace}-gap` for layout primitives.
 * Do not import in applications; use `[auStack]`, `[auCluster]`, `[auSplit]` instead.
 */
@Directive({
  selector: '[auGapCapability]',
  host: {
    class: 'au-gap-capability',
    '[style.--_au-gap-default]': 'gapDefaultVar()',
    '[style.gap]': 'gapProperty()',
    '[attr.data-au-gap]': 'resolved()',
  },
})
export class AuGapCapability {
  private readonly namespace = inject(AU_STYLE_NAMESPACE);
  private readonly defaults = inject(AU_STYLE_DEFAULTS);

  readonly gap = input<AuSpacing | undefined>(undefined);

  private readonly fallback = computed(() => this.defaults.gap ?? 'md');
  protected readonly resolved = computed(() => this.gap() ?? this.fallback());

  protected readonly gapDefaultVar = computed(() => auSpacingValue(this.fallback()));
  protected readonly gapProperty = computed(() => {
    const gap = this.gap();
    if (gap) {
      return auSpacingValue(gap);
    }
    const ns = this.namespace;
    return `var(--au-${ns}-gap, ${auSpacingValue(this.fallback())})`;
  });
}
