import { afterEach, describe, expect, it, vi } from 'vitest';

import { lockPageScroll, resetPageScrollLockForTests, unlockPageScroll } from './page-scroll-lock';

describe('page-scroll-lock', () => {
  afterEach(() => {
    resetPageScrollLockForTests();
  });

  it('prevents wheel scroll on the page while locked', () => {
    lockPageScroll();
    const blocked = new WheelEvent('wheel', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(blocked);
    expect(blocked.defaultPrevented).toBe(true);

    unlockPageScroll();
    const allowed = new WheelEvent('wheel', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(allowed);
    expect(allowed.defaultPrevented).toBe(false);
  });

  it('does not mutate body layout styles', () => {
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';

    lockPageScroll();
    expect(document.body.style.overflow).toBe('auto');
    expect(document.body.style.position).toBe('static');

    unlockPageScroll();
  });

  it('ref-counts nested locks', () => {
    lockPageScroll();
    lockPageScroll();
    unlockPageScroll();

    const blocked = new WheelEvent('wheel', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(blocked);
    expect(blocked.defaultPrevented).toBe(true);

    unlockPageScroll();
    const allowed = new WheelEvent('wheel', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(allowed);
    expect(allowed.defaultPrevented).toBe(false);
  });

  it('is a noop when document is unavailable', () => {
    const doc = globalThis.document;
    vi.stubGlobal('document', undefined);
    expect(() => lockPageScroll()).not.toThrow();
    expect(() => unlockPageScroll()).not.toThrow();
    expect(() => resetPageScrollLockForTests()).not.toThrow();
    vi.stubGlobal('document', doc);
  });
});
