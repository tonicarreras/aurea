import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuChip } from '../chip/chip';
import { AuChipGroup } from './chip-group';

describe('AuChipGroup', () => {
  let fixture: ComponentFixture<AuChipGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuChipGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(AuChipGroup);
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exposes group semantics', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('role')).toBe('group');
    expect(host.classList.contains('au-chip-group')).toBe(true);
  });

  it('sets aria-label when provided', () => {
    fixture.componentRef.setInput('ariaLabel', 'Filters');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-label')).toBe('Filters');
  });

  it('treats null ariaLabel as empty', () => {
    fixture.componentRef.setInput('ariaLabel', null as unknown as string);
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-label')).toBeNull();
  });

  it('sets aria-labelledby when provided', () => {
    fixture.componentRef.setInput('ariaLabelledBy', 'filters-label');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-labelledby')).toBe('filters-label');
  });

  it('treats null ariaLabelledBy as empty', () => {
    fixture.componentRef.setInput('ariaLabelledBy', null as unknown as string);
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-labelledby')).toBeNull();
  });
});

@Component({
  imports: [AuChipGroup, AuChip],
  template: `
    <au-chip-group ariaLabel="Status">
      <au-chip label="Draft" [selectable]="true" />
    </au-chip-group>
  `,
})
class ChipGroupHost {}

describe('AuChipGroup integration', () => {
  it('wraps selectable chips', () => {
    const fix = TestBed.createComponent(ChipGroupHost);
    fix.detectChanges();
    expect(fix.nativeElement.querySelector('au-chip-group')?.getAttribute('role')).toBe('group');
    expect(fix.nativeElement.querySelector('au-chip')?.getAttribute('role')).toBeNull();
  });
});
