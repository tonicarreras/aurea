import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputDate } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-input-date-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputDate],
  template: `
    <au-form-field [label]="t().basicLabel">
      <au-input-date />
    </au-form-field>
  `,
})
export class ExampleInputDateBasicDemo {
  readonly t = docsExampleLive('inputDate');
}

@Component({
  selector: 'docs-example-input-date-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputDate],
  template: `
    <au-form-field
      [label]="t().errorLabel"
      [errorMessage]="t().errorMessage"
      [invalid]="true"
    >
      <au-input-date />
    </au-form-field>
  `,
})
export class ExampleInputDateErrorDemo {
  readonly t = docsExampleLive('inputDate');
}

@Component({
  selector: 'docs-example-input-date-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputDate],
  template: `
    <au-form-field
      [label]="t().hintLabel"
      [hint]="t().hint"
    >
      <au-input-date />
    </au-form-field>
  `,
})
export class ExampleInputDateHintDemo {
  readonly t = docsExampleLive('inputDate');
}
