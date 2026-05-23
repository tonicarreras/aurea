import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuButton, AuPopover, AuPopoverTrigger } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuPopover, AuPopoverTrigger, AuButton],
  template: `
    <au-popover [(open)]="open">
      <au-button
        auPopoverTrigger
        size="sm"
        variant="outline"
        >Filters</au-button
      >
      <p style="margin:0;font-size:0.8125rem">Compact panel content.</p>
    </au-popover>
  `,
})
export class PopoverDemo {
  readonly open = signal(false);
}
