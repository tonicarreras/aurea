/**
 * Blocks page scroll via wheel/touch while keeping the scrollbar visible.
 * Used by `au-dialog`, `au-drawer`, menus, and popovers. Native `<dialog showModal()>` alone
 * does not reliably block background scroll in all layouts/browsers.
 */

export type ScrollAllowPredicate = (
  target: EventTarget | null,
  event?: WheelEvent | TouchEvent,
) => boolean;

export function canConsumeWheelDelta(el: Element, deltaY: number, deltaX: number): boolean {
  if (Math.abs(deltaY) >= Math.abs(deltaX)) {
    if (deltaY === 0) {
      return false;
    }
    if (deltaY < 0) {
      return el.scrollTop > 0;
    }
    return el.scrollTop + el.clientHeight < el.scrollHeight;
  }

  if (deltaX === 0) {
    return false;
  }
  if (deltaX < 0) {
    return el.scrollLeft > 0;
  }
  return el.scrollLeft + el.clientWidth < el.scrollWidth;
}

/**
 * Allows wheel/touch only inside a modal body (not the full `<dialog>` backdrop).
 * At scroll edges, wheel is blocked so the page behind does not chain-scroll.
 */
export function createModalScrollAllowPredicate(
  getOverlayRoot: () => Element | null,
  scrollBodySelector: string,
): ScrollAllowPredicate {
  return (target, event) => {
    const root = getOverlayRoot();
    if (!root || !(target instanceof Node) || !root.contains(target)) {
      return false;
    }
    if (!(target instanceof Element)) {
      return false;
    }

    const scrollBody = target.closest(scrollBodySelector);
    if (!scrollBody || !root.contains(scrollBody)) {
      return false;
    }

    if (event instanceof WheelEvent) {
      return canConsumeWheelDelta(scrollBody, event.deltaY, event.deltaX);
    }

    return true;
  };
}

let rootScrollLockCount = 0;
let restoreRootScrollLock: (() => void) | null = null;

/** Ref-counted `overflow: hidden` on the root element; keeps body layout unchanged. */
export function installRootScrollLock(document: Document): () => void {
  if (rootScrollLockCount === 0) {
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    const previousOverscroll = html.style.overscrollBehavior;
    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    restoreRootScrollLock = () => {
      html.style.overflow = previousOverflow;
      html.style.overscrollBehavior = previousOverscroll;
    };
  }
  rootScrollLockCount++;
  return () => {
    rootScrollLockCount = Math.max(0, rootScrollLockCount - 1);
    if (rootScrollLockCount === 0) {
      restoreRootScrollLock?.();
      restoreRootScrollLock = null;
    }
  };
}

/** @internal test helper */
export function resetRootScrollLockForTests(): void {
  restoreRootScrollLock?.();
  restoreRootScrollLock = null;
  rootScrollLockCount = 0;
}

/** Wheel/touch guard plus root scroll lock for modal overlays (`au-dialog`, `au-drawer`). */
export function installModalPageScrollPrevention(
  document: Document,
  isScrollAllowed: ScrollAllowPredicate,
): () => void {
  const uninstallWheel = installPageScrollPrevention(document, isScrollAllowed);
  const uninstallRoot = installRootScrollLock(document);
  return () => {
    uninstallWheel();
    uninstallRoot();
  };
}

export function installPageScrollPrevention(
  document: Document,
  isScrollAllowed: ScrollAllowPredicate,
): () => void {
  const onWheel = (event: WheelEvent): void => {
    if (isScrollAllowed(event.target, event)) {
      return;
    }
    event.preventDefault();
  };

  const onTouchMove = (event: TouchEvent): void => {
    if (isScrollAllowed(event.target, event)) {
      return;
    }
    event.preventDefault();
  };

  document.addEventListener('wheel', onWheel, { capture: true, passive: false });
  document.addEventListener('touchmove', onTouchMove, { capture: true, passive: false });

  return () => {
    document.removeEventListener('wheel', onWheel, { capture: true });
    document.removeEventListener('touchmove', onTouchMove, { capture: true });
  };
}
