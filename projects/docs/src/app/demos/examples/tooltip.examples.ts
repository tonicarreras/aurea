import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuButton, AuTooltip } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-tooltip-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuTooltip],
  template: `
    <au-button
      variant="outline"
      auTooltip="Ayuda contextual"
      auTooltipPlacement="top"
    >
      Pasar el cursor
    </au-button>
  `,
})
export class ExampleTooltipTopDemo {}

@Component({
  selector: 'docs-example-tooltip-right',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuTooltip],
  template: `
    <au-button
      variant="ghost"
      auTooltip="Aparece al final (inline-end)"
      auTooltipPlacement="end"
    >
      Derecha
    </au-button>
  `,
})
export class ExampleTooltipRightDemo {}
