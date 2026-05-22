import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuPagination } from './pagination';

@Component({
  imports: [AuPagination],
  template: `<au-pagination [page]="page()" [pageCount]="5" (pageChange)="onPage($event)" />`,
})
class Host {
  readonly page = signal(2);
  onPage(p: number): void {
    this.page.set(p);
  }
}

describe('AuPagination', () => {
  it('emits pageChange when a page button is clicked', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('au-button');
    const page3 = [...buttons].find((b: HTMLElement) => b.textContent?.trim() === '3');
    page3?.querySelector('button')?.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.page()).toBe(3);
  });
});
