import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuBadge } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuBadge],
  template: `<div class="docs-preview docs-preview--row">
    <au-badge
      variant="accent"
      [label]="t().accent"
    /><au-badge
      variant="success"
      [label]="t().count"
    />
  </div>`,
})
export class BadgeDemo {
  readonly t = docsPreviewCopy('badge');
}
