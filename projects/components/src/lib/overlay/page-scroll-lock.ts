/** Ref-counted page scroll lock for modals, menus, and other overlays. */

let lockCount = 0;
let savedBodyOverflow = '';
let savedHtmlOverflow = '';

export function lockPageScroll(): void {
  if (typeof document === 'undefined') {
    return;
  }
  if (lockCount === 0) {
    savedBodyOverflow = document.body.style.overflow;
    savedHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }
  lockCount++;
}

export function unlockPageScroll(): void {
  if (typeof document === 'undefined') {
    return;
  }
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = savedBodyOverflow;
    document.documentElement.style.overflow = savedHtmlOverflow;
  }
}

/** @internal test helper */
export function resetPageScrollLockForTests(): void {
  lockCount = 0;
  savedBodyOverflow = '';
  savedHtmlOverflow = '';
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }
}
