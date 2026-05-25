import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuButton, AuPopover } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuPopover, AuButton],
  template: `
    <au-popover [(open)]="open">
      <au-button auPopoverTrigger size="sm" variant="outline">{{ t().trigger }}</au-button>
      <p style="margin:0;font-size:0.8125rem">{{ t().content }}</p>
    </au-popover>
  `,
})
export class PopoverDemo {
  readonly t = docsPreviewCopy('popover');
  readonly open = signal(false);
}
