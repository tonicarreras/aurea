import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputText } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-input-text-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputText],
  template: `
    <div class="docs-example-field">
      <au-form-field
        [label]="t().emailLabel"
        [hint]="t().emailHint"
      >
        <input
          auInputText
          type="email"
          [placeholder]="t().emailPlaceholder"
        />
      </au-form-field>
    </div>
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
    <div class="docs-example-field">
      <au-form-field
        [label]="t().userLabel"
        [hint]="t().userHint"
      >
        <input
          auInputText
          [placeholder]="t().userPlaceholder"
        />
      </au-form-field>
    </div>
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
    <div class="docs-example-field">
      <au-form-field
        [label]="t().emailErrorLabel"
        [errorMessage]="t().emailError"
        [invalid]="true"
      >
        <input
          auInputText
          type="email"
          [placeholder]="t().emailErrorPlaceholder"
        />
      </au-form-field>
    </div>
  `,
})
export class ExampleInputTextErrorDemo {
  readonly t = docsExampleLive('inputText');
}

@Component({
  selector: 'docs-example-input-text-sizes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputText],
  template: `
    <div class="docs-example-field docs-demo-stack">
      <au-form-field [label]="t().sizeSmLabel">
        <input
          auInputText
          size="sm"
          [placeholder]="t().userPlaceholder"
        />
      </au-form-field>
      <au-form-field [label]="t().sizeMdLabel">
        <input
          auInputText
          [placeholder]="t().userPlaceholder"
        />
      </au-form-field>
      <au-form-field [label]="t().sizeLgLabel">
        <input
          auInputText
          size="lg"
          [placeholder]="t().userPlaceholder"
        />
      </au-form-field>
    </div>
  `,
})
export class ExampleInputTextSizesDemo {
  readonly t = docsExampleLive('inputText');
}
