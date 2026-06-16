import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuLink } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuLink],
  template: `
    <p class="docs-preview docs-preview--inline docs-example-prose">
      {{ t().inlineBefore }}
      <a
        auLink
        href="#"
        >{{ t().label }}</a
      >
      {{ t().inlineAfter }}
    </p>
  `,
  styles: `
    .docs-example-prose {
      margin: 0;
      max-width: 28rem;
      font-size: var(--au-text-sm);
      line-height: var(--au-leading-relaxed);
      color: var(--au-color-text-secondary);
    }
  `,
})
export class LinkDemo {
  readonly t = docsPreviewCopy('link');
}
