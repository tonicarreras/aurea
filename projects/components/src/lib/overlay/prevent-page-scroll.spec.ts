import { afterEach, describe, expect, it } from 'vitest';

import {
  canConsumeWheelDelta,
  createModalScrollAllowPredicate,
  installPageScrollPrevention,
} from './prevent-page-scroll';

function defineScrollMetrics(
  el: Element,
  metrics: Record<string, number>,
  writableKeys: string[] = [],
): void {
  for (const [key, value] of Object.entries(metrics)) {
    Object.defineProperty(el, key, {
      value,
      writable: writableKeys.includes(key),
      configurable: true,
    });
  }
}

describe('canConsumeWheelDelta', () => {
  it('returns false at scroll top when scrolling up', () => {
    const el = document.createElement('div');
    defineScrollMetrics(el, { scrollTop: 0, scrollHeight: 400, clientHeight: 200 }, ['scrollTop']);
    expect(canConsumeWheelDelta(el, -10, 0)).toBe(false);
  });

  it('returns true when content can scroll down', () => {
    const el = document.createElement('div');
    defineScrollMetrics(el, { scrollTop: 0, scrollHeight: 400, clientHeight: 200 }, ['scrollTop']);
    expect(canConsumeWheelDelta(el, 10, 0)).toBe(true);
  });

  it('returns false at scroll bottom when scrolling down', () => {
    const el = document.createElement('div');
    defineScrollMetrics(el, { scrollTop: 200, scrollHeight: 400, clientHeight: 200 }, [
      'scrollTop',
    ]);
    expect(canConsumeWheelDelta(el, 10, 0)).toBe(false);
  });

  it('returns false when deltaY is zero even with vertical overflow', () => {
    const el = document.createElement('div');
    defineScrollMetrics(el, { scrollHeight: 400, clientHeight: 200 });
    expect(canConsumeWheelDelta(el, 0, 0)).toBe(false);
  });

  it('blocks vertical wheel at scroll edge when horizontal overflow exists', () => {
    const el = document.createElement('div');
    defineScrollMetrics(
      el,
      {
        scrollTop: 200,
        scrollHeight: 400,
        clientHeight: 200,
        scrollLeft: 0,
        scrollWidth: 600,
        clientWidth: 200,
      },
      ['scrollTop', 'scrollLeft'],
    );
    expect(canConsumeWheelDelta(el, 10, 0)).toBe(false);
  });

  it('blocks vertical wheel when only horizontal overflow exists', () => {
    const el = document.createElement('div');
    defineScrollMetrics(el, {
      scrollTop: 0,
      scrollHeight: 200,
      clientHeight: 200,
      scrollLeft: 0,
      scrollWidth: 600,
      clientWidth: 200,
    });
    expect(canConsumeWheelDelta(el, 10, 0)).toBe(false);
  });

  it('returns false when horizontal delta is zero after axis classification', () => {
    const el = document.createElement('div');
    defineScrollMetrics(el, { scrollLeft: 10, scrollWidth: 400, clientWidth: 200 }, ['scrollLeft']);
    expect(canConsumeWheelDelta(el, Number.NaN, 0)).toBe(false);
  });

  it('handles horizontal wheel deltas', () => {
    const el = document.createElement('div');
    defineScrollMetrics(el, { scrollLeft: 10, scrollWidth: 400, clientWidth: 200 }, ['scrollLeft']);
    expect(canConsumeWheelDelta(el, 0, -5)).toBe(true);

    defineScrollMetrics(el, { scrollLeft: 0, scrollWidth: 400, clientWidth: 200 }, ['scrollLeft']);
    expect(canConsumeWheelDelta(el, 0, -5)).toBe(false);
    expect(canConsumeWheelDelta(el, 0, 5)).toBe(true);

    defineScrollMetrics(el, { scrollLeft: 200, scrollWidth: 400, clientWidth: 200 }, [
      'scrollLeft',
    ]);
    expect(canConsumeWheelDelta(el, 0, 5)).toBe(false);
  });
});

describe('createModalScrollAllowPredicate', () => {
  it('blocks wheel on backdrop but allows scroll body when it can consume delta', () => {
    const dialog = document.createElement('dialog');
    const body = document.createElement('div');
    body.className = 'au-dialog__body';
    defineScrollMetrics(body, { scrollTop: 50, scrollHeight: 400, clientHeight: 200 }, [
      'scrollTop',
    ]);
    dialog.append(body);
    document.body.append(dialog);

    const allow = createModalScrollAllowPredicate(() => dialog, '.au-dialog__body');

    expect(allow(dialog, new WheelEvent('wheel', { deltaY: 10 }))).toBe(false);

    const permitted = new WheelEvent('wheel', { deltaY: 10, bubbles: true, cancelable: true });
    body.dispatchEvent(permitted);
    expect(allow(body, permitted)).toBe(true);

    dialog.remove();
  });

  it('returns false when overlay root is missing', () => {
    const allow = createModalScrollAllowPredicate(() => null, '.au-dialog__body');
    expect(allow(document.body)).toBe(false);
  });

  it('returns false when target is outside the overlay root', () => {
    const dialog = document.createElement('dialog');
    document.body.append(dialog);
    const allow = createModalScrollAllowPredicate(() => dialog, '.au-dialog__body');
    expect(allow(document.body)).toBe(false);
    dialog.remove();
  });

  it('returns false for text nodes inside the scroll body', () => {
    const dialog = document.createElement('dialog');
    const body = document.createElement('div');
    body.className = 'au-dialog__body';
    const text = document.createTextNode('label');
    body.append(text);
    dialog.append(body);
    document.body.append(dialog);

    const allow = createModalScrollAllowPredicate(() => dialog, '.au-dialog__body');
    expect(allow(text)).toBe(false);

    dialog.remove();
  });

  it('returns false when target is not inside the scroll body selector', () => {
    const dialog = document.createElement('dialog');
    const header = document.createElement('header');
    dialog.append(header);
    document.body.append(dialog);

    const allow = createModalScrollAllowPredicate(() => dialog, '.au-dialog__body');
    expect(allow(header)).toBe(false);

    dialog.remove();
  });

  it('allows touchmove inside the scroll body', () => {
    const dialog = document.createElement('dialog');
    const body = document.createElement('div');
    body.className = 'au-dialog__body';
    dialog.append(body);
    document.body.append(dialog);

    const allow = createModalScrollAllowPredicate(() => dialog, '.au-dialog__body');
    expect(allow(body, new TouchEvent('touchmove'))).toBe(true);

    dialog.remove();
  });
});

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
