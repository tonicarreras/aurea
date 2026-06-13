import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuButton, AuPopover, AuPopoverTrigger } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuPopover, AuPopoverTrigger, AuButton],
  template: `
    <div class="docs-preview docs-preview--action">
      <au-popover [(open)]="open">
        <button auButton
          auPopoverTrigger
          size="sm"
          variant="outline"
          type="button"
          >{{ t().trigger }}</button
        >
        <p class="docs-preview-popover__body">{{ t().content }}</p>
      </au-popover>
    </div>
  `,
  styles: `
    .docs-preview-popover__body {
      margin: 0;
      font-size: var(--au-text-sm);
      line-height: var(--au-leading-normal);
      color: var(--au-color-text-primary);
    }
  `,
})
export class PopoverDemo {
  readonly t = docsPreviewCopy('popover');
  readonly open = signal(false);
}
