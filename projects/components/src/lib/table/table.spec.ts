import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuEmptyState } from '../empty-state/empty-state';
import { AuTableCellDef } from './au-table-cell-def.directive';
import { AuTableColumn } from './au-table-column';
import { AuTable } from './table';

@Component({
  imports: [AuTable, AuTableColumn],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-table
      [data]="rows"
      title="People"
      [description]="description"
      caption="People"
      [sort]="sort"
      (sortChange)="onSortChange($event)"
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
      <au-table-column
        name="status"
        header="Status"
        align="center"
      />
    </au-table>
  `,
})
class TableHost {
  rows = [
    { name: 'Grace', role: 'Admiral', score: 94, status: 'ok' },
    { name: 'Ada', role: 'Engineer', score: 98, status: 'ok' },
  ];
  description = 'Team roster';
  sort = null as { column: string; direction: 'asc' | 'desc' | null } | null;
  sortChanges: ({ column: string; direction: 'asc' | 'desc' | null } | null)[] = [];

  onSortChange(state: { column: string; direction: 'asc' | 'desc' | null } | null): void {
    this.sort = state;
    this.sortChanges.push(state);
  }
}

@Component({
  imports: [AuTable, AuTableColumn, AuTableCellDef],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-table [data]="rows">
      <au-table-column
        name="label"
        header="Label"
      >
        <ng-template
          auTableCell
          let-row
        >
          <span class="custom">{{ row.label }}</span>
        </ng-template>
      </au-table-column>
    </au-table>
  `,
})
class CustomCellHost {
  rows = [{ label: 'X' }];
}

