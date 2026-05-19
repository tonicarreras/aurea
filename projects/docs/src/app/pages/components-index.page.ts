import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { COMPONENT_DOCS } from '../core/component-docs.registry';
import { DocPage } from '../shared/doc-page';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, RouterLink],
  template: `
    <docs-page
      title="Componentes"
      lead="Catálogo de primitivos del design system. Cada página incluye vista previa y ejemplo de importación."
    >
      <ul class="docs-components-index">
        @for (doc of docs; track doc.slug) {
          <li class="docs-components-index__item">
            <a [routerLink]="['/componentes', doc.slug]" class="docs-components-index__link">
              <span class="docs-components-index__name">{{ doc.title }}</span>
              <code class="docs-components-index__export">{{ doc.exportName }}</code>
              <span class="docs-components-index__summary">{{ doc.summary }}</span>
            </a>
          </li>
        }
      </ul>
    </docs-page>
  `,
  styles: [
    `
      .docs-components-index {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: var(--au-space-3);
      }

      .docs-components-index__link {
        display: grid;
        gap: var(--au-space-1);
        padding: var(--au-space-4);
        border: 1px solid var(--au-color-border-subtle);
        border-radius: var(--au-radius-md);
        text-decoration: none;
        background: var(--au-color-surface-raised);
        transition: border-color 0.15s ease;
      }

      .docs-components-index__link:hover {
        border-color: var(--au-color-accent);
      }

      .docs-components-index__name {
        font-weight: var(--au-weight-semibold);
        color: var(--au-color-text-primary);
      }

      .docs-components-index__export {
        font-size: var(--au-text-sm);
        color: var(--au-color-accent);
      }

      .docs-components-index__summary {
        font-size: var(--au-text-sm);
        color: var(--au-color-text-secondary);
      }
    `,
  ],
})
export class ComponentsIndexPage {
  readonly docs = COMPONENT_DOCS;
}
