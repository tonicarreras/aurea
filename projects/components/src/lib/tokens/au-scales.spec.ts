import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

/**
 * Expected hex values for scale variables across all Aurea themes.
 *
 * These ARE the spec. The test validates:
 * 1. Each theme CSS file resolves (via Angular styleUrl — build fails RED if missing)
 * 2. Every declared scale variable produces the expected computed hex value
 * 3. Dark-theme values are tested by injecting a global <style> block with
 *    [data-au-theme='dark'] rules (avoiding Angular emulated encapsulation)
 *
 * Themes tested:
 *   - au-primitives.css  (default, at :root)
 *   - au-aurea-blue.css  (opt-in, at [data-au-style='aurea-blue'])
 */

/* ─── Primitives (default theme — Apple monochrome) ─────────────────────── */

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
  /* Success — monochrome */
  '--au-scale-success-1': '#ffffff',
  '--au-scale-success-2': '#f5f5f7',
  '--au-scale-success-3': '#e8e8ed',
  '--au-scale-success-4': '#dcdce1',
  '--au-scale-success-5': '#d1d1d6',
  '--au-scale-success-6': '#c7c7cc',
  '--au-scale-success-7': '#aeaeb2',
  '--au-scale-success-8': '#8e8e93',
  '--au-scale-success-9': '#6e6e73',
  '--au-scale-success-10': '#5a5a60',
  '--au-scale-success-11': '#38383d',
  '--au-scale-success-12': '#1d1d1f',
  /* Warning — monochrome */
  '--au-scale-warning-1': '#ffffff',
  '--au-scale-warning-2': '#f5f5f7',
  '--au-scale-warning-3': '#e8e8ed',
  '--au-scale-warning-4': '#dcdce1',
  '--au-scale-warning-5': '#d1d1d6',
  '--au-scale-warning-6': '#c7c7cc',
  '--au-scale-warning-7': '#aeaeb2',
  '--au-scale-warning-8': '#8e8e93',
  '--au-scale-warning-9': '#6e6e73',
  '--au-scale-warning-10': '#5a5a60',
  '--au-scale-warning-11': '#38383d',
  '--au-scale-warning-12': '#1d1d1f',
  /* Info — monochrome */
  '--au-scale-info-1': '#ffffff',
  '--au-scale-info-2': '#f5f5f7',
  '--au-scale-info-3': '#e8e8ed',
  '--au-scale-info-4': '#dcdce1',
  '--au-scale-info-5': '#d1d1d6',
  '--au-scale-info-6': '#c7c7cc',
  '--au-scale-info-7': '#aeaeb2',
  '--au-scale-info-8': '#8e8e93',
  '--au-scale-info-9': '#6e6e73',
  '--au-scale-info-10': '#5a5a60',
  '--au-scale-info-11': '#38383d',
  '--au-scale-info-12': '#1d1d1f',
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
  /* Success — monochrome (dark) */
  '--au-scale-success-1': '#0c0e12',
  '--au-scale-success-2': '#1a1a1e',
  '--au-scale-success-3': '#242428',
  '--au-scale-success-4': '#2c2c30',
  '--au-scale-success-5': '#36363a',
  '--au-scale-success-6': '#424248',
  '--au-scale-success-7': '#515158',
  '--au-scale-success-8': '#636366',
  '--au-scale-success-9': '#787880',
  '--au-scale-success-10': '#86868b',
  '--au-scale-success-11': '#a1a1a6',
  '--au-scale-success-12': '#f5f5f7',
  /* Warning — monochrome (dark) */
  '--au-scale-warning-1': '#0c0e12',
  '--au-scale-warning-2': '#1a1a1e',
  '--au-scale-warning-3': '#242428',
  '--au-scale-warning-4': '#2c2c30',
  '--au-scale-warning-5': '#36363a',
  '--au-scale-warning-6': '#424248',
  '--au-scale-warning-7': '#515158',
  '--au-scale-warning-8': '#636366',
  '--au-scale-warning-9': '#787880',
  '--au-scale-warning-10': '#86868b',
  '--au-scale-warning-11': '#a1a1a6',
  '--au-scale-warning-12': '#f5f5f7',
  /* Info — monochrome (dark) */
  '--au-scale-info-1': '#0c0e12',
  '--au-scale-info-2': '#1a1a1e',
  '--au-scale-info-3': '#242428',
  '--au-scale-info-4': '#2c2c30',
  '--au-scale-info-5': '#36363a',
  '--au-scale-info-6': '#424248',
  '--au-scale-info-7': '#515158',
  '--au-scale-info-8': '#636366',
  '--au-scale-info-9': '#787880',
  '--au-scale-info-10': '#86868b',
  '--au-scale-info-11': '#a1a1a6',
  '--au-scale-info-12': '#f5f5f7',
};

