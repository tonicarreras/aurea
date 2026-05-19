import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'docs-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="docs-page">
      <header class="docs-page__header">
        <h1 class="docs-page__title">{{ title() }}</h1>
        @if (lead()) {
          <p class="docs-page__lead">{{ lead() }}</p>
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
        max-width: 48rem;
      }

      .docs-page__title {
        margin: 0 0 var(--au-space-3);
        font-size: var(--au-text-xl);
        font-weight: var(--au-weight-semibold);
        letter-spacing: var(--au-tracking-tight);
        line-height: var(--au-leading-snug);
      }

      .docs-page__lead {
        margin: 0 0 var(--au-space-6);
        font-size: var(--au-text-lg);
        color: var(--au-color-text-secondary);
        line-height: var(--au-leading-relaxed);
      }

      .docs-page__body {
        display: flex;
        flex-direction: column;
        gap: var(--au-space-6);
      }

      ::ng-deep .docs-page__body h2 {
        margin: var(--au-space-8) 0 var(--au-space-3);
        font-size: var(--au-text-lg);
        font-weight: var(--au-weight-semibold);
      }

      ::ng-deep .docs-page__body p,
      ::ng-deep .docs-page__body ul {
        margin: 0 0 var(--au-space-4);
        color: var(--au-color-text-secondary);
      }

      ::ng-deep .docs-page__body ul {
        padding-left: var(--au-space-5);
      }

      ::ng-deep .docs-page__body li + li {
        margin-top: var(--au-space-2);
      }
    `,
  ],
})
export class DocPage {
  readonly title = input.required<string>();
  readonly lead = input<string>('');
}
