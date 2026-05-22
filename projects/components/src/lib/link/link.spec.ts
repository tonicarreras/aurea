import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuLink } from './link';

@Component({
  imports: [AuLink],
  template: `<a
    auLink
    [href]="href"
    [external]="external"
    >Docs</a
  >`,
})
class AnchorHost {
  href = '/docs';
  external = false;
}

@Component({
  imports: [AuLink],
  template: `<au-link>Inline</au-link>`,
})
class ElementHost {}

describe('AuLink', () => {
  describe('anchor host', () => {
    it('sets href on host', () => {
      const fixture = TestBed.createComponent(AnchorHost);
      fixture.detectChanges();
      const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
      expect(anchor.getAttribute('href')).toBe('/docs');
    });

    it('sets external link attributes', () => {
      const fixture = TestBed.createComponent(AnchorHost);
      fixture.componentInstance.external = true;
      fixture.detectChanges();
      const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
      expect(anchor.getAttribute('target')).toBe('_blank');
      expect(anchor.getAttribute('rel')).toContain('noopener');
    });

    it('omits target when not external', () => {
      const fixture = TestBed.createComponent(AnchorHost);
      fixture.detectChanges();
      const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
      expect(anchor.getAttribute('target')).toBeNull();
      expect(anchor.getAttribute('rel')).toBeNull();
    });

    it('falls back to # for empty href', () => {
      const fixture = TestBed.createComponent(AnchorHost);
      fixture.componentInstance.href = '';
      fixture.detectChanges();
      const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
      expect(anchor.getAttribute('href')).toBe('#');
    });

    it('transforms null href to #', () => {
      const fixture = TestBed.createComponent(AuLink);
      fixture.componentRef.setInput('href', null as unknown as string);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('href')).toBe('#');
    });
  });

  describe('au-link element', () => {
    it('creates with default href', () => {
      const fixture = TestBed.createComponent(ElementHost);
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector('au-link') as HTMLElement;
      expect(el.classList.contains('au-link')).toBe(true);
      expect(el.getAttribute('href')).toBe('#');
    });

    it('applies subtle variant', () => {
      const fixture = TestBed.createComponent(AuLink);
      fixture.componentRef.setInput('variant', 'subtle');
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-au-variant')).toBe('subtle');
      expect(fixture.componentInstance.hasCustomHref()).toBe(false);
    });
  });
});
