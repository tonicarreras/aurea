import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuLink } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuLink],
  template: `<p class="docs-preview">
    <a
      auLink
      href="#"
      >{{ t().label }}</a
    >
  </p>`,
})
export class LinkDemo {
  readonly t = docsPreviewCopy('link');
}
