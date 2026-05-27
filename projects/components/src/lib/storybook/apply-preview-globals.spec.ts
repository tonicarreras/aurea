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
  it('sets data-au-style on html and body', () => {
    applyPreviewGlobals({ auStyle: 'unstyled' });
    expect(document.documentElement.getAttribute('data-au-style')).toBe('unstyled');
    expect(document.body.getAttribute('data-au-style')).toBe('unstyled');

    applyPreviewGlobals({});
    expect(document.documentElement.getAttribute('data-au-style')).toBe('default');
    expect(document.body.getAttribute('data-au-style')).toBe('default');
  });
});
