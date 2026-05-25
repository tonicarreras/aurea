import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuButton, AuTooltip } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuTooltip],
  template: `
    <div class="docs-preview docs-preview--action">
      <au-button variant="outline" [auTooltip]="t().text" auTooltipPlacement="top">{{ t().button }}</au-button>
    </div>
  `,
})
export class TooltipDemo {
  readonly t = docsPreviewCopy('tooltip');
}
