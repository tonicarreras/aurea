import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { DocsInlineText } from './docs-inline-text';

@Component({
  selector: 'docs-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocsInlineText],
  host: {
    '[class.docs-page--hero]': 'hero()',
  },
  template: `
    <article class="docs-page">
      <header class="docs-page__header">
        @if (hero()) {
          <p class="docs-page__eyebrow">{{ eyebrow() }}</p>
        }
        <h1 class="docs-page__title">{{ title() }}</h1>
        @if (lead()) {
          <p class="docs-page__lead"><docs-inline-text [text]="lead()" /></p>
        }
      </header>
      <div class="docs-page__body">
        <ng-content />
      </div>
    </article>
  `,
  styles: [
    `
      .docs-page {
        width: 100%;
        max-width: 100%;
        animation: docs-fade-up 0.6s var(--au-ease-out) both;
      }

      .docs-page--hero .docs-page {
        max-width: 100%;
      }

      .docs-page__header {
        margin-bottom: var(--au-space-2);
        padding-bottom: var(--au-space-6);
        border-bottom: 1px solid var(--docs-border-fine);
      }

      :host-context([data-au-theme='dark']) .docs-page__header {
        border-bottom: none;
        padding-bottom: var(--au-space-5);
      }

      .docs-page__eyebrow {
        margin: 0 0 var(--au-space-3);
        font-size: var(--au-text-xs);
        font-weight: var(--au-weight-semibold);
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--au-color-accent);
        animation: docs-fade-up 0.5s var(--au-ease-out) 0.05s both;
      }

      .docs-page__title {
        margin: 0 0 var(--au-space-3);
        font-size: clamp(1.875rem, 3.5vw, 2.5rem);
        font-weight: var(--au-weight-semibold);
        letter-spacing: var(--au-tracking-tight);
        line-height: 1.15;
        animation: docs-fade-up 0.55s var(--au-ease-out) 0.08s both;
      }

      .docs-page--hero .docs-page__title {
        background: linear-gradient(
          125deg,
          var(--au-color-text-primary) 0%,
          var(--au-color-accent) 48%,
          #c026d3 100%
        );
        background-size: 200% auto;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation:
          docs-fade-up 0.55s var(--au-ease-out) 0.08s both,
          docs-gradient-shift 10s var(--au-ease-in-out) infinite;
      }

      .docs-page__lead {
        margin: 0;
        max-width: min(52rem, 100%);
        font-size: var(--au-text-lg);
        color: var(--au-color-text-secondary);
        line-height: var(--au-leading-relaxed);
        animation: docs-fade-up 0.55s var(--au-ease-out) 0.12s both;
      }

      .docs-page__body {
        display: flex;
        flex-direction: column;
        gap: var(--au-space-7);
        padding-top: var(--au-space-2);
        animation: docs-fade-up 0.55s var(--au-ease-out) 0.16s both;
      }

      :host-context([data-au-theme='light']) .docs-page__body {
        opacity: 0.92;
      }

      ::ng-deep .docs-page__body h2 {
        display: flex;
        align-items: center;
        gap: var(--au-space-3);
        margin: var(--au-space-2) 0 var(--au-space-3);
        font-size: var(--au-text-lg);
        font-weight: var(--au-weight-semibold);
        letter-spacing: var(--au-tracking-tight);
      }

      ::ng-deep .docs-page__body h2::before {
        content: '';
        width: 0.35rem;
        height: 1.1em;
        border-radius: var(--au-radius-pill);
        background: linear-gradient(180deg, var(--au-color-accent), #c026d3);
        flex-shrink: 0;
      }

      ::ng-deep .docs-page__body p,
      ::ng-deep .docs-page__body ul {
        margin: 0 0 var(--au-space-4);
        color: var(--au-color-text-secondary);
        max-width: min(62rem, 100%);
      }

      ::ng-deep .docs-page__body ul:not(.docs-requirements) {
        padding-left: var(--au-space-5);
      }

      ::ng-deep .docs-page__body p code,
      ::ng-deep .docs-page__body li code {
        padding: 0.1em 0.4em;
        border-radius: var(--au-radius-xs);
        background: color-mix(in srgb, var(--au-color-accent) 8%, var(--au-color-surface-raised));
        border: 1px solid var(--docs-border-fine);
        font-size: 0.9em;
        color: var(--au-color-text-primary);
      }

      :host-context([data-au-theme='dark']) ::ng-deep .docs-page__body p code,
      :host-context([data-au-theme='dark']) ::ng-deep .docs-page__body li code {
        border-color: transparent;
        background: color-mix(in srgb, var(--au-color-text-primary) 8%, transparent);
      }
    `,
  ],
})
export class DocPage {
  readonly title = input.required<string>();
  readonly lead = input<string>('');
  readonly hero = input(false);
  readonly eyebrow = input('Design system');
}
