import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuButton, AuCard } from '@aurea-design-system/components';

import type { ComponentDoc } from '../core/component-docs.registry';
import { DocsLocaleService } from '../core/docs-locale.service';
import { DocsInlineText } from './docs-inline-text';

export type LandingPreviewDoc = ComponentDoc & { summary: string };

const PAGE_SIZE = 4;

function chunkPages<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages;
}

@Component({
  selector: 'docs-landing-previews-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AuButton, AuCard, NgComponentOutlet, DocsInlineText],
  template: `
    <div
      class="landing-carousel"
      role="region"
      [attr.aria-label]="ui().carouselAria"
      aria-roledescription="carousel"
    >
      <div class="landing-carousel__toolbar">
        <button
          auButton
          variant="outline"
          size="sm"
          type="button"
          [attr.aria-label]="ui().carouselPrev"
          aria-controls="landing-carousel-grid"
          (click)="prev()"
        >
          ←
        </button>
        <p
          class="landing-carousel__status"
          aria-live="polite"
        >
          {{ ui().carouselPageStatus(pageIndex() + 1, totalPages()) }}
        </p>
        <button
          auButton
          variant="outline"
          size="sm"
          type="button"
          [attr.aria-label]="ui().carouselNext"
          aria-controls="landing-carousel-grid"
          (click)="next()"
        >
          →
        </button>
      </div>

      <ul
        id="landing-carousel-grid"
        class="landing-carousel__grid"
        [attr.aria-label]="ui().carouselSlideAria(pageIndex() + 1)"
      >
        @for (doc of currentPage(); track doc.slug) {
          <li class="landing-carousel__cell">
            <au-card
              variant="outlined"
              size="lg"
              class="landing-carousel__card"
              [attr.aria-labelledby]="'landing-preview-' + doc.slug"
            >
              <div class="landing-carousel__head">
                <h3
                  class="landing-carousel__name"
                  [id]="'landing-preview-' + doc.slug"
                >
                  {{ doc.title }}
                </h3>
              </div>
              <div class="landing-carousel__stage">
                <ng-container *ngComponentOutlet="doc.demoComponent" />
              </div>
              <p class="landing-carousel__summary">
                <docs-inline-text [text]="doc.summary" />
              </p>
              <a
                [routerLink]="slugLink()(doc.slug)"
                class="landing-carousel__doc-cta"
              >
                {{ ui().previewOpenDoc }}
                <span
                  class="landing-carousel__doc-cta-arrow"
                  aria-hidden="true"
                  >→</span
                >
              </a>
            </au-card>
          </li>
        }
      </ul>

      <div
        class="landing-carousel__dots"
        role="tablist"
        [attr.aria-label]="ui().carouselDotsAria"
      >
        @for (page of pages(); track $index) {
          <button
            type="button"
            class="landing-carousel__dot"
            role="tab"
            [attr.aria-selected]="pageIndex() === $index"
            [attr.aria-label]="ui().carouselGoToPage($index + 1)"
            [class.landing-carousel__dot--active]="pageIndex() === $index"
            (click)="goTo($index)"
          ></button>
        }
      </div>
    </div>
  `,
  styles: `
    .landing-carousel {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-4);
    }

    .landing-carousel__toolbar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--au-space-4);
    }

    .landing-carousel__status {
      margin: 0;
      min-width: 8rem;
      text-align: center;
      font-size: var(--au-text-sm);
      font-weight: var(--au-weight-medium);
      color: var(--au-color-text-secondary);
    }

    .landing-carousel__grid {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--au-space-5);
      animation: docs-fade-in 0.35s var(--au-ease-out) both;
    }

    .landing-carousel__card {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition:
        transform var(--au-duration-default) var(--au-ease-emph),
        border-color var(--au-duration-short) var(--au-ease-in-out);
    }

    @media (hover: hover) {
      .landing-carousel__card:has(.landing-carousel__doc-cta:hover) {
        transform: translateY(-3px);
        border-color: var(--au-color-accent);
      }
    }

    .landing-carousel__head {
      padding: var(--au-space-5) var(--au-space-5) 0;
    }

    .landing-carousel__name {
      margin: 0;
      font-size: var(--au-text-md);
      font-weight: var(--au-weight-semibold);
    }

    .landing-carousel__doc-cta {
      display: inline-flex;
      align-items: center;
      gap: var(--au-space-2);
      align-self: flex-start;
      margin: var(--au-space-3) var(--au-space-5) var(--au-space-5);
      padding: var(--au-space-2) var(--au-space-3);
      border-radius: var(--au-radius-md);
      font-size: var(--au-text-sm);
      font-weight: var(--au-weight-semibold);
      color: var(--au-color-accent);
      text-decoration: none;
      transition:
        background-color var(--au-duration-short) var(--au-ease-in-out),
        color var(--au-duration-short) var(--au-ease-in-out);
    }

    .landing-carousel__doc-cta:hover {
      background: color-mix(in srgb, var(--au-color-action-primary) 10%, transparent);
      color: var(--au-color-accent-hover);
    }

    .landing-carousel__doc-cta-arrow {
      transition: transform var(--au-duration-short) var(--au-ease-emph);
    }

    .landing-carousel__doc-cta:hover .landing-carousel__doc-cta-arrow {
      transform: translateX(3px);
    }

    .landing-carousel__stage {
      position: relative;
      z-index: 1;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 11.5rem;
      margin: 0 var(--au-space-5);
      padding: var(--au-space-5) var(--au-space-4);
      border-radius: var(--au-radius-lg);
      border: 1px dashed var(--docs-border-fine);
      background: color-mix(
        in srgb,
        var(--au-color-surface-raised) 90%,
        var(--au-color-surface-canvas)
      );
      overflow: hidden;
      isolation: isolate;
    }

    .landing-carousel__summary {
      margin: var(--au-space-4) var(--au-space-5) 0;
      font-size: var(--au-text-sm);
      line-height: var(--au-leading-relaxed);
      color: var(--au-color-text-secondary);
    }

    .landing-carousel__dots {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--au-space-2);
    }

    .landing-carousel__dot {
      width: 0.5rem;
      height: 0.5rem;
      padding: 0;
      border: none;
      border-radius: var(--au-radius-pill);
      background: color-mix(in srgb, var(--au-color-action-primary) 28%, transparent);
      cursor: pointer;
      transition:
        transform var(--au-duration-short) var(--au-ease-emph),
        background-color var(--au-duration-short) var(--au-ease-in-out);
    }

    .landing-carousel__dot--active {
      width: 1.5rem;
      background: var(--au-color-action-primary);
    }

    .landing-carousel__dot:focus-visible {
      outline: 2px solid var(--au-color-focus-ring);
      outline-offset: 2px;
    }

    @media (max-width: 40rem) {
      .landing-carousel__grid {
        grid-template-columns: 1fr;
      }

      .landing-carousel__stage {
        min-height: 10rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .landing-carousel__grid {
        animation: none;
      }
    }
  `,
})
export class LandingPreviewsCarousel {
  private readonly i18n = inject(DocsLocaleService);

  readonly docs = input.required<LandingPreviewDoc[]>();
  readonly slugLink = input.required<(slug: string) => string[]>();

  readonly pageIndex = signal(0);

  readonly pages = computed(() => chunkPages(this.docs(), PAGE_SIZE));
  readonly totalPages = computed(() => this.pages().length);
  readonly currentPage = computed(() => this.pages()[this.pageIndex()] ?? []);
  readonly ui = computed(() => this.i18n.messages().landing);

  prev(): void {
    const total = this.totalPages();
    if (total === 0) {
      return;
    }
    this.pageIndex.update((i) => (i - 1 + total) % total);
  }

  next(): void {
    const total = this.totalPages();
    if (total === 0) {
      return;
    }
    this.pageIndex.update((i) => (i + 1) % total);
  }

  goTo(index: number): void {
    if (index >= 0 && index < this.totalPages()) {
      this.pageIndex.set(index);
    }
  }
}
