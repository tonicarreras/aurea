import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuCheckbox } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-checkbox-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCheckbox],
  template: `<au-checkbox [label]="t().terms" />`,
})
export class ExampleCheckboxBasicDemo {
  readonly t = docsExampleLive('checkbox');
}

@Component({
  selector: 'docs-example-checkbox-checked',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCheckbox],
  template: `<au-checkbox [label]="t().newsletter" [checked]="true" />`,
})
export class ExampleCheckboxCheckedDemo {
  readonly t = docsExampleLive('checkbox');
}

@Component({
  selector: 'docs-example-checkbox-indeterminate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCheckbox],
  template: `<au-checkbox [label]="t().selectAll" [indeterminate]="true" />`,
})
export class ExampleCheckboxIndeterminateDemo {
  readonly t = docsExampleLive('checkbox');
}
