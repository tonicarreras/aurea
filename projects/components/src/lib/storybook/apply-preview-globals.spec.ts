import { describe, expect, it } from 'vitest';

import { resolveStorybookTheme } from './apply-preview-globals';

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
