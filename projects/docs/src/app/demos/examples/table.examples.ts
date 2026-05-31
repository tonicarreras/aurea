import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  AuBadge,
  AuButton,
  AuEmptyState,
  AuTable,
  AuTableCellDef,
  AuTableColumn,
} from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-table-single-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTable, AuTableColumn],
  template: `
    <au-table
      [data]="rows()"
      [title]="t().singleSelect.title"
      [description]="t().singleSelect.description"
      [caption]="t().caption"
      selectionMode="single"
      [(selection)]="selection"
      [striped]="true"
    >
      <au-table-column
        name="name"
        [header]="t().colName"
        sortable
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
      />
    </au-table>
  `,
})
export class ExampleTableSingleSelectDemo {
  readonly t = docsExampleLive('table');
  readonly selection = signal<readonly unknown[]>([]);
  readonly rows = computed(() => {
    const copy = this.t();
    return [
      { name: copy.row1Name, role: copy.row1Role, score: 98 },
      { name: copy.row2Name, role: copy.row2Role, score: 94 },
      { name: copy.row3Name, role: copy.row3Role, score: 97 },
    ];
  });
}

@Component({
  selector: 'docs-example-table-multiple-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTable, AuTableColumn],
  template: `
    <au-table
      [data]="rows()"
      [title]="t().multipleSelect.title"
      [description]="t().multipleSelect.description"
      [caption]="t().caption"
      selectionMode="multiple"
      [(selection)]="selection"
      [striped]="true"
    >
      <au-table-column
        name="name"
        [header]="t().colName"
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
        sortable
      />
    </au-table>
  `,
})
export class ExampleTableMultipleSelectDemo {
  readonly t = docsExampleLive('table');
  readonly selection = signal<readonly unknown[]>([]);
  readonly rows = computed(() => {
    const copy = this.t();
    return [
      { name: copy.row1Name, role: copy.row1Role, score: 98 },
      { name: copy.row2Name, role: copy.row2Role, score: 94 },
      { name: copy.row3Name, role: copy.row3Role, score: 97 },
    ];
  });
}

@Component({
  selector: 'docs-example-table-custom-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTable, AuTableColumn, AuTableCellDef, AuBadge],
  template: `
    <au-table
      [data]="rows()"
      [title]="t().customCell.title"
      [description]="t().customCell.description"
      [caption]="t().caption"
    >
      <au-table-column
        name="name"
        [header]="t().colName"
        cellVariant="primary"
      />
      <au-table-column
        name="role"
        [header]="t().colRole"
        cellVariant="secondary"
      />
      <au-table-column
        name="status"
        [header]="t().colStatus"
        align="center"
      >
        <ng-template
          auTableCell
          let-row
        >
          <au-badge
            [variant]="row.status === 'active' ? 'success' : 'warning'"
            [label]="row.status === 'active' ? t().statusActive : t().statusAway"
          />
        </ng-template>
      </au-table-column>
    </au-table>
  `,
})
export class ExampleTableCustomCellDemo {
  readonly t = docsExampleLive('table');
  readonly rows = computed(() => {
    const copy = this.t();
    return [
      { name: copy.row1Name, role: copy.row1Role, status: 'active' as const },
      { name: copy.row2Name, role: copy.row2Role, status: 'active' as const },
      { name: copy.row3Name, role: copy.row3Role, status: 'away' as const },
    ];
  });
}

@Component({
  selector: 'docs-example-table-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTable, AuTableColumn],
  template: `
    <au-table
      [data]="[]"
      [title]="t().loading.title"
      [description]="t().loading.description"
      [caption]="t().caption"
      [loading]="true"
      [loadingMessage]="t().loading.message"
    >
      <au-table-column
        name="name"
        [header]="t().colName"
      />
      <au-table-column
        name="role"
        [header]="t().colRole"
      />
    </au-table>
  `,
})
export class ExampleTableLoadingDemo {
  readonly t = docsExampleLive('table');
}

@Component({
  selector: 'docs-example-table-empty',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTable, AuTableColumn, AuEmptyState, AuButton],
  template: `
    <au-table
      [data]="[]"
      [title]="t().empty.title"
      [description]="t().empty.description"
      [caption]="t().caption"
    >
      <au-table-column
        name="name"
        [header]="t().colName"
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
      />
      <au-empty-state
        [title]="t().empty.stateTitle"
        [description]="t().empty.stateDescription"
        size="sm"
        [headingLevel]="3"
      >
        <au-button type="button">{{ t().empty.action }}</au-button>
      </au-empty-state>
    </au-table>
  `,
})
export class ExampleTableEmptyDemo {
  readonly t = docsExampleLive('table');
}
