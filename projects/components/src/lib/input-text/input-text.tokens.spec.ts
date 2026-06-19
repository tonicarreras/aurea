import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { AuInputTextTestHost, createFieldFixture } from '../form-field/form-field.spec-hosts';

describe('AuInputText token surface', () => {
  it('reflects size on data-au-size and host class', async () => {
    await TestBed.configureTestingModule({ imports: [AuInputTextTestHost] }).compileComponents();
    const fixture = createFieldFixture(AuInputTextTestHost, undefined, (f) => {
      f.componentInstance.size = 'sm';
    });
    const input = fixture.debugElement.query(By.css('input.au-input-text'))
      .nativeElement as HTMLInputElement;
    expect(input.classList.contains('au-input-text')).toBe(true);
    expect(input.getAttribute('data-au-size')).toBe('sm');
  });

  it('defaults to md size', async () => {
    await TestBed.configureTestingModule({ imports: [AuInputTextTestHost] }).compileComponents();
    const fixture = TestBed.createComponent(AuInputTextTestHost);
    await fixture.whenStable();
    const input = fixture.debugElement.query(By.css('input.au-input-text'))
      .nativeElement as HTMLInputElement;
    expect(input.getAttribute('data-au-size')).toBe('md');
  });
});
