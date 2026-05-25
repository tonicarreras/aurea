import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuButton, AuCard, AuDensityDirective, AuSwitch, AuTheme } from '@aurea-design-system/components';

import { DOCS_ROUTES } from '../core/docs-locale';
import { DocsLocaleService } from '../core/docs-locale.service';
import {
  resolveDocsPreviewTheme,
  type DocsAppearanceTheme,
} from '../core/docs-theme-preview';
import { themeTokenGroups, themeHostOverrides } from '../core/docs-theme-tokens';
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
    AuSwitch,
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
        [class.docs-theme-preview--dark]="
          resolvedTheme() === 'dark' || resolvedTheme() === 'high-contrast-dark'
        "
        [auTheme]="resolvedTheme()"
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
          <div
            class="docs-theme-preview__actions"
            role="group"
            [attr.aria-label]="i18n.messages().themes.previewThemeLabel"
          >
            <au-button
              size="sm"
              [variant]="appearanceTheme() === 'light' ? 'primary' : 'outline'"
              type="button"
              (click)="appearanceTheme.set('light')"
            >
              {{ i18n.messages().themes.previewLight }}
            </au-button>
            <au-button
              size="sm"
              [variant]="appearanceTheme() === 'dark' ? 'primary' : 'outline'"
              type="button"
              (click)="appearanceTheme.set('dark')"
            >
              {{ i18n.messages().themes.previewDark }}
            </au-button>
          </div>
          <div class="docs-theme-preview__a11y">
            <au-switch
              size="sm"
              [label]="i18n.messages().themes.previewHighContrast"
              [checked]="highContrastEnabled()"
              (checkedChange)="highContrastEnabled.set($event)"
            />
            <p class="docs-theme-preview__a11y-hint">
              {{ i18n.messages().themes.previewHighContrastHint }}
            </p>
          </div>
          <div
            class="docs-theme-preview__actions docs-theme-preview__actions--density"
            role="group"
            [attr.aria-label]="i18n.messages().themes.previewDensityLabel"
          >
            <au-button
              size="sm"
              [variant]="previewDensity() === 'compact' ? 'primary' : 'outline'"
              type="button"
              (click)="previewDensity.set('compact')"
            >
              {{ i18n.messages().themes.previewDensityCompact }}
            </au-button>
            <au-button
              size="sm"
              [variant]="previewDensity() === 'comfortable' ? 'primary' : 'outline'"
              type="button"
              (click)="previewDensity.set('comfortable')"
            >
              {{ i18n.messages().themes.previewDensityComfortable }}
            </au-button>
            <au-button
              size="sm"
              [variant]="previewDensity() === 'spacious' ? 'primary' : 'outline'"
              type="button"
              (click)="previewDensity.set('spacious')"
            >
              {{ i18n.messages().themes.previewDensitySpacious }}
            </au-button>
          </div>
        </au-card>
      </div>

      <h2>{{ i18n.messages().themes.brandHeading }}</h2>
      <p>
        <docs-inline-text [text]="i18n.messages().themes.brandBody" />
      </p>
      <docs-code-block
        [code]="brandSnippet"
        language="css"
        [expandLabel]="i18n.messages().themes.brandExpand"
      />

      <h2>{{ i18n.messages().themes.overrideLevelsHeading }}</h2>
      <p>
        <docs-inline-text [text]="i18n.messages().themes.overrideLevelsBody" />
      </p>
      <section class="docs-theme-override">
        <h3 class="docs-theme-override__title">{{ i18n.messages().themes.overrideGlobalTitle }}</h3>
        <p>
          <docs-inline-text [text]="i18n.messages().themes.overrideGlobalBody" />
        </p>
      </section>
      <section class="docs-theme-override">
        <h3 class="docs-theme-override__title">{{ i18n.messages().themes.overrideHostTitle }}</h3>
        <p>
          <docs-inline-text [text]="i18n.messages().themes.overrideHostBody" />
        </p>
      </section>
      <section class="docs-theme-override">
        <h3 class="docs-theme-override__title">{{ i18n.messages().themes.overrideAvoidTitle }}</h3>
        <p>
          <docs-inline-text [text]="i18n.messages().themes.overrideAvoidBody" />
        </p>
      </section>

      <h2>{{ i18n.messages().themes.globalHeading }}</h2>
      <p>
        <docs-inline-text [text]="i18n.messages().themes.globalBody" />
        <a [routerLink]="i18n.link(DOCS_ROUTES.components)">{{
          i18n.messages().themes.globalLink
        }}</a
        >.
      </p>

      <h3 class="docs-theme-host__title">{{ i18n.messages().themes.hostOverrideHeading }}</h3>
      <p class="docs-theme-host__lead">
        <docs-inline-text [text]="i18n.messages().themes.hostOverrideBody" />
      </p>
      <div class="docs-theme-host__table-wrap">
        <table class="docs-theme-host__table">
          <thead>
            <tr>
              <th scope="col">{{ i18n.messages().themes.hostOverrideColHost }}</th>
              <th scope="col">{{ i18n.messages().themes.hostOverrideColToken }}</th>
              <th scope="col">{{ i18n.messages().themes.hostOverrideColDescription }}</th>
            </tr>
          </thead>
          <tbody>
            @for (row of hostOverrides(); track row.host + row.token) {
              <tr>
                <td><code>{{ row.host }}</code></td>
                <td><code>{{ row.token }}</code></td>
                <td><docs-inline-text [text]="row.description" /></td>
              </tr>
            }
          </tbody>
        </table>
      </div>

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

    .docs-theme-preview__a11y {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-1);
      margin-top: var(--au-space-4);
      max-width: 22rem;
    }

    .docs-theme-preview__a11y-hint {
      margin: 0;
      font-size: var(--au-text-xs);
      line-height: var(--au-leading-snug);
      color: var(--au-color-text-secondary);
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

    .docs-theme-override {
      margin-top: var(--au-space-6);
    }

    .docs-theme-override__title {
      margin: 0 0 var(--au-space-2);
      font-size: var(--au-text-base);
      font-weight: var(--au-weight-semibold);
    }

    .docs-theme-override p {
      margin: 0;
      max-width: min(62rem, 100%);
      line-height: var(--au-leading-relaxed);
      color: var(--au-color-text-secondary);
    }

    .docs-theme-host__title {
      margin: var(--au-space-8) 0 var(--au-space-2);
      font-size: var(--au-text-lg);
      font-weight: var(--au-weight-semibold);
    }

    .docs-theme-host__lead {
      margin: 0 0 var(--au-space-4);
      max-width: min(62rem, 100%);
      color: var(--au-color-text-secondary);
      line-height: var(--au-leading-relaxed);
    }

    .docs-theme-host__table-wrap {
      overflow-x: auto;
      margin-bottom: var(--au-space-4);
    }

    .docs-theme-host__table {
      width: 100%;
      min-width: 28rem;
      border-collapse: collapse;
      font-size: var(--au-text-sm);
    }

    .docs-theme-host__table th,
    .docs-theme-host__table td {
      padding: var(--au-space-3) var(--au-space-4);
      border-bottom: 1px solid var(--docs-border-fine);
      text-align: left;
      vertical-align: top;
    }

    .docs-theme-host__table th {
      font-weight: var(--au-weight-semibold);
      color: var(--au-color-text-secondary);
    }
  `,
})
export class ThemingPage {
  readonly i18n = inject(DocsLocaleService);
  readonly DOCS_ROUTES = DOCS_ROUTES;
  readonly appearanceTheme = signal<DocsAppearanceTheme>('light');
  readonly highContrastEnabled = signal(false);
  readonly previewDensity = signal<'compact' | 'comfortable' | 'spacious'>('comfortable');

  readonly resolvedTheme = computed(() =>
    resolveDocsPreviewTheme(this.appearanceTheme(), this.highContrastEnabled()),
  );

  readonly tokenGroups = computed(() => themeTokenGroups(this.i18n.locale()));
  readonly hostOverrides = computed(() => themeHostOverrides(this.i18n.locale()));

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

  readonly highContrastSnippet = `<!-- Light + high contrast -->
<html data-au-theme="high-contrast">

<!-- Dark + high contrast -->
<html data-au-theme="high-contrast-dark">`;

  readonly brandSnippet = `/* After au-tokens.css */
:root,
[data-au-theme='light'] {
  --au-color-action-primary: #0066cc;
  --au-color-action-primary-hover: #0052a3;
  --au-color-focus-ring: #0066cc;
  --au-font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
}

[data-au-theme='dark'] {
  --au-color-action-primary: #5eb0ff;
  --au-color-focus-ring: #5eb0ff;
}`;
}
