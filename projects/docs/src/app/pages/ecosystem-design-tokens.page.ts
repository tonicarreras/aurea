import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { DOCS_EXTERNAL_LINKS } from '../core/docs-external-links';
import { DocsLocaleService } from '../core/docs-locale.service';
import { DocPage } from '../shared/doc-page';
import { DocsGuideSections } from '../shared/docs-guide-sections';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, DocsGuideSections],
  template: `
    <docs-page
      [title]="eco().designTokens.title"
      [lead]="eco().designTokens.lead"
    >
      <p class="docs-design-tokens__downloads">
        <a
          [href]="lightJson"
          rel="noopener noreferrer"
          target="_blank"
          >{{ eco().designTokens.downloadLight }}</a
        >
        ·
        <a
          [href]="darkJson"
          rel="noopener noreferrer"
          target="_blank"
          >{{ eco().designTokens.downloadDark }}</a
        >
        ·
        <a
          [href]="readme"
          rel="noopener noreferrer"
          target="_blank"
          >README</a
        >
      </p>
      <docs-guide-sections [sections]="eco().designTokens.sections" />
    </docs-page>
  `,
  styles: `
    .docs-design-tokens__downloads {
      margin: 0 0 var(--au-space-6);
    }

    .docs-design-tokens__downloads a {
      color: var(--au-color-accent);
      font-weight: var(--au-weight-medium);
    }
  `,
})
export class EcosystemDesignTokensPage {
  readonly i18n = inject(DocsLocaleService);
  readonly eco = computed(() => this.i18n.messages().ecosystem);
  readonly lightJson = `${DOCS_EXTERNAL_LINKS.github}/blob/develop/projects/design-tokens/au-tokens.light.tokens.json`;
  readonly darkJson = `${DOCS_EXTERNAL_LINKS.github}/blob/develop/projects/design-tokens/au-tokens.dark.tokens.json`;
  readonly readme = `${DOCS_EXTERNAL_LINKS.github}/blob/develop/projects/design-tokens/README.md`;
}
