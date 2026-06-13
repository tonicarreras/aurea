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
        <button auButton variant="primary">{{ t().primary }}</button>
        <button auButton variant="secondary">{{ t().secondary }}</button>
        <button auButton variant="outline">{{ t().outline }}</button>
        <button auButton variant="ghost">{{ t().ghost }}</button>
      </div>
    </div>
  `,
})
export class ButtonDemo {
  readonly t = docsPreviewCopy('button');
}
