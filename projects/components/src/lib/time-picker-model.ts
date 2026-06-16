export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function formatTime(hour: number, minute: number): string {
  return `${pad2(hour)}:${pad2(minute)}`;
}

export function parseTime(value: string): { hour: number; minute: number } {
  const [hour, minute] = value.split(':').map(Number);
  return { hour, minute };
}

export function isTimeDisabled(
  hour: number,
  minute: number,
  min?: string,
  max?: string,
): boolean {
  return !isWithinTimeBounds(formatTime(hour, minute), min, max);
}

export function isWithinTimeBounds(time: string, min?: string, max?: string): boolean {
  if (min != null && min !== '' && time < min) {
    return false;
  }
  if (max != null && max !== '' && time > max) {
    return false;
  }
  return true;
}

export function isHourDisabled(hour: number, min?: string, max?: string): boolean {
  for (let minute = 0; minute < 60; minute++) {
    if (!isTimeDisabled(hour, minute, min, max)) {
      return false;
    }
  }
  return true;
}

export function isMinuteDisabled(
  hour: number,
  minute: number,
  min?: string,
  max?: string,
): boolean {
  return isTimeDisabled(hour, minute, min, max);
}

export function resolvePendingTime(
  selected: string | null,
  min?: string,
  max?: string,
  now = new Date(),
): { hour: number; minute: number } {
  if (selected && isWithinTimeBounds(selected, min, max)) {
    return parseTime(selected);
  }

  const candidate = formatTime(now.getHours(), now.getMinutes());
  if (isWithinTimeBounds(candidate, min, max)) {
    return parseTime(candidate);
  }

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute++) {
      if (!isTimeDisabled(hour, minute, min, max)) {
        return { hour, minute };
      }
    }
  }

  return { hour: now.getHours(), minute: now.getMinutes() };
}

export function timeAriaLabel(hour: number, minute: number, locale?: string): string {
  const date = new Date(2000, 0, 1, hour, minute);
  return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: 'numeric' }).format(date);
}

export function hourAriaLabel(hour: number, locale?: string): string {
  const date = new Date(2000, 0, 1, hour, 0);
  return new Intl.DateTimeFormat(locale, { hour: 'numeric' }).format(date);
}

export function minuteAriaLabel(minute: number, locale?: string): string {
  const date = new Date(2000, 0, 1, 0, minute);
  return new Intl.DateTimeFormat(locale, { minute: 'numeric' }).format(date);
}

export function shiftInRange(
  values: readonly number[],
  current: number,
  key: string,
): number | null {
  const index = values.indexOf(current);
  if (index < 0) {
    return values[0] ?? null;
  }
  switch (key) {
    case 'ArrowUp':
    case 'ArrowLeft':
      return values[Math.max(0, index - 1)];
    case 'ArrowDown':
    case 'ArrowRight':
      return values[Math.min(values.length - 1, index + 1)];
    case 'Home':
      return values[0];
    case 'End':
      return values[values.length - 1];
    default:
      return null;
  }
}

export const HOURS = Array.from({ length: 24 }, (_, hour) => hour);
export const MINUTES = Array.from({ length: 60 }, (_, minute) => minute);
