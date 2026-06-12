import { afterEach, describe, expect, it } from 'vitest';

import { installPageScrollPrevention } from './prevent-page-scroll';

describe('installPageScrollPrevention', () => {
  let cleanup: (() => void) | undefined;

  afterEach(() => {
    cleanup?.();
    cleanup = undefined;
  });

  it('prevents wheel outside the allowed target', () => {
    const allowed = document.createElement('div');
    document.body.append(allowed);

    cleanup = installPageScrollPrevention(document, (target) => target === allowed);

    const blocked = new WheelEvent('wheel', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(blocked);
    expect(blocked.defaultPrevented).toBe(true);

    const permitted = new WheelEvent('wheel', { bubbles: true, cancelable: true });
    allowed.dispatchEvent(permitted);
    expect(permitted.defaultPrevented).toBe(false);

    allowed.remove();
  });

  it('prevents touchmove outside the allowed target', () => {
    const allowed = document.createElement('div');
    document.body.append(allowed);

    cleanup = installPageScrollPrevention(document, (target) => target === allowed);

    const blocked = new TouchEvent('touchmove', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(blocked);
    expect(blocked.defaultPrevented).toBe(true);

    const permitted = new TouchEvent('touchmove', { bubbles: true, cancelable: true });
    allowed.dispatchEvent(permitted);
    expect(permitted.defaultPrevented).toBe(false);

    allowed.remove();
  });
});
