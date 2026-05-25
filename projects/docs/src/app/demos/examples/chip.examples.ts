import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuChip } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-chip-filled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuChip],
  template: `<au-chip label="Angular" />`,
})
export class ExampleChipFilledDemo {}

@Component({
  selector: 'docs-example-chip-outline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuChip],
  template: `<au-chip label="TypeScript" variant="outline" />`,
})
export class ExampleChipOutlineDemo {}

@Component({
  selector: 'docs-example-chip-removable',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuChip],
  template: `<au-chip [label]="t().removable" variant="accent" [removable]="true" />`,
})
export class ExampleChipRemovableDemo {
  readonly t = docsExampleLive('chip');
}
