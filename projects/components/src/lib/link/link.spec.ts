import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuLink } from './link';

@Component({
  imports: [AuLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

describe('AuLink', () => {
  describe('anchor host', () => {
    it('sets href on host',async  () => {
      const fixture = TestBed.createComponent(AnchorHost);
      await fixture.whenStable();
      const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
      expect(anchor.getAttribute('href')).toBe('/docs');
    });

    it('sets external link attributes',async  () => {
      const fixture = TestBed.createComponent(AnchorHost);
      fixture.componentInstance.external = true;
      await fixture.whenStable();
      const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
      expect(anchor.getAttribute('target')).toBe('_blank');
      expect(anchor.getAttribute('rel')).toContain('noopener');
    });

    it('omits target when not external',async  () => {
      const fixture = TestBed.createComponent(AnchorHost);
      await fixture.whenStable();
      const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
      expect(anchor.getAttribute('target')).toBeNull();
      expect(anchor.getAttribute('rel')).toBeNull();
    });

    it('falls back to # for empty href',async  () => {
      const fixture = TestBed.createComponent(AnchorHost);
      fixture.componentInstance.href = '';
      await fixture.whenStable();
      const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
      expect(anchor.getAttribute('href')).toBe('#');
    });

    it('transforms null href to #',async  () => {
      @Component({
        imports: [AuLink],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `<a auLink [href]="href">Docs</a>`,
      })
      class NullHrefHost {
        href = null as unknown as string;
      }
      const fixture = TestBed.createComponent(NullHrefHost);
      await fixture.whenStable();
      const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
      expect(anchor.getAttribute('href')).toBe('#');
    });

    it('applies subtle variant',async  () => {
      @Component({
        imports: [AuLink],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `<a auLink variant="subtle">Docs</a>`,
      })
      class SubtleHost {}

      const fixture = TestBed.createComponent(SubtleHost);
      await fixture.whenStable();
      const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
      expect(anchor.getAttribute('data-au-variant')).toBe('subtle');
    });
  });
});
