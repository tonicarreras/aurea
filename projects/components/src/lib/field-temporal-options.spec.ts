import { describe, expect, it } from 'vitest';
import { buildDatePickerOptions, buildTimePickerOptions } from './field-temporal-options';

describe('field-temporal-options', () => {
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
