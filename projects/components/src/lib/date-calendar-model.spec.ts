import { describe, expect, it } from 'vitest';

import {
  addMonths,
  buildMonthGrid,
  dayAriaLabel,
  formatIsoDate,
  isDateDisabled,
  monthTitle,
  resolveViewMonth,
  shiftFocusedDay,
  weekdayLabels,
} from './date-calendar-model';

describe('date-calendar-model', () => {
  it('buildMonthGrid marks selected and disabled days', () => {
    const weeks = buildMonthGrid(2026, 5, '2026-06-15', '2026-06-01', '2026-06-30');
    const days = weeks.flatMap((week) => [...week.days]);
    const selected = days.find((day) => day.iso === '2026-06-15');
    const disabled = days.find((day) => day.iso === '2026-07-01');
    expect(selected?.isSelected).toBe(true);
    expect(disabled?.disabled).toBe(true);
  });

  it('isDateDisabled respects min and max', () => {
    expect(isDateDisabled('2026-01-01', '2026-06-01', '2026-06-30')).toBe(true);
    expect(isDateDisabled('2026-06-15', '2026-06-01', '2026-06-30')).toBe(false);
    expect(isDateDisabled('2026-07-01', '2026-06-01', '2026-06-30')).toBe(true);
  });

  it('addMonths and resolveViewMonth navigate months', () => {
    expect(addMonths(2026, 0, 1)).toEqual({ year: 2026, month: 1 });
    expect(resolveViewMonth('2026-08-12')).toEqual({ year: 2026, month: 7 });
  });

  it('shiftFocusedDay moves vertically and to week edges', () => {
    const iso = '2026-06-15';
    const midWeek = '2026-06-18';
    expect(shiftFocusedDay(iso, 'ArrowUp', '2026-06-01', '2026-06-30')).toBe('2026-06-08');
    expect(shiftFocusedDay(iso, 'ArrowDown', '2026-06-01', '2026-06-30')).toBe('2026-06-22');
    expect(shiftFocusedDay(midWeek, 'Home', '2026-06-01', '2026-06-30')).toBe('2026-06-15');
    expect(shiftFocusedDay(midWeek, 'End', '2026-06-01', '2026-06-30')).toBe('2026-06-21');
  });

  it('shiftFocusedDay returns null for unknown keys', () => {
    expect(shiftFocusedDay('2026-06-15', 'Tab')).toBeNull();
  });

  it('weekdayLabels and monthTitle format with locale', () => {
    expect(weekdayLabels('es-ES')).toHaveLength(7);
    expect(monthTitle(2026, 5, 'es-ES')).toMatch(/2026/);
  });

  it('dayAriaLabel formats a full date', () => {
    expect(dayAriaLabel('2026-06-15', 'en-US')).toMatch(/2026/);
    expect(dayAriaLabel('2026-06-15', 'en-US')).toMatch(/15/);
  });

  it('shiftFocusedDay moves within bounds', () => {
    const iso = '2026-06-15';
    expect(shiftFocusedDay(iso, 'ArrowRight', '2026-06-01', '2026-06-30')).toBe('2026-06-16');
    expect(shiftFocusedDay('2026-06-01', 'ArrowLeft', '2026-06-01', '2026-06-30')).toBe(
      '2026-06-01',
    );
  });

  it('formatIsoDate pads month and day', () => {
    expect(formatIsoDate(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
});
