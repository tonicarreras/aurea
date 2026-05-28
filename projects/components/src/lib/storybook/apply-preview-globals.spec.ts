import { describe, expect, it } from 'vitest';

import { applyPreviewGlobals, resolveStorybookTheme } from './apply-preview-globals';

describe('resolveStorybookTheme', () => {
  it('returns appearance when high contrast is off', () => {
    expect(resolveStorybookTheme('light', false)).toBe('light');
    expect(resolveStorybookTheme('dark', false)).toBe('dark');
  });

  it('maps to high-contrast palettes when enabled', () => {
    expect(resolveStorybookTheme('light', true)).toBe('high-contrast');
    expect(resolveStorybookTheme('dark', true)).toBe('high-contrast-dark');
  });
});

describe('applyPreviewGlobals', () => {
  it('sets data-au-style on html and body for primitives mode', () => {
    applyPreviewGlobals({ auStyle: 'unstyled' });
    expect(document.documentElement.getAttribute('data-au-style')).toBe('unstyled');
    expect(document.body.getAttribute('data-au-style')).toBe('unstyled');
  });

  it('removes data-au-style in default mode', () => {
    applyPreviewGlobals({ auStyle: 'unstyled' });
    applyPreviewGlobals({});
    expect(document.documentElement.hasAttribute('data-au-style')).toBe(false);
    expect(document.body.hasAttribute('data-au-style')).toBe(false);
  });

  it('toggles theme stylesheets by style mode', () => {
    document.body.innerHTML = `
      <link id="au-theme-skin" rel="stylesheet" />
      <link id="au-primitives-chrome" rel="stylesheet" />
    `;

    applyPreviewGlobals({ auStyle: 'unstyled' });
    expect((document.getElementById('au-theme-skin') as HTMLLinkElement).disabled).toBe(true);
    expect((document.getElementById('au-primitives-chrome') as HTMLLinkElement).disabled).toBe(
      false,
    );

    applyPreviewGlobals({});
    expect((document.getElementById('au-theme-skin') as HTMLLinkElement).disabled).toBe(false);
    expect((document.getElementById('au-primitives-chrome') as HTMLLinkElement).disabled).toBe(
      true,
    );
  });
});
