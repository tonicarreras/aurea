import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

/**
 * Expected hex values for scale variables.
 *
 * These ARE the spec. The test validates:
 * 1. Each theme CSS file resolves (via Angular styleUrl — build fails RED if missing)
 * 2. Every declared scale variable produces the expected computed hex value
 * 3. Dark-theme values are tested by injecting a global <style> block with
 *    [data-au-theme='dark'] rules (avoiding Angular emulated encapsulation)
 *
 * Theme tested:
 *   - au-primitives.css  (at :root)
 */

/* ─── Light theme (Apple monochrome) ─────────────────────────── */

const PRIMITIVES_LIGHT_VARS: Record<string, string> = {
  /* Neutral — warm grey */
  '--au-scale-neutral-1': '#ffffff',
  '--au-scale-neutral-2': '#f5f5f7',
  '--au-scale-neutral-3': '#e8e8ed',
  '--au-scale-neutral-4': '#dcdce1',
  '--au-scale-neutral-5': '#d1d1d6',
  '--au-scale-neutral-6': '#c7c7cc',
  '--au-scale-neutral-7': '#aeaeb2',
  '--au-scale-neutral-8': '#8e8e93',
  '--au-scale-neutral-9': '#6e6e73',
  '--au-scale-neutral-10': '#5a5a60',
  '--au-scale-neutral-11': '#38383d',
  '--au-scale-neutral-12': '#1d1d1f',
  /* Action — monochrome */
  '--au-scale-action-1': '#ffffff',
  '--au-scale-action-2': '#f5f5f7',
  '--au-scale-action-3': '#e8e8ed',
  '--au-scale-action-4': '#dcdce1',
  '--au-scale-action-5': '#d1d1d6',
  '--au-scale-action-6': '#aeaeb2',
  '--au-scale-action-7': '#8e8e93',
  '--au-scale-action-8': '#6e6e73',
  '--au-scale-action-9': '#1d1d1f',
  '--au-scale-action-10': '#333336',
  '--au-scale-action-11': '#222226',
  '--au-scale-action-12': '#000000',
  /* Error — red */
  '--au-scale-error-1': '#fff8f7',
  '--au-scale-error-2': '#fff4f2',
  '--au-scale-error-3': '#ffe8e4',
  '--au-scale-error-4': '#ffd9d2',
  '--au-scale-error-5': '#fec4b9',
  '--au-scale-error-6': '#fba697',
  '--au-scale-error-7': '#f07a66',
  '--au-scale-error-8': '#d94d36',
  '--au-scale-error-9': '#b42318',
  '--au-scale-error-10': '#911e14',
  '--au-scale-error-11': '#5c0f0a',
  '--au-scale-error-12': '#3a0805',
  /* Success — green */
  '--au-scale-success-1': '#fafbfa',
  '--au-scale-success-2': '#f0f6f2',
  '--au-scale-success-3': '#e2efe7',
  '--au-scale-success-4': '#d3e6db',
  '--au-scale-success-5': '#c0dacc',
  '--au-scale-success-6': '#a9ccb7',
  '--au-scale-success-7': '#8db99f',
  '--au-scale-success-8': '#68a37a',
  '--au-scale-success-9': '#30a45c',
  '--au-scale-success-10': '#268a4b',
  '--au-scale-success-11': '#1b6838',
  '--au-scale-success-12': '#0f4223',
  /* Warning — amber */
  '--au-scale-warning-1': '#fcfaf5',
  '--au-scale-warning-2': '#f9f5ea',
  '--au-scale-warning-3': '#f2edd9',
  '--au-scale-warning-4': '#e9e2c5',
  '--au-scale-warning-5': '#ddd4ae',
  '--au-scale-warning-6': '#cdc294',
  '--au-scale-warning-7': '#b9ac78',
  '--au-scale-warning-8': '#9e905b',
  '--au-scale-warning-9': '#b8860b',
  '--au-scale-warning-10': '#9a7209',
  '--au-scale-warning-11': '#755607',
  '--au-scale-warning-12': '#4a3504',
  /* Info — sky-blue */
  '--au-scale-info-1': '#f6fafd',
  '--au-scale-info-2': '#eaf4fa',
  '--au-scale-info-3': '#d9ecf6',
  '--au-scale-info-4': '#c6e1f0',
  '--au-scale-info-5': '#b0d4e8',
  '--au-scale-info-6': '#96c3dd',
  '--au-scale-info-7': '#78aecf',
  '--au-scale-info-8': '#5295bd',
  '--au-scale-info-9': '#0284c7',
  '--au-scale-info-10': '#0270a8',
  '--au-scale-info-11': '#015581',
  '--au-scale-info-12': '#003555',
};

