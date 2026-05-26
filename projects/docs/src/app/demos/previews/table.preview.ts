import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { AuTable, AuTableColumn } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTable, AuTableColumn],
  template: `
    <au-table
      [data]="rows()"
      [title]="t().title"
      [description]="t().description"
      [caption]="t().caption"
    >
      <au-table-column
        name="name"
        [header]="t().colName"
        [sortable]="true"
        cellVariant="primary"
      />
      <au-table-column
        name="role"
        [header]="t().colRole"
        cellVariant="secondary"
      />
      <au-table-column
        name="score"
        [header]="t().colScore"
        align="end"
        [sortable]="true"
      />
    </au-table>
  `,
})
export class TableDemo {
  readonly t = docsPreviewCopy('table');
  readonly rows = computed(() => {
    const t = this.t();
    return [
      { name: t.rowName, role: t.rowRole, score: 98 },
      { name: t.row2Name, role: t.row2Role, score: 94 },
    ];
  });
}
