import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuInputNumber } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-input-number',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputNumber],
  template: `<au-input-number label="Cantidad" [min]="0" [max]="10" style="max-width: 12rem" />`,
})
export class InputNumberDemo {}
