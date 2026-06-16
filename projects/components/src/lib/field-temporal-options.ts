export interface TemporalPickerOption {
  value: string;
  label: string;
  disabled: boolean;
}

export function hasTemporalBounds(min?: string, max?: string): boolean {
  return (min != null && min !== '') || (max != null && max !== '');
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function formatDateLabel(iso: string): string {
  const date = parseIsoDate(iso);
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Every 30 minutes in a day; out-of-range slots stay visible but disabled. */
export function buildTimePickerOptions(
  min?: string,
  max?: string,
  stepMinutes = 30,
): TemporalPickerOption[] {
  const options: TemporalPickerOption[] = [];
  for (let mins = 0; mins < 24 * 60; mins += stepMinutes) {
    const value = `${pad2(Math.floor(mins / 60))}:${pad2(mins % 60)}`;
    const disabled =
      (min != null && min !== '' && value < min) || (max != null && max !== '' && value > max);
    options.push({ value, label: value, disabled });
  }
  return options;
}

/** Days from month start(min) through month end(max); outside [min,max] are disabled. */
export function buildDatePickerOptions(min?: string, max?: string): TemporalPickerOption[] {
  const minBound = min && min !== '' ? min : '1970-01-01';
  const maxBound = max && max !== '' ? max : '2100-12-31';
  const windowStart = startOfMonth(parseIsoDate(minBound));
  const windowEnd = endOfMonth(parseIsoDate(maxBound));
  const options: TemporalPickerOption[] = [];

  for (let cursor = windowStart; cursor <= windowEnd; cursor = addDays(cursor, 1)) {
    const value = formatIsoDate(cursor);
    options.push({
      value,
      label: formatDateLabel(value),
      disabled: value < minBound || value > maxBound,
    });
  }

  return options;
}
