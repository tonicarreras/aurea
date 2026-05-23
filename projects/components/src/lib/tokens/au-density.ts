import { Directive, input } from '@angular/core';

export type AuDensity = 'compact' | 'comfortable' | 'spacious';

/**
 * Aplica escala de densidad del sistema en el host (`data-au-density`).
 * Ajusta alturas de campo y espaciado base vía tokens en `au-tokens.css`.
 */
@Directive({
  selector: '[auDensity]',
  host: {
    '[attr.data-au-density]': 'auDensity()',
  },
})
export class AuDensityDirective {
  readonly auDensity = input<AuDensity>('comfortable');
}
