import { describe, expect, it } from 'vitest';
import {
  applyNativeTemporalMinMax,
  isWithinTemporalBounds,
  syncNativeTemporalValue,
} from './field-temporal-bounds';

describe('field-temporal-bounds', () => {
  it('isWithinTemporalBounds compares lexicographically', () => {
    expect(isWithinTemporalBounds('2026-06-01', '2026-01-01', '2026-12-31')).toBe(true);
    expect(isWithinTemporalBounds('2025-12-31', '2026-01-01', '2026-12-31')).toBe(false);
    expect(isWithinTemporalBounds('14:00', '08:00', '20:00')).toBe(true);
    expect(isWithinTemporalBounds('21:00', '08:00', '20:00')).toBe(false);
  });

  it('applyNativeTemporalMinMax sets IDL properties', () => {
    const el = document.createElement('input');
    applyNativeTemporalMinMax(el, '08:00', '20:00');
    expect(el.min).toBe('08:00');
    expect(el.max).toBe('20:00');
    applyNativeTemporalMinMax(el, undefined, undefined);
    expect(el.hasAttribute('min')).toBe(false);
    expect(el.hasAttribute('max')).toBe(false);
  });

  it('syncNativeTemporalValue skips while focused', () => {
    const el = document.createElement('input');
    el.value = '12:00';
    document.body.appendChild(el);
    el.focus();
    syncNativeTemporalValue(el, '09:00');
    expect(el.value).toBe('12:00');
    el.blur();
    syncNativeTemporalValue(el, '09:00');
    expect(el.value).toBe('09:00');
    el.remove();
  });
});
