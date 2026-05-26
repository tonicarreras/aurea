import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuDivider } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';
import { DEMO_STACK } from '../shared/demo-layout';

@Component({
  selector: 'docs-example-divider-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuDivider],
  template: `
    <div
      class="docs-demo-stack"
      style="max-width: 18rem"
    >
      <p>{{ t().above }}</p>
      <au-divider />
      <p>{{ t().below }}</p>
    </div>
  `,
  styles: [DEMO_STACK],
})
export class ExampleDividerBasicDemo {
  readonly t = docsExampleLive('divider');
}

@Component({
  selector: 'docs-example-divider-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuDivider],
  template: `<au-divider
    [label]="t().label"
    style="max-width: 18rem"
  />`,
})
export class ExampleDividerLabelDemo {
  readonly t = docsExampleLive('divider');
}
