import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuTheme } from './au-theme';

@Component({
  imports: [AuTheme],
  template: `<div auTheme="dark" id="host"></div>`,
})
class ThemeHost {}

@Component({
  imports: [AuTheme],
  template: `<div [auTheme]="'light'" id="host2"></div>`,
})
class ThemeHostLight {}

@Component({
  imports: [AuTheme],
  template: `<div [auTheme]="mode()" id="sys"></div>`,
})
class ThemeHostSystem {
  readonly mode = signal<'light' | 'dark' | 'system'>('system');
}

describe('AuTheme', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sets data-au-theme="dark" on host', () => {
    const fix = TestBed.createComponent(ThemeHost);
    fix.detectChanges();
    const el = fix.nativeElement.querySelector('#host') as HTMLElement;
    expect(el.getAttribute('data-au-theme')).toBe('dark');
  });

  it('sets data-au-theme="light" when bound to light', () => {
    const fix = TestBed.createComponent(ThemeHostLight);
    fix.detectChanges();
    const el = fix.nativeElement.querySelector('#host2') as HTMLElement;
    expect(el.getAttribute('data-au-theme')).toBe('light');
  });

  it('uses prefers-color-scheme when mode is system (dark)', () => {
    const mq = {
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    vi.stubGlobal('matchMedia', vi.fn(() => mq as unknown as MediaQueryList));
    const fix = TestBed.createComponent(ThemeHostSystem);
    fix.detectChanges();
    const el = fix.nativeElement.querySelector('#sys') as HTMLElement;
    expect(el.getAttribute('data-au-theme')).toBe('dark');
    expect(mq.addEventListener).toHaveBeenCalled();
  });

  it('uses prefers-color-scheme when mode is system (light)', () => {
    const mq = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    vi.stubGlobal('matchMedia', vi.fn(() => mq as unknown as MediaQueryList));
    const fix = TestBed.createComponent(ThemeHostSystem);
    fix.detectChanges();
    const el = fix.nativeElement.querySelector('#sys') as HTMLElement;
    expect(el.getAttribute('data-au-theme')).toBe('light');
  });

  it('updates when prefers-color-scheme changes', () => {
    let matches = false;
    let changeHandler: (() => void) | undefined;
    const mq = {
      get matches() {
        return matches;
      },
      addEventListener: (_e: string, fn: () => void) => {
        changeHandler = fn;
      },
      removeEventListener: vi.fn(),
    };
    vi.stubGlobal('matchMedia', vi.fn(() => mq as unknown as MediaQueryList));
    const fix = TestBed.createComponent(ThemeHostSystem);
    fix.detectChanges();
    const el = fix.nativeElement.querySelector('#sys') as HTMLElement;
    expect(el.getAttribute('data-au-theme')).toBe('light');
    matches = true;
    changeHandler?.();
    fix.detectChanges();
    expect(el.getAttribute('data-au-theme')).toBe('dark');
  });

  it('skips matchMedia when undefined', () => {
    vi.stubGlobal('matchMedia', undefined as unknown as typeof matchMedia);
    const fix = TestBed.createComponent(ThemeHostSystem);
    fix.detectChanges();
    const el = fix.nativeElement.querySelector('#sys') as HTMLElement;
    expect(el.getAttribute('data-au-theme')).toBe('light');
  });

  it('removes matchMedia listener on destroy', () => {
    const remove = vi.fn();
    const mq = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: remove,
    };
    vi.stubGlobal('matchMedia', vi.fn(() => mq as unknown as MediaQueryList));
    const fix = TestBed.createComponent(ThemeHostSystem);
    fix.detectChanges();
    fix.destroy();
    expect(remove).toHaveBeenCalled();
  });
});
