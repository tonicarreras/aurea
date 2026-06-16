import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuBadge } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuBadge],
  template: `
    <div class="docs-preview docs-preview--row">
      <div class="docs-demo-row">
        <au-badge
          variant="default"
          [label]="t().draft"
        />
        <au-badge
          variant="accent"
          [label]="t().accent"
        />
        <au-badge
          variant="success"
          [label]="t().success"
        />
        <au-badge
          variant="warning"
          [label]="t().warning"
        />
        <au-badge
          variant="error"
          [label]="t().error"
        />
        <au-badge variant="info" />
      </div>
    </div>
  `,
})
export class BadgeDemo {
  readonly t = docsPreviewCopy('badge');
}
