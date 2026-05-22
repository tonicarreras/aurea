import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuButton, AuTooltip } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuTooltip],
  template: `
    <div class="docs-preview docs-preview--action">
      <au-button
        variant="outline"
        auTooltip="Texto de ayuda contextual"
        auTooltipPlacement="top"
      >
        Pasar el cursor
      </au-button>
    </div>
  `,
})
export class TooltipDemo {}
