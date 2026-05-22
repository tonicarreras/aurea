import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuProgress } from './progress';

@Component({
  imports: [AuProgress],
  template: `<au-progress [value]="50" [max]="100" />`,
})
class Host {}

describe('AuProgress', () => {
  it('exposes progressbar semantics', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('au-progress') as HTMLElement;
    expect(el.getAttribute('role')).toBe('progressbar');
    expect(el.getAttribute('aria-valuenow')).toBe('50');
  });
});