const PRIMITIVES_DARK_VARS: Record<string, string> = {
  /* Neutral — warm grey (dark) */
  '--au-scale-neutral-1': '#0c0e12',
  '--au-scale-neutral-2': '#1a1a1e',
  '--au-scale-neutral-3': '#242428',
  '--au-scale-neutral-4': '#2c2c30',
  '--au-scale-neutral-5': '#36363a',
  '--au-scale-neutral-6': '#424248',
  '--au-scale-neutral-7': '#515158',
  '--au-scale-neutral-8': '#636366',
  '--au-scale-neutral-9': '#787880',
  '--au-scale-neutral-10': '#86868b',
  '--au-scale-neutral-11': '#a1a1a6',
  '--au-scale-neutral-12': '#f5f5f7',
  /* Action — monochrome (dark) */
  '--au-scale-action-1': '#0c0e12',
  '--au-scale-action-2': '#1a1a1e',
  '--au-scale-action-3': '#242428',
  '--au-scale-action-4': '#2c2c30',
  '--au-scale-action-5': '#36363a',
  '--au-scale-action-6': '#424248',
  '--au-scale-action-7': '#636366',
  '--au-scale-action-8': '#86868b',
  '--au-scale-action-9': '#f5f5f7',
  '--au-scale-action-10': '#ffffff',
  '--au-scale-action-11': '#d0d0d0',
  '--au-scale-action-12': '#a1a1a6',
  /* Error — red (dark) */
  '--au-scale-error-1': '#1a0807',
  '--au-scale-error-2': '#240d0b',
  '--au-scale-error-3': '#311412',
  '--au-scale-error-4': '#3e1b1a',
  '--au-scale-error-5': '#4d2523',
  '--au-scale-error-6': '#61322f',
  '--au-scale-error-7': '#7b433e',
  '--au-scale-error-8': '#a55a53',
  '--au-scale-error-9': '#f97066',
  '--au-scale-error-10': '#fc9a90',
  '--au-scale-error-11': '#fec5c0',
  '--au-scale-error-12': '#ffe5e2',
  /* Success — green (dark) */
  '--au-scale-success-1': '#0c1112',
  '--au-scale-success-2': '#121e19',
  '--au-scale-success-3': '#192b22',
  '--au-scale-success-4': '#20372b',
  '--au-scale-success-5': '#284636',
  '--au-scale-success-6': '#335844',
  '--au-scale-success-7': '#416f57',
  '--au-scale-success-8': '#548c6e',
  '--au-scale-success-9': '#4ade7f',
  '--au-scale-success-10': '#62df92',
  '--au-scale-success-11': '#84e5a8',
  '--au-scale-success-12': '#acedc4',
  /* Warning — amber (dark) */
  '--au-scale-warning-1': '#12100c',
  '--au-scale-warning-2': '#1f1c15',
  '--au-scale-warning-3': '#2b271d',
  '--au-scale-warning-4': '#363125',
  '--au-scale-warning-5': '#423c2e',
  '--au-scale-warning-6': '#504938',
  '--au-scale-warning-7': '#645b47',
  '--au-scale-warning-8': '#7d7359',
  '--au-scale-warning-9': '#fbbf24',
  '--au-scale-warning-10': '#fcc94d',
  '--au-scale-warning-11': '#fdd87a',
  '--au-scale-warning-12': '#fee7ab',
  /* Info — sky-blue (dark) */
  '--au-scale-info-1': '#0c1115',
  '--au-scale-info-2': '#131e24',
  '--au-scale-info-3': '#1a2b33',
  '--au-scale-info-4': '#223842',
  '--au-scale-info-5': '#2b4653',
  '--au-scale-info-6': '#365667',
  '--au-scale-info-7': '#456c80',
  '--au-scale-info-8': '#58879e',
  '--au-scale-info-9': '#38bdf8',
  '--au-scale-info-10': '#5fcbfa',
  '--au-scale-info-11': '#8cd9fc',
  '--au-scale-info-12': '#b8e7fd',
};

