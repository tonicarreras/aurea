import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'docs-demo-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="docs-demo" [class.docs-demo--compact]="compact()" aria-label="Vista previa en vivo">
      @if (!compact()) {
        <header class="docs-demo__header">
          <h2 class="docs-demo__title">Vista previa</h2>
          <span class="docs-demo__badge">Live</span>
        </header>
      }
      <div class="docs-demo__canvas">
        <ng-content />
      </div>
    </section>
  `,
  styles: [
    `
      .docs-demo {
        animation: docs-fade-up 0.5s var(--au-ease-out) both;
      }

      .docs-demo__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--au-space-3);
        margin-bottom: var(--au-space-3);
      }

      .docs-demo__title {
        margin: 0;
        font-size: var(--au-text-sm);
        font-weight: var(--au-weight-semibold);
        letter-spacing: var(--au-tracking-caps);
        text-transform: uppercase;
        color: var(--au-color-text-secondary);
      }

      .docs-demo__badge {
        padding: 0.15rem 0.5rem;
        border-radius: var(--au-radius-pill);
        background: color-mix(in srgb, var(--au-color-semantic-success) 12%, transparent);
        color: var(--au-color-semantic-success);
        font-size: var(--au-text-2xs);
        font-weight: var(--au-weight-semibold);
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .docs-demo--compact .docs-demo__canvas {
        padding: var(--au-space-6) var(--au-space-5);
      }

      .docs-demo__canvas {
        padding: var(--au-space-8) var(--au-space-6);
        border: 1px solid var(--docs-border-fine);
        border-radius: var(--au-radius-lg);
        background: var(--au-color-surface-raised);
        transition: border-color var(--au-duration-default) var(--au-ease-in-out);
      }

      :host-context([data-au-theme='dark']) .docs-demo__canvas {
        border-color: var(--docs-border-fine);
        background: var(--au-color-surface-elevated);
      }

      @media (hover: hover) {
        .docs-demo__canvas:hover {
          border-color: color-mix(in srgb, var(--au-color-accent) 28%, transparent);
        }

        :host-context([data-au-theme='dark']) .docs-demo__canvas:hover {
          border-color: color-mix(in srgb, var(--au-color-border-subtle) 55%, transparent);
        }
      }
    `,
  ],
})
export class DemoPanel {
  /** Oculta cabecera «Vista previa» (p. ej. en bloques de Examples). */
  readonly compact = input(false);
}
