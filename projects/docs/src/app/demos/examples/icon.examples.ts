import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuIcon } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-icon-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuIcon],
  template: `
    <div class="docs-demo-row">
      <au-icon
        name="info"
        size="md"
      />
    </div>
  `,
})
export class ExampleIconBasicDemo {}

@Component({
  selector: 'docs-example-icon-sizes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuIcon],
  template: `
    <div class="docs-demo-row">
      <au-icon
        name="check-circle"
        size="sm"
      />
      <au-icon
        name="check-circle"
        size="md"
      />
      <au-icon
        name="check-circle"
        size="lg"
      />
    </div>
  `,
})
export class ExampleIconSizesDemo {}

@Component({
  selector: 'docs-example-icon-set',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuIcon],
  template: `
    <div class="docs-demo-row">
      <au-icon
        name="check-circle"
        size="md"
      />
      <au-icon
        name="warning"
        size="md"
      />
      <au-icon
        name="error"
        size="md"
      />
      <au-icon
        name="info"
        size="md"
      />
      <au-icon
        name="close"
        size="md"
      />
      <au-icon
        name="spinner"
        size="md"
      />
    </div>
  `,
})
export class ExampleIconSetDemo {}