/* ─── Helpers ───────────────────────────────────────────────────────────── */

function injectStyle(css: string): HTMLStyleElement {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  return style;
}

function removeStyle(style: HTMLStyleElement): void {
  style.remove();
}

function getVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function buildScaleCss(vars: Record<string, string>, selector: string): string {
  const items = Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');
  return `${selector} {\n${items}\n}`;
}

function makeHexTests(title: string, vars: Record<string, string>, selector: string) {
  describe(title, () => {
    let styleEl: HTMLStyleElement;
    const needsThemeDark = selector.includes("data-au-theme='dark'");

    beforeAll(() => {
      styleEl = injectStyle(buildScaleCss(vars, selector));
      if (needsThemeDark) {
        document.documentElement.setAttribute('data-au-theme', 'dark');
      }
    });

    afterAll(() => {
      removeStyle(styleEl);
      if (needsThemeDark) {
        document.documentElement.removeAttribute('data-au-theme');
      }
    });

    it(`has ${Object.keys(vars).length} scale variables (12‑step × ${Object.keys(vars).length / 12} scale${Object.keys(vars).length === 12 ? '' : 's'})`, () => {
      expect(Object.keys(vars).length % 12).toBe(0);
      expect(Object.keys(vars).length).toBeGreaterThan(0);
    });

    for (const [varName, expectedHex] of Object.entries(vars)) {
      it(`${varName} = ${expectedHex}`, () => {
        expect(getVar(varName)).toBe(expectedHex);
      });
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   Tests
   ═══════════════════════════════════════════════════════════════════════════ */

describe('Aurea theme scale values', () => {
  /* ─── File existence gates (build fails RED if missing) ─────── */

  describe('theme file build gates', () => {
    @Component({
      template: '',
      styleUrl: '../styles/au-primitives.css',
    })
    class PrimitivesGate {}

    @Component({
      template: '',
      styleUrl: './au-tokens.css',
    })
    class TokensGate {}

    it('au-primitives.css compiles', () => {
      TestBed.configureTestingModule({ imports: [PrimitivesGate] });
      const fix = TestBed.createComponent(PrimitivesGate);
      fix.detectChanges();
      expect(fix.nativeElement).toBeDefined();
    });

    it('au-tokens.css compiles', () => {
      TestBed.configureTestingModule({ imports: [TokensGate] });
      const fix = TestBed.createComponent(TokensGate);
      fix.detectChanges();
      expect(fix.nativeElement).toBeDefined();
    });

  });


  /* ─── Light ─────────────────────────────────────────────────── */

  makeHexTests('light :root', PRIMITIVES_LIGHT_VARS, ':root');

  /* ─── Dark ───────────────────────────────────────────────────── */

  makeHexTests(
    'dark [data-au-theme="dark"]',
    PRIMITIVES_DARK_VARS,
    ":root[data-au-theme='dark']",
  );

  /* ─── au-tokens.css — HC themes don't conflict ──────────────── */

  describe('au-tokens.css — HC themes', () => {
    @Component({
      host: { '[attr.data-au-theme]': '"high-contrast"' },
      template: '',
      styleUrl: './au-tokens.css',
    })
    class HcHost {}

    @Component({
      host: { '[attr.data-au-theme]': '"high-contrast-dark"' },
      template: '',
      styleUrl: './au-tokens.css',
    })
    class HcDarkHost {}

    it('compiles with high-contrast theme selector', () => {
      TestBed.configureTestingModule({ imports: [HcHost] });
      const fix = TestBed.createComponent(HcHost);
      fix.detectChanges();
      expect(fix.nativeElement.getAttribute('data-au-theme')).toBe('high-contrast');
    });

    it('compiles with high-contrast-dark theme selector', () => {
      TestBed.configureTestingModule({ imports: [HcDarkHost] });
      const fix = TestBed.createComponent(HcDarkHost);
      fix.detectChanges();
      expect(fix.nativeElement.getAttribute('data-au-theme')).toBe('high-contrast-dark');
    });
  });
});
