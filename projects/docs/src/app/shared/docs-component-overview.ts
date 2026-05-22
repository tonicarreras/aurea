import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import type { ComponentDocOverview } from '../core/component-doc-overview';
import { DocsLocaleService } from '../core/docs-locale.service';
import { DocsInlineText } from './docs-inline-text';

@Component({
  selector: 'docs-component-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocsInlineText],
  template: `
    @if (overview(); as o) {
      <div class="docs-overview">
        <section
          class="docs-overview__intro"
          aria-labelledby="docs-overview-intro-heading"
        >
          <h3
            id="docs-overview-intro-heading"
            class="docs-overview__sr-only"
          >
            {{ ui().introSr }}
          </h3>
          @for (paragraph of o.intro; track $index) {
            <p class="docs-overview__intro-p">
              <docs-inline-text [text]="paragraph" />
            </p>
          }

          @if (o.relatedExports?.length) {
            <div class="docs-overview__exports">
              <span class="docs-overview__exports-label">{{ ui().relatedExports }}</span>
              <ul class="docs-overview__export-chips">
                @for (exportName of o.relatedExports; track exportName) {
                  <li>
                    <code class="docs-overview__chip">{{ exportName }}</code>
                  </li>
                }
              </ul>
            </div>
          }
        </section>

        <div class="docs-overview__guidance">
          <article class="docs-overview__card">
            <header class="docs-overview__card-head">
              <span
                class="docs-overview__card-marker"
                aria-hidden="true"
              ></span>
              <h3 class="docs-overview__card-title">{{ o.whenToUse.title }}</h3>
            </header>
            <ul class="docs-overview__list">
              @for (item of o.whenToUse.items; track item) {
                <li><docs-inline-text [text]="item" /></li>
              }
            </ul>
          </article>

          @if (o.whenNotToUse) {
            <article class="docs-overview__card docs-overview__card--alt">
              <header class="docs-overview__card-head">
                <span
                  class="docs-overview__card-marker docs-overview__card-marker--alt"
                  aria-hidden="true"
                ></span>
                <h3 class="docs-overview__card-title">{{ o.whenNotToUse.title }}</h3>
              </header>
              <ul class="docs-overview__list">
                @for (item of o.whenNotToUse.items; track $index) {
                  <li><docs-inline-text [text]="item" /></li>
                }
              </ul>
            </article>
          }
        </div>

        <article class="docs-overview__card">
          <header class="docs-overview__card-head">
            <span
              class="docs-overview__card-marker"
              aria-hidden="true"
            ></span>
            <h3 class="docs-overview__card-title">{{ ui().anatomy }}</h3>
          </header>
          <dl class="docs-overview__anatomy">
            @for (row of o.anatomy; track row.region) {
              <div class="docs-overview__anatomy-row">
                <dt><docs-inline-text [text]="row.region" /></dt>
                <dd><docs-inline-text [text]="row.detail" /></dd>
              </div>
            }
          </dl>
        </article>

        <article class="docs-overview__card">
          <header class="docs-overview__card-head">
            <span
              class="docs-overview__card-marker"
              aria-hidden="true"
            ></span>
            <h3 class="docs-overview__card-title">{{ ui().accessibility }}</h3>
          </header>
          <ul class="docs-overview__list">
            @for (item of o.accessibility; track item) {
              <li><docs-inline-text [text]="item" /></li>
            }
          </ul>
        </article>

        @if (o.keyboard?.length) {
          <article class="docs-overview__card">
            <header class="docs-overview__card-head">
              <span
                class="docs-overview__card-marker"
                aria-hidden="true"
              ></span>
              <h3 class="docs-overview__card-title">{{ ui().keyboard }}</h3>
            </header>
            <ul class="docs-overview__list">
              @for (item of o.keyboard; track item) {
                <li><docs-inline-text [text]="item" /></li>
              }
            </ul>
          </article>
        }
      </div>
    }
  `,
  styles: `
    .docs-overview {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-8);
      max-width: min(62rem, 100%);
    }

    .docs-overview__sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    .docs-overview__intro {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-4);
      padding: var(--au-space-5) var(--au-space-6);
      border-radius: var(--au-radius-lg);
      border: 1px solid var(--docs-border-fine);
      background: color-mix(
        in srgb,
        var(--au-color-surface-raised) 70%,
        var(--au-color-surface-canvas)
      );
    }

    :host-context([data-au-theme='dark']) .docs-overview__intro {
      border-color: var(--docs-border-fine);
      background: var(--au-color-surface-raised);
    }

    .docs-overview__intro-p {
      margin: 0;
      font-size: var(--au-text-md);
      line-height: var(--au-leading-relaxed);
      color: var(--au-color-text-secondary);
    }

    .docs-overview__intro-p + .docs-overview__intro-p {
      margin-top: var(--au-space-1);
    }

    .docs-overview__exports {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-2);
      padding-top: var(--au-space-3);
      border-top: 1px solid var(--docs-border-fine);
    }

    .docs-overview__exports-label {
      font-size: var(--au-text-xs);
      font-weight: var(--au-weight-semibold);
      letter-spacing: var(--au-tracking-caps);
      text-transform: uppercase;
      color: var(--au-color-text-tertiary);
    }

    .docs-overview__export-chips {
      display: flex;
      flex-wrap: wrap;
      gap: var(--au-space-2);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .docs-overview__chip {
      display: inline-block;
      padding: 0.2rem 0.55rem;
      border-radius: var(--au-radius-pill);
      border: 1px solid var(--docs-border-fine);
      background: var(--au-color-surface-raised);
      font-family: var(--au-font-mono);
      font-size: var(--au-text-xs);
      font-weight: var(--au-weight-medium);
      color: var(--au-color-accent);
    }

    .docs-overview__guidance {
      display: grid;
      gap: var(--au-space-5);
    }

    @media (min-width: 48rem) {
      .docs-overview__guidance {
        grid-template-columns: 1fr 1fr;
        align-items: start;
      }

      .docs-overview__guidance:has(.docs-overview__card:only-child) {
        grid-template-columns: 1fr;
      }
    }

    .docs-overview__card {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-4);
      padding: var(--au-space-5) var(--au-space-6);
      border-radius: var(--au-radius-lg);
      border: 1px solid var(--docs-border-fine);
      background: var(--au-color-surface-raised);
    }

    :host-context([data-au-theme='dark']) .docs-overview__card {
      border-color: var(--docs-border-fine);
      background: var(--au-color-surface-raised);
    }

    .docs-overview__card--alt {
      background: color-mix(
        in srgb,
        var(--au-color-surface-sunken) 40%,
        var(--au-color-surface-raised)
      );
    }

    :host-context([data-au-theme='dark']) .docs-overview__card--alt {
      background: var(--au-color-surface-elevated);
    }

    .docs-overview__card-head {
      display: flex;
      align-items: center;
      gap: var(--au-space-3);
      margin: 0;
      padding-bottom: var(--au-space-3);
      border-bottom: 1px solid var(--docs-border-fine);
    }

    .docs-overview__card-marker {
      flex-shrink: 0;
      width: 3px;
      align-self: stretch;
      min-height: 1.25rem;
      border-radius: var(--au-radius-pill);
      background: var(--au-color-action-primary);
    }

    .docs-overview__card-marker--alt {
      background: var(--au-color-text-tertiary);
    }

    .docs-overview__card-title {
      margin: 0;
      font-size: var(--au-text-sm);
      font-weight: var(--au-weight-semibold);
      letter-spacing: var(--au-tracking-caps);
      text-transform: uppercase;
      color: var(--au-color-text-primary);
    }

    .docs-overview__list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: var(--au-space-3);
    }

    .docs-overview__list li {
      position: relative;
      padding-inline-start: var(--au-space-5);
      font-size: var(--au-text-sm);
      line-height: var(--au-leading-relaxed);
      color: var(--au-color-text-secondary);
    }

    .docs-overview__list li::before {
      content: '';
      position: absolute;
      inset-inline-start: 0;
      top: 0.55em;
      width: 0.35rem;
      height: 0.35rem;
      border-radius: 50%;
      background: var(--au-color-action-primary);
      opacity: 0.55;
    }

    .docs-overview__card--alt .docs-overview__list li::before {
      background: var(--au-color-text-tertiary);
    }

    .docs-overview__anatomy {
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .docs-overview__anatomy-row {
      display: grid;
      grid-template-columns: minmax(9rem, 11rem) 1fr;
      gap: var(--au-space-4) var(--au-space-6);
      padding: var(--au-space-3) 0;
      font-size: var(--au-text-sm);
      border-bottom: 1px solid var(--docs-border-fine);
    }

    .docs-overview__anatomy-row:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .docs-overview__anatomy-row:first-child {
      padding-top: 0;
    }

    .docs-overview__anatomy-row dt {
      margin: 0;
      font-weight: var(--au-weight-semibold);
      color: var(--au-color-text-primary);
      line-height: var(--au-leading-snug);
    }

    .docs-overview__anatomy-row dd {
      margin: 0;
      color: var(--au-color-text-secondary);
      line-height: var(--au-leading-relaxed);
    }

    @media (max-width: 40rem) {
      .docs-overview__intro,
      .docs-overview__card {
        padding: var(--au-space-4) var(--au-space-4);
      }

      .docs-overview__anatomy-row {
        grid-template-columns: 1fr;
        gap: var(--au-space-1);
      }
    }
  `,
})
export class DocsComponentOverview {
  private readonly i18n = inject(DocsLocaleService);
  readonly overview = input<ComponentDocOverview | null>(null);

  readonly ui = computed(() => this.i18n.messages().overviewUi);
}
