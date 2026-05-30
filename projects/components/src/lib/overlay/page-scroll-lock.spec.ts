import { afterEach, describe, expect, it } from 'vitest';

import {
  lockPageScroll,
  resetPageScrollLockForTests,
  unlockPageScroll,
} from './page-scroll-lock';

describe('page-scroll-lock', () => {
  afterEach(() => {
    resetPageScrollLockForTests();
  });

  it('locks and restores body and html overflow', () => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'visible';

    lockPageScroll();
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.documentElement.style.overflow).toBe('hidden');

    unlockPageScroll();
    expect(document.body.style.overflow).toBe('auto');
    expect(document.documentElement.style.overflow).toBe('visible');
  });

  it('ref-counts nested locks', () => {
    lockPageScroll();
    lockPageScroll();
    unlockPageScroll();
    expect(document.body.style.overflow).toBe('hidden');
    unlockPageScroll();
    expect(document.body.style.overflow).toBe('');
  });
});
