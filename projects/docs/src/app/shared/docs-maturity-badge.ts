import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import type { DocsComponentMaturityLevel } from '../core/docs-component-maturity';

import { DocsLocaleService } from '../core/docs-locale.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'docs-maturity-badge',
  host: {
    class: 'docs-maturity-badge',
    '[class.docs-maturity-badge--stable]': 'level() === "stable"',
    '[class.docs-maturity-badge--beta]': 'level() === "beta"',
    '[class.docs-maturity-badge--experimental]': 'level() === "experimental"',
  },
  template: `<span class="docs-maturity-badge__label">{{ label() }}</span>`,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      height: 1.375rem;
      padding: 0 0.5rem;
      border-radius: var(--au-radius-pill);
      font-size: var(--au-text-xs);
      font-weight: var(--au-weight-semibold);
      letter-spacing: 0.02em;
      text-transform: uppercase;
      line-height: 1;
      flex-shrink: 0;
    }

    :host(.docs-maturity-badge--stable) {
      background: color-mix(in srgb, var(--au-color-semantic-success) 18%, transparent);
      color: var(--au-color-semantic-success);
      border: 1px solid color-mix(in srgb, var(--au-color-semantic-success) 35%, transparent);
    }

    :host(.docs-maturity-badge--beta) {
      background: color-mix(in srgb, var(--au-color-semantic-warning) 22%, transparent);
      color: var(--au-color-semantic-warning);
      border: 1px solid color-mix(in srgb, var(--au-color-semantic-warning) 40%, transparent);
    }

    :host(.docs-maturity-badge--experimental) {
      background: color-mix(in srgb, var(--au-color-text-tertiary) 16%, transparent);
      color: var(--au-color-text-secondary);
      border: 1px solid var(--docs-border-fine);
    }
  `,
})
export class DocsMaturityBadge {
  private readonly i18n = inject(DocsLocaleService);

  readonly level = input.required<DocsComponentMaturityLevel>();

  readonly label = computed(() => {
    const m = this.i18n.messages().componentsIndex;
    switch (this.level()) {
      case 'stable':
        return m.maturityStable;
      case 'beta':
        return m.maturityBeta;
      default:
        return m.maturityExperimental;
    }
  });
}
