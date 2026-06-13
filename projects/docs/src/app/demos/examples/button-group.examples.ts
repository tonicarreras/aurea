import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuButton, AuButtonGroup } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-button-group-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButtonGroup, AuButton],
  template: `
    <au-button-group [ariaLabel]="t().ariaLabel">
      <button
        auButton
        variant="outline"
      >
        {{ t().cancel }}
      </button>
      <button
        auButton
        variant="secondary"
      >
        {{ t().draft }}
      </button>
      <button auButton>{{ t().publish }}</button>
    </au-button-group>
  `,
})
export class ExampleButtonGroupBasicDemo {
  readonly t = docsExampleLive('buttonGroup');
}
