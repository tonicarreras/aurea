import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuButton, AuDivider } from '@aurea-design-system/components';

import { COMPONENT_DOCS } from '../core/component-docs.registry';
import { DOCS_ROUTES } from '../core/docs-locale';
import { DocsLocaleService } from '../core/docs-locale.service';
import { DocPage } from '../shared/doc-page';
import { DocsInlineText } from '../shared/docs-inline-text';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, RouterLink, AuButton, AuDivider, DocsInlineText],
  template: `
    <docs-page
      [hero]="true"
      [eyebrow]="i18n.messages().home.eyebrow"
      [title]="i18n.messages().home.title"
      [lead]="i18n.messages().home.lead"
    >
      <section class="docs-home-stats" [attr.aria-label]="i18n.messages().home.statsAria">
        @for (stat of stats(); track stat.label; let i = $index) {
          <article
            class="docs-home-stats__card"
            [style.animation-delay]="i * 80 + 'ms'"
          >
            <span class="docs-home-stats__value">{{ stat.value }}</span>
            <span class="docs-home-stats__label">{{ stat.label }}</span>
          </article>
        }
      </section>

      <section class="docs-home-grid" [attr.aria-label]="i18n.messages().home.exploreAria">
        @for (card of exploreCards(); track card.title; let i = $index) {
          <a
            class="docs-home-grid__card"
            [routerLink]="card.link"
            [style.animation-delay]="120 + i * 70 + 'ms'"
          >
            <span class="docs-home-grid__icon" aria-hidden="true">{{ card.icon }}</span>
            <span class="docs-home-grid__title">{{ card.title }}</span>
            <span class="docs-home-grid__text">{{ card.text }}</span>
            <span class="docs-home-grid__arrow" aria-hidden="true">→</span>
          </a>
        }
      </section>

      <au-divider />

      <p>
        <docs-inline-text [text]="i18n.messages().home.footer" />
      </p>

      <div class="docs-home-cta">
        <a [routerLink]="i18n.link(DOCS_ROUTES.components, 'button')">
          <au-button variant="primary">{{ i18n.messages().home.ctaComponents }}</au-button>
        </a>
        <a [routerLink]="i18n.link(DOCS_ROUTES.getStarted)">
          <au-button variant="outline">{{ i18n.messages().home.ctaInstall }}</au-button>
        </a>
      </div>
    </docs-page>
  `,
  styles: [
    `
      .docs-home-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
        gap: var(--au-space-3);
        margin: 0;
        padding: 0;
        list-style: none;
      }

      :host-context([data-au-theme='dark']) .docs-home-stats__card,
      :host-context([data-au-theme='dark']) .docs-home-grid__card {
        border-color: var(--docs-border-fine);
        background: var(--au-color-surface-raised);
        backdrop-filter: none;
      }

      .docs-home-stats__card {
        margin: 0;
        padding: var(--au-space-4);
        border-radius: var(--au-radius-lg);
        border: 1px solid color-mix(in srgb, var(--au-color-border-subtle) 90%, transparent);
        background: color-mix(in srgb, var(--au-color-surface-raised) 88%, transparent);
        backdrop-filter: blur(6px);
        animation: docs-fade-up 0.5s var(--au-ease-out) both;
        transition:
          transform var(--au-duration-short) var(--au-ease-emph),
          box-shadow var(--au-duration-short) var(--au-ease-in-out),
          border-color var(--au-duration-short) var(--au-ease-in-out);
      }

      @media (hover: hover) {
        .docs-home-stats__card:hover {
          transform: translateY(-2px);
          border-color: color-mix(in srgb, var(--au-color-accent) 35%, transparent);
        }

        :host-context([data-au-theme='dark']) .docs-home-stats__card:hover {
          transform: none;
          border-color: color-mix(in srgb, var(--au-color-border-subtle) 70%, transparent);
        }
      }

      .docs-home-stats__value {
        display: block;
        font-size: var(--au-text-xl);
        font-weight: var(--au-weight-bold);
        letter-spacing: var(--au-tracking-tight);
        color: var(--au-color-text-primary);
      }

      .docs-home-stats__label {
        display: block;
        margin-top: var(--au-space-1);
        font-size: var(--au-text-sm);
        color: var(--au-color-text-secondary);
      }

      .docs-home-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
        gap: var(--au-space-3);
      }

      .docs-home-grid__card {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--au-space-2);
        padding: var(--au-space-5);
        min-height: 9rem;
        border-radius: var(--au-radius-lg);
        border: 1px solid var(--au-color-border-subtle);
        background: var(--au-color-surface-raised);
        text-decoration: none;
        overflow: hidden;
        animation: docs-fade-up 0.55s var(--au-ease-out) both;
        transition:
          transform var(--au-duration-default) var(--au-ease-emph),
          border-color var(--au-duration-short) var(--au-ease-in-out),
          box-shadow var(--au-duration-short) var(--au-ease-in-out);
      }

      .docs-home-grid__card::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          105deg,
          transparent 40%,
          color-mix(in srgb, var(--au-color-accent) 8%, transparent) 50%,
          transparent 60%
        );
        transform: translateX(-120%);
        transition: transform 0.6s var(--au-ease-out);
      }

      @media (hover: hover) {
        .docs-home-grid__card:hover {
          transform: translateY(-2px);
          border-color: var(--au-color-accent);
        }

        .docs-home-grid__card:hover::after {
          transform: translateX(120%);
        }

        :host-context([data-au-theme='dark']) .docs-home-grid__card:hover {
          transform: none;
          border-color: color-mix(in srgb, var(--au-color-border-subtle) 70%, transparent);
        }

        :host-context([data-au-theme='dark']) .docs-home-grid__card:hover::after {
          transform: translateX(-120%);
        }
      }

      .docs-home-grid__card:hover .docs-home-grid__arrow {
        transform: translateX(4px);
        opacity: 1;
      }

      .docs-home-grid__icon {
        font-size: 1.5rem;
        line-height: 1;
      }

      .docs-home-grid__title {
        font-weight: var(--au-weight-semibold);
        color: var(--au-color-text-primary);
      }

      .docs-home-grid__text {
        font-size: var(--au-text-sm);
        color: var(--au-color-text-secondary);
        line-height: var(--au-leading-relaxed);
      }

      .docs-home-grid__arrow {
        margin-top: auto;
        font-size: var(--au-text-lg);
        color: var(--au-color-accent);
        opacity: 0.6;
        transition:
          transform var(--au-duration-short) var(--au-ease-emph),
          opacity var(--au-duration-short) var(--au-ease-in-out);
      }

      .docs-home-cta {
        display: flex;
        flex-wrap: wrap;
        gap: var(--au-space-3);
        margin-top: var(--au-space-2);
      }

      .docs-home-cta a {
        text-decoration: none;
      }

      @media (max-width: 48rem) {
        .docs-home-stats,
        .docs-home-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class HomePage {
  readonly i18n = inject(DocsLocaleService);
  readonly DOCS_ROUTES = DOCS_ROUTES;
  readonly componentCount = COMPONENT_DOCS.length;

  readonly stats = computed(() => {
    const m = this.i18n.messages().home;
    return [
      { value: String(this.componentCount), label: m.statsComponents },
      { value: 'WCAG 2.2', label: m.statsA11y },
      { value: 'Signals', label: m.statsForms },
    ];
  });

  readonly exploreCards = computed(() => {
    const m = this.i18n.messages().home;
    const link = this.i18n.link.bind(this.i18n);
    return [
      {
        icon: '⚡',
        title: m.cardGetStartedTitle,
        text: m.cardGetStartedText,
        link: link(DOCS_ROUTES.getStarted),
      },
      {
        icon: '◐',
        title: m.cardThemesTitle,
        text: m.cardThemesText,
        link: link(DOCS_ROUTES.themes),
      },
      {
        icon: '▣',
        title: m.cardComponentsTitle,
        text: m.cardComponentsText,
        link: link(DOCS_ROUTES.components),
      },
    ];
  });
}
