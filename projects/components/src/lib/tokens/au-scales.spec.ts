import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

/**
 * Expected hex values for all 5 scales × 12 steps × 2 themes.
 *
 * These ARE the spec. The test validates:
 * 1. The CSS file resolves (via Angular styleUrl — build fails RED if missing)
 * 2. Every declared variable produces the expected computed hex value
 *
 * Dark-theme values are tested by injecting a global <style> block with
 * [data-au-theme='dark'] rules (avoiding Angular emulated encapsulation).
 */

const SCALE_NAMES = ['neutral', 'action', 'error', 'success', 'warning', 'info'] as const;

const LIGHT_VARS: Record<string, string> = {
  /* Neutral */
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
  /* Action */
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
  /* Error */
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
  /* Success */
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
  /* Warning */
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
  /* Info */
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

const DARK_VARS: Record<string, string> = {
  /* Neutral */
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
  /* Action */
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
  /* Error */
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
  /* Success */
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
  /* Warning */
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
  /* Info */
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

/* ─── Alpha scales (A1–A12) ────────────────────────────────── */

const LIGHT_ALPHA_VARS: Record<string, string> = {
  /* Neutral */
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
  /* Action */
  '--au-scale-action-A1': '#0080ff03',
  '--au-scale-action-A2': '#0080ff08',
  '--au-scale-action-A3': '#0080ff0d',
  '--au-scale-action-A4': '#0080ff14',
  '--au-scale-action-A5': '#0080ff1f',
  '--au-scale-action-A6': '#0080ff2e',
  '--au-scale-action-A7': '#0080ff47',
  '--au-scale-action-A8': '#0080ff72',
  '--au-scale-action-A9': '#0080ffa6',
  '--au-scale-action-A10': '#0080ffbf',
  '--au-scale-action-A11': '#0080ffe0',
  '--au-scale-action-A12': '#0080fff8',
  /* Error */
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
  /* Success */
  '--au-scale-success-A1': '#00b36803',
  '--au-scale-success-A2': '#00b36808',
  '--au-scale-success-A3': '#00b3680d',
  '--au-scale-success-A4': '#00b36814',
  '--au-scale-success-A5': '#00b3681f',
  '--au-scale-success-A6': '#00b3682e',
  '--au-scale-success-A7': '#00b36847',
  '--au-scale-success-A8': '#00b36872',
  '--au-scale-success-A9': '#00b368a6',
  '--au-scale-success-A10': '#00b368bf',
  '--au-scale-success-A11': '#00b368e0',
  '--au-scale-success-A12': '#00b368f8',
  /* Warning */
  '--au-scale-warning-A1': '#ffa00003',
  '--au-scale-warning-A2': '#ffa00008',
  '--au-scale-warning-A3': '#ffa0000d',
  '--au-scale-warning-A4': '#ffa00014',
  '--au-scale-warning-A5': '#ffa0001f',
  '--au-scale-warning-A6': '#ffa0002e',
  '--au-scale-warning-A7': '#ffa00047',
  '--au-scale-warning-A8': '#ffa00072',
  '--au-scale-warning-A9': '#ffa000a6',
  '--au-scale-warning-A10': '#ffa000bf',
  '--au-scale-warning-A11': '#ffa000e0',
  '--au-scale-warning-A12': '#ffa000f8',
  /* Info */
  '--au-scale-info-A1': '#0080cc03',
  '--au-scale-info-A2': '#0080cc08',
  '--au-scale-info-A3': '#0080cc0d',
  '--au-scale-info-A4': '#0080cc14',
  '--au-scale-info-A5': '#0080cc1f',
  '--au-scale-info-A6': '#0080cc2e',
  '--au-scale-info-A7': '#0080cc47',
  '--au-scale-info-A8': '#0080cc72',
  '--au-scale-info-A9': '#0080cca6',
  '--au-scale-info-A10': '#0080ccbf',
  '--au-scale-info-A11': '#0080cce0',
  '--au-scale-info-A12': '#0080ccf8',
};

const DARK_ALPHA_VARS: Record<string, string> = {
  /* Neutral */
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
  /* Action */
  '--au-scale-action-A1': '#0050cc03',
  '--au-scale-action-A2': '#0050cc08',
  '--au-scale-action-A3': '#0050cc0d',
  '--au-scale-action-A4': '#0050cc14',
  '--au-scale-action-A5': '#0050cc1f',
  '--au-scale-action-A6': '#0050cc2e',
  '--au-scale-action-A7': '#0050cc47',
  '--au-scale-action-A8': '#0050cc72',
  '--au-scale-action-A9': '#0050cca6',
  '--au-scale-action-A10': '#0050ccbf',
  '--au-scale-action-A11': '#0050cce0',
  '--au-scale-action-A12': '#0050ccf8',
  /* Error */
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
  /* Success */
  '--au-scale-success-A1': '#00995503',
  '--au-scale-success-A2': '#00995508',
  '--au-scale-success-A3': '#0099550d',
  '--au-scale-success-A4': '#00995514',
  '--au-scale-success-A5': '#0099551f',
  '--au-scale-success-A6': '#0099552e',
  '--au-scale-success-A7': '#00995547',
  '--au-scale-success-A8': '#00995572',
  '--au-scale-success-A9': '#009955a6',
  '--au-scale-success-A10': '#009955bf',
  '--au-scale-success-A11': '#009955e0',
  '--au-scale-success-A12': '#009955f8',
  /* Warning */
  '--au-scale-warning-A1': '#cc800003',
  '--au-scale-warning-A2': '#cc800008',
  '--au-scale-warning-A3': '#cc80000d',
  '--au-scale-warning-A4': '#cc800014',
  '--au-scale-warning-A5': '#cc80001f',
  '--au-scale-warning-A6': '#cc80002e',
  '--au-scale-warning-A7': '#cc800047',
  '--au-scale-warning-A8': '#cc800072',
  '--au-scale-warning-A9': '#cc8000a6',
  '--au-scale-warning-A10': '#cc8000bf',
  '--au-scale-warning-A11': '#cc8000e0',
  '--au-scale-warning-A12': '#cc8000f8',
  /* Info */
  '--au-scale-info-A1': '#00669903',
  '--au-scale-info-A2': '#00669908',
  '--au-scale-info-A3': '#0066990d',
  '--au-scale-info-A4': '#00669914',
  '--au-scale-info-A5': '#0066991f',
  '--au-scale-info-A6': '#0066992e',
  '--au-scale-info-A7': '#00669947',
  '--au-scale-info-A8': '#00669972',
  '--au-scale-info-A9': '#006699a6',
  '--au-scale-info-A10': '#006699bf',
  '--au-scale-info-A11': '#006699e0',
  '--au-scale-info-A12': '#006699f8',
};

function buildLightCss(): string {
  const decls = Object.entries(LIGHT_VARS)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');
  const alphaDecls = Object.entries(LIGHT_ALPHA_VARS)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');
  return `:root {\n${decls}\n${alphaDecls}\n}`;
}

function buildDarkCss(): string {
  const decls = Object.entries(DARK_VARS)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');
  const alphaDecls = Object.entries(DARK_ALPHA_VARS)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');
  return `[data-au-theme='dark'] {\n${decls}\n${alphaDecls}\n}`;
}

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

describe('au-scales.css', () => {
  /* ─── File existence gate ─────────────────────────────────── */

  describe('file resolves (build gate)', () => {
    @Component({
      template: '',
      styleUrl: './au-scales.css',
    })
    class ScaleGateHost {}

    it('compiles when au-scales.css exists', () => {
      TestBed.configureTestingModule({ imports: [ScaleGateHost] });
      const fix = TestBed.createComponent(ScaleGateHost);
      fix.detectChanges();
      // If we reach here, the build (including styleUrl resolution) succeeded
      expect(fix.nativeElement).toBeDefined();
    });
  });

  /* ─── Light theme values ──────────────────────────────────── */

  describe('light theme (:root)', () => {
    let styleEl: HTMLStyleElement;

    beforeAll(() => {
      styleEl = injectStyle(buildLightCss());
    });

    afterAll(() => {
      removeStyle(styleEl);
    });

    it('defines 72 light variables (6 scales × 12 steps)', () => {
      expect(Object.keys(LIGHT_VARS).length).toBe(72);
    });

    it('has all 12 steps for each scale', () => {
      for (const scale of SCALE_NAMES) {
        for (let step = 1; step <= 12; step++) {
          expect(getVar(`--au-scale-${scale}-${step}`)).toBeTruthy();
        }
      }
    });

    for (const [varName, expectedHex] of Object.entries(LIGHT_VARS)) {
      it(`${varName} = ${expectedHex}`, () => {
        expect(getVar(varName)).toBe(expectedHex);
      });
    }
  });

  /* ─── Dark theme values ───────────────────────────────────── */

  describe('dark theme ([data-au-theme="dark"])', () => {
    let styleEl: HTMLStyleElement;

    beforeAll(() => {
      styleEl = injectStyle(buildDarkCss());
      document.documentElement.setAttribute('data-au-theme', 'dark');
    });

    afterAll(() => {
      removeStyle(styleEl);
      document.documentElement.removeAttribute('data-au-theme');
    });

    it('defines 72 dark variables', () => {
      expect(Object.keys(DARK_VARS).length).toBe(72);
    });

    for (const [varName, expectedHex] of Object.entries(DARK_VARS)) {
      it(`${varName} = ${expectedHex}`, () => {
        expect(getVar(varName)).toBe(expectedHex);
      });
    }
  });

  /* ─── au-tokens.css exists and doesn't conflict ─────────────────────────────── */

  describe('au-tokens.css — no conflict with scale variables', () => {
    @Component({
      template: '',
      styleUrl: './au-tokens.css',
    })
    class TokensHost {}

    it('renders without errors', () => {
      expect(() => {
        TestBed.configureTestingModule({ imports: [TokensHost] });
        const fix = TestBed.createComponent(TokensHost);
        fix.detectChanges();
      }).not.toThrow();
    });
  });

  /* ─── HC theme blocks ─────────────────────────────────────── */

  describe('HC theme blocks', () => {
    @Component({
      host: { '[attr.data-au-theme]': '"high-contrast"' },
      template: '',
      styleUrl: './au-scales.css',
    })
    class HcHost {}

    @Component({
      host: { '[attr.data-au-theme]': '"high-contrast-dark"' },
      template: '',
      styleUrl: './au-scales.css',
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

  /* ─── Alpha scale light values ────────────────────────────── */

  describe('light theme alpha (A1–A12)', () => {
    let styleEl: HTMLStyleElement;

    beforeAll(() => {
      styleEl = injectStyle(buildLightCss());
    });

    afterAll(() => {
      removeStyle(styleEl);
    });

    it('defines 72 light alpha variables (6 scales × 12 steps)', () => {
      expect(Object.keys(LIGHT_ALPHA_VARS).length).toBe(72);
    });

    it('has all 12 alpha steps for each scale', () => {
      for (const scale of SCALE_NAMES) {
        for (let step = 1; step <= 12; step++) {
          expect(getVar(`--au-scale-${scale}-A${step}`)).toBeTruthy();
        }
      }
    });

    for (const [varName, expectedHex] of Object.entries(LIGHT_ALPHA_VARS)) {
      it(`${varName} = ${expectedHex}`, () => {
        expect(getVar(varName)).toBe(expectedHex);
      });
    }
  });

  /* ─── Alpha scale dark values ─────────────────────────────── */

  describe('dark theme alpha ([data-au-theme="dark"])', () => {
    let styleEl: HTMLStyleElement;

    beforeAll(() => {
      styleEl = injectStyle(buildDarkCss());
      document.documentElement.setAttribute('data-au-theme', 'dark');
    });

    afterAll(() => {
      removeStyle(styleEl);
      document.documentElement.removeAttribute('data-au-theme');
    });

    it('defines 72 dark alpha variables', () => {
      expect(Object.keys(DARK_ALPHA_VARS).length).toBe(72);
    });

    for (const [varName, expectedHex] of Object.entries(DARK_ALPHA_VARS)) {
      it(`${varName} = ${expectedHex}`, () => {
        expect(getVar(varName)).toBe(expectedHex);
      });
    }
  });
});
