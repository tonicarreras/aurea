import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuButton, AuCard, AuDensityDirective, AuTheme } from '@aurea-design-system/components';

import { DOCS_ROUTES } from '../core/docs-locale';
import { DocsLocaleService } from '../core/docs-locale.service';
import { themeTokenGroups } from '../core/docs-theme-tokens';
import { CodeBlock } from '../shared/code-block';
import { DocPage } from '../shared/doc-page';
import { DocsInlineText } from '../shared/docs-inline-text';
import { DocsTokenList } from '../shared/docs-token-list';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DocPage,
    CodeBlock,
    DocsTokenList,
    AuButton,
    AuCard,
    AuTheme,
    AuDensityDirective,
    RouterLink,
    DocsInlineText,
  ],
  template: `
    <docs-page
      [title]="i18n.messages().themes.title"
      [lead]="i18n.messages().themes.lead"
    >
      <h2>{{ i18n.messages().themes.attrHeading }}</h2>
      <p>
        <docs-inline-text [text]="i18n.messages().themes.attrBody" />
      </p>
      <docs-code-block
        [code]="htmlSnippet"
        language="html"
        [expandLabel]="i18n.messages().themes.attrExpand"
      />

      <h2>{{ i18n.messages().themes.directiveHeading }}</h2>
      <p>
        <docs-inline-text [text]="i18n.messages().themes.directiveBody" />
      </p>
      <docs-code-block
        [code]="directiveSnippet"
        language="typescript"
        [expandLabel]="i18n.messages().themes.directiveExpand"
      />

      <h2>{{ i18n.messages().themes.densityHeading }}</h2>
      <p>
        <docs-inline-text [text]="i18n.messages().themes.densityBody" />
      </p>
      <docs-code-block
        [code]="densitySnippet"
        language="html"
        [expandLabel]="i18n.messages().themes.densityExpand"
      />

      <h2>{{ i18n.messages().themes.highContrastHeading }}</h2>
      <p>
        <docs-inline-text [text]="i18n.messages().themes.highContrastBody" />
      </p>
      <docs-code-block
        [code]="highContrastSnippet"
        language="html"
        [expandLabel]="i18n.messages().themes.highContrastExpand"
      />

      <h2>{{ i18n.messages().themes.previewHeading }}</h2>
      <div
        class="docs-theme-preview"
        [class.docs-theme-preview--dark]="previewTheme() === 'dark'"
        [auTheme]="previewTheme()"
        [auDensity]="previewDensity()"
      >
        <au-card variant="outlined">
          <h3 auCardHeader>{{ i18n.messages().themes.previewCardTitle }}</h3>
          <p>{{ i18n.messages().themes.previewCardBody }}</p>
          <div
            class="docs-theme-preview__swatches"
            aria-hidden="true"
          >
            @for (swatch of swatches; track $index) {
              <span
                class="docs-theme-preview__swatch"
                [style.background]="swatch"
              ></span>
            }
          </div>
          <div class="docs-theme-preview__actions">
            <au-button
              size="sm"
              [variant]="previewTheme() === 'light' ? 'primary' : 'outline'"
              type="button"
              (click)="previewTheme.set('light')"
            >
              {{ i18n.messages().themes.previewLight }}
            </au-button>
            <au-button
              size="sm"
              [variant]="previewTheme() === 'dark' ? 'primary' : 'outline'"
              type="button"
              (click)="previewTheme.set('dark')"
            >
              {{ i18n.messages().themes.previewDark }}
            </au-button>
            <au-button
              size="sm"
              [variant]="previewTheme() === 'high-contrast' ? 'primary' : 'outline'"
              type="button"
              (click)="previewTheme.set('high-contrast')"
            >
              {{ i18n.messages().themes.previewHighContrast }}
            </au-button>
          </div>
          <div class="docs-theme-preview__actions docs-theme-preview__actions--density">
            <au-button
              size="sm"
              [variant]="previewDensity() === 'compact' ? 'primary' : 'outline'"
              type="button"
              (click)="previewDensity.set('compact')"
            >
              Compact
            </au-button>
            <au-button
              size="sm"
              [variant]="previewDensity() === 'comfortable' ? 'primary' : 'outline'"
              type="button"
              (click)="previewDensity.set('comfortable')"
            >
              Comfortable
            </au-button>
            <au-button
              size="sm"
              [variant]="previewDensity() === 'spacious' ? 'primary' : 'outline'"
              type="button"
              (click)="previewDensity.set('spacious')"
            >
              Spacious
            </au-button>
          </div>
        </au-card>
      </div>

      <h2>{{ i18n.messages().themes.globalHeading }}</h2>
      <p>
        <docs-inline-text [text]="i18n.messages().themes.globalBody" />
        <a [routerLink]="i18n.link(DOCS_ROUTES.components)">{{
          i18n.messages().themes.globalLink
        }}</a
        >.
      </p>

      @for (group of tokenGroups(); track group.title) {
        <section class="docs-theme-group">
          <h3 class="docs-theme-group__title">{{ group.title }}</h3>
          @if (group.description) {
            <p class="docs-theme-group__lead">{{ group.description }}</p>
          }
          <docs-token-list [tokens]="group.tokens" />
        </section>
      }

      <h2>{{ i18n.messages().themes.ruleHeading }}</h2>
      <p>
        <docs-inline-text [text]="i18n.messages().themes.ruleBody" />
        <code>projects/components/src/lib/tokens/au-tokens.css</code>.
      </p>
    </docs-page>
  `,
  styles: `
    .docs-theme-preview {
      padding: var(--au-space-6);
      border-radius: var(--au-radius-lg);
      border: 1px solid var(--au-color-border-subtle);
      background: var(--au-color-surface-canvas);
      transition:
        background-color var(--au-duration-slow) var(--au-ease-in-out),
        border-color var(--au-duration-slow) var(--au-ease-in-out),
        box-shadow var(--au-duration-slow) var(--au-ease-in-out);
    }

    :host-context([data-au-theme='dark']) .docs-theme-preview {
      border-color: var(--docs-border-fine);
      background: var(--au-color-surface-raised);
    }

    .docs-theme-preview--dark {
      box-shadow: none;
    }

    .docs-theme-preview__swatches {
      display: flex;
      gap: var(--au-space-2);
      margin: var(--au-space-4) 0 0;
    }

    .docs-theme-preview__swatch {
      width: 2rem;
      height: 2rem;
      border-radius: var(--au-radius-sm);
      border: 1px solid var(--au-color-border-subtle);
      transition: transform var(--au-duration-short) var(--au-ease-emph);
    }

    .docs-theme-preview__swatch:hover {
      transform: scale(1.12);
    }

    .docs-theme-preview__actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--au-space-2);
      margin-top: var(--au-space-4);
    }

    .docs-theme-preview__actions--density {
      margin-top: var(--au-space-3);
    }

    .docs-theme-group {
      margin-top: var(--au-space-8);
    }

    .docs-theme-group__title {
      margin: 0 0 var(--au-space-2);
      font-size: var(--au-text-lg);
      font-weight: var(--au-weight-semibold);
    }

    .docs-theme-group__lead {
      margin: 0 0 var(--au-space-4);
      max-width: min(62rem, 100%);
      color: var(--au-color-text-secondary);
      font-size: var(--au-text-sm);
      line-height: var(--au-leading-relaxed);
    }
  `,
})
export class ThemingPage {
  readonly i18n = inject(DocsLocaleService);
  readonly DOCS_ROUTES = DOCS_ROUTES;
  readonly previewTheme = signal<'light' | 'dark' | 'high-contrast'>('light');
  readonly previewDensity = signal<'compact' | 'comfortable' | 'spacious'>('comfortable');

  readonly tokenGroups = computed(() => themeTokenGroups(this.i18n.locale()));

  readonly swatches = [
    'var(--au-color-surface-raised)',
    'var(--au-color-action-primary)',
    'var(--au-color-border-default)',
    'var(--au-color-text-secondary)',
  ];

  readonly htmlSnippet = `<html data-au-theme="dark">
  <!-- your app -->
</html>`;

  readonly directiveSnippet = `<div class="app-shell" [auTheme]="'system'">
  ...
</div>`;

  readonly densitySnippet = `<main data-au-density="compact" [auDensity]="density()">
  ...
</main>`;

  readonly highContrastSnippet = `<html data-au-theme="high-contrast">
  <!-- experimental WCAG-oriented palette -->
</html>`;
}
