import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputText } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-input-text-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputText],
  template: `
    <au-form-field [label]="t().emailLabel">
      <au-input-text
        type="email"
        [placeholder]="t().emailPlaceholder"
      />
    </au-form-field>
  `,
})
export class ExampleInputTextBasicDemo {
  readonly t = docsExampleLive('inputText');
}

@Component({
  selector: 'docs-example-input-text-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputText],
  template: `
    <au-form-field
      [label]="t().userLabel"
      [hint]="t().userHint"
    >
      <au-input-text [placeholder]="t().userPlaceholder" />
    </au-form-field>
  `,
})
export class ExampleInputTextHintDemo {
  readonly t = docsExampleLive('inputText');
}

@Component({
  selector: 'docs-example-input-text-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputText],
  template: `
    <au-form-field
      [label]="t().emailErrorLabel"
      [errorMessage]="t().emailError"
      [invalid]="true"
    >
      <au-input-text
        type="email"
        [placeholder]="t().emailErrorPlaceholder"
      />
    </au-form-field>
  `,
})
export class ExampleInputTextErrorDemo {
  readonly t = docsExampleLive('inputText');
}
