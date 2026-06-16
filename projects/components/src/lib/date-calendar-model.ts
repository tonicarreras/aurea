export interface DateCalendarDay {
  iso: string;
  day: number;
  inCurrentMonth: boolean;
  disabled: boolean;
  isToday: boolean;
  isSelected: boolean;
}

export interface DateCalendarWeek {
  days: readonly DateCalendarDay[];
}

export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function formatIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

export function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function isDateDisabled(iso: string, min?: string, max?: string): boolean {
  if (min != null && min !== '' && iso < min) {
    return true;
  }
  if (max != null && max !== '' && iso > max) {
    return true;
  }
  return false;
}

export function addMonths(year: number, month: number, delta: number): { year: number; month: number } {
  const date = new Date(year, month + delta, 1);
  return { year: date.getFullYear(), month: date.getMonth() };
}

export function resolveViewMonth(
  selected: string | null,
  today = new Date(),
): { year: number; month: number } {
  if (selected) {
    const date = parseIsoDate(selected);
    return { year: date.getFullYear(), month: date.getMonth() };
  }
  return { year: today.getFullYear(), month: today.getMonth() };
}

function startOfWeek(date: Date, weekStartsOn: number): Date {
  const next = new Date(date);
  const day = next.getDay();
  const diff = (day - weekStartsOn + 7) % 7;
  next.setDate(next.getDate() - diff);
  return next;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/** Builds a 6-week calendar grid (Monday-first). */
export function buildMonthGrid(
  year: number,
  month: number,
  selected: string | null,
  min?: string,
  max?: string,
  today = new Date(),
  weekStartsOn = 1,
): DateCalendarWeek[] {
  const monthStart = new Date(year, month, 1);
  const gridStart = startOfWeek(monthStart, weekStartsOn);
  const todayIso = formatIsoDate(today);
  const weeks: DateCalendarWeek[] = [];

  for (let week = 0; week < 6; week++) {
    const days: DateCalendarDay[] = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const cursor = addDays(gridStart, week * 7 + dayIndex);
      const iso = formatIsoDate(cursor);
      days.push({
        iso,
        day: cursor.getDate(),
        inCurrentMonth: cursor.getMonth() === month,
        disabled: isDateDisabled(iso, min, max),
        isToday: iso === todayIso,
        isSelected: selected === iso,
      });
    }
    weeks.push({ days });
  }

  return weeks;
}

export function weekdayLabels(locale?: string, weekStartsOn = 1): string[] {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
  const labels: string[] = [];
  const base = startOfWeek(new Date(2024, 0, 1), weekStartsOn);
  for (let i = 0; i < 7; i++) {
    labels.push(formatter.format(addDays(base, i)));
  }
  return labels;
}

export function monthTitle(year: number, month: number, locale?: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
    new Date(year, month, 1),
  );
}

export function dayAriaLabel(iso: string, locale?: string): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(parseIsoDate(iso));
}

export function shiftFocusedDay(
  iso: string,
  key: string,
  min?: string,
  max?: string,
): string | null {
  const date = parseIsoDate(iso);
  switch (key) {
    case 'ArrowLeft':
      date.setDate(date.getDate() - 1);
      break;
    case 'ArrowRight':
      date.setDate(date.getDate() + 1);
      break;
    case 'ArrowUp':
      date.setDate(date.getDate() - 7);
      break;
    case 'ArrowDown':
      date.setDate(date.getDate() + 7);
      break;
    case 'Home':
      date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
      break;
    case 'End':
      date.setDate(date.getDate() + (6 - ((date.getDay() + 6) % 7)));
      break;
    default:
      return null;
  }
  const next = formatIsoDate(date);
  return isDateDisabled(next, min, max) ? iso : next;
}
