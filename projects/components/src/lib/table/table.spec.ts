import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuTableCellDef } from './au-table-cell-def.directive';
import { AuTableColumn } from './au-table-column';
import { AuTable } from './table';

@Component({
  imports: [AuTable, AuTableColumn],
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

@Component({
  imports: [AuTable, AuTableColumn],
  template: `
    <au-table
      [data]="rows"
      [(selectedRow)]="selected"
      (rowClick)="onRowClick($event)"
      [rowIdentity]="identityFn"
    >
      <au-table-column name="name" header="Name" />
    </au-table>
  `,
})
class SelectionHost {
  rows = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];
  selected: unknown = null;
  clicked: unknown[] = [];
  identityFn = (row: unknown) => (row as { id: number }).id;

  onRowClick(row: unknown): void {
    this.clicked.push(row);
  }
}

@Component({
  imports: [AuTable, AuTableColumn],
  template: `
    <au-table
      [data]="rows"
      selectionMode="multiple"
      [(selectedRows)]="selectedRows"
      [rowIdentity]="identityFn"
    >
      <au-table-column name="name" header="Name" />
    </au-table>
  `,
})
class MultipleSelectionHost {
  rows = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Carol' },
  ];
  selectedRows: unknown[] = [];
  identityFn = (row: unknown) => (row as { id: number }).id;
}

function tableInstance(fixture: ComponentFixture<unknown>): AuTable {
  return fixture.debugElement.query(By.directive(AuTable)).componentInstance as AuTable;
}

function sortButtons(root: HTMLElement): HTMLButtonElement[] {
  return [...root.querySelectorAll('.au-table__sort-btn')] as HTMLButtonElement[];
}

async function createTableHost(): Promise<ComponentFixture<TableHost>> {
  await TestBed.configureTestingModule({ imports: [TableHost] }).compileComponents();
  const fixture = TestBed.createComponent(TableHost);
  fixture.detectChanges();
  return fixture;
}

async function createSelectionHost(): Promise<ComponentFixture<SelectionHost>> {
  await TestBed.configureTestingModule({ imports: [SelectionHost] }).compileComponents();
  const fixture = TestBed.createComponent(SelectionHost);
  fixture.detectChanges();
  return fixture;
}

