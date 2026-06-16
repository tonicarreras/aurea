/** Lexicographic compare for ISO dates (`YYYY-MM-DD`) and times (`HH:mm`). */
export function isWithinTemporalBounds(
  value: string,
  min: string | undefined,
  max: string | undefined,
): boolean {
  if (min && value < min) {
    return false;
  }
  if (max && value > max) {
    return false;
  }
  return true;
}

/** Set native `min`/`max` IDL properties so pickers hide out-of-range scroll values. */
export function applyNativeTemporalMinMax(
  el: HTMLInputElement,
  min: string | undefined,
  max: string | undefined,
): void {
  if (min) {
    el.min = min;
  } else {
    el.removeAttribute('min');
  }
  if (max) {
    el.max = max;
  } else {
    el.removeAttribute('max');
  }
}

/** Sync displayed value without fighting an open native picker (skip while focused). */
export function syncNativeTemporalValue(el: HTMLInputElement, displayValue: string): void {
  if (document.activeElement === el) {
    return;
  }
  if (el.value !== displayValue) {
    el.value = displayValue;
  }
}
