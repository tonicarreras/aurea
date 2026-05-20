export type AuTooltipPlacement = 'top' | 'bottom' | 'start' | 'end';

export interface AuTooltipViewport {
  width: number;
  height: number;
}

const VIEWPORT_MARGIN = 8;

/**
 * Computes fixed coordinates for a tooltip bubble relative to an anchor rect.
 * Flips placement when the bubble would overflow the viewport.
 */
export function computeTooltipPosition(
  anchor: DOMRect,
  bubble: DOMRect,
  placement: AuTooltipPlacement,
  gap: number,
  viewport: AuTooltipViewport,
): { top: number; left: number; placement: AuTooltipPlacement } {
  const candidates: AuTooltipPlacement[] = [placement, ...fallbackPlacements(placement)];
  for (const candidate of candidates) {
    const coords = coordsForPlacement(anchor, bubble, candidate, gap);
    if (fitsViewport(coords, bubble, viewport)) {
      return { ...coords, placement: candidate };
    }
  }
  const fallback = coordsForPlacement(anchor, bubble, placement, gap);
  return {
    top: clamp(fallback.top, VIEWPORT_MARGIN, viewport.height - bubble.height - VIEWPORT_MARGIN),
    left: clamp(fallback.left, VIEWPORT_MARGIN, viewport.width - bubble.width - VIEWPORT_MARGIN),
    placement,
  };
}

function fallbackPlacements(primary: AuTooltipPlacement): AuTooltipPlacement[] {
  switch (primary) {
    case 'top':
      return ['bottom', 'end', 'start'];
    case 'bottom':
      return ['top', 'end', 'start'];
    case 'start':
      return ['end', 'top', 'bottom'];
    case 'end':
      return ['start', 'top', 'bottom'];
    default:
      return ['bottom', 'top'];
  }
}

function coordsForPlacement(
  anchor: DOMRect,
  bubble: DOMRect,
  placement: AuTooltipPlacement,
  gap: number,
): { top: number; left: number } {
  switch (placement) {
    case 'bottom':
      return {
        top: anchor.bottom + gap,
        left: anchor.left + (anchor.width - bubble.width) / 2,
      };
    case 'start':
      return {
        top: anchor.top + (anchor.height - bubble.height) / 2,
        left: anchor.left - bubble.width - gap,
      };
    case 'end':
      return {
        top: anchor.top + (anchor.height - bubble.height) / 2,
        left: anchor.right + gap,
      };
    case 'top':
    default:
      return {
        top: anchor.top - bubble.height - gap,
        left: anchor.left + (anchor.width - bubble.width) / 2,
      };
  }
}

function fitsViewport(
  coords: { top: number; left: number },
  bubble: DOMRect,
  viewport: AuTooltipViewport,
): boolean {
  return (
    coords.top >= VIEWPORT_MARGIN &&
    coords.left >= VIEWPORT_MARGIN &&
    coords.top + bubble.height <= viewport.height - VIEWPORT_MARGIN &&
    coords.left + bubble.width <= viewport.width - VIEWPORT_MARGIN
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
