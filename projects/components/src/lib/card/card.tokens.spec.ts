import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { AuCard } from './card';

describe('AuCard token surface', () => {
  it('reflects variant, size, and interactive on host', async () => {
    await TestBed.configureTestingModule({ imports: [AuCard] }).compileComponents();
    const fix = TestBed.createComponent(AuCard);
    fix.componentRef.setInput('variant', 'outlined');
    fix.componentRef.setInput('size', 'lg');
    fix.componentRef.setInput('interactive', true);
    await fix.whenStable();
    const host = fix.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-variant')).toBe('outlined');
    expect(host.getAttribute('data-au-size')).toBe('lg');
    expect(host.getAttribute('data-au-interactive')).toBe('');
    expect(host.classList.contains('au-card')).toBe(true);
  });

  it('defaults elevated variant and md size', async () => {
    await TestBed.configureTestingModule({ imports: [AuCard] }).compileComponents();
    const fix = TestBed.createComponent(AuCard);
    await fix.whenStable();
    const host = fix.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-variant')).toBe('elevated');
    expect(host.getAttribute('data-au-size')).toBe('md');
    expect(host.getAttribute('data-au-interactive')).toBeNull();
  });
});
