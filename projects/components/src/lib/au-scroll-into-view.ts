/** `scrollIntoView` behavior that respects `prefers-reduced-motion`. */
export function scrollIntoViewRespectingMotion(
  element: Element,
  options?: Omit<ScrollIntoViewOptions, 'behavior'>,
): void {
  const reduced =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  element.scrollIntoView({
    block: 'start',
    ...options,
    behavior: reduced ? 'auto' : 'smooth',
  });
}
