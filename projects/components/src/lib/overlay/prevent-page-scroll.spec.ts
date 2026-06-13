import { afterEach, describe, expect, it } from 'vitest';

import {
  canConsumeWheelDelta,
  createModalScrollAllowPredicate,
  installPageScrollPrevention,
} from './prevent-page-scroll';

describe('canConsumeWheelDelta', () => {
  it('returns false at scroll top when scrolling up', () => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'scrollTop', { value: 0, writable: true });
    Object.defineProperty(el, 'scrollHeight', { value: 400 });
    Object.defineProperty(el, 'clientHeight', { value: 200 });
    expect(canConsumeWheelDelta(el, -10, 0)).toBe(false);
  });

  it('returns true when content can scroll down', () => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'scrollTop', { value: 0, writable: true });
    Object.defineProperty(el, 'scrollHeight', { value: 400 });
    Object.defineProperty(el, 'clientHeight', { value: 200 });
    expect(canConsumeWheelDelta(el, 10, 0)).toBe(true);
  });
});

describe('createModalScrollAllowPredicate', () => {
  it('blocks wheel on backdrop but allows scroll body when it can consume delta', () => {
    const dialog = document.createElement('dialog');
    const body = document.createElement('div');
    body.className = 'au-dialog__body';
    Object.defineProperty(body, 'scrollTop', { value: 50, writable: true });
    Object.defineProperty(body, 'scrollHeight', { value: 400 });
    Object.defineProperty(body, 'clientHeight', { value: 200 });
    dialog.append(body);
    document.body.append(dialog);

    const allow = createModalScrollAllowPredicate(() => dialog, '.au-dialog__body');

    expect(allow(dialog, new WheelEvent('wheel', { deltaY: 10 }))).toBe(false);

    const permitted = new WheelEvent('wheel', { deltaY: 10, bubbles: true, cancelable: true });
    body.dispatchEvent(permitted);
    expect(allow(body, permitted)).toBe(true);

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
