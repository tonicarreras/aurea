import { describe, expect, it } from 'vitest';

import { auSpacingValue } from './spacing';

describe('auSpacingValue', () => {
  it('maps spacing tokens to CSS values', () => {
    expect(auSpacingValue('none')).toBe('0');
    expect(auSpacingValue('md')).toBe('var(--au-space-3)');
    expect(auSpacingValue('2xl')).toBe('var(--au-space-8)');
  });
});
