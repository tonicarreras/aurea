import { vi } from 'vitest';

import { readCssLengthPx } from './tooltip-overlay';

describe('readCssLengthPx', () => {
  it('returns fallback when the custom property is unavailable', () => {
    expect(readCssLengthPx(document, '--au-missing-token', 10)).toBe(10);
  });

  it('returns the parsed positive length from computed style', () => {
    const spy = vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      marginTop: '16px',
    } as CSSStyleDeclaration);
    expect(readCssLengthPx(document, '--au-tooltip-gap', 14)).toBe(16);
    spy.mockRestore();
  });

  it('returns fallback when the resolved margin is not a positive number', () => {
    const spy = vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      marginTop: 'not-a-length',
    } as CSSStyleDeclaration);
    expect(readCssLengthPx(document, '--au-tooltip-gap', 14)).toBe(14);
    spy.mockRestore();
  });

  it('returns fallback when the resolved margin is zero', () => {
    const spy = vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      marginTop: '0px',
    } as CSSStyleDeclaration);
    expect(readCssLengthPx(document, '--au-tooltip-gap', 14)).toBe(14);
    spy.mockRestore();
  });
});
