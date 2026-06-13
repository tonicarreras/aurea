import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputText } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-form-field-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputText],
  template: `
    <au-form-field
      [label]="t().emailLabel"
      [hint]="t().emailHint"
    >
      <input auInputText
        type="email"
        [placeholder]="t().emailPlaceholder"
      />
    </au-form-field>
  `,
})
export class ExampleFormFieldBasicDemo {
  readonly t = docsExampleLive('formField');
}

@Component({
  selector: 'docs-example-form-field-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputText],
  template: `
    <au-form-field
      [label]="t().userLabel"
      [hint]="t().userHint"
    >
      <input auInputText [placeholder]="t().userPlaceholder" />
    </au-form-field>
  `,
})
export class ExampleFormFieldHintDemo {
  readonly t = docsExampleLive('formField');
}

@Component({
  selector: 'docs-example-form-field-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputText],
  template: `
    <au-form-field
      [label]="t().emailErrorLabel"
      [errorMessage]="t().emailError"
      [invalid]="true"
    >
      <input auInputText
        type="email"
        [placeholder]="t().emailErrorPlaceholder"
      />
    </au-form-field>
  `,
})
export class ExampleFormFieldErrorDemo {
  readonly t = docsExampleLive('formField');
}
