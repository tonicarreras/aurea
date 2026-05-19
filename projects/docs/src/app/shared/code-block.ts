import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'docs-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<pre class="docs-code" tabindex="0"><code>{{ code() }}</code></pre>`,
  styles: [
    `
      .docs-code {
        margin: 0;
        padding: var(--au-space-4);
        overflow: auto;
        border: 1px solid var(--au-color-border-subtle);
        border-radius: var(--au-radius-md);
        background: var(--au-color-surface-raised);
        color: var(--au-color-text-primary);
        line-height: var(--au-leading-relaxed);
        white-space: pre-wrap;
        word-break: break-word;
      }
    `,
  ],
})
export class CodeBlock {
  readonly code = input.required<string>();
}
