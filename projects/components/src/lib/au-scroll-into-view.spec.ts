import { describe, expect, it, vi } from 'vitest';

import { scrollIntoViewRespectingMotion } from './au-scroll-into-view';

describe('scrollIntoViewRespectingMotion', () => {
  it('uses smooth scrolling when reduced motion is not preferred', () => {
    const scrollIntoView = vi.fn();
    const el = { scrollIntoView } as unknown as Element;
    vi.stubGlobal('matchMedia', () => ({ matches: false }));

    scrollIntoViewRespectingMotion(el, { block: 'nearest' });

    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'nearest', behavior: 'smooth' });
    vi.unstubAllGlobals();
  });

  it('uses auto scrolling when reduced motion is preferred', () => {
    const scrollIntoView = vi.fn();
    const el = { scrollIntoView } as unknown as Element;
    vi.stubGlobal('matchMedia', () => ({ matches: true }));

    scrollIntoViewRespectingMotion(el);

    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'start', behavior: 'auto' });
    vi.unstubAllGlobals();
  });
});
