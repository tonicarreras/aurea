import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuDensityDirective } from './au-density';

@Component({
  imports: [AuDensityDirective],
  template: `<div [auDensity]="'compact'"></div>`,
})
class Host {}

describe('AuDensityDirective', () => {
  it('sets data-au-density on the host',async  () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const el = fixture.nativeElement.querySelector('div') as HTMLElement;
    expect(el.getAttribute('data-au-density')).toBe('compact');
  });
});
