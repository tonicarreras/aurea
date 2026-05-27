import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuCardMedia } from './card-media.directive';

describe('AuCardMedia', () => {
  it('renders projected content', () => {
    const fix = TestBed.createComponent(TestCardMediaComponent);
    fix.detectChanges();
    const img = fix.nativeElement.querySelector('img') as HTMLElement;
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('hero.jpg');
  });

  it('host element is a block-level container', () => {
    const fix = TestBed.createComponent(TestCardMediaComponent);
    fix.detectChanges();
    const host = fix.nativeElement.querySelector('[auCardMedia]') as HTMLElement;
    expect(host).toBeTruthy();
    expect(host.tagName.toLowerCase()).toBe('figure');
  });
});

@Component({
  selector: 'test-card-media',
  imports: [AuCardMedia],
  template: `
    <figure auCardMedia>
      <img
        src="hero.jpg"
        alt="hero"
      />
    </figure>
  `,
})
class TestCardMediaComponent {}