/* ─── Aurea Blue theme scale values ─────────────────────────────────────── */

const AUREA_BLUE_LIGHT_VARS: Record<string, string> = {
  /* Neutral — slate-gray */
  '--au-scale-neutral-1': '#ffffff',
  '--au-scale-neutral-2': '#f8f9fa',
  '--au-scale-neutral-3': '#f1f2f4',
  '--au-scale-neutral-4': '#e9ebef',
  '--au-scale-neutral-5': '#e0e4ea',
  '--au-scale-neutral-6': '#c8ced7',
  '--au-scale-neutral-7': '#b8c0cc',
  '--au-scale-neutral-8': '#8d98a6',
  '--au-scale-neutral-9': '#5c6b7d',
  '--au-scale-neutral-10': '#3d4a5c',
  '--au-scale-neutral-11': '#1e2935',
  '--au-scale-neutral-12': '#101418',
  /* Action — blue */
  '--au-scale-action-1': '#f4f8fe',
  '--au-scale-action-2': '#e3ecf8',
  '--au-scale-action-3': '#c8daf5',
  '--au-scale-action-4': '#a8c4f0',
  '--au-scale-action-5': '#7eb8ff',
  '--au-scale-action-6': '#4d8fe6',
  '--au-scale-action-7': '#2a75d4',
  '--au-scale-action-8': '#1a63c0',
  '--au-scale-action-9': '#1059c8',
  '--au-scale-action-10': '#0d4aa3',
  '--au-scale-action-11': '#0a3a85',
  '--au-scale-action-12': '#072b6b',
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
  '--au-scale-success-1': '#f4fcf8',
  '--au-scale-success-2': '#ecfdf5',
  '--au-scale-success-3': '#d6f7e6',
  '--au-scale-success-4': '#bcefd3',
  '--au-scale-success-5': '#9ce2bc',
  '--au-scale-success-6': '#74d09e',
  '--au-scale-success-7': '#47b87e',
  '--au-scale-success-8': '#1e9f60',
  '--au-scale-success-9': '#047857',
  '--au-scale-success-10': '#036146',
  '--au-scale-success-11': '#024832',
  '--au-scale-success-12': '#013020',
  /* Warning — amber */
  '--au-scale-warning-1': '#fffcf0',
  '--au-scale-warning-2': '#fffbeb',
  '--au-scale-warning-3': '#fff4cc',
  '--au-scale-warning-4': '#ffeaaa',
  '--au-scale-warning-5': '#ffdc7f',
  '--au-scale-warning-6': '#feca4d',
  '--au-scale-warning-7': '#f5b324',
  '--au-scale-warning-8': '#e0980e',
  '--au-scale-warning-9': '#b45309',
  '--au-scale-warning-10': '#924106',
  '--au-scale-warning-11': '#6e3004',
  '--au-scale-warning-12': '#4a1f02',
  /* Info — sky-blue */
  '--au-scale-info-1': '#f0f9ff',
  '--au-scale-info-2': '#e0f2fe',
  '--au-scale-info-3': '#cae8fd',
  '--au-scale-info-4': '#a8dcfa',
  '--au-scale-info-5': '#7ccdf5',
  '--au-scale-info-6': '#4db8ec',
  '--au-scale-info-7': '#1a9ed8',
  '--au-scale-info-8': '#0a84c2',
  '--au-scale-info-9': '#0369a1',
  '--au-scale-info-10': '#075985',
  '--au-scale-info-11': '#064269',
  '--au-scale-info-12': '#032c4a',
};

