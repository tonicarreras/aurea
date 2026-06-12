/**
 * Blocks page scroll via wheel/touch while keeping the scrollbar visible.
 * For non-modal overlays (menus, popovers). Modals should use {@link lockPageScroll}.
 */
export function installPageScrollPrevention(
  document: Document,
  isScrollAllowed: (target: EventTarget | null) => boolean,
): () => void {
  const onWheel = (event: WheelEvent): void => {
    if (isScrollAllowed(event.target)) {
      return;
    }
    event.preventDefault();
  };

  const onTouchMove = (event: TouchEvent): void => {
    if (isScrollAllowed(event.target)) {
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
