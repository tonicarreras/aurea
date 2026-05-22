import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { ComponentStylingToken } from '../core/component-docs.registry';
import { DocsInlineText } from './docs-inline-text';

@Component({
  selector: 'docs-token-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocsInlineText],
  template: `
    <ul class="docs-token-list">
      @for (token of tokens(); track token.token) {
        <li class="docs-token-list__item">
          <code>{{ token.token }}</code>
          <span><docs-inline-text [text]="token.description" /></span>
        </li>
      }
    </ul>
  `,
  styles: `
    .docs-token-list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: var(--au-space-3);
    }

    .docs-token-list__item {
      display: grid;
      grid-template-columns: minmax(10rem, 1fr) 2fr;
      gap: var(--au-space-3);
      align-items: baseline;
      padding-bottom: var(--au-space-3);
      border-bottom: 1px solid var(--docs-border-fine);
      font-size: var(--au-text-sm);
      color: var(--au-color-text-secondary);
    }

    .docs-token-list__item code {
      color: var(--au-color-accent);
      font-size: 0.92em;
    }

    @media (max-width: 40rem) {
      .docs-token-list__item {
        grid-template-columns: 1fr;
        gap: var(--au-space-1);
      }
    }
  `,
})
export class DocsTokenList {
  readonly tokens = input.required<ComponentStylingToken[]>();
}
