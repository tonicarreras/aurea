import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuTableCellDef } from './au-table-cell-def.directive';
import { AuTableColumn } from './au-table-column';
import { AuTable } from './table';

@Component({
  imports: [AuTable, AuTableColumn],
  template: `
    <au-table
      [data]="rows"
      title="People"
      caption="People"
      [(sort)]="sort"
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
class TableHost {
  rows = [
    { name: 'Grace', role: 'Admiral', score: 94 },
    { name: 'Ada', role: 'Engineer', score: 98 },
  ];
  sort = null as { column: string; direction: 'asc' | 'desc' | null } | null;
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

describe('AuTable', () => {
  let fixture: ComponentFixture<TableHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TableHost] }).compileComponents();
    fixture = TestBed.createComponent(TableHost);
    fixture.detectChanges();
  });

  it('renders title and column headers', () => {
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('.au-table__title')?.textContent?.trim()).toBe('People');
    expect(root.textContent).toContain('Name');
    expect(root.textContent).toContain('Score');
  });

  it('renders row cells from column keys', () => {
    const cells = (fixture.nativeElement as HTMLElement).querySelectorAll('tbody td');
    expect(cells.length).toBe(6);
    expect(cells[0]?.textContent?.trim()).toBe('Grace');
  });

  it('client-sorts when a sortable header is activated', () => {
    const btn = (fixture.nativeElement as HTMLElement).querySelector(
      '.au-table__sort-btn',
    ) as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();
    const first = (fixture.nativeElement as HTMLElement).querySelector('tbody tr td');
    expect(first?.textContent?.trim()).toBe('Ada');
  });
});

describe('AuTable custom cell', () => {
  it('projects auTableCell template', async () => {
    await TestBed.configureTestingModule({ imports: [CustomCellHost] }).compileComponents();
    const f = TestBed.createComponent(CustomCellHost);
    f.detectChanges();
    expect(f.nativeElement.querySelector('.custom')?.textContent).toBe('X');
  });
});
