import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, Type } from '@angular/core';

import { CodeBlock } from './code-block';
import { type CodeLanguage } from './code-highlight';
import { DemoPanel } from './demo-panel';

@Component({
  selector: 'docs-component-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, DemoPanel, CodeBlock],
  template: `
    <article class="docs-example">
      <header class="docs-example__header">
        <h3 class="docs-example__title">{{ title() }}</h3>
        @if (description()) {
          <p class="docs-example__desc">{{ description() }}</p>
        }
      </header>

      <docs-demo-panel [compact]="true">
        <ng-container *ngComponentOutlet="demoComponent()" />
      </docs-demo-panel>

      <docs-code-block
        [code]="code()"
        [language]="language()"
        [showLanguage]="false"
        expandLabel="Código"
        collapseLabel="Ocultar código"
      />
    </article>
  `,
  styles: `
    .docs-example {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-4);
    }

    .docs-example__header {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-1);
    }

    .docs-example__title {
      margin: 0;
      font-size: var(--au-text-base);
      font-weight: var(--au-weight-semibold);
      letter-spacing: var(--au-tracking-tight);
    }

    .docs-example__desc {
      margin: 0;
      max-width: min(62rem, 100%);
      color: var(--au-color-text-secondary);
      font-size: var(--au-text-sm);
      line-height: var(--au-leading-relaxed);
    }
  `,
})
export class DocsComponentExample {
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly demoComponent = input.required<Type<unknown>>();
  readonly code = input.required<string>();
  readonly language = input<CodeLanguage>('html');
}
