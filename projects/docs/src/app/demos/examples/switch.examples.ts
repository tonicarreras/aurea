import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuSwitch } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-switch-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSwitch],
  template: `
    <au-form-field>
      <button
        type="button"
        auSwitch
        [label]="t().push"
      >
        <span class="au-sr-only">{{ t().push }}</span>
      </button>
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
      <button
        type="button"
        auSwitch
        [label]="t().airplane"
        [checked]="true"
        [disabled]="true"
      >
        <span class="au-sr-only">{{ t().airplane }}</span>
      </button>
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
      <button
        type="button"
        auSwitch
        [label]="t().privacy"
      >
        <span class="au-sr-only">{{ t().privacy }}</span>
      </button>
    </au-form-field>
  `,
})
export class ExampleSwitchErrorDemo {
  readonly t = docsExampleLive('switch');
}
