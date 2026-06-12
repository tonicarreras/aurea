import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputTime } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-input-time-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputTime],
  template: `
    <au-form-field [label]="t().basicLabel">
      <au-input-time />
    </au-form-field>
  `,
})
export class ExampleInputTimeBasicDemo {
  readonly t = docsExampleLive('inputTime');
}

@Component({
  selector: 'docs-example-input-time-bounds',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputTime],
  template: `
    <au-form-field
      [label]="t().boundsLabel"
      [hint]="t().boundsHint"
    >
      <au-input-time
        [minTime]="boundsMin"
        [maxTime]="boundsMax"
      />
    </au-form-field>
  `,
})
export class ExampleInputTimeBoundsDemo {
  readonly t = docsExampleLive('inputTime');
  readonly boundsMin = '08:00';
  readonly boundsMax = '20:00';
}
