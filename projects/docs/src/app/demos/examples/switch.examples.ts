import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuSwitch } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-switch-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSwitch],
  template: `
    <au-form-field>
      <au-switch [label]="t().push" />
    </au-form-field>
  `,
})
export class ExampleSwitchBasicDemo {
  readonly t = docsExampleLive('switch');
}

@Component({
  selector: 'docs-example-switch-disabled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSwitch],
  template: `
    <au-form-field>
      <au-switch
        [label]="t().airplane"
        [checked]="true"
        [disabled]="true"
      />
    </au-form-field>
  `,
})
export class ExampleSwitchDisabledDemo {
  readonly t = docsExampleLive('switch');
}

@Component({
  selector: 'docs-example-switch-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSwitch],
  template: `
    <au-form-field
      [errorMessage]="t().errorMessage"
      [invalid]="true"
    >
      <au-switch [label]="t().privacy" />
    </au-form-field>
  `,
})
export class ExampleSwitchErrorDemo {
  readonly t = docsExampleLive('switch');
}