@Component({
  imports: [AuTable, AuTableColumn],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-table
      [data]="rows"
      [sort]="sort"
    >
      <au-table-column
        name="n"
        header="N"
        [accessor]="accessor"
        [sortable]="true"
      />
    </au-table>
  `,
})
class AccessorHost {
  rows = [{ n: 2 }, { n: 1 }];
  sort = null as { column: string; direction: 'asc' | 'desc' | null } | null;
  accessor: (row: unknown) => unknown = (row) => (row as { n: number }).n;
}

function tableInstance(fixture: ComponentFixture<unknown>): AuTable {
  return fixture.debugElement.query(By.directive(AuTable)).componentInstance as AuTable;
}

function sortButtons(root: HTMLElement): HTMLButtonElement[] {
  return [...root.querySelectorAll('.au-table__sort-btn')] as HTMLButtonElement[];
}

function tableCheckboxes(root: HTMLElement): HTMLInputElement[] {
  return [...root.querySelectorAll('input.au-checkbox__element')] as HTMLInputElement[];
}

async function createTableHost(): Promise<ComponentFixture<TableHost>> {
  await TestBed.configureTestingModule({ imports: [TableHost] }).compileComponents();
  const fixture = TestBed.createComponent(TableHost);
  await fixture.whenStable();
  return fixture;
}

describe('AuTable', () => {
  it('renders title, description, and column headers', async () => {
    const fixture = await createTableHost();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('.au-table__title')?.textContent?.trim()).toBe('People');
    expect(root.querySelector('.au-table__description')?.textContent?.trim()).toBe('Team roster');
    expect(root.textContent).toContain('Name');
    expect(root.textContent).toContain('Status');
  });

  it('renders row cells from column keys', async () => {
    const fixture = await createTableHost();
    const cells = (fixture.nativeElement as HTMLElement).querySelectorAll('tbody td');
    expect(cells.length).toBe(8);
    expect(cells[0]?.textContent?.trim()).toBe('Grace');
  });

  it('client-sorts text and numeric columns', async () => {
    const fixture = await createTableHost();
    const root = fixture.nativeElement as HTMLElement;
    const [nameBtn, scoreBtn] = sortButtons(root);
    nameBtn.click();
    await fixture.whenStable();
    expect(root.querySelector('tbody tr td')?.textContent?.trim()).toBe('Ada');

    scoreBtn.click();
    await fixture.whenStable();
    const scores = [...root.querySelectorAll('tbody tr td:nth-child(3)')].map((td) =>
      td.textContent?.trim(),
    );
    expect(scores[0]).toBe('94');
  });

  it('client-sorts in descending order', async () => {
    const fixture = await createTableHost();
    const table = tableInstance(fixture);
    table.sort.set({ column: 'name', direction: 'desc' });
    expect(table.viewRows().map((r) => (r as { name: string }).name)).toEqual(['Grace', 'Ada']);
  });

  it('cycles sort none → asc → desc → none and emits sortChange', async () => {
    const fixture = await createTableHost();
    const root = fixture.nativeElement as HTMLElement;
    const nameBtn = sortButtons(root)[0];
    nameBtn.click();
    nameBtn.click();
    nameBtn.click();
    nameBtn.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.sortChanges.map((s) => s?.direction ?? null)).toEqual([
      'asc',
      'desc',
      null,
      'asc',
    ]);
  });

  it('headerAriaSort reflects sortable column states', async () => {
    const fixture = await createTableHost();
    const table = tableInstance(fixture);
    const nameCol = table.columns().find((c) => c.name() === 'name')!;
    const statusCol = table.columns().find((c) => c.name() === 'status')!;

    table.sort.set({ column: 'name', direction: 'asc' });
    expect(table['headerAriaSort'](nameCol)).toBe('ascending');

    table.sort.set({ column: 'name', direction: 'desc' });
    expect(table['headerAriaSort'](nameCol)).toBe('descending');

    table.sort.set(null);
    expect(table['headerAriaSort'](nameCol)).toBe('none');
    expect(table['headerAriaSort'](statusCol)).toBeNull();
  });

  it('shows emptyMessage when data is empty', async () => {
    await TestBed.configureTestingModule({ imports: [TableHost] }).compileComponents();
    const fixture = TestBed.createComponent(TableHost);
    fixture.componentInstance.rows = [];
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('No data');
    expect(fixture.nativeElement.querySelector('.au-table__empty-message')).not.toBeNull();
  });

  it('projects au-empty-state when data is empty', async () => {
    @Component({
      imports: [AuTable, AuTableColumn, AuEmptyState],
      template: `
        <au-table [data]="[]">
          <au-table-column
            name="name"
            header="Name"
          />
          <au-empty-state
            title="No users yet"
            description="Create your first user."
            size="sm"
            [headingLevel]="3"
          />
        </au-table>
      `,
    })
    class EmptyStateHost {}

    await TestBed.configureTestingModule({ imports: [EmptyStateHost] }).compileComponents();
    const fixture = TestBed.createComponent(EmptyStateHost);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('au-empty-state')).not.toBeNull();
    expect(root.querySelector('.au-table__empty-message')).toBeNull();
    expect(root.textContent).toContain('No users yet');
    expect(root.textContent).not.toContain('No data');
  });

  it('applies striped, compact, and sticky header host attributes', async () => {
    @Component({
      imports: [AuTable, AuTableColumn],
      template: `
        <au-table
          [data]="[]"
          [striped]="true"
          [compact]="true"
          [stickyHeader]="true"
        >
          <au-table-column
            name="a"
            header="A"
          />
        </au-table>
      `,
    })
    class FlagsHost {}

    await TestBed.configureTestingModule({ imports: [FlagsHost] }).compileComponents();
    const fixture = TestBed.createComponent(FlagsHost);
    await fixture.whenStable();
    const host = fixture.debugElement.query(By.directive(AuTable)).nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-striped')).toBe('');
    expect(host.getAttribute('data-au-compact')).toBe('');
    expect(host.getAttribute('data-au-sticky-header')).toBe('');
  });

  it('registerColumn skips duplicates and unregisterColumn removes columns', async () => {
    const fixture = await createTableHost();
    const table = tableInstance(fixture);
    const col = table.columns()[0];
    table.registerColumn(col);
    expect(table.columns().length).toBe(4);
    table.unregisterColumn(col);
    expect(table.columns().length).toBe(3);
  });

  it('skips client sort when disabled', async () => {
    @Component({
      imports: [AuTable, AuTableColumn],
      template: `
        <au-table
          [data]="rows"
          [clientSort]="false"
          [sort]="{ column: 'name', direction: 'asc' }"
        >
          <au-table-column
            name="name"
            header="Name"
            [sortable]="true"
          />
        </au-table>
      `,
    })
    class NoClientSortHost {
      rows = [{ name: 'Grace' }, { name: 'Ada' }];
    }

    await TestBed.configureTestingModule({ imports: [NoClientSortHost] }).compileComponents();
    const fixture = TestBed.createComponent(NoClientSortHost);
    await fixture.whenStable();
    const table = tableInstance(fixture);
    expect(table.viewRows().map((r) => (r as { name: string }).name)).toEqual(['Grace', 'Ada']);
  });

  it('skips client sort when sort column is unknown', async () => {
    const fixture = await createTableHost();
    const table = tableInstance(fixture);
    table.sort.set({ column: 'missing', direction: 'asc' });
    expect(table.viewRows().map((r) => (r as { name: string }).name)).toEqual(['Grace', 'Ada']);
  });

  it('resolves sort direction fallback when direction is null on active column', async () => {
    const fixture = await createTableHost();
    const table = tableInstance(fixture);
    table.sort.set({ column: 'name', direction: null });
    table['toggleSort']('name');
    expect(table.sort()).toEqual({ column: 'name', direction: 'asc' });
  });

  it('formats null cell values as empty strings', async () => {
    const fixture = await createTableHost();
    const table = tableInstance(fixture);
    const col = table.columns()[0];
    expect(table['formatCell'](col, { name: null })).toBe('');
    expect(table['formatCell'](col, { name: 'Ada' })).toBe('Ada');
    expect(table['formatCell'](col, { name: { nested: true } })).toBe('{"nested":true}');
    expect(table['readCell'](col, null)).toBeUndefined();
  });

  it('compares numeric and mixed cell types', async () => {
    const fixture = await createTableHost();
    const table = tableInstance(fixture);
    const scoreCol = table.columns().find((c) => c.name() === 'score')!;
    expect(table['compareRows'](scoreCol, { score: 1 }, { score: 5 })).toBeLessThan(0);
    expect(table['compareRows'](scoreCol, { score: '10' }, { score: 2 })).not.toBe(0);
    expect(table['compareRows'](scoreCol, { score: null }, { score: undefined })).toBe(0);
  });

  it('uses trackByFn when provided', async () => {
    @Component({
      imports: [AuTable, AuTableColumn],
      template: `
        <au-table
          [data]="rows"
          [trackByFn]="trackByFn"
        >
          <au-table-column
            name="id"
            header="Id"
          />
        </au-table>
      `,
    })
    class TrackHost {
      rows = [{ id: 'a' }, { id: 'b' }];
      trackByFn = (index: number, row: unknown) => (row as { id: string }).id;
    }

    await TestBed.configureTestingModule({ imports: [TrackHost] }).compileComponents();
    const fixture = TestBed.createComponent(TrackHost);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr').length).toBe(2);
  });
});

describe('AuTable custom cell', () => {
  it('projects auTableCell template', async () => {
    await TestBed.configureTestingModule({ imports: [CustomCellHost] }).compileComponents();
    const f = TestBed.createComponent(CustomCellHost);
    await f.whenStable();
    expect(f.nativeElement.querySelector('.custom')?.textContent).toBe('X');
  });

  it('queries auTableCell content child on the column', async () => {
    await TestBed.configureTestingModule({ imports: [CustomCellHost] }).compileComponents();
    const f = TestBed.createComponent(CustomCellHost);
    await f.whenStable();
    const column = f.debugElement.query(By.directive(AuTableColumn))
      .componentInstance as AuTableColumn;
    expect(column.cellDef()).toBeTruthy();
  });
});

describe('AuTableColumn', () => {
  it('unregisters columns when the host is destroyed', async () => {
    const fixture = await createTableHost();
    const table = tableInstance(fixture);
    const unregister = vi.spyOn(table, 'unregisterColumn');
    fixture.destroy();
    expect(unregister).toHaveBeenCalledTimes(4);
  });

  it('coerces sortable boolean attribute', async () => {
    @Component({
      imports: [AuTable, AuTableColumn],
      template: `
        <au-table [data]="[{ a: 1 }]">
          <au-table-column
            name="a"
            header="A"
            sortable
          />
        </au-table>
      `,
    })
    class SortableAttrHost {}

    await TestBed.configureTestingModule({ imports: [SortableAttrHost] }).compileComponents();
    const fixture = TestBed.createComponent(SortableAttrHost);
    await fixture.whenStable();
    const table = tableInstance(fixture);
    expect(table.columns()[0].sortable()).toBe(true);
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('.au-table__sort-btn'),
    ).toBeTruthy();
  });
});

describe('AuTable extra branches', () => {
  it('shows loading row', async () => {
    @Component({
      imports: [AuTable, AuTableColumn],
      template: `
        <au-table
          [data]="[{ a: 1 }]"
          [loading]="true"
        >
          <au-table-column
            name="a"
            header="A"
          />
        </au-table>
      `,
    })
    class LoadingHost {}

    await TestBed.configureTestingModule({ imports: [LoadingHost] }).compileComponents();
    const fixture = TestBed.createComponent(LoadingHost);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.au-table__loading-row')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.au-spinner__label')?.textContent).toContain(
      'Loading',
    );
  });

  it('renders sort desc icon', async () => {
    const fixture = await createTableHost();
    const root = fixture.nativeElement as HTMLElement;
    const nameBtn = sortButtons(root)[0];
    nameBtn.click(); // → asc
    await fixture.whenStable();
    nameBtn.click(); // → desc
    await fixture.whenStable();
    const icon = root.querySelector('.au-table__sort-icon au-icon') as HTMLElement;
    expect(icon?.getAttribute('data-au-icon')).toBe('sort-desc');
  });

  it('renders without description when description is unset', async () => {
    @Component({
      imports: [AuTable, AuTableColumn],
      template: `
        <au-table
          [data]="[{ a: 1 }]"
          title="People"
        >
          <au-table-column
            name="a"
            header="A"
          />
        </au-table>
      `,
    })
    class NoDescHost {}

    await TestBed.configureTestingModule({ imports: [NoDescHost] }).compileComponents();
    const fix = TestBed.createComponent(NoDescHost);
    await fix.whenStable();
    expect(fix.nativeElement.querySelector('.au-table__title')?.textContent?.trim()).toBe('People');
    expect(fix.nativeElement.querySelector('.au-table__description')).toBeFalsy();
  });
});

describe('AuTable accessor column', () => {
  it('uses accessor for numeric sort compare', async () => {
    await TestBed.configureTestingModule({ imports: [AccessorHost] }).compileComponents();
    const f = TestBed.createComponent(AccessorHost);
    await f.whenStable();
    const btn = (f.nativeElement as HTMLElement).querySelector(
      '.au-table__sort-btn',
    ) as HTMLButtonElement;
    btn.click();
    await f.whenStable();
    const first = (f.nativeElement as HTMLElement).querySelector('tbody tr td');
    expect(first?.textContent?.trim()).toBe('1');
  });
});

describe('AuTable selection', () => {
  @Component({
    imports: [AuTable, AuTableColumn],
    template: `
      <au-table
        [data]="rows"
        selectionMode="multiple"
        [(selection)]="selection"
        (selectionChange)="onSelectionChange($event)"
      >
        <au-table-column
          name="name"
          header="Name"
        />
      </au-table>
    `,
  })
  class MultiSelectHost {
    rows = [
      { id: 1, name: 'Ada' },
      { id: 2, name: 'Grace' },
    ];
    selection: readonly unknown[] = [];
    selectionChanges: unknown[][] = [];

    onSelectionChange(next: readonly unknown[]): void {
      this.selection = next;
      this.selectionChanges.push([...next]);
    }
  }

  @Component({
    imports: [AuTable, AuTableColumn],
    template: `
      <au-table
        [data]="rows"
        selectionMode="single"
        [(selection)]="selection"
      >
        <au-table-column
          name="name"
          header="Name"
        />
      </au-table>
    `,
  })
  class SingleSelectHost {
    rows = [
      { id: 1, name: 'Ada' },
      { id: 2, name: 'Grace' },
    ];
    selection: readonly unknown[] = [];
  }

  it('toggles multiple selection via row checkbox', async () => {
    await TestBed.configureTestingModule({ imports: [MultiSelectHost] }).compileComponents();
    const fixture = TestBed.createComponent(MultiSelectHost);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const checkboxes = tableCheckboxes(root);
    expect(checkboxes.length).toBe(3);

    checkboxes[1].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.selection.length).toBe(1);
    expect((fixture.componentInstance.selection[0] as { name: string }).name).toBe('Ada');

    checkboxes[2].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.selection.length).toBe(2);
  });

  it('select-all toggles every visible row', async () => {
    await TestBed.configureTestingModule({ imports: [MultiSelectHost] }).compileComponents();
    const fixture = TestBed.createComponent(MultiSelectHost);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const selectAll = root.querySelector(
      '.au-table__header-cell--select input.au-checkbox__element',
    ) as HTMLInputElement;
    selectAll.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.selection.length).toBe(2);

    selectAll.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.selection.length).toBe(0);
  });

  it('single selection keeps at most one row', async () => {
    await TestBed.configureTestingModule({ imports: [SingleSelectHost] }).compileComponents();
    const fixture = TestBed.createComponent(SingleSelectHost);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const rowChecks = tableCheckboxes(root);
    rowChecks[0].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.selection.length).toBe(1);

    rowChecks[1].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.selection.length).toBe(1);
    expect((fixture.componentInstance.selection[0] as { name: string }).name).toBe('Grace');
  });

  it('row click selects when selectionMode is enabled', async () => {
    await TestBed.configureTestingModule({ imports: [MultiSelectHost] }).compileComponents();
    const fixture = TestBed.createComponent(MultiSelectHost);
    await fixture.whenStable();
    const row = (fixture.nativeElement as HTMLElement).querySelector(
      'tbody tr.au-table__row--selectable',
    ) as HTMLTableRowElement;
    row.querySelector('td:nth-child(2)')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();
    expect(fixture.componentInstance.selection.length).toBe(1);
  });

  it('marks selected rows with aria-selected and selected class', async () => {
    await TestBed.configureTestingModule({ imports: [MultiSelectHost] }).compileComponents();
    const fixture = TestBed.createComponent(MultiSelectHost);
    await fixture.whenStable();
    const table = tableInstance(fixture);
    table.selection.set([fixture.componentInstance.rows[0]]);
    await fixture.whenStable();
    const row = (fixture.nativeElement as HTMLElement).querySelector(
      'tbody tr.au-table__row--selected',
    ) as HTMLTableRowElement;
    expect(row.getAttribute('aria-selected')).toBe('true');
  });

  it('reports indeterminate select-all when partially selected', async () => {
    await TestBed.configureTestingModule({ imports: [MultiSelectHost] }).compileComponents();
    const fixture = TestBed.createComponent(MultiSelectHost);
    await fixture.whenStable();
    const table = tableInstance(fixture);
    table.selection.set([fixture.componentInstance.rows[0]]);
    await fixture.whenStable();
    expect(table['selectAllIndeterminate']()).toBe(true);
    expect(table['selectAllChecked']()).toBe(false);
  });

  it('uses compareSelection for row identity', async () => {
    @Component({
      imports: [AuTable, AuTableColumn],
      template: `
        <au-table
          [data]="rows"
          selectionMode="multiple"
          [selection]="selection"
          [compareSelection]="compare"
        >
          <au-table-column
            name="name"
            header="Name"
          />
        </au-table>
      `,
    })
    class CompareHost {
      rows = [{ id: 1, name: 'Ada' }];
      selection = [{ id: 1, name: 'Ada copy' }];
      compare = (a: unknown, b: unknown) => (a as { id: number }).id === (b as { id: number }).id;
    }

    await TestBed.configureTestingModule({ imports: [CompareHost] }).compileComponents();
    const fixture = TestBed.createComponent(CompareHost);
    await fixture.whenStable();
    const table = tableInstance(fixture);
    expect(table['isRowSelected'](fixture.componentInstance.rows[0])).toBe(true);
  });

  it('ignores row click on interactive controls', async () => {
    await TestBed.configureTestingModule({ imports: [MultiSelectHost] }).compileComponents();
    const fixture = TestBed.createComponent(MultiSelectHost);
    await fixture.whenStable();
    const table = tableInstance(fixture);
    const checkbox = (fixture.nativeElement as HTMLElement).querySelector(
      'tbody input.au-checkbox__element',
    ) as HTMLInputElement;
    table['onRowClick'](fixture.componentInstance.rows[0], {
      target: checkbox,
    } as unknown as MouseEvent);
    expect(fixture.componentInstance.selection.length).toBe(0);
  });

  it('deselects row in single mode when toggled again', async () => {
    await TestBed.configureTestingModule({ imports: [SingleSelectHost] }).compileComponents();
    const fixture = TestBed.createComponent(SingleSelectHost);
    await fixture.whenStable();
    const table = tableInstance(fixture);
    const row = fixture.componentInstance.rows[0];
    table['toggleRowSelection'](row);
    expect(table.selection().length).toBe(1);
    table['toggleRowSelection'](row);
    expect(table.selection().length).toBe(0);
  });

  it('sets data-au-selection on host when enabled', async () => {
    await TestBed.configureTestingModule({ imports: [MultiSelectHost] }).compileComponents();
    const fixture = TestBed.createComponent(MultiSelectHost);
    await fixture.whenStable();
    const host = fixture.debugElement.query(By.directive(AuTable)).nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-selection')).toBe('multiple');
  });

  it('deselects a row in multiple mode', async () => {
    await TestBed.configureTestingModule({ imports: [MultiSelectHost] }).compileComponents();
    const fixture = TestBed.createComponent(MultiSelectHost);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const rowCheckbox = root.querySelector(
      'tbody input.au-checkbox__element',
    ) as HTMLInputElement;
    rowCheckbox.click();
    await fixture.whenStable();
    rowCheckbox.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.selection.length).toBe(0);
  });

  it('no-ops selection helpers when selectionMode is none', async () => {
    const fixture = await createTableHost();
    const table = tableInstance(fixture);
    table['setSelectAll'](true);
    table['setRowSelected']({ name: 'Ada' }, true);
    table['onRowClick']({ name: 'Ada' }, {
      target: document.createElement('td'),
    } as unknown as MouseEvent);
    expect(table.selection()).toEqual([]);
    expect(table['rowAriaSelected']({ name: 'Ada' })).toBeNull();
  });

  it('select-all is unchecked when there are no rows', async () => {
    await TestBed.configureTestingModule({ imports: [MultiSelectHost] }).compileComponents();
    const fixture = TestBed.createComponent(MultiSelectHost);
    fixture.componentInstance.rows = [];
    await fixture.whenStable();
    const table = tableInstance(fixture);
    expect(table['selectAllChecked']()).toBe(false);
    expect(table['selectAllIndeterminate']()).toBe(false);
  });

  it('rowAriaSelected returns false for unselected rows', async () => {
    await TestBed.configureTestingModule({ imports: [MultiSelectHost] }).compileComponents();
    const fixture = TestBed.createComponent(MultiSelectHost);
    await fixture.whenStable();
    const table = tableInstance(fixture);
    expect(table['rowAriaSelected'](fixture.componentInstance.rows[0])).toBe('false');
  });

  it('setSelectAll no-ops outside multiple mode', async () => {
    await TestBed.configureTestingModule({ imports: [SingleSelectHost] }).compileComponents();
    const fixture = TestBed.createComponent(SingleSelectHost);
    await fixture.whenStable();
    const table = tableInstance(fixture);
    table['setSelectAll'](true);
    expect(table.selection()).toEqual([]);
  });

  it('sets header select-all indeterminate via au-checkbox', async () => {
    await TestBed.configureTestingModule({ imports: [MultiSelectHost] }).compileComponents();
    const fixture = TestBed.createComponent(MultiSelectHost);
    await fixture.whenStable();
    const table = tableInstance(fixture);
    table.selection.set([fixture.componentInstance.rows[0]]);
    await fixture.whenStable();
    expect(table['selectAllIndeterminate']()).toBe(true);
  });

  it('setRowSelected no-ops when state already matches', async () => {
    await TestBed.configureTestingModule({ imports: [MultiSelectHost] }).compileComponents();
    const fixture = TestBed.createComponent(MultiSelectHost);
    await fixture.whenStable();
    const table = tableInstance(fixture);
    const row = fixture.componentInstance.rows[0];
    table['setRowSelected'](row, true);
    const before = table.selection();
    table['setRowSelected'](row, true);
    expect(table.selection()).toBe(before);
    table['setRowSelected'](fixture.componentInstance.rows[1], false);
    expect(table.selection()).toBe(before);
  });
});
