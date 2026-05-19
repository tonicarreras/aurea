import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-demo-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="docs-demo" aria-label="Vista previa en vivo">
      <h2 class="docs-demo__title">Vista previa</h2>
      <div class="docs-demo__canvas">
        <ng-content />
      </div>
    </section>
  `,
  styles: [
    `
      .docs-demo__title {
        margin: 0 0 var(--au-space-3);
        font-size: var(--au-text-sm);
        font-weight: var(--au-weight-medium);
        text-transform: uppercase;
        letter-spacing: var(--au-tracking-caps);
        color: var(--au-color-text-tertiary);
      }

      .docs-demo__canvas {
        padding: var(--au-space-6);
        border: 1px dashed var(--au-color-border-subtle);
        border-radius: var(--au-radius-lg);
        background: var(--au-color-surface-canvas);
      }
    `,
  ],
})
export class DemoPanel {}