async function createMultipleSelectionHost(): Promise<ComponentFixture<MultipleSelectionHost>> {
  await TestBed.configureTestingModule({ imports: [MultipleSelectionHost] }).compileComponents();
  const fixture = TestBed.createComponent(MultipleSelectionHost);
  fixture.detectChanges();
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

  it('discovers column children via contentChildren', async () => {
    const fixture = await createTableHost();
    const table = tableInstance(fixture);
    expect(table.columns().length).toBe(4);
    expect(table.columns().map((c) => c.name())).toEqual(['name', 'role', 'score', 'status']);
  });

  it('client-sorts text and numeric columns', async () => {
    const fixture = await createTableHost();
    const root = fixture.nativeElement as HTMLElement;
    const [nameBtn, scoreBtn] = sortButtons(root);
    nameBtn.click();
    fixture.detectChanges();
    expect(root.querySelector('tbody tr td')?.textContent?.trim()).toBe('Ada');

    scoreBtn.click();
    fixture.detectChanges();
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

  it('cycles sort none → asc → desc → none via model', async () => {
    const fixture = await createTableHost();
    const table = tableInstance(fixture);
    const nameBtn = sortButtons(fixture.nativeElement as HTMLElement)[0];

    // First click → asc
    nameBtn.click();
    fixture.detectChanges();
    expect(table.sort()).toEqual({ column: 'name', direction: 'asc' });

    // Second click → desc
    nameBtn.click();
    fixture.detectChanges();
    expect(table.sort()).toEqual({ column: 'name', direction: 'desc' });

    // Third click → null
    nameBtn.click();
    fixture.detectChanges();
    expect(table.sort()).toBeNull();

    // Fourth click → asc again
    nameBtn.click();
    fixture.detectChanges();
    expect(table.sort()).toEqual({ column: 'name', direction: 'asc' });
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
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('No data');
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
    fixture.detectChanges();
    const host = fixture.debugElement.query(By.directive(AuTable)).nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-striped')).toBe('');
    expect(host.getAttribute('data-au-compact')).toBe('');
    expect(host.getAttribute('data-au-sticky-header')).toBe('');
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
    fixture.detectChanges();
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
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr').length).toBe(2);
  });

  it('reads nested cell keys with dot notation', async () => {
    @Component({
      imports: [AuTable, AuTableColumn],
      template: `
        <au-table [data]="rows">
          <au-table-column name="address.city" header="City" />
        </au-table>
      `,
    })
    class NestedKeyHost {
      rows = [{ address: { city: 'NYC' } }];
    }

    await TestBed.configureTestingModule({ imports: [NestedKeyHost] }).compileComponents();
    const fixture = TestBed.createComponent(NestedKeyHost);
    fixture.detectChanges();
    const table = tableInstance(fixture);
    const col = table.columns()[0];
    expect(table['readCell'](col, { address: { city: 'NYC' } })).toBe('NYC');
  });
});

describe('AuTable selection', () => {
  async function rows(fixture: ComponentFixture<SelectionHost>): Promise<NodeListOf<HTMLTableRowElement>> {
    return (fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr');
  }

  async function selectedRows(fixture: ComponentFixture<SelectionHost>): Promise<HTMLTableRowElement[]> {
    return [...(await rows(fixture))].filter((r) =>
      r.classList.contains('au-table__row--selected'),
    );
  }

  it('selects a row on click and marks it visually', async () => {
    const fixture = await createSelectionHost();
    const rowEls = await rows(fixture);
    (rowEls[0] as HTMLTableRowElement).click();
    fixture.detectChanges();
    expect(await selectedRows(fixture)).toHaveLength(1);
    expect((await selectedRows(fixture))[0]).toBe(rowEls[0]);
  });

  it('deselects when clicking the same row again', async () => {
    const fixture = await createSelectionHost();
    const rowEls = await rows(fixture);
    (rowEls[0] as HTMLTableRowElement).click();
    fixture.detectChanges();
    (rowEls[0] as HTMLTableRowElement).click();
    fixture.detectChanges();
    expect(await selectedRows(fixture)).toHaveLength(0);
  });

  it('switches selection when clicking a different row', async () => {
    const fixture = await createSelectionHost();
    const rowEls = await rows(fixture);
    (rowEls[0] as HTMLTableRowElement).click();
    fixture.detectChanges();
    (rowEls[1] as HTMLTableRowElement).click();
    fixture.detectChanges();
    const sel = await selectedRows(fixture);
    expect(sel).toHaveLength(1);
    expect(sel[0]).toBe(rowEls[1]);
  });

  it('emits rowClick on every click', async () => {
    const fixture = await createSelectionHost();
    const host = fixture.componentInstance;
    const rowEls = await rows(fixture);
    (rowEls[0] as HTMLTableRowElement).click();
    (rowEls[1] as HTMLTableRowElement).click();
    fixture.detectChanges();
    expect(host.clicked).toHaveLength(2);
  });

  it('selects via keyboard Enter and Space', async () => {
    const fixture = await createSelectionHost();
    const rowEls = await rows(fixture);
    const row = rowEls[0] as HTMLTableRowElement;

    row.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    expect(await selectedRows(fixture)).toHaveLength(1);

    // Space deselects (same row)
    row.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    fixture.detectChanges();
    expect(await selectedRows(fixture)).toHaveLength(0);
  });

  it('reacts to selectedRow model set from outside', async () => {
    const fixture = await createSelectionHost();
    const table = tableInstance(fixture);
    const row = fixture.componentInstance.rows[0];
    table.selectedRow.set(row);
    fixture.detectChanges();
    const sel = await selectedRows(fixture);
    expect(sel).toHaveLength(1);
  });

  it('sets aria-selected on the selected row', async () => {
    const fixture = await createSelectionHost();
    const rowEls = await rows(fixture);
    (rowEls[0] as HTMLTableRowElement).click();
    fixture.detectChanges();
    expect(rowEls[0].getAttribute('aria-selected')).toBe('true');
    expect(rowEls[1].getAttribute('aria-selected')).toBeNull();
  });

  it('uses rowIdentity to compare rows across data re-creations', async () => {
    const fixture = await createSelectionHost();
    const table = tableInstance(fixture);
    const original = fixture.componentInstance.rows[0];
    table.selectedRow.set(original);
    fixture.detectChanges();

    // Re-create data with same id but different reference
    fixture.componentInstance.rows = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    fixture.detectChanges();

    const sel = await selectedRows(fixture);
    expect(sel).toHaveLength(1);
  });

  it('does not select when no interactivity', async () => {
    const fixture = await createSelectionHost();
    expect(await selectedRows(fixture)).toHaveLength(0);
  });
});

describe('AuTable multiple selection', () => {
  async function rows(
    fixture: ComponentFixture<MultipleSelectionHost>,
  ): Promise<NodeListOf<HTMLTableRowElement>> {
    return (fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr');
  }

  async function selectedRows(
    fixture: ComponentFixture<MultipleSelectionHost>,
  ): Promise<HTMLTableRowElement[]> {
    return [...(await rows(fixture))].filter((r) => r.classList.contains('au-table__row--selected'));
  }

  it('keeps multiple selected rows at the same time', async () => {
    const fixture = await createMultipleSelectionHost();
    const rowEls = await rows(fixture);
    (rowEls[0] as HTMLTableRowElement).click();
    (rowEls[1] as HTMLTableRowElement).click();
    fixture.detectChanges();
    const selected = await selectedRows(fixture);
    expect(selected).toHaveLength(2);
    expect(rowEls[0].getAttribute('aria-selected')).toBe('true');
    expect(rowEls[1].getAttribute('aria-selected')).toBe('true');
  });

  it('toggles only the clicked row in multiple mode', async () => {
    const fixture = await createMultipleSelectionHost();
    const rowEls = await rows(fixture);
    (rowEls[0] as HTMLTableRowElement).click();
    (rowEls[1] as HTMLTableRowElement).click();
    fixture.detectChanges();

    (rowEls[0] as HTMLTableRowElement).click();
    fixture.detectChanges();

    const selected = await selectedRows(fixture);
    expect(selected).toHaveLength(1);
    expect(selected[0]).toBe(rowEls[1]);
  });
});

describe('AuTable custom cell', () => {
  it('projects auTableCell template', async () => {
    await TestBed.configureTestingModule({ imports: [CustomCellHost] }).compileComponents();
    const f = TestBed.createComponent(CustomCellHost);
    f.detectChanges();
    expect(f.nativeElement.querySelector('.custom')?.textContent).toBe('X');
  });

  it('queries auTableCell content child on the column', async () => {
    await TestBed.configureTestingModule({ imports: [CustomCellHost] }).compileComponents();
    const f = TestBed.createComponent(CustomCellHost);
    f.detectChanges();
    const column = f.debugElement.query(By.directive(AuTableColumn))
      .componentInstance as AuTableColumn;
    expect(column.cellDef()).toBeTruthy();
  });
});

describe('AuTableColumn', () => {
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
    fixture.detectChanges();
    const table = tableInstance(fixture);
    expect(table.columns()[0].sortable()).toBe(true);
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('.au-table__sort-btn'),
    ).toBeTruthy();
  });
});

describe('AuTable accessor column', () => {
  it('uses accessor for numeric sort compare', async () => {
    await TestBed.configureTestingModule({ imports: [AccessorHost] }).compileComponents();
    const f = TestBed.createComponent(AccessorHost);
    f.detectChanges();
    const btn = (f.nativeElement as HTMLElement).querySelector(
      '.au-table__sort-btn',
    ) as HTMLButtonElement;
    btn.click();
    f.detectChanges();
    const first = (f.nativeElement as HTMLElement).querySelector('tbody tr td');
    expect(first?.textContent?.trim()).toBe('1');
  });
});
