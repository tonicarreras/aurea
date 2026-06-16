import { describe, expect, it } from 'vitest';

import {
  formatTime,
  isHourDisabled,
  isMinuteDisabled,
  isTimeDisabled,
  isWithinTimeBounds,
  parseTime,
  resolvePendingTime,
  shiftInRange,
  timeAriaLabel,
} from './time-picker-model';

describe('time-picker-model', () => {
  it('formats and parses HH:mm', () => {
    expect(formatTime(9, 5)).toBe('09:05');
    expect(parseTime('14:30')).toEqual({ hour: 14, minute: 30 });
  });

  it('isWithinTimeBounds compares lexicographically', () => {
    expect(isWithinTimeBounds('09:00', '08:00', '20:00')).toBe(true);
    expect(isWithinTimeBounds('07:59', '08:00', '20:00')).toBe(false);
    expect(isWithinTimeBounds('20:01', '08:00', '20:00')).toBe(false);
  });

  it('disables hours and minutes outside bounds', () => {
    expect(isHourDisabled(7, '08:00', '20:00')).toBe(true);
    expect(isHourDisabled(8, '08:00', '20:00')).toBe(false);
    expect(isMinuteDisabled(8, 15, '08:30', '20:00')).toBe(true);
    expect(isMinuteDisabled(8, 30, '08:30', '20:00')).toBe(false);
    expect(isTimeDisabled(20, 30, '08:00', '20:00')).toBe(true);
  });

  it('resolvePendingTime prefers selected then now then first enabled', () => {
    expect(resolvePendingTime('12:15', '08:00', '20:00')).toEqual({ hour: 12, minute: 15 });
    expect(resolvePendingTime('07:00', '08:00', '20:00', new Date(2000, 0, 1, 10, 0))).toEqual({
      hour: 10,
      minute: 0,
    });
    expect(resolvePendingTime(null, '08:30', '08:45')).toEqual({ hour: 8, minute: 30 });
  });

  it('shiftInRange moves within enabled values', () => {
    const values = [8, 9, 10];
    expect(shiftInRange(values, 9, 'ArrowUp')).toBe(8);
    expect(shiftInRange(values, 9, 'ArrowDown')).toBe(10);
    expect(shiftInRange(values, 9, 'Home')).toBe(8);
    expect(shiftInRange(values, 9, 'End')).toBe(10);
    expect(shiftInRange(values, 9, 'Tab')).toBeNull();
  });

  it('shiftInRange returns null for empty values', () => {
    expect(shiftInRange([], 8, 'ArrowUp')).toBeNull();
  });

  it('shiftInRange returns first value when current is missing', () => {
    expect(shiftInRange([8, 9, 10], 99, 'ArrowDown')).toBe(8);
  });

  it('resolvePendingTime falls back when no slot is enabled', () => {
    expect(resolvePendingTime(null, '12:00', '11:00', new Date(2000, 0, 1, 10, 30))).toEqual({
      hour: 10,
      minute: 30,
    });
  });

  it('timeAriaLabel formats with locale', () => {
    expect(timeAriaLabel(14, 30, 'en-US')).toMatch(/30/);
  });
});
