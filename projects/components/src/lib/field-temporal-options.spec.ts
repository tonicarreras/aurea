import { describe, expect, it } from 'vitest';
import {
  buildDatePickerOptions,
  buildTimePickerOptions,
  hasTemporalBounds,
} from './field-temporal-options';

describe('field-temporal-options', () => {
  it('hasTemporalBounds is false without min or max', () => {
    expect(hasTemporalBounds(undefined, undefined)).toBe(false);
    expect(hasTemporalBounds('', '')).toBe(false);
  });

  it('hasTemporalBounds is true when min or max is set', () => {
    expect(hasTemporalBounds('08:00', undefined)).toBe(true);
    expect(hasTemporalBounds(undefined, '20:00')).toBe(true);
  });

  it('buildDatePickerOptions uses default bounds when min/max are empty', () => {
    const options = buildDatePickerOptions('', '');
    expect(options.length).toBeGreaterThan(0);
    expect(options.every((o) => !o.disabled)).toBe(true);
  }, 15_000);

  it('buildTimePickerOptions marks out-of-range slots disabled', () => {
    const options = buildTimePickerOptions('08:00', '20:00');
    expect(options.find((o) => o.value === '07:30')?.disabled).toBe(true);
    expect(options.find((o) => o.value === '08:00')?.disabled).toBe(false);
    expect(options.find((o) => o.value === '20:00')?.disabled).toBe(false);
    expect(options.find((o) => o.value === '20:30')?.disabled).toBe(true);
  });

  it('buildDatePickerOptions marks out-of-range days disabled within window', () => {
    const options = buildDatePickerOptions('2026-06-15', '2026-08-15');
    expect(options.find((o) => o.value === '2026-06-01')?.disabled).toBe(true);
    expect(options.find((o) => o.value === '2026-06-15')?.disabled).toBe(false);
    expect(options.find((o) => o.value === '2026-08-31')?.disabled).toBe(true);
  });
});
