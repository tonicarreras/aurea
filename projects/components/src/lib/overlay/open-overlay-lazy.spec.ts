import { signal } from '@angular/core';

import { openOverlayLazy } from './open-overlay-lazy';

describe('openOverlayLazy', () => {
  it('defers open until the next microtask on first call', () => {
    const ready = signal(false);
    const open = signal(false);
    openOverlayLazy(ready, open);
    expect(ready()).toBe(true);
    expect(open()).toBe(false);
    return queueMicrotask(() => {
      expect(open()).toBe(true);
    });
  });

  it('opens immediately when ready is already true', () => {
    const ready = signal(true);
    const open = signal(false);
    openOverlayLazy(ready, open);
    expect(open()).toBe(true);
  });
});
