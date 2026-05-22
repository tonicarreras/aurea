import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuCard } from '@aurea-design-system/components';

import { DocsLocaleService } from '../core/docs-locale.service';
import { DocPage } from '../shared/doc-page';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, RouterLink, AuCard],
  template: `
    <docs-page
      [title]="i18n.messages().guides.adoption.title"
      [lead]="i18n.messages().guides.adoption.lead"
    >
      <ul class="docs-adoption-grid">
        @for (card of cards(); track card.path) {
          <li>
            <a
              [routerLink]="link(card.path)"
              class="docs-adoption-grid__link"
            >
              <au-card
                variant="outlined"
                size="lg"
              >
                <h3 auCardHeader>{{ card.title }}</h3>
                <p auCardBody>{{ card.description }}</p>
              </au-card>
            </a>
          </li>
        }
      </ul>
    </docs-page>
  `,
  styles: `
    .docs-adoption-grid {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: var(--au-space-5);
      grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    }

    .docs-adoption-grid__link {
      display: block;
      height: 100%;
      text-decoration: none;
      color: inherit;
    }

    @media (hover: hover) {
      .docs-adoption-grid__link:hover au-card {
        border-color: var(--au-color-accent);
      }
    }
  `,
})
export class GuidesAdoptionPage {
  readonly i18n = inject(DocsLocaleService);

  readonly cards = computed(() => this.i18n.messages().guides.adoption.cards);

  link(path: string): string[] {
    return this.i18n.link(...path.split('/'));
  }
}
