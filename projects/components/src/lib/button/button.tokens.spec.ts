import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { AuButton, type AuButtonVariant } from './au-button.directive';

@Component({
  imports: [AuButton],
  template: `<button
    auButton
    [variant]="variant()"
    [size]="size()"
    [disabled]="disabled()"
    [loading]="loading()"
  >
    Save
  </button>`,
})
class ButtonTokenHost {
  readonly variant = input<AuButtonVariant>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly disabled = input(false);
  readonly loading = input(false);
}

function hostButton(fixture: ComponentFixture<ButtonTokenHost>): HTMLButtonElement {
  return fixture.nativeElement.querySelector('button.au-button') as HTMLButtonElement;
}

describe('AuButton token surface', () => {
  it('reflects variant and size on data attributes', async () => {
    await TestBed.configureTestingModule({ imports: [ButtonTokenHost] }).compileComponents();
    const fixture = TestBed.createComponent(ButtonTokenHost);
    fixture.componentRef.setInput('variant', 'outline');
    fixture.componentRef.setInput('size', 'lg');
    await fixture.whenStable();
    const btn = hostButton(fixture);
    expect(btn.getAttribute('data-au-variant')).toBe('outline');
    expect(btn.getAttribute('data-au-size')).toBe('lg');
    expect(btn.classList.contains('au-button')).toBe(true);
  });

  it('defaults variant primary and size md', async () => {
    await TestBed.configureTestingModule({ imports: [ButtonTokenHost] }).compileComponents();
    const fixture = TestBed.createComponent(ButtonTokenHost);
    await fixture.whenStable();
    const btn = hostButton(fixture);
    expect(btn.getAttribute('data-au-variant')).toBe('primary');
    expect(btn.getAttribute('data-au-size')).toBe('md');
  });

  it('sets aria-disabled when disabled or loading', async () => {
    await TestBed.configureTestingModule({ imports: [ButtonTokenHost] }).compileComponents();
    const fixture = TestBed.createComponent(ButtonTokenHost);
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
    expect(hostButton(fixture).getAttribute('aria-disabled')).toBe('true');

    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('loading', true);
    await fixture.whenStable();
    const loadingBtn = hostButton(fixture);
    expect(loadingBtn.getAttribute('aria-disabled')).toBe('true');
    expect(loadingBtn.getAttribute('aria-busy')).toBe('true');
    expect(loadingBtn.classList.contains('au-button--loading')).toBe(true);
  });
});
