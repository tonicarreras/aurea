import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputDate } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-input-date-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputDate],
  template: `
    <au-form-field
      [label]="t().rangeLabel"
      [hint]="t().rangeHint"
    >
      <input
        auInputDate
        [minDate]="rangeMin"
        [maxDate]="rangeMax"
      />
    </au-form-field>
  `,
})
export class ExampleInputDateRangeDemo {
  readonly t = docsExampleLive('inputDate');
  readonly rangeMin = '2026-01-01';
  readonly rangeMax = '2026-12-31';
}
