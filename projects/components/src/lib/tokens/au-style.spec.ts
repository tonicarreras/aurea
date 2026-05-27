import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuStyleDirective } from './au-style';

@Component({
  imports: [AuStyleDirective],
  template: `<section [auStyle]="'unstyled'"></section>`,
})
class StyleHost {}

describe('AuStyleDirective', () => {
  it('sets data-au-style on host', () => {
    const fixture = TestBed.createComponent(StyleHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('section') as HTMLElement;
    expect(el.getAttribute('data-au-style')).toBe('unstyled');
  });
});
