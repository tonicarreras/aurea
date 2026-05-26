import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuMessage } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuMessage],
  template: `
    <div class="docs-preview docs-preview--stack">
      <div class="docs-demo-stack">
        <au-message
          variant="success"
          [title]="t().successTitle"
          [message]="t().successBody"
        />
        <au-message
          variant="info"
          [message]="t().infoBody"
        />
      </div>
    </div>
  `,
})
export class MessageDemo {
  readonly t = docsPreviewCopy('message');
}
