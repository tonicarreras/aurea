import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuPagination } from './pagination';

describe('AuPagination', () => {
  let fixture: ComponentFixture<AuPagination>;
  let component: AuPagination;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuPagination],
    }).compileComponents();

    fixture = TestBed.createComponent(AuPagination);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('creates with navigation semantics', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('role')).toBe('navigation');
    expect(host.getAttribute('aria-label')).toBe('Pagination');
  });

  it('emits pageChange when a page button is clicked',async  () => {
    const emitted: number[] = [];
    fixture.componentRef.setInput('page', 2);
    fixture.componentRef.setInput('pageCount', 5);
    await fixture.whenStable();
    component.pageChange.subscribe((p) => emitted.push(p));

    const buttons = fixture.nativeElement.querySelectorAll('button.au-button');
    const page3 = [...buttons].find((b: HTMLElement) => b.textContent?.trim() === '3');
    page3?.click();
    await fixture.whenStable();
    expect(emitted).toEqual([3]);
  });

  it('does not emit when navigating to the current page',async  () => {
    const emitted: number[] = [];
    fixture.componentRef.setInput('page', 2);
    fixture.componentRef.setInput('pageCount', 5);
    await fixture.whenStable();
    component.pageChange.subscribe((p) => emitted.push(p));
    (component as unknown as { goTo: (p: number) => void }).goTo(2);
    expect(emitted).toEqual([]);
  });

  it('does not emit when disabled',async  () => {
    const emitted: number[] = [];
    fixture.componentRef.setInput('page', 2);
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
    component.pageChange.subscribe((p) => emitted.push(p));
    (component as unknown as { goTo: (p: number) => void }).goTo(3);
    expect(emitted).toEqual([]);
  });

  it('clamps page and pageCount to safe bounds',async  () => {
    fixture.componentRef.setInput('page', 0);
    fixture.componentRef.setInput('pageCount', 0);
    await fixture.whenStable();
    expect(component.safePageCount()).toBe(1);
    expect(component.safePage()).toBe(1);
  });

  it('lists all pages when pageCount <= 7',async  () => {
    fixture.componentRef.setInput('pageCount', 5);
    await fixture.whenStable();
    expect(component.pageItems()).toEqual([1, 2, 3, 4, 5]);
  });

  it('collapses page list when pageCount > 7',async  () => {
    fixture.componentRef.setInput('page', 5);
    fixture.componentRef.setInput('pageCount', 12);
    await fixture.whenStable();
    expect(component.pageItems()).toEqual([1, 4, 5, 6, 12]);
  });

  it('shows ellipsis between non-adjacent pages',async  () => {
    fixture.componentRef.setInput('page', 5);
    fixture.componentRef.setInput('pageCount', 12);
    await fixture.whenStable();
    const ellipsis = fixture.nativeElement.querySelectorAll('.au-pagination__ellipsis');
    expect(ellipsis.length).toBeGreaterThan(0);
    const showEllipsis = (
      component as unknown as {
        showEllipsisBefore: (i: number, pages: number[]) => boolean;
      }
    ).showEllipsisBefore;
    expect(showEllipsis(1, component.pageItems())).toBe(true);
    expect(showEllipsis(0, component.pageItems())).toBe(false);
  });

  it('prev and next navigate by one page',async  () => {
    const emitted: number[] = [];
    fixture.componentRef.setInput('page', 3);
    fixture.componentRef.setInput('pageCount', 5);
    await fixture.whenStable();
    component.pageChange.subscribe((p) => emitted.push(p));
    (component as unknown as { prev: () => void }).prev();
    (component as unknown as { next: () => void }).next();
    expect(emitted).toEqual([2, 4]);
  });

  it('disables prev on first page and next on last',async  () => {
    fixture.componentRef.setInput('page', 1);
    fixture.componentRef.setInput('pageCount', 3);
    await fixture.whenStable();
    expect(component.canPrev()).toBe(false);
    expect(component.canNext()).toBe(true);
    fixture.componentRef.setInput('page', 3);
    await fixture.whenStable();
    expect(component.canPrev()).toBe(true);
    expect(component.canNext()).toBe(false);
  });

  it('clicking Prev and Next buttons triggers navigation',async  () => {
    const emitted: number[] = [];
    fixture.componentRef.setInput('page', 3);
    fixture.componentRef.setInput('pageCount', 5);
    await fixture.whenStable();
    component.pageChange.subscribe((p) => emitted.push(p));

    const buttons = fixture.nativeElement.querySelectorAll('button.au-button');
    const prevBtn = [...buttons].find((b: HTMLElement) => b.textContent?.trim() === 'Prev');
    const nextBtn = [...buttons].find((b: HTMLElement) => b.textContent?.trim() === 'Next');
    prevBtn?.click();
    expect(emitted).toEqual([2]);
    nextBtn?.click();
    expect(emitted).toEqual([2, 4]);
  });
});
