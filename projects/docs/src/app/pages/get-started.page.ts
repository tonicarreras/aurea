import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DOCS_ROUTES } from '../core/docs-locale';
import { DocsLocaleService } from '../core/docs-locale.service';
import { CodeBlock } from '../shared/code-block';
import type { CodeLanguage } from '../shared/code-highlight';
import { DocPage } from '../shared/doc-page';

export interface GetStartedRequirement {
  name: string;
  version: string;
  href: string;
}

export type GetStartedStep =
  | {
      title: string;
      intro?: string;
      requirements: GetStartedRequirement[];
    }
  | {
      title: string;
      intro?: string;
      code: string;
      language: CodeLanguage;
      expandLabel: string;
    };

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, CodeBlock, RouterLink],
  template: `
    <docs-page
      [title]="i18n.messages().getStarted.title"
      [lead]="i18n.messages().getStarted.lead"
    >
      <ol class="docs-steps">
        @for (step of steps(); track step.title; let i = $index) {
          <li
            class="docs-steps__item"
            [style.animation-delay]="80 + i * 60 + 'ms'"
          >
            <span
              class="docs-steps__num"
              aria-hidden="true"
              >{{ i + 1 }}</span
            >
            <div class="docs-steps__content">
              <h2 class="docs-steps__title">{{ step.title }}</h2>
              @if (step.intro) {
                <p>{{ step.intro }}</p>
              }
              @if ('requirements' in step) {
                <ul class="docs-requirements">
                  @for (req of step.requirements; track req.name) {
                    <li class="docs-requirements__item">
                      <a
                        class="docs-requirements__link"
                        [href]="req.href"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {{ req.name }}
                      </a>
                      <span class="docs-requirements__version">{{ req.version }}</span>
                    </li>
                  }
                </ul>
              } @else if ('code' in step) {
                <docs-code-block
                  [code]="step.code"
                  [language]="step.language"
                  [expandLabel]="step.expandLabel"
                />
              }
            </div>
          </li>
        }
      </ol>
      <section
        class="docs-get-started-next"
        aria-labelledby="docs-get-started-next-title"
      >
        <h2
          id="docs-get-started-next-title"
          class="docs-get-started-next__title"
        >
          {{ i18n.messages().getStarted.steps.nextGuides.title }}
        </h2>
        <div class="docs-get-started-next__grid">
          <a
            class="docs-get-started-next__card docs-get-started-next__card--featured"
            [routerLink]="crudDemoLink()"
          >
            <span class="docs-get-started-next__eyebrow">{{
              i18n.messages().getStarted.steps.nextGuides.crudCardEyebrow
            }}</span>
            <h3 class="docs-get-started-next__card-title">
              {{ i18n.messages().getStarted.steps.nextGuides.crudCardTitle }}
            </h3>
            <p class="docs-get-started-next__card-lead">
              {{ i18n.messages().getStarted.steps.nextGuides.crudCardLead }}
            </p>
            <span class="docs-get-started-next__card-cta">{{
              i18n.messages().getStarted.steps.nextGuides.crudCardCta
            }}</span>
          </a>
          <a
            class="docs-get-started-next__card"
            [routerLink]="adoptionLink()"
          >
            <h3 class="docs-get-started-next__card-title">
              {{ i18n.messages().getStarted.steps.nextGuides.adoptionCardTitle }}
            </h3>
            <p class="docs-get-started-next__card-lead">
              {{ i18n.messages().getStarted.steps.nextGuides.adoptionCardLead }}
            </p>
            <span class="docs-get-started-next__card-cta">{{
              i18n.messages().getStarted.steps.nextGuides.adoptionCardCta
            }}</span>
          </a>
        </div>
      </section>
    </docs-page>
  `,
  styles: `
    .docs-steps {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: var(--au-space-6);
    }

    .docs-steps__item {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: var(--au-space-4);
      animation: docs-fade-up 0.5s var(--au-ease-out) both;
    }

    .docs-steps__num {
      display: grid;
      place-items: center;
      width: 2rem;
      height: 2rem;
      border-radius: var(--au-radius-pill);
      background: var(--au-color-accent-subtle);
      color: var(--au-color-accent);
      font-size: var(--au-text-sm);
      font-weight: var(--au-weight-bold);
    }

    .docs-steps__title {
      margin: 0 0 var(--au-space-2);
      font-size: var(--au-text-lg);
      font-weight: var(--au-weight-semibold);
    }

    .docs-steps__content p {
      margin: 0 0 var(--au-space-3);
    }

    .docs-requirements {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--au-space-3);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .docs-requirements__item {
      display: flex;
      align-items: center;
      align-self: center;
      gap: var(--au-space-2-5);
      box-sizing: border-box;
      height: 2rem;
      margin: 0;
      padding: 0 var(--au-space-4);
      border: 1px solid var(--docs-border-fine);
      border-radius: var(--au-radius-pill);
      background: var(--au-color-surface-raised);
      font-size: var(--au-text-sm);
      line-height: 1;
      flex-shrink: 0;
    }

    .docs-requirements__link {
      display: inline-flex;
      align-items: center;
      font-weight: var(--au-weight-semibold);
      font-size: inherit;
      line-height: 1;
      color: var(--au-color-accent);
      text-decoration: none;
    }

    .docs-requirements__link:hover {
      color: var(--au-color-accent-hover);
      text-decoration: underline;
    }

    .docs-get-started-next {
      margin-top: var(--au-space-8);
    }

    .docs-get-started-next__title {
      margin: 0 0 var(--au-space-5);
      font-size: var(--au-text-xl);
      font-weight: var(--au-weight-semibold);
    }

    .docs-get-started-next__grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--au-space-5);
    }

    .docs-get-started-next__card {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-3);
      min-height: 100%;
      padding: var(--au-space-6);
      border-radius: var(--au-radius-lg);
      border: 1px solid var(--docs-border-fine);
      background: var(--au-color-surface-raised);
      text-decoration: none;
      color: inherit;
      transition:
        transform var(--au-duration-default) var(--au-ease-emph),
        border-color var(--au-duration-short) var(--au-ease-in-out),
        box-shadow var(--au-duration-short) var(--au-ease-in-out);
    }

    .docs-get-started-next__card--featured {
      border-color: color-mix(in srgb, var(--au-color-action-primary) 32%, transparent);
      background-image: radial-gradient(
        120% 90% at 0% 0%,
        color-mix(in srgb, var(--au-color-action-primary) 10%, transparent),
        transparent 58%
      );
    }

    @media (hover: hover) {
      .docs-get-started-next__card:hover {
        transform: translateY(-2px);
        border-color: var(--au-color-accent);
        box-shadow: var(--docs-elevated-shadow);
      }
    }

    .docs-get-started-next__eyebrow {
      font-size: var(--au-text-xs);
      font-weight: var(--au-weight-semibold);
      letter-spacing: var(--au-tracking-caps);
      text-transform: uppercase;
      color: var(--au-color-action-primary);
    }

    .docs-get-started-next__card-title {
      margin: 0;
      font-size: var(--au-text-lg);
      font-weight: var(--au-weight-semibold);
    }

    .docs-get-started-next__card-lead {
      margin: 0;
      flex: 1;
      font-size: var(--au-text-sm);
      line-height: var(--au-leading-relaxed);
      color: var(--au-color-text-secondary);
    }

    .docs-get-started-next__card-cta {
      font-size: var(--au-text-sm);
      font-weight: var(--au-weight-semibold);
      color: var(--au-color-accent);
    }

    @media (max-width: 48rem) {
      .docs-get-started-next__grid {
        grid-template-columns: 1fr;
      }
    }

    .docs-get-started-next a {
      color: var(--au-color-accent);
      font-weight: var(--au-weight-semibold);
    }

    .docs-requirements__version {
      display: inline-flex;
      align-items: center;
      color: var(--au-color-text-secondary);
      font-size: var(--au-text-xs);
      font-weight: var(--au-weight-medium);
      line-height: 1;
      white-space: nowrap;
    }
  `,
})
export class GetStartedPage {
  readonly i18n = inject(DocsLocaleService);

