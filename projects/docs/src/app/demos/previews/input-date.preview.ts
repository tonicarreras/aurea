import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuInputDate } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-input-date',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuInputDate],
  template: `<au-input-date label="Fecha de inicio" style="max-width: 14rem" />`,
})
export class InputDateDemo {}