const AUREA_BLUE_DARK_VARS: Record<string, string> = {
  /* Neutral (dark) */
  '--au-scale-neutral-1': '#0c0e12',
  '--au-scale-neutral-2': '#13161c',
  '--au-scale-neutral-3': '#181b22',
  '--au-scale-neutral-4': '#1a1e26',
  '--au-scale-neutral-5': '#1c222c',
  '--au-scale-neutral-6': '#252a33',
  '--au-scale-neutral-7': '#343b46',
  '--au-scale-neutral-8': '#4d5666',
  '--au-scale-neutral-9': '#5c6b7a',
  '--au-scale-neutral-10': '#7a8794',
  '--au-scale-neutral-11': '#a8b2bd',
  '--au-scale-neutral-12': '#eef1f4',
  /* Action (dark) */
  '--au-scale-action-1': '#0c1624',
  '--au-scale-action-2': '#131f33',
  '--au-scale-action-3': '#1a2a40',
  '--au-scale-action-4': '#223550',
  '--au-scale-action-5': '#2a4060',
  '--au-scale-action-6': '#38507a',
  '--au-scale-action-7': '#4a68a0',
  '--au-scale-action-8': '#5a8cc8',
  '--au-scale-action-9': '#6eb4ff',
  '--au-scale-action-10': '#8ec5ff',
  '--au-scale-action-11': '#b0d8ff',
  '--au-scale-action-12': '#cfe8ff',
  /* Error (dark) */
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
  /* Success (dark) */
  '--au-scale-success-1': '#082414',
  '--au-scale-success-2': '#0d331d',
  '--au-scale-success-3': '#134326',
  '--au-scale-success-4': '#1a5430',
  '--au-scale-success-5': '#22673d',
  '--au-scale-success-6': '#2c7d4c',
  '--au-scale-success-7': '#38965e',
  '--au-scale-success-8': '#47b374',
  '--au-scale-success-9': '#4ade80',
  '--au-scale-success-10': '#6ade97',
  '--au-scale-success-11': '#92e6b0',
  '--au-scale-success-12': '#bcefd3',
  /* Warning (dark) */
  '--au-scale-warning-1': '#241206',
  '--au-scale-warning-2': '#331909',
  '--au-scale-warning-3': '#43220d',
  '--au-scale-warning-4': '#542c11',
  '--au-scale-warning-5': '#673816',
  '--au-scale-warning-6': '#7c461b',
  '--au-scale-warning-7': '#965822',
  '--au-scale-warning-8': '#b46e2b',
  '--au-scale-warning-9': '#fbbf24',
  '--au-scale-warning-10': '#fcd14f',
  '--au-scale-warning-11': '#fde48a',
  '--au-scale-warning-12': '#fef3c8',
  /* Info (dark) */
  '--au-scale-info-1': '#071b2e',
  '--au-scale-info-2': '#0c243b',
  '--au-scale-info-3': '#112e48',
  '--au-scale-info-4': '#173956',
  '--au-scale-info-5': '#1f4666',
  '--au-scale-info-6': '#28567a',
  '--au-scale-info-7': '#346b92',
  '--au-scale-info-8': '#4483ae',
  '--au-scale-info-9': '#38bdf8',
  '--au-scale-info-10': '#6fcffa',
  '--au-scale-info-11': '#a3dffc',
  '--au-scale-info-12': '#d2effe',
};

/* ─── Alpha scale values — shared across themes (same pattern) ──────────── */

const NEUTRAL_ALPHA_LIGHT: Record<string, string> = {
  '--au-scale-neutral-A1': '#00000003',
  '--au-scale-neutral-A2': '#00000008',
  '--au-scale-neutral-A3': '#0000000d',
  '--au-scale-neutral-A4': '#00000014',
  '--au-scale-neutral-A5': '#0000001f',
  '--au-scale-neutral-A6': '#0000002e',
  '--au-scale-neutral-A7': '#00000047',
  '--au-scale-neutral-A8': '#00000072',
  '--au-scale-neutral-A9': '#000000a6',
  '--au-scale-neutral-A10': '#000000bf',
  '--au-scale-neutral-A11': '#000000e0',
  '--au-scale-neutral-A12': '#000000f8',
};

const NEUTRAL_ALPHA_DARK: Record<string, string> = {
  '--au-scale-neutral-A1': '#ffffff03',
  '--au-scale-neutral-A2': '#ffffff08',
  '--au-scale-neutral-A3': '#ffffff0d',
  '--au-scale-neutral-A4': '#ffffff14',
  '--au-scale-neutral-A5': '#ffffff1f',
  '--au-scale-neutral-A6': '#ffffff2e',
  '--au-scale-neutral-A7': '#ffffff47',
  '--au-scale-neutral-A8': '#ffffff72',
  '--au-scale-neutral-A9': '#ffffffa6',
  '--au-scale-neutral-A10': '#ffffffbf',
  '--au-scale-neutral-A11': '#ffffffe0',
  '--au-scale-neutral-A12': '#fffffff8',
};

const ERROR_ALPHA_LIGHT: Record<string, string> = {
  '--au-scale-error-A1': '#e0003003',
  '--au-scale-error-A2': '#e0003008',
  '--au-scale-error-A3': '#e000300d',
  '--au-scale-error-A4': '#e0003014',
  '--au-scale-error-A5': '#e000301f',
  '--au-scale-error-A6': '#e000302e',
  '--au-scale-error-A7': '#e0003047',
  '--au-scale-error-A8': '#e0003072',
  '--au-scale-error-A9': '#e00030a6',
  '--au-scale-error-A10': '#e00030bf',
  '--au-scale-error-A11': '#e00030e0',
  '--au-scale-error-A12': '#e00030f8',
};

