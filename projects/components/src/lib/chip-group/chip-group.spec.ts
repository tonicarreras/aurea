import { Component, ChangeDetectionStrategy } from '@angular/core';
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
    await fixture.whenStable();
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exposes group semantics', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('role')).toBe('group');
    expect(host.classList.contains('au-chip-group')).toBe(true);
  });

  it('sets aria-label when provided',async  () => {
    fixture.componentRef.setInput('ariaLabel', 'Filters');
    await fixture.whenStable();
    expect(fixture.nativeElement.getAttribute('aria-label')).toBe('Filters');
  });

  it('treats null ariaLabel as empty',async  () => {
    fixture.componentRef.setInput('ariaLabel', null as unknown as string);
    await fixture.whenStable();
    expect(fixture.nativeElement.getAttribute('aria-label')).toBeNull();
  });

  it('sets aria-labelledby when provided',async  () => {
    fixture.componentRef.setInput('ariaLabelledBy', 'filters-label');
    await fixture.whenStable();
    expect(fixture.nativeElement.getAttribute('aria-labelledby')).toBe('filters-label');
  });

  it('treats null ariaLabelledBy as empty',async  () => {
    fixture.componentRef.setInput('ariaLabelledBy', null as unknown as string);
    await fixture.whenStable();
    expect(fixture.nativeElement.getAttribute('aria-labelledby')).toBeNull();
  });

  it('scrolls focused chips into view on focusin', () => {
    const target = document.createElement('button');
    target.scrollIntoView = vi.fn();
    fixture.nativeElement.querySelector('.au-chip-group__scroll')?.appendChild(target);
    target.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    expect(target.scrollIntoView).toHaveBeenCalledWith({
      block: 'nearest',
      inline: 'nearest',
    });
  });

  it('ignores focusin when target is not an HTMLElement', () => {
    const scroll = fixture.nativeElement.querySelector('.au-chip-group__scroll') as HTMLElement;
    const event = new FocusEvent('focusin', { bubbles: true });
    Object.defineProperty(event, 'target', { value: document });
    expect(() => scroll.dispatchEvent(event)).not.toThrow();
  });
});

@Component({
  imports: [AuChipGroup, AuChip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-chip-group ariaLabel="Status">
      <au-chip
        label="Draft"
        [selectable]="true"
      />
    </au-chip-group>
  `,
})
class ChipGroupHost {}

describe('AuChipGroup integration', () => {
  it('wraps selectable chips',async  () => {
    const fix = TestBed.createComponent(ChipGroupHost);
    await fix.whenStable();
    expect(fix.nativeElement.querySelector('au-chip-group')?.getAttribute('role')).toBe('group');
    expect(fix.nativeElement.querySelector('au-chip')?.getAttribute('role')).toBeNull();
  });
});
