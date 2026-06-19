import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { AuGapCapability } from './au-gap-capability';
import { AuPaddingCapability } from './au-padding-capability';
import { AU_STYLE_DEFAULTS, AU_STYLE_NAMESPACE } from './au-style-tokens';

@Component({
  hostDirectives: [{ directive: AuGapCapability, inputs: ['gap'] }],
  providers: [
    { provide: AU_STYLE_NAMESPACE, useValue: 'stack' },
    { provide: AU_STYLE_DEFAULTS, useValue: { gap: 'sm' } },
  ],
  template: ``,
})
class GapHost {}

describe('AuGapCapability', () => {
  it('reflects resolved gap and writes inline gap style', async () => {
    await TestBed.configureTestingModule({ imports: [GapHost] }).compileComponents();
    const fixture = TestBed.createComponent(GapHost);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('data-au-gap')).toBe('sm');
    expect(el.style.gap).toContain('var(--au-space-2)');
    expect(el.classList.contains('au-gap-capability')).toBe(true);
  });
});

describe('AuPaddingCapability', () => {
  @Component({
    hostDirectives: [{ directive: AuPaddingCapability, inputs: ['padding'] }],
    providers: [
      { provide: AU_STYLE_NAMESPACE, useValue: 'section' },
      { provide: AU_STYLE_DEFAULTS, useValue: { padding: 'md' } },
    ],
    template: ``,
  })
  class PaddingHost {}

  it('defaults padding from AU_STYLE_DEFAULTS', async () => {
    await TestBed.configureTestingModule({ imports: [PaddingHost] }).compileComponents();
    const fixture = TestBed.createComponent(PaddingHost);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('data-au-padding')).toBe('md');
    expect(el.style.padding).toContain('var(--au-space-3)');
  });

  it('uses AU_STYLE_DEFAULTS factory when unset', async () => {
    await TestBed.configureTestingModule({}).compileComponents();
    expect(TestBed.inject(AU_STYLE_DEFAULTS)).toEqual({});
  });

  it('falls back to lg when defaults omit padding', async () => {
    @Component({
      hostDirectives: [{ directive: AuPaddingCapability, inputs: ['padding'] }],
      providers: [
        { provide: AU_STYLE_NAMESPACE, useValue: 'section' },
        { provide: AU_STYLE_DEFAULTS, useValue: {} },
      ],
      template: ``,
    })
    class EmptyPaddingHost {}

    await TestBed.configureTestingModule({ imports: [EmptyPaddingHost] }).compileComponents();
    const fixture = TestBed.createComponent(EmptyPaddingHost);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).getAttribute('data-au-padding')).toBe('lg');
  });
});

describe('AuGapCapability defaults', () => {
  @Component({
    hostDirectives: [{ directive: AuGapCapability, inputs: ['gap'] }],
    providers: [
      { provide: AU_STYLE_NAMESPACE, useValue: 'stack' },
      { provide: AU_STYLE_DEFAULTS, useValue: {} },
    ],
    template: ``,
  })
  class EmptyDefaultsHost {}

  it('falls back to md when defaults omit gap', async () => {
    await TestBed.configureTestingModule({ imports: [EmptyDefaultsHost] }).compileComponents();
    const fixture = TestBed.createComponent(EmptyDefaultsHost);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('data-au-gap')).toBe('md');
  });
});
