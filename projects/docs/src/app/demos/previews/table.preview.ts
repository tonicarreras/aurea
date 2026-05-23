import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuTable, AuTableColumn } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTable, AuTableColumn],
  template: `
    <au-table
      [data]="rows"
      title="Team"
      description="Docs preview."
      caption="Team"
    >
      <au-table-column
        name="name"
        header="Name"
        [sortable]="true"
        cellVariant="primary"
      />
      <au-table-column
        name="role"
        header="Role"
        cellVariant="secondary"
      />
      <au-table-column
        name="score"
        header="Score"
        align="end"
        [sortable]="true"
      />
    </au-table>
  `,
})
export class TableDemo {
  readonly rows = [
    { name: 'Ada Lovelace', role: 'Engineer', score: 98 },
    { name: 'Grace Hopper', role: 'Admiral', score: 94 },
  ];
}
