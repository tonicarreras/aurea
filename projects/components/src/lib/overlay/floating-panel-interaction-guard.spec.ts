import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  createFloatingPanelAllowPredicate,
  createFloatingPanelScrollAllowPredicate,
  installOutsideInteractionBlock,
} from './floating-panel-interaction-guard';

describe('createFloatingPanelAllowPredicate', () => {
  it('allows host, panel, and anchor nodes', () => {
    const host = document.createElement('div');
    const anchor = document.createElement('div');
    const panel = document.createElement('div');
    const outside = document.createElement('a');
    host.append(anchor);
    document.body.append(host, panel, outside);

    const allow = createFloatingPanelAllowPredicate(
      host,
      () => panel,
      () => anchor,
    );
    expect(allow(anchor)).toBe(true);
    expect(allow(panel)).toBe(true);
    expect(allow(outside)).toBe(false);
    expect(allow(null)).toBe(false);
  });
});

describe('createFloatingPanelScrollAllowPredicate', () => {
  it('blocks wheel on panel chrome but allows scrollable columns', () => {
    const host = document.createElement('div');
    const anchor = document.createElement('div');
    const panel = document.createElement('div');
    const preview = document.createElement('span');
    const column = document.createElement('div');
    preview.className = 'preview';
    column.className = 'scroll-column';
    panel.append(preview, column);
    host.append(anchor);
    document.body.append(host, panel);

    Object.defineProperty(column, 'scrollTop', { value: 0, writable: true });
    Object.defineProperty(column, 'scrollHeight', { value: 400, configurable: true });
    Object.defineProperty(column, 'clientHeight', { value: 200, configurable: true });

    const allow = createFloatingPanelScrollAllowPredicate(
      host,
      () => panel,
      () => anchor,
      '.scroll-column',
    );

    const chromeWheel = new WheelEvent('wheel', { deltaY: 10 });
    Object.defineProperty(chromeWheel, 'target', { value: preview, configurable: true });
    expect(allow(preview, chromeWheel)).toBe(false);

    const columnWheel = new WheelEvent('wheel', { deltaY: 10 });
    Object.defineProperty(columnWheel, 'target', { value: column, configurable: true });
    expect(allow(column, columnWheel)).toBe(true);

    panel.remove();
    host.remove();
  });

  it('rejects non-interaction targets and host-only scroll attempts', () => {
    const host = document.createElement('div');
    const anchor = document.createElement('div');
    const panel = document.createElement('div');
    const column = document.createElement('div');
    column.className = 'scroll-column';
    panel.append(column);
    host.append(anchor);
    document.body.append(host, panel);

    const allow = createFloatingPanelScrollAllowPredicate(
      host,
      () => panel,
      () => anchor,
      '.scroll-column',
    );

    expect(allow(document.body, new WheelEvent('wheel'))).toBe(false);

    const text = document.createTextNode('x');
    panel.append(text);
    const textWheel = new WheelEvent('wheel');
    Object.defineProperty(textWheel, 'target', { value: text, configurable: true });
    expect(allow(text, textWheel)).toBe(false);
    text.remove();

    const anchorWheel = new WheelEvent('wheel');
    Object.defineProperty(anchorWheel, 'target', { value: anchor, configurable: true });
    expect(allow(anchor, anchorWheel)).toBe(false);

    Object.defineProperty(column, 'scrollTop', { value: 0, writable: true });
    Object.defineProperty(column, 'scrollHeight', { value: 400, configurable: true });
    Object.defineProperty(column, 'clientHeight', { value: 200, configurable: true });
    const touch = new TouchEvent('touchmove');
    Object.defineProperty(touch, 'target', { value: column, configurable: true });
    expect(allow(column, touch)).toBe(true);

    panel.remove();
    host.remove();
  });
});

describe('installOutsideInteractionBlock', () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it('blocks outside pointerdown and invokes onBlocked', () => {
    const allowed = document.createElement('div');
    const outside = document.createElement('a');
    outside.href = 'https://example.com';
    document.body.append(allowed, outside);

    const onBlocked = vi.fn();
    const cleanup = installOutsideInteractionBlock(
      document,
      (target) => target === allowed,
      onBlocked,
    );

    const event = new PointerEvent('pointerdown', { bubbles: true, cancelable: true });
    outside.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(onBlocked).toHaveBeenCalledTimes(1);

    cleanup();
  });

  it('allows pointerdown inside the allowed subtree', () => {
    const allowed = document.createElement('button');
    document.body.append(allowed);

    const onBlocked = vi.fn();
    const cleanup = installOutsideInteractionBlock(document, (target) => target === allowed, onBlocked);

    const event = new PointerEvent('pointerdown', { bubbles: true, cancelable: true });
    allowed.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
    expect(onBlocked).not.toHaveBeenCalled();

    cleanup();
  });
});
