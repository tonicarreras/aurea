import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuButton, AuButtonGroup } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-button-group-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButtonGroup, AuButton],
  template: `
    <au-button-group [ariaLabel]="t().ariaLabel">
      <au-button variant="outline">{{ t().cancel }}</au-button>
      <au-button variant="secondary">{{ t().draft }}</au-button>
      <au-button>{{ t().publish }}</au-button>
    </au-button-group>
  `,
})
export class ExampleButtonGroupBasicDemo {
  readonly t = docsExampleLive('buttonGroup');
}
