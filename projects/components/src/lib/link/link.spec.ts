import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuLink } from './link';

@Component({
  imports: [AuLink],
  template: `<a auLink href="/docs" [external]="true">Docs</a>`,
})
class Host {}

describe('AuLink', () => {
  it('sets external link attributes', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(anchor.getAttribute('rel')).toContain('noopener');
  });
});
