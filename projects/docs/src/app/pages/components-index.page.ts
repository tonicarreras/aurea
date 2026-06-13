import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuButton, AuCard } from '@aurea-design-system/components';

import { getDocsComponentMaturity } from '../core/docs-component-maturity';

import { COMPONENT_DOCS, componentDocSummary } from '../core/component-docs.registry';
import { DOCS_ROUTES } from '../core/docs-locale';
import { DocsLocaleService } from '../core/docs-locale.service';
import { DocPage } from '../shared/doc-page';
import { DocsInlineText } from '../shared/docs-inline-text';
import { DocsMaturityBadge } from '../shared/docs-maturity-badge';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, RouterLink, AuButton, AuCard, DocsInlineText, DocsMaturityBadge],
  template: `
    <docs-page
      [title]="i18n.messages().componentsIndex.title"
      [lead]="i18n.messages().componentsIndex.lead"
    >
      <section
        class="docs-components-spotlight"
        aria-labelledby="docs-components-spotlight-title"
      >
        <div class="docs-components-spotlight__content">
          <p class="docs-components-spotlight__eyebrow">
            {{ i18n.messages().componentsIndex.crudSpotlightEyebrow }}
          </p>
          <h2
            id="docs-components-spotlight-title"
            class="docs-components-spotlight__title"
          >
            {{ i18n.messages().componentsIndex.crudSpotlightTitle }}
          </h2>
          <p class="docs-components-spotlight__lead">
            {{ i18n.messages().componentsIndex.crudSpotlightLead }}
          </p>
        </div>
        <a [routerLink]="crudDemoLink()">
          <button auButton variant="primary">{{ i18n.messages().componentsIndex.crudSpotlightCta }}</button>
        </a>
      </section>

      <p class="docs-components-index__legend">
        {{ i18n.messages().componentsIndex.maturityLegend }}
      </p>
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
                size="lg"
                class="docs-components-index__card"
              >
                <div
                  auCardHeader
                  class="docs-components-index__header"
                >
                  <h3 class="docs-components-index__name">{{ doc.title }}</h3>
                  <docs-maturity-badge [level]="doc.maturity.level" />
                </div>
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
    .docs-components-spotlight {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: space-between;
      gap: var(--au-space-5);
      margin-bottom: var(--au-space-7);
      padding: var(--au-space-6);
      border-radius: var(--au-radius-lg);
      border: 1px solid color-mix(in srgb, var(--au-color-action-primary) 28%, transparent);
      background: color-mix(in srgb, var(--au-color-action-primary) 6%, var(--au-color-surface-raised));
    }

    .docs-components-spotlight__content {
      flex: 1 1 16rem;
      min-width: 0;
    }

    .docs-components-spotlight__eyebrow {
      margin: 0 0 var(--au-space-2);
      font-size: var(--au-text-xs);
      font-weight: var(--au-weight-semibold);
      letter-spacing: var(--au-tracking-caps);
      text-transform: uppercase;
      color: var(--au-color-action-primary);
    }

    .docs-components-spotlight__title {
      margin: 0 0 var(--au-space-2);
      font-size: var(--au-text-lg);
      font-weight: var(--au-weight-semibold);
    }

    .docs-components-spotlight__lead {
      margin: 0;
      max-width: 40rem;
      font-size: var(--au-text-sm);
      line-height: var(--au-leading-relaxed);
      color: var(--au-color-text-secondary);
    }

    .docs-components-spotlight a {
      text-decoration: none;
      flex-shrink: 0;
    }

    .docs-components-index {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--au-space-5);
      width: 100%;
      max-width: 100%;
      container-type: inline-size;
    }

    @container (min-width: 28rem) {
      .docs-components-index {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--au-space-6);
      }
    }

    @container (min-width: 42rem) {
      .docs-components-index {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    .docs-components-index__item {
      min-width: 0;
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
      min-height: 10.5rem;
      display: flex;
      flex-direction: column;
      transition:
        transform var(--au-duration-default) var(--au-ease-emph),
        border-color var(--au-duration-short) var(--au-ease-in-out),
        box-shadow var(--au-duration-short) var(--au-ease-in-out);
    }

    .docs-components-index__legend {
      margin: 0 0 var(--au-space-5);
      max-width: 100%;
      font-size: var(--au-text-sm);
      color: var(--au-color-text-secondary);
      line-height: var(--au-leading-relaxed);
    }

    .docs-components-index__header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--au-space-2) var(--au-space-3);
      padding-right: var(--au-space-8);
    }

    .docs-components-index__name {
      margin: 0;
      font-size: var(--au-text-md);
      font-weight: var(--au-weight-semibold);
      color: var(--au-color-text-primary);
      line-height: var(--au-leading-snug);
    }

    .docs-components-index__body {
      margin: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--au-space-3);
      padding-top: var(--au-space-1);
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

    .docs-components-index__export {
      display: inline-block;
      width: fit-content;
      padding: 0.12em 0.45em;
      border-radius: var(--au-radius-xs);
      border: 1px solid var(--docs-border-fine);
      background: color-mix(in srgb, var(--au-color-accent) 8%, var(--au-color-surface-raised));
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
      top: var(--au-space-5);
      right: var(--au-space-5);
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
      maturity: getDocsComponentMaturity(doc.slug),
    })),
  );

  docLink(slug: string): string[] {
    return this.i18n.link(DOCS_ROUTES.components, slug);
  }

  crudDemoLink(): string[] {
    return this.i18n.link(DOCS_ROUTES.guidesCrudDemo);
  }
}
