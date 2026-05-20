import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { ComponentApiEntry } from '../core/component-docs.registry';
import { DocsInlineText } from './docs-inline-text';

@Component({
  selector: 'docs-component-api-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocsInlineText],
  template: `
    <div class="docs-api-table-wrap" tabindex="0">
      <table class="docs-api-table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Tipo</th>
            <th scope="col">Descripción</th>
            <th scope="col">Por defecto</th>
            <th scope="col">Rol</th>
          </tr>
        </thead>
        <tbody>
          @for (row of rows(); track row.name) {
            <tr>
              <td><code>{{ row.name }}</code></td>
              <td><code>{{ row.type }}</code></td>
              <td class="docs-api-table__desc">
                <docs-inline-text [text]="row.description" />
              </td>
              <td>
                @if (row.defaultValue) {
                  <code>{{ row.defaultValue }}</code>
                } @else {
                  <span class="docs-api-table__empty">—</span>
                }
              </td>
              <td>
                @if (row.kind) {
                  <span class="docs-api-table__kind">{{ row.kind }}</span>
                } @else {
                  <span class="docs-api-table__empty">—</span>
                }
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      .docs-api-table-wrap {
        overflow-x: auto;
        margin: 0;
      }

      .docs-api-table {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--au-text-sm);
      }

      .docs-api-table th,
      .docs-api-table td {
        padding: var(--au-space-2-5) var(--au-space-3);
        text-align: start;
        vertical-align: top;
        border-bottom: 1px solid var(--docs-border-fine);
      }

      .docs-api-table th {
        font-weight: var(--au-weight-semibold);
        color: var(--au-color-text-secondary);
        font-size: var(--au-text-xs);
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .docs-api-table td code {
        font-size: 0.92em;
        color: var(--au-color-accent);
      }

      .docs-api-table__desc {
        line-height: var(--au-leading-relaxed);
        color: var(--au-color-text-secondary);
      }

      .docs-api-table__desc .docs-inline-code {
        white-space: normal;
        text-wrap: wrap;
      }

      .docs-api-table__empty {
        color: var(--au-color-text-tertiary);
      }

      .docs-api-table__kind {
        font-size: var(--au-text-2xs);
        font-weight: var(--au-weight-semibold);
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--au-color-text-tertiary);
      }
    `,
  ],
})
export class ComponentDocApiTable {
  readonly rows = input.required<ComponentApiEntry[]>();
}
