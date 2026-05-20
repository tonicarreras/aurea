import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuButton, AuCard, AuTheme } from '@aurea-design-system/components';

import { THEME_TOKEN_GROUPS } from '../core/docs-theme-tokens';
import { CodeBlock } from '../shared/code-block';
import { DocPage } from '../shared/doc-page';
import { DocsTokenList } from '../shared/docs-token-list';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, CodeBlock, DocsTokenList, AuButton, AuCard, AuTheme, RouterLink],
  template: `
    <docs-page
      title="Temas y tokens"
      lead="Variables globales --au-* definidas en au-tokens.css. Cada componente documenta solo los tokens que consume en su pestaña Styling."
    >
      <h2>Atributo de tema</h2>
      <p>
        Coloca <code>data-au-theme</code> en un ancestro (por ejemplo <code>&lt;html&gt;</code> o el shell
        de la app). Valores: <code>light</code>, <code>dark</code>.
      </p>
      <docs-code-block [code]="htmlSnippet" language="html" expandLabel="Ver HTML" />

      <h2>Directiva AuTheme</h2>
      <p>
        Alternativa reactiva con <code>system</code> para seguir
        <code>prefers-color-scheme</code>:
      </p>
      <docs-code-block [code]="directiveSnippet" language="typescript" expandLabel="Ver TypeScript" />

      <h2>Vista previa</h2>
      <div
        class="docs-theme-preview"
        [class.docs-theme-preview--dark]="previewTheme() === 'dark'"
        [auTheme]="previewTheme()"
      >
        <au-card variant="outlined">
          <h3 auCardHeader>Superficie de ejemplo</h3>
          <p>Los colores siguen el tema del contenedor.</p>
          <div class="docs-theme-preview__swatches" aria-hidden="true">
            @for (swatch of swatches; track swatch) {
              <span class="docs-theme-preview__swatch" [style.background]="swatch"></span>
            }
          </div>
          <div class="docs-theme-preview__actions">
            <au-button
              size="sm"
              [variant]="previewTheme() === 'light' ? 'primary' : 'outline'"
              type="button"
              (click)="previewTheme.set('light')"
            >
              Claro
            </au-button>
            <au-button
              size="sm"
              [variant]="previewTheme() === 'dark' ? 'primary' : 'outline'"
              type="button"
              (click)="previewTheme.set('dark')"
            >
              Oscuro
            </au-button>
          </div>
        </au-card>
      </div>

      <h2>Tokens globales</h2>
      <p>
        Sobrescribe en <code>:root</code> o <code>[data-au-theme]</code>. Los tokens de un componente
        concreto (p. ej. <code>--au-card-padding</code>) se listan en la página de ese componente —
        <a routerLink="/componentes">índice de componentes</a>.
      </p>

      @for (group of tokenGroups; track group.title) {
        <section class="docs-theme-group">
          <h3 class="docs-theme-group__title">{{ group.title }}</h3>
          @if (group.description) {
            <p class="docs-theme-group__lead">{{ group.description }}</p>
          }
          <docs-token-list [tokens]="group.tokens" />
        </section>
      }

      <h2>Regla de uso</h2>
      <p>
        En producto, usa solo variables <code>--au-*</code> documentadas. Reserva nombres primitivos para
        capas internas del tema. Fuente de verdad:
        <code>projects/components/src/lib/theme/au-tokens.css</code>.
      </p>
    </docs-page>
  `,
  styles: [
    `
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
        gap: var(--au-space-2);
        margin-top: var(--au-space-4);
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
  ],
})
export class ThemingPage {
  readonly previewTheme = signal<'light' | 'dark'>('light');
  readonly tokenGroups = THEME_TOKEN_GROUPS;

  readonly swatches = [
    'var(--au-color-surface-raised)',
    'var(--au-color-action-primary)',
    'var(--au-color-border-default)',
    'var(--au-color-text-secondary)',
  ];

  readonly htmlSnippet = `<html data-au-theme="dark">
  <!-- tu app -->
</html>`;

  readonly directiveSnippet = `<div class="app-shell" [auTheme]="'system'">
  ...
</div>`;
}
