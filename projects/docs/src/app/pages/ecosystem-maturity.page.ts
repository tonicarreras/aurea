import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { COMPONENT_DOCS } from '../core/component-docs.registry';
import { DOCS_ROUTES } from '../core/docs-locale';
import { listDocsMaturityEntries } from '../core/docs-component-maturity';
import { DocsLocaleService } from '../core/docs-locale.service';
import { DocPage } from '../shared/doc-page';
import { DocsMaturityBadge } from '../shared/docs-maturity-badge';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, RouterLink, DocsMaturityBadge],
  template: `
    <docs-page
      [title]="eco().maturity.title"
      [lead]="eco().maturity.lead"
    >
      <p class="docs-maturity-page__legend">{{ eco().maturity.legend }}</p>
      <div class="docs-maturity-page__table-wrap">
        <table class="docs-maturity-page__table">
          <thead>
            <tr>
              <th scope="col">{{ eco().maturity.columns.component }}</th>
              <th scope="col">{{ eco().maturity.columns.level }}</th>
              <th scope="col">{{ eco().maturity.columns.since }}</th>
            </tr>
          </thead>
          <tbody>
            @for (row of rows(); track row.slug) {
              <tr>
                <td>
                  <a [routerLink]="docLink(row.slug)">{{ row.title }}</a>
                </td>
                <td>
                  <docs-maturity-badge [level]="row.level" />
                </td>
                <td>{{ row.since }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </docs-page>
  `,
  styles: `
    .docs-maturity-page__legend {
      margin: 0 0 var(--au-space-6);
      max-width: 100%;
      line-height: var(--au-leading-relaxed);
      color: var(--au-color-text-secondary);
    }

    .docs-maturity-page__table-wrap {
      overflow-x: auto;
    }

    .docs-maturity-page__table {
      width: 100%;
      min-width: 20rem;
      border-collapse: collapse;
      font-size: var(--au-text-sm);
    }

    .docs-maturity-page__table th,
    .docs-maturity-page__table td {
      padding: var(--au-space-3) var(--au-space-4);
      border-bottom: 1px solid var(--docs-border-fine);
      text-align: left;
      vertical-align: middle;
    }

    .docs-maturity-page__table a {
      color: var(--au-color-accent);
      text-decoration: none;
      font-weight: var(--au-weight-medium);
    }

    @media (hover: hover) {
      .docs-maturity-page__table a:hover {
        text-decoration: underline;
      }
    }
  `,
})
export class EcosystemMaturityPage {
  readonly i18n = inject(DocsLocaleService);
  readonly eco = computed(() => this.i18n.messages().ecosystem);

  readonly rows = computed(() => {
    const titleBySlug = new Map(COMPONENT_DOCS.map((d) => [d.slug, d.title]));
    return listDocsMaturityEntries().map(({ slug, meta }) => ({
      slug,
      title: titleBySlug.get(slug) ?? slug,
      level: meta.level,
      since: meta.since,
    }));
  });

  docLink(slug: string): string[] {
    return this.i18n.link(DOCS_ROUTES.components, slug);
  }
}
