import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputNumber } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-input-number-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputNumber],
  template: `
    <au-form-field [label]="t().basicLabel">
      <au-input-number
        [min]="0"
        [max]="10"
      />
    </au-form-field>
  `,
})
export class ExampleInputNumberBasicDemo {
  readonly t = docsExampleLive('inputNumber');
}

@Component({
  selector: 'docs-example-input-number-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputNumber],
  template: `
    <au-form-field
      [label]="t().errorLabel"
      [errorMessage]="t().errorMessage"
      [invalid]="true"
    >
      <au-input-number
        [min]="1"
        [max]="10"
      />
    </au-form-field>
  `,
})
export class ExampleInputNumberErrorDemo {
  readonly t = docsExampleLive('inputNumber');
}

@Component({
  selector: 'docs-example-input-number-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputNumber],
  template: `
    <au-form-field
      [label]="t().hintLabel"
      [hint]="t().hint"
    >
      <au-input-number
        [min]="0"
        [max]="99"
      />
    </au-form-field>
  `,
})
export class ExampleInputNumberHintDemo {
  readonly t = docsExampleLive('inputNumber');
}
