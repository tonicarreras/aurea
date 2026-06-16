import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputPassword } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-input-password-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputPassword],
  template: `
    <au-form-field
      [label]="t().basicLabel"
      [hint]="t().basicHint"
    >
      <input
        auInputPassword
        autocomplete="current-password"
      />
    </au-form-field>
  `,
})
export class ExampleInputPasswordBasicDemo {
  readonly t = docsExampleLive('inputPassword');
}

@Component({
  selector: 'docs-example-input-password-sign-up',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputPassword],
  template: `
    <au-form-field
      [label]="t().signUpLabel"
      [required]="true"
    >
      <input
        auInputPassword
        autocomplete="new-password"
        [required]="true"
      />
    </au-form-field>
  `,
})
export class ExampleInputPasswordSignUpDemo {
  readonly t = docsExampleLive('inputPassword');
}
