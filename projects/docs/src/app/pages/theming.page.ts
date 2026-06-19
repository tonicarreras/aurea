import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AuButton,
  AuCard,
  AuDensityDirective,
  AuFormField,
  AuInputText,
  AuLink,
  AuSwitch,
  AuTheme,
} from '@aurea-design-system/components';

import { DOCS_ROUTES } from '../core/docs-locale';
import { DocsLocaleService } from '../core/docs-locale.service';
import { resolveDocsPreviewTheme, type DocsAppearanceTheme } from '../core/docs-theme-preview';
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
    AuFormField,
    AuInputText,
    AuLink,
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

      <h2>{{ i18n.messages().themes.globalStylesHeading }}</h2>
      <p>
        <docs-inline-text [text]="i18n.messages().themes.globalStylesBody" />
      </p>
      <docs-code-block
        [code]="globalStylesSnippet"
        language="css"
        [expandLabel]="i18n.messages().themes.globalStylesExpand"
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
            <button
              auButton
              size="sm"
              [variant]="appearanceTheme() === 'light' ? 'primary' : 'outline'"
              type="button"
              (click)="appearanceTheme.set('light')"
            >
              {{ i18n.messages().themes.previewLight }}
            </button>
            <button
              auButton
              size="sm"
              [variant]="appearanceTheme() === 'dark' ? 'primary' : 'outline'"
              type="button"
              (click)="appearanceTheme.set('dark')"
            >
              {{ i18n.messages().themes.previewDark }}
            </button>
          </div>
          <div class="docs-theme-preview__a11y">
            <button
              type="button"
              auSwitch
              size="sm"
              [label]="i18n.messages().themes.previewHighContrast"
              [checked]="highContrastEnabled()"
              (checkedChange)="highContrastEnabled.set($event)"
            >
              <span class="au-sr-only">{{ i18n.messages().themes.previewHighContrast }}</span>
            </button>
            <p class="docs-theme-preview__a11y-hint">
              {{ i18n.messages().themes.previewHighContrastHint }}
            </p>
          </div>
          <div
            class="docs-theme-preview__actions docs-theme-preview__actions--density"
            role="group"
            [attr.aria-label]="i18n.messages().themes.previewDensityLabel"
          >
            <button
              auButton
              size="sm"
              [variant]="previewDensity() === 'compact' ? 'primary' : 'outline'"
              type="button"
              (click)="previewDensity.set('compact')"
            >
              {{ i18n.messages().themes.previewDensityCompact }}
            </button>
            <button
              auButton
              size="sm"
              [variant]="previewDensity() === 'comfortable' ? 'primary' : 'outline'"
              type="button"
              (click)="previewDensity.set('comfortable')"
            >
              {{ i18n.messages().themes.previewDensityComfortable }}
            </button>
            <button
              auButton
              size="sm"
              [variant]="previewDensity() === 'spacious' ? 'primary' : 'outline'"
              type="button"
              (click)="previewDensity.set('spacious')"
            >
              {{ i18n.messages().themes.previewDensitySpacious }}
            </button>
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

      <h3>{{ i18n.messages().themes.provideAureaHeading }}</h3>
      <p>
        <docs-inline-text [text]="i18n.messages().themes.provideAureaBody" />
      </p>
      <docs-code-block
        [code]="provideAureaSnippet"
        language="typescript"
        [expandLabel]="i18n.messages().themes.provideAureaExpand"
      />

      <h2>{{ i18n.messages().themes.brandExampleHeading }}</h2>
      <p>
        <docs-inline-text [text]="i18n.messages().themes.brandExampleBody" />
      </p>
      <div
        class="docs-brand-example"
        [class.docs-brand-example--custom]="customBrandEnabled()"
        [auTheme]="appearanceTheme()"
      >
        <div
          class="docs-brand-example__toolbar"
          role="group"
          [attr.aria-label]="i18n.messages().themes.brandExampleToggleLabel"
        >
          <button
            type="button"
            auButton
            size="sm"
            [variant]="customBrandEnabled() ? 'outline' : 'primary'"
            (click)="customBrandEnabled.set(false)"
          >
            {{ i18n.messages().themes.brandExampleDefault }}
          </button>
          <button
            type="button"
            auButton
            size="sm"
            [variant]="customBrandEnabled() ? 'primary' : 'outline'"
            (click)="customBrandEnabled.set(true)"
          >
            {{ i18n.messages().themes.brandExampleCustom }}
          </button>
        </div>
        <div class="docs-brand-example__sample">
          <div class="docs-brand-example__actions">
            <button
              type="button"
              auButton
              variant="primary"
            >
              {{ i18n.messages().themes.brandExamplePrimary }}
            </button>
            <button
              type="button"
              auButton
              variant="outline"
            >
              {{ i18n.messages().themes.brandExampleOutline }}
            </button>
            <a
              auLink
              href="#brand-example"
              >{{ i18n.messages().themes.brandExampleLink }}</a
            >
          </div>
          <au-form-field [label]="i18n.messages().themes.brandExampleFieldLabel">
            <input
              auInputText
              type="email"
              [placeholder]="i18n.messages().themes.brandExampleFieldPlaceholder"
            />
          </au-form-field>
        </div>
      </div>
      <docs-code-block
        [code]="brandExampleCssSnippet"
        language="css"
        [expandLabel]="i18n.messages().themes.brandExampleCssExpand"
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
                <td>
                  <code>{{ row.host }}</code>
                </td>
                <td>
                  <code>{{ row.token }}</code>
                </td>
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

    .docs-brand-example {
      margin-top: var(--au-space-4);
      padding: var(--au-space-6);
      border-radius: var(--au-radius-lg);
      border: 1px solid var(--au-color-border-subtle);
      background: var(--au-color-surface-canvas);
    }

    .docs-brand-example--custom,
    .docs-brand-example--custom[data-au-theme='light'] {
      --au-color-action-primary: #ea580c;
      --au-color-action-primary-hover: #c2410c;
      --au-color-action-primary-pressed: #9a3412;
      --au-color-link: var(--au-color-action-primary);
      --au-color-link-hover: var(--au-color-action-primary-hover);
      --au-color-focus-ring: #ea580c;
      --au-color-focus-inner: #fed7aa;
    }

    .docs-brand-example--custom[data-au-theme='dark'] {
      --au-color-action-primary: #fb923c;
      --au-color-action-primary-hover: #fdba74;
      --au-color-action-primary-pressed: #fed7aa;
      --au-color-link: var(--au-color-action-primary);
      --au-color-link-hover: var(--au-color-action-primary-hover);
      --au-color-focus-ring: #fb923c;
      --au-color-focus-inner: #ffedd5;
    }

    .docs-brand-example__toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: var(--au-space-2);
      margin-bottom: var(--au-space-5);
    }

    .docs-brand-example__sample {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-5);
      max-width: 24rem;
    }

    .docs-brand-example__actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--au-space-3);
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
      max-width: 100%;
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
      max-width: 100%;
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
      max-width: 100%;
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
  readonly customBrandEnabled = signal(true);
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

  readonly globalStylesSnippet = `@import '@aurea-design-system/components/styles/au-tokens.css';
@import '@aurea-design-system/components/styles/aurea-global.css';

/* aurea-global.css (requires tokens):
 * - Layout directives (auStack, auCluster, auSplit, auSection)
 * - Field chrome, errors, listbox overlays
 * - Description list (dt/dd across hosts)
 * - Accordion projected item shells + triggers
 * Per-component CSS ships with each Angular import. */`;

  readonly provideAureaSnippet = `import { provideAurea } from '@aurea-design-system/components';

bootstrapApplication(App, {
  providers: [
    provideAurea({
      theme: {
        actionPrimary: '#1059c8',
        radiusField: '0.5rem',
        fontSans: 'Inter, sans-serif',
      },
    }),
  ],
});`;

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

  readonly brandSnippet = `/* theme-brand.css — load after au-tokens.css */
:root,
[data-au-theme='light'] {
  --au-color-action-primary: #ea580c;
  --au-color-action-primary-hover: #c2410c;
  --au-color-action-primary-pressed: #9a3412;
  --au-color-link: var(--au-color-action-primary);
  --au-color-link-hover: var(--au-color-action-primary-hover);
  --au-color-focus-ring: #ea580c;
  --au-font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
}

[data-au-theme='dark'] {
  --au-color-action-primary: #fb923c;
  --au-color-action-primary-hover: #fdba74;
  --au-color-focus-ring: #fb923c;
}`;

  readonly brandExampleCssSnippet = `/* Scoped demo (docs only). In your app, use a global file: */
.my-app-shell[data-au-theme='light'],
:root,
[data-au-theme='light'] {
  --au-color-action-primary: #ea580c;
  --au-color-action-primary-hover: #c2410c;
  --au-color-action-primary-pressed: #9a3412;
  --au-color-link: var(--au-color-action-primary);
  --au-color-focus-ring: #ea580c;
}

[data-au-theme='dark'] {
  --au-color-action-primary: #fb923c;
  --au-color-action-primary-hover: #fdba74;
  --au-color-focus-ring: #fb923c;
}`;
}
