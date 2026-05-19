import { computeTooltipPosition } from './tooltip-position';

describe('computeTooltipPosition', () => {
  const viewport = { width: 400, height: 300 };

  it('places tooltip above the anchor by default', () => {
    const anchor = new DOMRect(100, 100, 40, 24);
    const bubble = new DOMRect(0, 0, 80, 32);
    const result = computeTooltipPosition(anchor, bubble, 'top', 6, viewport);
    expect(result.placement).toBe('top');
    expect(result.top).toBe(anchor.top - bubble.height - 6);
    expect(result.left).toBe(anchor.left + (anchor.width - bubble.width) / 2);
  });

  it('flips to bottom when top overflows', () => {
    const anchor = new DOMRect(100, 4, 40, 24);
    const bubble = new DOMRect(0, 0, 80, 32);
    const result = computeTooltipPosition(anchor, bubble, 'top', 6, viewport);
    expect(result.placement).toBe('bottom');
    expect(result.top).toBe(anchor.bottom + 6);
  });

  it('places tooltip at the end side in LTR coordinates', () => {
    const anchor = new DOMRect(100, 100, 40, 24);
    const bubble = new DOMRect(0, 0, 60, 28);
    const result = computeTooltipPosition(anchor, bubble, 'end', 8, viewport);
    expect(result.placement).toBe('end');
    expect(result.left).toBe(anchor.right + 8);
  });

  it('places tooltip at the start side in LTR coordinates', () => {
    const anchor = new DOMRect(120, 100, 40, 24);
    const bubble = new DOMRect(0, 0, 60, 28);
    const result = computeTooltipPosition(anchor, bubble, 'start', 8, viewport);
    expect(result.placement).toBe('start');
    expect(result.left).toBe(anchor.left - bubble.width - 8);
  });

  it('clamps vertical position when the bubble is taller than the viewport', () => {
    const anchor = new DOMRect(100, 4, 40, 24);
    const bubble = new DOMRect(0, 0, 80, 280);
    const result = computeTooltipPosition(anchor, bubble, 'top', 6, viewport);
    expect(result.top).toBeGreaterThanOrEqual(8);
  });

  it('uses default fallback placements for unknown placement values', () => {
    const anchor = new DOMRect(100, 100, 40, 24);
    const bubble = new DOMRect(0, 0, 80, 32);
    const result = computeTooltipPosition(
      anchor,
      bubble,
      'unknown' as unknown as 'top',
      6,
      viewport,
    );
    expect(result.placement).toBe('unknown');
    expect(result.top).toBe(anchor.top - bubble.height - 6);
  });

  it('flips from bottom to top when bottom overflows', () => {
    const anchor = new DOMRect(100, 270, 40, 24);
    const bubble = new DOMRect(0, 0, 80, 32);
    const result = computeTooltipPosition(anchor, bubble, 'bottom', 6, viewport);
    expect(result.placement).toBe('top');
  });
});
