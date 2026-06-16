import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuButton, AuTooltip } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-tooltip-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuTooltip],
  template: `
    <button
      auButton
      variant="outline"
      [auTooltip]="t().topText"
      auTooltipPlacement="top"
    >
      {{ t().topButton }}
    </button>
  `,
})
export class ExampleTooltipTopDemo {
  readonly t = docsExampleLive('tooltip');
}

@Component({
  selector: 'docs-example-tooltip-right',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuTooltip],
  template: `
    <button
      auButton
      variant="ghost"
      [auTooltip]="t().endText"
      auTooltipPlacement="end"
    >
      {{ t().endButton }}
    </button>
  `,
})
export class ExampleTooltipRightDemo {
  readonly t = docsExampleLive('tooltip');
}
