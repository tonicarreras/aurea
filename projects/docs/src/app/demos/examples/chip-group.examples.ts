import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuChip, AuChipGroup } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-chip-group-filters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuChipGroup, AuChip],
  template: `
    <au-chip-group ariaLabel="Status filters">
      <au-chip label="Draft" [selectable]="true" />
      <au-chip label="Published" [selectable]="true" [selected]="true" variant="accent" />
      <au-chip label="Archived" [selectable]="true" />
    </au-chip-group>
  `,
})
export class ExampleChipGroupFiltersDemo {}
