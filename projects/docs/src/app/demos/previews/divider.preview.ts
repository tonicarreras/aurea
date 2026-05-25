import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuDivider } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuDivider],
  template: `
    <div class="docs-preview docs-preview--stack">
      <div class="docs-demo-stack">
        <p>{{ t().top }}</p>
        <au-divider />
        <au-divider [label]="t().label" />
        <p>{{ t().bottom }}</p>
      </div>
    </div>
  `,
})
export class DividerDemo {
  readonly t = docsPreviewCopy('divider');
}