const ERROR_ALPHA_DARK: Record<string, string> = {
  '--au-scale-error-A1': '#cc003003',
  '--au-scale-error-A2': '#cc003008',
  '--au-scale-error-A3': '#cc00300d',
  '--au-scale-error-A4': '#cc003014',
  '--au-scale-error-A5': '#cc00301f',
  '--au-scale-error-A6': '#cc00302e',
  '--au-scale-error-A7': '#cc003047',
  '--au-scale-error-A8': '#cc003072',
  '--au-scale-error-A9': '#cc0030a6',
  '--au-scale-error-A10': '#cc0030bf',
  '--au-scale-error-A11': '#cc0030e0',
  '--au-scale-error-A12': '#cc0030f8',
};

const SCALE_NAMES = ['neutral', 'action', 'error', 'success', 'warning', 'info'] as const;

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
    const needsStyleAureaBlue = selector.includes("data-au-style='aurea-blue'");

    beforeAll(() => {
      styleEl = injectStyle(buildScaleCss(vars, selector));
      if (needsStyleAureaBlue) {
        document.documentElement.setAttribute('data-au-style', 'aurea-blue');
      }
      if (needsThemeDark) {
        document.documentElement.setAttribute('data-au-theme', 'dark');
      }
    });

    afterAll(() => {
      removeStyle(styleEl);
      if (needsStyleAureaBlue) {
        document.documentElement.removeAttribute('data-au-style');
      }
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
      styleUrl: '../styles/au-aurea-blue.css',
    })
    class AureaBlueGate {}

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

    it('au-aurea-blue.css compiles', () => {
      TestBed.configureTestingModule({ imports: [AureaBlueGate] });
      const fix = TestBed.createComponent(AureaBlueGate);
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

  /* ─── Primitives (default theme) light ─────────────────────── */

  makeHexTests('primitives light :root', PRIMITIVES_LIGHT_VARS, ':root');

  /* ─── Primitives dark ──────────────────────────────────────── */

  makeHexTests(
    'primitives dark [data-au-theme="dark"]',
    PRIMITIVES_DARK_VARS,
    ":root[data-au-theme='dark']",
  );

  /* ─── Aurea Blue light ─────────────────────────────────────── */

  makeHexTests(
    'aurea-blue light [data-au-style="aurea-blue"]',
    AUREA_BLUE_LIGHT_VARS,
    "[data-au-style='aurea-blue']",
  );

  /* ─── Aurea Blue dark ──────────────────────────────────────── */

  makeHexTests(
    'aurea-blue dark [data-au-style="aurea-blue"][data-au-theme="dark"]',
    AUREA_BLUE_DARK_VARS,
    "[data-au-style='aurea-blue'][data-au-theme='dark']",
  );

  /* ─── Alpha scales — primitives (default theme) ────────────── */

  makeHexTests(
    'primitives neutral alpha light :root',
    NEUTRAL_ALPHA_LIGHT,
    ':root',
  );

  makeHexTests(
    'primitives neutral alpha dark [data-au-theme="dark"]',
    NEUTRAL_ALPHA_DARK,
    ":root[data-au-theme='dark']",
  );

  makeHexTests(
    'primitives error alpha light :root',
    ERROR_ALPHA_LIGHT,
    ':root',
  );

  makeHexTests(
    'primitives error alpha dark [data-au-theme="dark"]',
    ERROR_ALPHA_DARK,
    ":root[data-au-theme='dark']",
  );

  /* ─── Alpha scales — aurea blue ───────────────────────────── */

  makeHexTests(
    'aurea-blue neutral alpha light [data-au-style="aurea-blue"]',
    NEUTRAL_ALPHA_LIGHT,
    "[data-au-style='aurea-blue']",
  );

  makeHexTests(
    'aurea-blue neutral alpha dark',
    NEUTRAL_ALPHA_DARK,
    "[data-au-style='aurea-blue'][data-au-theme='dark']",
  );

  makeHexTests(
    'aurea-blue error alpha light [data-au-style="aurea-blue"]',
    ERROR_ALPHA_LIGHT,
    "[data-au-style='aurea-blue']",
  );

  makeHexTests(
    'aurea-blue error alpha dark',
    ERROR_ALPHA_DARK,
    "[data-au-style='aurea-blue'][data-au-theme='dark']",
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
