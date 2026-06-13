import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuButton, AuCard } from '@aurea-design-system/components';

import { COMPONENT_DOCS, componentDocSummary } from '../core/component-docs.registry';
import { getDocsComponentMaturity } from '../core/docs-component-maturity';
import { DOCS_EXTERNAL_LINKS } from '../core/docs-external-links';
import { DOCS_ROUTES } from '../core/docs-locale';
import { DocsLocaleService } from '../core/docs-locale.service';
import { LandingPreviewsCarousel } from '../shared/landing-previews-carousel';
import { DocsInlineText } from '../shared/docs-inline-text';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AuButton, AuCard, LandingPreviewsCarousel, DocsInlineText],
  template: `
    <div class="landing">
      <section class="landing-hero">
        <p class="landing-hero__eyebrow">{{ m().eyebrow }}</p>
        <h1 class="landing-hero__title">
          <span class="landing-hero__title-line">{{ m().title }}</span>
          <span class="landing-hero__title-accent">{{ m().titleAccent }}</span>
        </h1>
        <p class="landing-hero__lead">{{ m().lead }}</p>
        <div class="landing-hero__cta">
          <a [routerLink]="i18n.link(DOCS_ROUTES.guidesCrudDemo)">
            <button auButton variant="primary">{{ m().ctaCrudDemo }}</button>
          </a>
          <a [routerLink]="i18n.link(DOCS_ROUTES.components)">
            <button auButton variant="outline">{{ m().ctaDocs }}</button>
          </a>
          <a
            [href]="storybookUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button auButton variant="ghost">{{ m().ctaStorybook }}</button>
          </a>
        </div>
      </section>

      <section
        class="landing-overview"
        [attr.aria-labelledby]="'landing-overview-title'"
      >
        <h2
          id="landing-overview-title"
          class="landing-section__title"
        >
          {{ m().overviewTitle }}
        </h2>
        <ul
          class="landing-principles"
          [attr.aria-label]="m().overviewAria"
        >
          @for (card of m().principles; track card.title; let i = $index) {
            <li
              class="landing-principles__item landing-principles__item--{{ card.accent }}"
              [style.animation-delay]="80 + i * 90 + 'ms'"
            >
              <au-card
                variant="outlined"
                size="lg"
                class="landing-principles__card"
              >
                <h3 auCardHeader>{{ card.title }}</h3>
                <p
                  auCardBody
                  class="landing-principles__text"
                >
                  <docs-inline-text [text]="card.text" />
                </p>
              </au-card>
            </li>
          }
        </ul>
      </section>

      <section
        class="landing-system"
        aria-labelledby="landing-system-title"
      >
        <h2
          id="landing-system-title"
          class="landing-section__title"
        >
          {{ m().systemTitle }}
        </h2>
        <p class="landing-system__lead">
          <docs-inline-text [text]="m().systemLead" />
        </p>
        <ul class="landing-system__points">
          @for (point of m().systemPoints; track point) {
            <li><docs-inline-text [text]="point" /></li>
          }
        </ul>
        <p class="landing-system__link">
          <a [routerLink]="i18n.link(DOCS_ROUTES.themes)">{{ m().themesLink }} →</a>
        </p>
      </section>

      <section
        class="landing-previews"
        aria-labelledby="landing-previews-title"
      >
        <h2
          id="landing-previews-title"
          class="landing-section__title"
        >
          {{ m().previewsTitle }}
        </h2>
        <p class="landing-previews__lead">{{ m().previewsLead }}</p>
        <docs-landing-previews-carousel
          [docs]="previewDocs()"
          [slugLink]="docLinkFn"
        />
      </section>

      <footer class="landing-footer">
        <docs-inline-text [text]="m().footer" />
        <a [routerLink]="i18n.link(DOCS_ROUTES.components)">
          <button auButton variant="primary">{{ m().ctaDocs }}</button>
        </a>
      </footer>
    </div>
  `,
  styles: `
    .landing {
      width: 100%;
      max-width: min(84rem, 100%);
      margin: 0 auto;
      padding: var(--au-space-2) 0 var(--au-space-12);
      display: flex;
      flex-direction: column;
      gap: var(--au-space-12);
    }

    .landing-hero {
      padding: var(--au-space-8) 0 var(--au-space-4);
      animation: docs-fade-up 0.65s var(--au-ease-out) both;
    }

    .landing-hero__eyebrow {
      margin: 0 0 var(--au-space-3);
      font-size: var(--au-text-xs);
      font-weight: var(--au-weight-semibold);
      letter-spacing: var(--au-tracking-caps);
      text-transform: uppercase;
      color: var(--au-color-text-tertiary);
    }

    .landing-hero__title {
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--au-space-1);
      max-width: 16ch;
      font-size: clamp(2.35rem, 5.5vw, 3.5rem);
      font-weight: var(--au-weight-bold);
      letter-spacing: var(--au-tracking-tight);
      line-height: 1.05;
    }

    .landing-hero__title-line {
      color: var(--au-color-text-primary);
    }

    .landing-hero__title-accent {
      color: var(--au-color-action-primary);
    }

    .landing-hero__lead {
      margin: var(--au-space-4) 0 0;
      max-width: 42rem;
      font-size: var(--au-text-md);
      line-height: var(--au-leading-relaxed);
      color: var(--au-color-text-secondary);
    }

    .landing-hero__cta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--au-space-3);
      margin-top: var(--au-space-6);
    }

    .landing-hero__cta a {
      text-decoration: none;
    }

    .landing-section__title {
      margin: 0 0 var(--au-space-5);
      font-size: var(--au-text-xl);
      font-weight: var(--au-weight-semibold);
      letter-spacing: var(--au-tracking-tight);
    }

    .landing-overview {
      position: relative;
      overflow: hidden;
      padding: clamp(var(--au-space-8), 5vw, var(--au-space-10))
        clamp(var(--au-space-5), 4vw, var(--au-space-8));
      border-radius: var(--au-radius-xl);
      border: 1px solid var(--docs-border-fine);
      background-color: var(--au-color-surface-raised);
      background-image: radial-gradient(
        120% 90% at 18% -8%,
        color-mix(in srgb, var(--au-color-action-primary) 11%, transparent),
        transparent 62%
      );
      background-repeat: no-repeat;
      box-shadow: var(--docs-elevated-shadow);
    }

    .landing-overview::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: radial-gradient(
        95% 75% at 88% 105%,
        color-mix(in srgb, #c9a227 12%, transparent),
        transparent 68%
      );
      background-repeat: no-repeat;
      pointer-events: none;
      z-index: 0;
    }

    .landing-overview > * {
      position: relative;
      z-index: 1;
    }

    :host-context([data-au-theme='dark']) .landing-overview {
      background-color: var(--au-color-surface-raised);
      background-image: radial-gradient(
        120% 90% at 18% -8%,
        color-mix(in srgb, var(--au-color-action-primary) 14%, transparent),
        transparent 65%
      );
      box-shadow: 0 8px 32px color-mix(in srgb, #000 22%, transparent);
    }

    :host-context([data-au-theme='dark']) .landing-overview::before {
      background: radial-gradient(
        95% 75% at 88% 105%,
        color-mix(in srgb, #c9a227 8%, transparent),
        transparent 70%
      );
    }

    .landing-principles {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: var(--au-space-5);
    }

    .landing-principles__item {
      animation: docs-fade-up 0.55s var(--au-ease-out) both;
    }

    .landing-principles__card {
      height: 100%;
      transition:
        transform var(--au-duration-default) var(--au-ease-emph),
        border-color var(--au-duration-short) var(--au-ease-in-out),
        box-shadow var(--au-duration-short) var(--au-ease-in-out);
    }

    .landing-principles__item--hierarchy .landing-principles__card {
      border-color: color-mix(in srgb, var(--au-color-action-primary) 22%, transparent);
    }

    .landing-principles__item--tokens .landing-principles__card {
      border-color: color-mix(in srgb, #c9a227 28%, transparent);
    }

    .landing-principles__item--a11y .landing-principles__card {
      border-color: color-mix(in srgb, var(--au-color-semantic-success) 30%, transparent);
    }

    @media (hover: hover) {
      .landing-principles__item:hover .landing-principles__card {
        transform: translateY(-4px);
        box-shadow: var(--docs-elevated-shadow);
      }
    }

    .landing-principles__card h3 {
      font-size: var(--au-text-md);
    }

    .landing-principles__text {
      margin: 0;
      font-size: var(--au-text-sm);
      line-height: var(--au-leading-relaxed);
      color: var(--au-color-text-secondary);
    }

    .landing-previews {
      padding-top: var(--au-space-2);
    }

    .landing-system {
      padding: var(--au-space-8);
      border-radius: var(--au-radius-lg);
      border: 1px solid var(--docs-border-fine);
      background: color-mix(
        in srgb,
        var(--au-color-surface-raised) 65%,
        var(--au-color-surface-canvas)
      );
      animation: docs-fade-up 0.6s var(--au-ease-out) 0.1s both;
    }

    .landing-system__lead {
      margin: 0 0 var(--au-space-4);
      max-width: 40rem;
      color: var(--au-color-text-secondary);
      line-height: var(--au-leading-relaxed);
    }

    .landing-system__points {
      margin: 0;
      padding-left: var(--au-space-5);
      color: var(--au-color-text-secondary);
      line-height: var(--au-leading-relaxed);
    }

    .landing-system__points li + li {
      margin-top: var(--au-space-2);
    }

    .landing-system__link {
      margin: var(--au-space-5) 0 0;
      font-size: var(--au-text-sm);
    }

    .landing-system__link a {
      color: var(--au-color-accent);
      font-weight: var(--au-weight-medium);
      text-decoration: none;
    }

    .landing-previews__lead {
      margin: 0 0 var(--au-space-5);
      max-width: 40rem;
      color: var(--au-color-text-secondary);
      line-height: var(--au-leading-relaxed);
    }

    .landing-footer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--au-space-4);
      padding-top: var(--au-space-6);
      border-top: 1px solid var(--docs-border-fine);
      font-size: var(--au-text-sm);
      color: var(--au-color-text-secondary);
      line-height: var(--au-leading-relaxed);
    }

    .landing-footer a {
      text-decoration: none;
    }

    @media (max-width: 56rem) {
      .landing-principles {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 40rem) {
      .landing-hero__title {
        max-width: none;
        font-size: clamp(2rem, 8vw, 2.75rem);
      }

      .landing-overview {
        padding: var(--au-space-6) var(--au-space-4);
      }
    }
  `,
})
export class LandingPage {
  readonly i18n = inject(DocsLocaleService);
  readonly DOCS_ROUTES = DOCS_ROUTES;
  readonly storybookUrl = DOCS_EXTERNAL_LINKS.storybook;
  readonly m = computed(() => this.i18n.messages().landing);

  /** V1: landing carousel shows **stable** components only (no beta/experimental). */
  readonly previewDocs = computed(() =>
    COMPONENT_DOCS.filter((doc) => getDocsComponentMaturity(doc.slug).level === 'stable').map(
      (doc) => ({
        ...doc,
        summary: componentDocSummary(doc, this.i18n.locale()),
      }),
    ),
  );

  readonly docLinkFn = (slug: string): string[] => this.i18n.link(DOCS_ROUTES.components, slug);
}
