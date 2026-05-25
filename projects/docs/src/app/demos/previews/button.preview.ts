import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuButton } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `
    <div class="docs-preview docs-preview--row">
      <div class="docs-demo-row">
        <au-button variant="primary">{{ t().primary }}</au-button>
        <au-button variant="secondary">{{ t().secondary }}</au-button>
        <au-button variant="outline">{{ t().outline }}</au-button>
        <au-button variant="ghost">{{ t().ghost }}</au-button>
      </div>
    </div>
  `,
})
export class ButtonDemo {
  readonly t = docsPreviewCopy('button');
}
