import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuDivider } from '@aurea-design-system/components';
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
      <p>Arriba</p>
      <au-divider />
      <p>Abajo</p>
    </div>
  `,
  styles: [DEMO_STACK],
})
export class ExampleDividerBasicDemo {}

@Component({
  selector: 'docs-example-divider-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuDivider],
  template: `<au-divider
    label="o continúa con"
    style="max-width: 18rem"
  />`,
})
export class ExampleDividerLabelDemo {}

// —— Tooltip ——
