import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuStyleDirective, AuStyleMode } from './au-style';

@Component({
  imports: [AuStyleDirective],
  template: `<section [auStyle]="style"></section>`,
})
class StyleHost {
  style: AuStyleMode = 'default';
}

describe('AuStyleDirective', () => {
  it('sets data-au-style="default" by default', () => {
    const fixture = TestBed.createComponent(StyleHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('section') as HTMLElement;
    expect(el.getAttribute('data-au-style')).toBe('default');
  });

  it('sets data-au-style="unstyled" when auStyle is "unstyled"', () => {
    const fixture = TestBed.createComponent(StyleHost);
    fixture.componentInstance.style = 'unstyled';
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('section') as HTMLElement;
    expect(el.getAttribute('data-au-style')).toBe('unstyled');
  });

  it('sets data-au-style="aurea-blue" when auStyle is "aurea-blue"', () => {
    const fixture = TestBed.createComponent(StyleHost);
    fixture.componentInstance.style = 'aurea-blue';
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('section') as HTMLElement;
    expect(el.getAttribute('data-au-style')).toBe('aurea-blue');
  });
});
