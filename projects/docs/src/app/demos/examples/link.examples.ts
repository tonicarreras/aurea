import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuLink } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-example-link-inline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuLink],
  template: `
    <p class="docs-example-prose">
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
export class ExampleLinkInlineDemo {
  readonly t = docsPreviewCopy('link');
}

@Component({
  selector: 'docs-example-link-external',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuLink],
  template: `
    <p class="docs-example-prose">
      <a
        auLink
        href="https://angular.dev"
        target="_blank"
        rel="noopener noreferrer"
        >{{ t().external }}</a
      >
    </p>
  `,
  styles: `
    .docs-example-prose {
      margin: 0;
      font-size: var(--au-text-sm);
      line-height: var(--au-leading-relaxed);
    }
  `,
})
export class ExampleLinkExternalDemo {
  readonly t = docsPreviewCopy('link');
}
