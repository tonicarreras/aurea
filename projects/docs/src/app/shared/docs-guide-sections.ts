import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { GuideSection } from '../i18n/types/guides';
import { CodeBlock } from './code-block';
import { DocsInlineText } from './docs-inline-text';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'docs-guide-sections',
  imports: [DocsInlineText, CodeBlock],
  template: `
    @for (section of sections(); track section.heading) {
      <section class="docs-guide-section">
        <h2>{{ section.heading }}</h2>
        <p>
          <docs-inline-text [text]="section.body" />
        </p>
        @if (section.code && section.codeLanguage) {
          <docs-code-block
            [code]="section.code"
            [language]="section.codeLanguage"
            [expandLabel]="section.expandLabel ?? 'Show code'"
          />
        }
      </section>
    }
  `,
  styles: `
    .docs-guide-section {
      margin-top: var(--au-space-8);
    }

    .docs-guide-section h2 {
      margin: 0 0 var(--au-space-3);
      font-size: var(--au-text-lg);
      font-weight: var(--au-weight-semibold);
    }

    .docs-guide-section p {
      margin: 0 0 var(--au-space-4);
      max-width: min(62rem, 100%);
      line-height: var(--au-leading-relaxed);
    }
  `,
})
export class DocsGuideSections {
  readonly sections = input.required<GuideSection[]>();
}
