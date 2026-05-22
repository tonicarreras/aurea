import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuBadge } from './badge';

@Component({
  imports: [AuBadge],
  template: `<au-badge [label]="label" [variant]="variant" [dot]="dot" />`,
})
class Host {
  label = '3';
  variant = 'default' as const;
  dot = false;
}

describe('AuBadge', () => {
  it('renders label text', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('3');
  });

  it('supports dot mode without label', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.label = '';
    fixture.componentInstance.dot = true;
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('au-badge') as HTMLElement;
    expect(host.getAttribute('data-au-dot')).toBe('');
  });
});
