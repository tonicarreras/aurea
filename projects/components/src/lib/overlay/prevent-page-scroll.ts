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
      return el.scrollHeight > el.clientHeight;
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
