import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuChip, AuChipGroup } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-chip-group-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuChip, AuChipGroup],
  template: `
    <au-chip-group [ariaLabel]="t().ariaLabel">
      <au-chip
        [label]="t().draft"
        [selectable]="true"
      />
      <au-chip
        [label]="t().published"
        [selectable]="true"
        [selected]="true"
        variant="accent"
      />
      <au-chip
        [label]="t().archived"
        [selectable]="true"
      />
    </au-chip-group>
  `,
})
export class ExampleChipGroupFiltersDemo {
  readonly t = docsExampleLive('chipGroup');
}
