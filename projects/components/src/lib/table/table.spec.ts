import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuTable, AuTableSortHeader } from './table';

describe('AuTable', () => {
  let fixture: ComponentFixture<AuTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuTable],
    }).compileComponents();

    fixture = TestBed.createComponent(AuTable);
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets striped and compact host attributes', () => {
    fixture.componentRef.setInput('striped', true);
    fixture.componentRef.setInput('compact', true);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-striped')).toBe('');
    expect(host.getAttribute('data-au-compact')).toBe('');
  });
});

describe('AuTableSortHeader', () => {
  let fixture: ComponentFixture<AuTableSortHeader>;
  let component: AuTableSortHeader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuTableSortHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(AuTableSortHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('cycles sort direction null → asc → desc → null', () => {
    const directions: Array<'asc' | 'desc' | null> = [];
    component.sort.subscribe((d) => directions.push(d));
    const btn = fixture.nativeElement.querySelector('.au-table__sort-btn') as HTMLButtonElement;
    btn.click();
    fixture.componentRef.setInput('sortDirection', 'asc');
    fixture.detectChanges();
    btn.click();
    fixture.componentRef.setInput('sortDirection', 'desc');
    fixture.detectChanges();
    btn.click();
    fixture.componentRef.setInput('sortDirection', null);
    fixture.detectChanges();
    btn.click();
    expect(directions).toEqual(['asc', 'desc', null, 'asc']);
  });

  it('maps aria-sort and icons', () => {
    fixture.componentRef.setInput('sortDirection', 'asc');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const btn = host.querySelector('.au-table__sort-btn') as HTMLButtonElement;
    expect(host.getAttribute('aria-sort')).toBe('ascending');
    expect(btn.getAttribute('aria-sort')).toBeNull();
    expect(component.ariaSort()).toBe('ascending');
    expect(component.sortIcon()).toBe('↑');

    fixture.componentRef.setInput('sortDirection', 'desc');
    fixture.detectChanges();
    expect(component.ariaSort()).toBe('descending');
    expect(component.sortIcon()).toBe('↓');

    fixture.componentRef.setInput('sortDirection', null);
    fixture.detectChanges();
    expect(component.ariaSort()).toBe('none');
    expect(component.sortIcon()).toBe('↕');
  });
});
