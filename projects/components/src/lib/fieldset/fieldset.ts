import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Groups related fields with a native `fieldset`, legend, and optional description.
 *
 * @example
 * ```html
 * <au-fieldset legend="Shipping address" description="Where we deliver your order.">
 *   <au-form-field label="Street">…</au-form-field>
 * </au-fieldset>
 * ```
 */
@Component({
  selector: 'au-fieldset',
  templateUrl: './fieldset.html',
  styleUrl: './fieldset.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-fieldset',
    '[attr.data-au-size]': 'size()',
  },
})
export class AuFieldset {
  readonly legend = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  readonly description = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });

  readonly disabled = input(false);
  readonly size = input<'sm' | 'md'>('md');

  readonly resolvedLegend = computed(() => this.legend().trim());
  readonly resolvedDescription = computed(() => this.description().trim());
  readonly hasLegend = computed(() => this.resolvedLegend().length > 0);
  readonly hasDescription = computed(() => this.resolvedDescription().length > 0);
}
