import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuChip, AuList } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-list-chips',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuList, AuChip],
  template: `
    <au-list ariaLabel="Selected technologies">
      <au-chip label="Angular" [removable]="true" />
      <au-chip label="TypeScript" [removable]="true" />
    </au-list>
  `,
})
export class ExampleListChipsDemo {}

@Component({
  selector: 'docs-example-list-labelled-by',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuList, AuChip],
  template: `
    <p id="tags-heading">Tags</p>
    <au-list ariaLabelledBy="tags-heading">
      <au-chip label="Design system" [removable]="true" />
      <au-chip label="Angular" [removable]="true" />
    </au-list>
  `,
})
export class ExampleListLabelledByDemo {}
