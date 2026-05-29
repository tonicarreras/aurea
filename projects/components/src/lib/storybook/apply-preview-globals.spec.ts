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
  it('sets data-au-theme, data-au-density, and data-au-color on documentElement', () => {
    applyPreviewGlobals({});
    expect(document.documentElement.getAttribute('data-au-theme')).toBe('light');
    expect(document.documentElement.getAttribute('data-au-density')).toBe('comfortable');
    expect(document.documentElement.getAttribute('data-au-color')).toBe('monochrome');
  });

  it('sets data-au-color to blue when auColor is blue', () => {
    applyPreviewGlobals({ auColor: 'blue' });
    expect(document.documentElement.getAttribute('data-au-color')).toBe('blue');
  });
});
