import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { DOCS_EXTERNAL_LINKS } from '../core/docs-external-links';
import { DocsLocaleService } from '../core/docs-locale.service';
import { DocPage } from '../shared/doc-page';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage],
  template: `
    <docs-page
      [title]="eco().roadmap.title"
      [lead]="eco().roadmap.lead"
    >
      <section class="docs-roadmap">
        <h2>{{ eco().roadmap.phasesHeading }}</h2>
        <table class="docs-roadmap__table">
          <thead>
            <tr>
              <th scope="col">{{ eco().roadmap.table.phase }}</th>
              <th scope="col">{{ eco().roadmap.table.focus }}</th>
              <th scope="col">{{ eco().roadmap.table.status }}</th>
            </tr>
          </thead>
          <tbody>
            @for (phase of eco().roadmap.phases; track phase.name) {
              <tr>
                <td>{{ phase.name }}</td>
                <td>{{ phase.focus }}</td>
                <td>{{ phase.status }}</td>
              </tr>
            }
          </tbody>
        </table>

        <h2>{{ eco().roadmap.versionsHeading }}</h2>
        <ul class="docs-roadmap__versions">
          @for (target of eco().roadmap.versionTargets; track target.version) {
            <li>
              <strong>{{ target.version }}</strong> — {{ target.focus }}
            </li>
          }
        </ul>

        <p class="docs-roadmap__links">
          <a
            [href]="githubRoadmap"
            rel="noopener noreferrer"
            target="_blank"
            >{{ eco().roadmap.githubLink }}</a
          >
          ·
          <a
            [href]="v1Criteria"
            rel="noopener noreferrer"
            target="_blank"
            >V1_CRITERIA.md</a
          >
        </p>
      </section>
    </docs-page>
  `,
  styles: `
    .docs-roadmap h2 {
      margin: var(--au-space-8) 0 var(--au-space-3);
      font-size: var(--au-text-lg);
      font-weight: var(--au-weight-semibold);
    }

    .docs-roadmap h2:first-child {
      margin-top: 0;
    }

    .docs-roadmap__table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--au-text-sm);
    }

    .docs-roadmap__table th,
    .docs-roadmap__table td {
      padding: var(--au-space-3) var(--au-space-4);
      border-bottom: 1px solid var(--docs-border-fine);
      text-align: left;
    }

    .docs-roadmap__versions {
      margin: 0;
      padding-left: 1.25rem;
      line-height: var(--au-leading-relaxed);
    }

    .docs-roadmap__links {
      margin-top: var(--au-space-6);
    }

    .docs-roadmap__links a {
      color: var(--au-color-accent);
    }
  `,
})
export class EcosystemRoadmapPage {
  readonly i18n = inject(DocsLocaleService);
  readonly eco = computed(() => this.i18n.messages().ecosystem);
  readonly githubRoadmap = `${DOCS_EXTERNAL_LINKS.github}/blob/develop/docs/ROADMAP.md`;
  readonly v1Criteria = `${DOCS_EXTERNAL_LINKS.github}/blob/develop/docs/V1_CRITERIA.md`;
}
