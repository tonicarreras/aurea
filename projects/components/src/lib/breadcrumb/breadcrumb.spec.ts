import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuBreadcrumb } from './breadcrumb';

@Component({
  imports: [AuBreadcrumb],
  template: `<au-breadcrumb [items]="items" />`,
})
class Host {
  items = [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Button' },
  ];
}

describe('AuBreadcrumb', () => {
  it('marks the last item as current page', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const current = fixture.nativeElement.querySelector('[aria-current="page"]');
    expect(current?.textContent).toContain('Button');
  });
});
