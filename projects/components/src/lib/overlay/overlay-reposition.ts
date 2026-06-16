/** Skip overlay reposition when scroll happens inside the portaled panel (e.g. time picker columns). */
export function shouldSkipRepositionOnScroll(
  event: Event | undefined,
  container: HTMLElement | null,
): boolean {
  return (
    event?.type === 'scroll' && event.target instanceof Node && !!container?.contains(event.target)
  );
}
