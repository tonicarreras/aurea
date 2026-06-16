import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuBadge } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-example-badge-variants',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuBadge],
  template: `
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
    </div>
  `,
})
export class ExampleBadgeVariantsDemo {
  readonly t = docsPreviewCopy('badge');
}

@Component({
  selector: 'docs-example-badge-dot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuBadge],
  template: `
    <div class="docs-demo-row">
      <au-badge
        variant="accent"
        [dot]="true"
      />
      <au-badge
        variant="error"
        [dot]="true"
        [label]="t().error"
      />
    </div>
  `,
})
export class ExampleBadgeDotDemo {
  readonly t = docsPreviewCopy('badge');
}
