import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuIcon } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-icon-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuIcon],
  template: `<au-icon
    name="info"
    size="md"
  />`,
})
export class ExampleIconBasicDemo {}

@Component({
  selector: 'docs-example-icon-sizes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuIcon],
  template: `
    <div style="display: flex; gap: 1rem; align-items: center; color: var(--au-color-text-primary)">
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
