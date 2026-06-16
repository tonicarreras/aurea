import { installPageScrollPrevention } from './prevent-page-scroll';

/** Ref-counted page scroll lock for modals, menus, and other overlays. */

let lockCount = 0;
let removePrevention: (() => void) | null = null;

export function lockPageScroll(): void {
  if (typeof document === 'undefined') {
    return;
  }
  if (lockCount === 0) {
    removePrevention = installPageScrollPrevention(document, () => false);
  }
  lockCount++;
}

export function unlockPageScroll(): void {
  if (typeof document === 'undefined') {
    return;
  }
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    removePrevention?.();
    removePrevention = null;
  }
}

/** @internal test helper */
export function resetPageScrollLockForTests(): void {
  removePrevention?.();
  removePrevention = null;
  lockCount = 0;
}
