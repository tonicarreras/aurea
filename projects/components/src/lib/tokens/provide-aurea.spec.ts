import { DOCUMENT } from '@angular/common';
import { ApplicationRef, Component, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { AU_THEME_CONFIG, provideAurea } from './provide-aurea';

@Component({ template: '' })
class BootstrapHost {}

describe('provideAurea', () => {
  it('writes theme vars on documentElement in the browser', async () => {
    await TestBed.configureTestingModule({
      imports: [BootstrapHost],
      providers: [
        provideAurea({
          theme: {
            actionPrimary: '#0055aa',
            actionPrimaryHover: '#004488',
            actionPrimaryPressed: '#003366',
            radiusField: '0.5rem',
            radiusSurface: '1rem',
            fontSans: 'Inter, sans-serif',
            fontMono: 'JetBrains Mono, monospace',
          },
        }),
      ],
    }).compileComponents();

    TestBed.createComponent(BootstrapHost);
    await TestBed.inject(ApplicationRef).whenStable();

    const doc = TestBed.inject(DOCUMENT);
    expect(doc.documentElement.style.getPropertyValue('--au-color-action-primary')).toBe('#0055aa');
    expect(doc.documentElement.style.getPropertyValue('--au-color-action-primary-hover')).toBe(
      '#004488',
    );
    expect(doc.documentElement.style.getPropertyValue('--au-color-action-primary-pressed')).toBe(
      '#003366',
    );
    expect(doc.documentElement.style.getPropertyValue('--au-radius-field')).toBe('0.5rem');
    expect(doc.documentElement.style.getPropertyValue('--au-radius-surface')).toBe('1rem');
    expect(doc.documentElement.style.getPropertyValue('--au-font-sans')).toBe('Inter, sans-serif');
    expect(doc.documentElement.style.getPropertyValue('--au-font-mono')).toBe(
      'JetBrains Mono, monospace',
    );
  });

  it('exposes empty AU_THEME_CONFIG by default', async () => {
    await TestBed.configureTestingModule({ providers: [provideAurea()] }).compileComponents();
    expect(TestBed.inject(AU_THEME_CONFIG)).toEqual({});
  });

  it('uses AU_THEME_CONFIG factory without provideAurea', async () => {
    await TestBed.configureTestingModule({}).compileComponents();
    expect(TestBed.inject(AU_THEME_CONFIG)).toEqual({});
  });

  it('skips writing vars outside the browser', async () => {
    await TestBed.configureTestingModule({
      imports: [BootstrapHost],
      providers: [
        provideAurea({ theme: { actionPrimary: '#abc' } }),
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    }).compileComponents();

    const doc = TestBed.inject(DOCUMENT);
    doc.documentElement.style.removeProperty('--au-color-action-primary');
    TestBed.createComponent(BootstrapHost);
    await TestBed.inject(ApplicationRef).whenStable();
    expect(doc.documentElement.style.getPropertyValue('--au-color-action-primary')).toBe('');
  });
});
