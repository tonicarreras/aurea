/** Ref-counted page scroll lock for modals, menus, and other overlays. */

let lockCount = 0;
let savedScrollY = 0;
let savedBodyOverflow = '';
let savedBodyPosition = '';
let savedBodyTop = '';
let savedBodyWidth = '';
let savedBodyPaddingRight = '';
let savedHtmlOverflow = '';

function getScrollbarWidth(): number {
  return window.innerWidth - document.documentElement.clientWidth;
}

export function lockPageScroll(): void {
  if (typeof document === 'undefined') {
    return;
  }
  if (lockCount === 0) {
    savedScrollY = window.scrollY;
    savedBodyOverflow = document.body.style.overflow;
    savedBodyPosition = document.body.style.position;
    savedBodyTop = document.body.style.top;
    savedBodyWidth = document.body.style.width;
    savedBodyPaddingRight = document.body.style.paddingRight;
    savedHtmlOverflow = document.documentElement.style.overflow;

    const scrollbarWidth = getScrollbarWidth();

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.width = '100%';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
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
    document.body.style.position = savedBodyPosition;
    document.body.style.top = savedBodyTop;
    document.body.style.width = savedBodyWidth;
    document.body.style.paddingRight = savedBodyPaddingRight;
    document.documentElement.style.overflow = savedHtmlOverflow;
    window.scrollTo(0, savedScrollY);
  }
}

/** @internal test helper */
export function resetPageScrollLockForTests(): void {
  lockCount = 0;
  savedScrollY = 0;
  savedBodyOverflow = '';
  savedBodyPosition = '';
  savedBodyTop = '';
  savedBodyWidth = '';
  savedBodyPaddingRight = '';
  savedHtmlOverflow = '';
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.paddingRight = '';
    document.documentElement.style.overflow = '';
  }
}
