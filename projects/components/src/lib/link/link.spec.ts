import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuLink } from './link';

@Component({
  imports: [AuLink],
  template: `
    <a
      auLink
      [href]="href"
      [variant]="variant"
      [external]="external"
      >Docs</a
    >
  `,
})
class AnchorHost {
  href = '/docs';
  external = false;
  variant: 'default' | 'subtle' = 'default';
}

describe('AuLink', () => {
  it('sets href on anchor host', () => {
    const fixture = TestBed.createComponent(AnchorHost);
    fixture.detectChanges();
    const anchor = fixture.nativeElement.querySelector('a[auLink]') as HTMLAnchorElement;
    expect(anchor.getAttribute('href')).toBe('/docs');
    expect(anchor.tagName).toBe('A');
  });

  it('sets external link attributes', () => {
    const fixture = TestBed.createComponent(AnchorHost);
    fixture.componentInstance.external = true;
    fixture.detectChanges();
    const anchor = fixture.nativeElement.querySelector('a[auLink]') as HTMLAnchorElement;
    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(anchor.getAttribute('rel')).toContain('noopener');
  });

  it('omits target when not external', () => {
    const fixture = TestBed.createComponent(AnchorHost);
    fixture.detectChanges();
    const anchor = fixture.nativeElement.querySelector('a[auLink]') as HTMLAnchorElement;
    expect(anchor.getAttribute('target')).toBeNull();
    expect(anchor.getAttribute('rel')).toBeNull();
  });

  it('falls back to # for empty href', () => {
    const fixture = TestBed.createComponent(AnchorHost);
    fixture.componentInstance.href = '';
    fixture.detectChanges();
    const anchor = fixture.nativeElement.querySelector('a[auLink]') as HTMLAnchorElement;
    expect(anchor.getAttribute('href')).toBe('#');
  });

  it('transforms null href to #', () => {
    const fixture = TestBed.createComponent(AnchorHost);
    fixture.componentInstance.href = null as unknown as string;
    fixture.detectChanges();
    const anchor = fixture.nativeElement.querySelector('a[auLink]') as HTMLAnchorElement;
    expect(anchor.getAttribute('href')).toBe('#');
  });

  it('applies subtle variant', () => {
    const fixture = TestBed.createComponent(AnchorHost);
    fixture.componentInstance.variant = 'subtle';
    fixture.detectChanges();
    const anchor = fixture.nativeElement.querySelector('a[auLink]') as HTMLAnchorElement;
    expect(anchor.getAttribute('data-au-variant')).toBe('subtle');
  });
});
