import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuButton, AuCard, AuTheme } from '@aurea';

import { CodeBlock } from '../shared/code-block';
import { DocPage } from '../shared/doc-page';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, CodeBlock, AuButton, AuCard, AuTheme],
  template: `
    <docs-page
      title="Temas y tokens"
      lead="Paleta semántica con variables --au-* y soporte de modo claro, oscuro y preferencia del sistema."
    >
      <h2>Atributo de tema</h2>
      <p>
        Coloca <code>data-au-theme</code> en un ancestro (por ejemplo <code>&lt;html&gt;</code> o el shell
        de la app). Valores: <code>light</code>, <code>dark</code>.
      </p>
      <docs-code-block [code]="htmlSnippet" />

      <h2>Directiva AuTheme</h2>
      <p>
        Alternativa reactiva con <code>system</code> para seguir
        <code>prefers-color-scheme</code>:
      </p>
      <docs-code-block [code]="directiveSnippet" />

      <h2>Vista previa</h2>
      <div class="docs-theme-preview" [auTheme]="previewTheme()">
        <au-card variant="outlined">
          <h3 auCardHeader>Superficie de ejemplo</h3>
          <p>Los colores siguen el tema del contenedor.</p>
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

      <h2>Regla de uso</h2>
      <p>
        En producto, usa solo variables <code>--au-*</code> documentadas en
        <code>au-tokens.css</code>. Reserva nombres primitivos para capas de tema internas.
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
      }

      .docs-theme-preview__actions {
        display: flex;
        gap: var(--au-space-2);
        margin-top: var(--au-space-4);
      }
    `,
  ],
})
export class ThemingPage {
  readonly previewTheme = signal<'light' | 'dark'>('light');

  readonly htmlSnippet = `<html data-au-theme="dark">
  <!-- tu app -->
</html>`;

  readonly directiveSnippet = `<div class="app-shell" [auTheme]="'system'">
  ...
</div>`;
}
