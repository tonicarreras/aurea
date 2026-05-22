import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuCard } from '@aurea-design-system/components';

import { COMPONENT_DOCS, componentDocSummary } from '../core/component-docs.registry';
import { DOCS_ROUTES } from '../core/docs-locale';
import { DocsLocaleService } from '../core/docs-locale.service';
import { DocPage } from '../shared/doc-page';
import { DocsInlineText } from '../shared/docs-inline-text';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, RouterLink, AuCard, DocsInlineText],
  template: `
    <docs-page
      [title]="i18n.messages().componentsIndex.title"
      [lead]="i18n.messages().componentsIndex.lead"
    >
      <ul class="docs-components-index">
        @for (doc of docs(); track doc.slug; let i = $index) {
          <li
            class="docs-components-index__item"
            [style.animation-delay]="60 + i * 40 + 'ms'"
          >
            <a
              [routerLink]="docLink(doc.slug)"
              class="docs-components-index__link"
            >
              <au-card
                variant="outlined"
                size="md"
                class="docs-components-index__card"
              >
                <h3
                  auCardHeader
                  class="docs-components-index__name"
                >
                  {{ doc.title }}
                </h3>
                <p
                  auCardBody
                  class="docs-components-index__body"
                >
                  <code class="docs-components-index__export">{{ doc.exportName }}</code>
                  <span class="docs-components-index__summary">
                    <docs-inline-text [text]="doc.summary" />
                  </span>
                  <span
                    class="docs-components-index__arrow"
                    aria-hidden="true"
                    >→</span
                  >
                </p>
              </au-card>
            </a>
          </li>
        }
      </ul>
    </docs-page>
  `,
  styles: `
    .docs-components-index {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
      gap: var(--au-space-4);
    }

    .docs-components-index__item {
      animation: docs-fade-up 0.45s var(--au-ease-out) both;
    }

    .docs-components-index__link {
      display: block;
      height: 100%;
      text-decoration: none;
      color: inherit;
    }

    .docs-components-index__card {
      position: relative;
      height: 100%;
      transition:
        transform var(--au-duration-default) var(--au-ease-emph),
        border-color var(--au-duration-short) var(--au-ease-in-out),
        box-shadow var(--au-duration-short) var(--au-ease-in-out);
    }

    .docs-components-index__body {
      margin: 0;
      display: grid;
      gap: var(--au-space-2);
    }

    @media (hover: hover) {
      .docs-components-index__link:hover .docs-components-index__card {
        transform: translateY(-2px);
        border-color: var(--au-color-accent);
      }

      .docs-components-index__link:hover .docs-components-index__arrow {
        transform: translate(4px, -4px);
        opacity: 1;
      }

      :host-context([data-au-theme='dark'])
        .docs-components-index__link:hover
        .docs-components-index__card {
        transform: none;
        border-color: color-mix(in srgb, var(--au-color-border-subtle) 70%, transparent);
      }
    }

    .docs-components-index__name {
      margin: 0;
      font-size: inherit;
      font-weight: var(--au-weight-semibold);
      color: var(--au-color-text-primary);
    }

    .docs-components-index__export {
      font-family: var(--au-font-mono);
      font-size: var(--au-text-xs);
      color: var(--au-color-accent);
    }

    .docs-components-index__summary {
      font-size: var(--au-text-sm);
      color: var(--au-color-text-secondary);
      line-height: var(--au-leading-relaxed);
    }

    .docs-components-index__arrow {
      position: absolute;
      top: var(--au-space-4);
      right: var(--au-space-4);
      font-size: var(--au-text-lg);
      color: var(--au-color-accent);
      opacity: 0.45;
      transition:
        transform var(--au-duration-short) var(--au-ease-emph),
        opacity var(--au-duration-short) var(--au-ease-in-out);
    }
  `,
})
export class ComponentsIndexPage {
  readonly i18n = inject(DocsLocaleService);

  readonly docs = computed(() =>
    COMPONENT_DOCS.map((doc) => ({
      ...doc,
      summary: componentDocSummary(doc, this.i18n.locale()),
    })),
  );

  docLink(slug: string): string[] {
    return this.i18n.link(DOCS_ROUTES.components, slug);
  }
}
