import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuBadge } from './badge';

describe('AuBadge', () => {
  let fixture: ComponentFixture<AuBadge>;
  let component: AuBadge;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(AuBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders label text', async () => {
    fixture.componentRef.setInput('label', '3');
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('3');
    expect(component.hasLabel()).toBe(true);
  });

  it('supports dot mode without label', async () => {
    fixture.componentRef.setInput('label', '');
    fixture.componentRef.setInput('dot', true);
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-dot')).toBe('');
    expect(component.hasLabel()).toBe(false);
  });

  it('trims whitespace from label', async () => {
    fixture.componentRef.setInput('label', '  hi  ');
    await fixture.whenStable();
    expect(component.resolvedLabel()).toBe('hi');
  });

  it('transforms null label to empty string', async () => {
    fixture.componentRef.setInput('label', null as unknown as string);
    await fixture.whenStable();
    expect(component.resolvedLabel()).toBe('');
    expect(component.hasLabel()).toBe(false);
  });

  it('sets variant on host', async () => {
    fixture.componentRef.setInput('variant', 'success');
    await fixture.whenStable();
    expect(fixture.nativeElement.getAttribute('data-au-variant')).toBe('success');
  });

  it('sets appearance and corner on host', async () => {
    fixture.componentRef.setInput('appearance', 'glass');
    fixture.componentRef.setInput('corner', 'top-end');
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-appearance')).toBe('glass');
    expect(host.getAttribute('data-au-corner')).toBe('top-end');
  });

  it('omits corner attribute when inline', async () => {
    fixture.componentRef.setInput('corner', 'inline');
    await fixture.whenStable();
    expect(fixture.nativeElement.hasAttribute('data-au-corner')).toBe(false);
  });

  it('renders projected content when label is empty', async () => {
    @Component({
      imports: [AuBadge],
      template: `<au-badge variant="success">Active</au-badge>`,
    })
    class ProjectedHost {}

    const projected = TestBed.createComponent(ProjectedHost);
    await projected.whenStable();
    expect(projected.nativeElement.textContent).toContain('Active');
    expect(projected.nativeElement.querySelector('au-badge')?.getAttribute('data-au-variant')).toBe(
      'success',
    );
  });
});
