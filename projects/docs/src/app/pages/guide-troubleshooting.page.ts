import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { DocsLocaleService } from '../core/docs-locale.service';
import { DocPage } from '../shared/doc-page';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage],
  template: `
    <docs-page
      [title]="i18n.messages().guides.troubleshooting.title"
      [lead]="i18n.messages().guides.troubleshooting.lead"
    >
      <div class="docs-troubleshooting-table-wrap">
        <table class="docs-troubleshooting-table">
          <thead>
            <tr>
              <th scope="col">{{ colProblem() }}</th>
              <th scope="col">{{ colCause() }}</th>
              <th scope="col">{{ colFix() }}</th>
            </tr>
          </thead>
          <tbody>
            @for (row of rows(); track row.problem) {
              <tr>
                <td>{{ row.problem }}</td>
                <td>{{ row.cause }}</td>
                <td>{{ row.fix }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </docs-page>
  `,
  styles: `
    .docs-troubleshooting-table-wrap {
      overflow-x: auto;
      margin-top: var(--au-space-4);
    }

    .docs-troubleshooting-table {
      width: 100%;
      min-width: 36rem;
      border-collapse: collapse;
      font-size: var(--au-text-sm);
    }

    .docs-troubleshooting-table th,
    .docs-troubleshooting-table td {
      padding: var(--au-space-3) var(--au-space-4);
      border: 1px solid var(--docs-border-fine);
      text-align: left;
      vertical-align: top;
      line-height: var(--au-leading-relaxed);
    }

    .docs-troubleshooting-table th {
      background: var(--au-color-surface-raised);
      font-weight: var(--au-weight-semibold);
    }

    .docs-troubleshooting-table tbody tr:nth-child(even) td {
      background: color-mix(in srgb, var(--au-color-surface-sunken) 40%, transparent);
    }
  `,
})
export class GuideTroubleshootingPage {
  readonly i18n = inject(DocsLocaleService);

  readonly rows = computed(() => this.i18n.messages().guides.troubleshooting.items);

  readonly colProblem = computed(() =>
    this.i18n.locale() === 'en' ? 'Symptom' : 'Síntoma',
  );
  readonly colCause = computed(() => (this.i18n.locale() === 'en' ? 'Cause' : 'Causa'));
  readonly colFix = computed(() => (this.i18n.locale() === 'en' ? 'Fix' : 'Solución'));
}
