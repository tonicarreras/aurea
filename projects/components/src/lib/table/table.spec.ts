import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuTable, AuTableSortHeader } from './table';

@Component({
  imports: [AuTable, AuTableSortHeader],
  template: `
    <au-table [striped]="true">
      <thead>
        <tr>
          <th
            auTableSortHeader
            [sortDirection]="sort()"
            (sort)="sort.set($event)"
            >Name</th
          >
        </tr>
      </thead>
      <tbody>
        <tr><td>Ada</td></tr>
      </tbody>
    </au-table>
  `,
})
class Host {
  readonly sort = signal<'asc' | 'desc' | null>(null);
}

describe('AuTable', () => {
  it('cycles sort direction on header click', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.au-table__sort-btn') as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.sort()).toBe('asc');
    btn.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.sort()).toBe('desc');
  });
});
