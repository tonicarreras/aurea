import { InjectionToken } from '@angular/core';

import type { AuSpacing } from '../../tokens/resolvers/spacing';

/**
 * INTERNAL. CSS-variable namespace a primitive owns, e.g. `'stack'` →
 * capabilities write `--au-stack-*`. Every primitive that composes a style
 * capability must provide this on its element injector.
 *
 * @see ../../../../docs/STYLE_CAPABILITIES.md — host contract and namespace table
 */
export const AU_STYLE_NAMESPACE = new InjectionToken<string>('AU_STYLE_NAMESPACE');

/**
 * INTERNAL. Per-primitive default tokens. Resolution order:
 * explicit input → this default → capability hard fallback.
 *
 * @see ../../../../docs/STYLE_CAPABILITIES.md — resolution order
 */
export interface AuStyleDefaults {
  gap?: AuSpacing;
  padding?: AuSpacing;
}

export const AU_STYLE_DEFAULTS = new InjectionToken<AuStyleDefaults>('AU_STYLE_DEFAULTS', {
  factory: () => ({}),
});