  readonly installSnippet = `bun add @aurea-design-system/components
 # or 
 pnpm add @aurea-design-system/components`;

  readonly ngAddSnippet = 'ng add @aurea-design-system/components';

  readonly stylesSnippet = `/* 1. Tokens (required) */
@import '@aurea-design-system/components/styles/au-tokens.css';
/* 2. Shared field chrome, listbox, description-list, accordion shells */
@import '@aurea-design-system/components/styles/aurea-global.css';`;

  readonly componentSnippet = computed(() => this.i18n.messages().getStarted.componentSnippet);

  readonly steps = computed((): GetStartedStep[] => {
    const s = this.i18n.messages().getStarted.steps;
    return [
      {
        title: s.requirements.title,
        intro: s.requirements.intro,
        requirements: [
          { name: 'Angular', version: '22.0+', href: 'https://angular.dev/' },
          { name: 'Node.js', version: '20.19+', href: 'https://nodejs.org/' },
        ],
      },
      {
        title: s.install.title,
        code: this.installSnippet,
        language: 'bash',
        expandLabel: s.install.expand,
      },
      {
        title: s.ngAdd.title,
        intro: s.ngAdd.intro,
        code: this.ngAddSnippet,
        language: 'bash',
        expandLabel: s.ngAdd.expand,
      },
      {
        title: s.tokens.title,
        intro: s.tokens.intro,
        code: this.stylesSnippet,
        language: 'css',
        expandLabel: s.tokens.expand,
      },
      {
        title: s.firstComponent.title,
        code: this.componentSnippet(),
        language: 'typescript',
        expandLabel: s.firstComponent.expand,
      },
    ];
  });

  adoptionLink(): string[] {
    return this.i18n.link(DOCS_ROUTES.guidesAdoption);
  }

  crudDemoLink(): string[] {
    return this.i18n.link(DOCS_ROUTES.guidesCrudDemo);
  }
}
