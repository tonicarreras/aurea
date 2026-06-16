import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, inject, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  FieldListboxOverlay,
  focusLeftFieldControl,
  resolveFieldListboxPortalRoot,
} from './field-listbox-overlay';
import { computeTooltipPosition } from './tooltip-position';
import { readCssLengthPx, TooltipOverlay } from './tooltip-overlay';

@Component({ changeDetection: ChangeDetectionStrategy.OnPush, template: '' })
class OverlayHost {
  readonly renderer = inject(Renderer2);
  readonly destroyRef = inject(DestroyRef);
}

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

describe('readCssLengthPx', () => {
  it('returns fallback when the custom property is unavailable', () => {
    expect(readCssLengthPx(document, '--au-missing-token', 10)).toBe(10);
  });

  it('returns the parsed positive length from computed style', () => {
    const spy = vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      marginTop: '16px',
    } as CSSStyleDeclaration);
    expect(readCssLengthPx(document, '--au-tooltip-gap', 14)).toBe(16);
    spy.mockRestore();
  });

  it('returns fallback when the resolved margin is not a positive number', () => {
    const spy = vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      marginTop: 'not-a-length',
    } as CSSStyleDeclaration);
    expect(readCssLengthPx(document, '--au-tooltip-gap', 14)).toBe(14);
    spy.mockRestore();
  });

  it('returns fallback when the resolved margin is zero', () => {
    const spy = vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      marginTop: '0px',
    } as CSSStyleDeclaration);
    expect(readCssLengthPx(document, '--au-tooltip-gap', 14)).toBe(14);
    spy.mockRestore();
  });
});

describe('TooltipOverlay', () => {
  let host: OverlayHost;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayHost],
    }).compileComponents();
    host = TestBed.createComponent(OverlayHost).componentInstance;
  });

  function createOverlay(platformId: object = 'browser' as unknown as object) {
    return new TooltipOverlay(TestBed.inject(DOCUMENT), host.renderer, platformId, host.destroyRef);
  }

  it('sync is noop outside the browser platform', () => {
    const wrap = document.createElement('div');
    const anchor = document.createElement('span');
    const bubble = document.createElement('div');
    wrap.append(anchor, bubble);
    document.body.append(wrap);
    const overlay = createOverlay('server' as unknown as object);
    expect(overlay.sync(bubble, anchor, 'top')).toBe('top');
    expect(bubble.parentElement).toBe(wrap);
    wrap.remove();
  });

  it('copies data-au-theme and data-au-density from anchor subtree onto portaled bubble', () => {
    const shell = document.createElement('div');
    shell.setAttribute('data-au-theme', 'dark');
    shell.setAttribute('data-au-density', 'compact');
    const anchor = document.createElement('span');
    anchor.getBoundingClientRect = () => new DOMRect(20, 30, 40, 20);
    const bubble = document.createElement('div');
    bubble.getBoundingClientRect = () => new DOMRect(0, 0, 50, 24);
    shell.append(anchor, bubble);
    document.body.append(shell);

    const overlay = createOverlay();
    overlay.sync(bubble, anchor, 'bottom');
    expect(bubble.getAttribute('data-au-theme')).toBe('dark');
    expect(bubble.getAttribute('data-au-density')).toBe('compact');
    overlay.detach();
    expect(bubble.hasAttribute('data-au-theme')).toBe(false);
    expect(bubble.hasAttribute('data-au-density')).toBe(false);
    shell.remove();
  });

  it('portals bubble to body and sets fixed coordinates', () => {
    const wrap = document.createElement('div');
    const anchor = document.createElement('span');
    anchor.getBoundingClientRect = () => new DOMRect(20, 30, 40, 20);
    const bubble = document.createElement('div');
    bubble.classList.add('au-floating-panel');
    bubble.getBoundingClientRect = () => new DOMRect(0, 0, 50, 24);
    wrap.append(anchor, bubble);
    document.body.append(wrap);

    const overlay = createOverlay();
    const placement = overlay.sync(bubble, anchor, 'bottom');
    expect(placement).toBe('bottom');
    expect(bubble.classList.contains('au-tooltip__bubble--overlay')).toBe(true);
    expect(bubble.style.position).toBe('fixed');
    expect(bubble.style.getPropertyValue('--au-floating-arrow-x')).not.toBe('');
    overlay.detach();
    expect(bubble.style.getPropertyValue('--au-floating-arrow-x')).toBe('');
    wrap.remove();
  });

  it('portals bubble to an open modal dialog when the anchor is inside it', () => {
    const dialog = document.createElement('dialog');
    dialog.setAttribute('open', '');
    const panel = document.createElement('div');
    panel.className = 'au-dialog__panel';
    const wrap = document.createElement('div');
    const anchor = document.createElement('span');
    anchor.getBoundingClientRect = () => new DOMRect(20, 30, 40, 20);
    const bubble = document.createElement('div');
    bubble.classList.add('au-floating-panel');
    bubble.getBoundingClientRect = () => new DOMRect(0, 0, 50, 24);
    wrap.append(anchor, bubble);
    panel.append(wrap);
    dialog.append(panel);
    document.body.append(dialog);
    const overlay = createOverlay();
    overlay.sync(bubble, anchor, 'bottom');
    expect(bubble.parentElement).toBe(dialog);
    (overlay as unknown as { anchor: Comment | null }).anchor = null;
    overlay.detach();
    expect(dialog.contains(bubble)).toBe(false);
    dialog.remove();
  });

  it('detach is safe when nothing is active', () => {
    expect(() => createOverlay().detach()).not.toThrow();
  });

  it('sync(undefined) detaches without portaling', () => {
    const anchor = document.createElement('span');
    const overlay = createOverlay();
    overlay.sync(document.createElement('div'), anchor, 'top');
    expect(overlay.sync(undefined, anchor, 'top')).toBe('top');
  });

  it('skips portal when the bubble is already on body', () => {
    const anchor = document.createElement('span');
    anchor.getBoundingClientRect = () => new DOMRect(0, 0, 20, 20);
    const bubble = document.createElement('div');
    bubble.getBoundingClientRect = () => new DOMRect(0, 0, 40, 20);
    document.body.append(anchor, bubble);
    const overlay = createOverlay();
    overlay.sync(bubble, anchor, 'top');
    overlay.sync(bubble, anchor, 'top');
    expect(bubble.parentElement).toBe(document.body);
    overlay.detach();
    anchor.remove();
  });

  it('detach removes bubble from body when there is no anchor comment', () => {
    const anchor = document.createElement('span');
    anchor.getBoundingClientRect = () => new DOMRect(0, 0, 20, 20);
    const bubble = document.createElement('div');
    bubble.getBoundingClientRect = () => new DOMRect(0, 0, 40, 20);
    document.body.append(anchor, bubble);
    const overlay = createOverlay();
    overlay.sync(bubble, anchor, 'top');
    (overlay as unknown as { anchor: null }).anchor = null;
    overlay.detach();
    expect(document.body.contains(bubble)).toBe(false);
    anchor.remove();
  });

  it('detaches when the host is destroyed', () => {
    const hostFixture = TestBed.createComponent(OverlayHost);
    const anchor = document.createElement('span');
    anchor.getBoundingClientRect = () => new DOMRect(0, 0, 20, 20);
    const bubble = document.createElement('div');
    bubble.getBoundingClientRect = () => new DOMRect(0, 0, 40, 20);
    document.body.append(anchor, bubble);
    const overlay = new TooltipOverlay(
      TestBed.inject(DOCUMENT),
      hostFixture.componentInstance.renderer,
      'browser' as unknown as object,
      hostFixture.componentInstance.destroyRef,
    );
    overlay.sync(bubble, anchor, 'top');
    hostFixture.destroy();
    expect(bubble.classList.contains('au-tooltip__bubble--overlay')).toBe(false);
    anchor.remove();
  });

  it('positions when defaultView is unavailable', () => {
    const doc = TestBed.inject(DOCUMENT);
    const anchor = document.createElement('span');
    anchor.getBoundingClientRect = () => new DOMRect(10, 10, 30, 20);
    const bubble = document.createElement('div');
    bubble.getBoundingClientRect = () => new DOMRect(0, 0, 40, 20);
    document.body.append(anchor, bubble);
    const originalView = doc.defaultView;
    Object.defineProperty(doc, 'defaultView', { configurable: true, value: null });
    const overlay = createOverlay();
    overlay.sync(bubble, anchor, 'top');
    expect(bubble.style.top).toBeTruthy();
    Object.defineProperty(doc, 'defaultView', { configurable: true, value: originalView });
    overlay.detach();
    anchor.remove();
  });

  it('onWindowChange is a no-op without an active anchor', () => {
    const overlay = createOverlay() as unknown as {
      activeBubble: HTMLElement;
      activeAnchor: null;
      onWindowChange: () => void;
    };
    overlay.activeBubble = document.createElement('div');
    overlay.activeAnchor = null;
    expect(() => overlay.onWindowChange()).not.toThrow();
  });

  it('repositions on scroll and resize', () => {
    const anchor = document.createElement('span');
    anchor.getBoundingClientRect = () => new DOMRect(10, 10, 30, 20);
    const bubble = document.createElement('div');
    bubble.getBoundingClientRect = () => new DOMRect(0, 0, 40, 20);
    document.body.append(anchor, bubble);
    const overlay = createOverlay();
    overlay.sync(bubble, anchor, 'top');
    const topBefore = bubble.style.top;
    anchor.getBoundingClientRect = () => new DOMRect(10, 80, 30, 20);
    window.dispatchEvent(new Event('scroll'));
    expect(bubble.style.top).not.toBe(topBefore);
    overlay.detach();
    anchor.remove();
    bubble.remove();
  });

  it('does not reposition when scrolling inside a floating panel', () => {
    const anchor = document.createElement('span');
    anchor.getBoundingClientRect = () => new DOMRect(10, 10, 30, 20);
    const bubble = document.createElement('div');
    bubble.classList.add('au-floating-panel');
    const column = document.createElement('div');
    bubble.append(column);
    bubble.getBoundingClientRect = () => new DOMRect(0, 0, 40, 60);
    document.body.append(anchor, bubble);
    const overlay = createOverlay();
    overlay.sync(bubble, anchor, 'bottom');
    const topBefore = bubble.style.top;
    column.dispatchEvent(new Event('scroll', { bubbles: true }));
    expect(bubble.style.top).toBe(topBefore);
    overlay.detach();
    anchor.remove();
    bubble.remove();
  });

  it('reuses the visible bubble rect when repositioning after the first layout', () => {
    const anchor = document.createElement('span');
    anchor.getBoundingClientRect = () => new DOMRect(10, 10, 30, 20);
    const bubble = document.createElement('div');
    bubble.classList.add('au-floating-panel');
    bubble.getBoundingClientRect = () => new DOMRect(0, 0, 40, 20);
    document.body.append(anchor, bubble);
    const overlay = createOverlay();
    overlay.sync(bubble, anchor, 'bottom');
    expect(bubble.style.visibility).not.toBe('hidden');
    anchor.getBoundingClientRect = () => new DOMRect(10, 80, 30, 20);
    window.dispatchEvent(new Event('resize'));
    expect(bubble.style.visibility).not.toBe('hidden');
    overlay.detach();
    anchor.remove();
    bubble.remove();
  });

  it('remeasures when a visible portaled bubble reports zero size', () => {
    const anchor = document.createElement('span');
    anchor.getBoundingClientRect = () => new DOMRect(10, 10, 30, 20);
    const bubble = document.createElement('div');
    bubble.classList.add('au-floating-panel');
    let calls = 0;
    bubble.getBoundingClientRect = () => {
      calls += 1;
      return calls === 1 ? new DOMRect(0, 0, 40, 20) : new DOMRect(0, 0, 0, 0);
    };
    document.body.append(anchor, bubble);
    const overlay = createOverlay();
    overlay.sync(bubble, anchor, 'bottom');
    window.dispatchEvent(new Event('resize'));
    expect(bubble.style.visibility).not.toBe('hidden');
    overlay.detach();
    anchor.remove();
    bubble.remove();
  });
});

describe('focusLeftFieldControl', () => {
  it('returns true when currentTarget is not an HTMLElement', () => {
    const ev = new FocusEvent('focusout');
    Object.defineProperty(ev, 'currentTarget', { value: {}, configurable: true });
    expect(focusLeftFieldControl(ev)).toBe(true);
  });

  it('returns true when relatedTarget is null', () => {
    const row = document.createElement('div');
    const ev = new FocusEvent('focusout', { relatedTarget: null });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    expect(focusLeftFieldControl(ev)).toBe(true);
  });

  it('returns false when focus stays inside the control row', () => {
    const row = document.createElement('div');
    const input = document.createElement('input');
    row.append(input);
    const ev = new FocusEvent('focusout', { relatedTarget: input });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    expect(focusLeftFieldControl(ev)).toBe(false);
  });

  it('returns false when focus moves into the portaled listbox', () => {
    const row = document.createElement('div');
    const listbox = document.createElement('ul');
    const option = document.createElement('li');
    listbox.append(option);
    document.body.append(listbox);
    const ev = new FocusEvent('focusout', { relatedTarget: option });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    expect(focusLeftFieldControl(ev, listbox)).toBe(false);
    listbox.remove();
  });

  it('returns true when focus leaves to an outside node', () => {
    const row = document.createElement('div');
    const outside = document.createElement('button');
    const ev = new FocusEvent('focusout', { relatedTarget: outside });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    expect(focusLeftFieldControl(ev)).toBe(true);
  });
});

describe('FieldListboxOverlay', () => {
  let host: OverlayHost;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayHost],
    }).compileComponents();
    host = TestBed.createComponent(OverlayHost).componentInstance;
  });

  function createOverlay(platformId: object = 'browser' as unknown as object) {
    return new FieldListboxOverlay(
      TestBed.inject(DOCUMENT),
      host.renderer,
      platformId,
      host.destroyRef,
    );
  }

  it('sync is noop outside the browser platform', () => {
    const wrap = document.createElement('div');
    const anchor = document.createElement('div');
    const listbox = document.createElement('ul');
    wrap.append(anchor, listbox);
    document.body.append(wrap);
    const overlay = createOverlay('server' as unknown as object);
    overlay.sync(listbox, anchor, true);
    expect(listbox.parentElement).toBe(wrap);
    wrap.remove();
  });

  it('portals listbox into open modal dialog instead of document.body', () => {
    const dialog = document.createElement('dialog');
    dialog.className = 'au-dialog__native';
    dialog.setAttribute('open', '');
    const panel = document.createElement('div');
    panel.className = 'au-dialog__panel';
    const wrap = document.createElement('div');
    const anchor = document.createElement('div');
    anchor.getBoundingClientRect = () =>
      ({
        bottom: 40,
        left: 12,
        width: 200,
        top: 16,
        right: 212,
        height: 24,
        x: 12,
        y: 16,
        toJSON: () => ({}),
      }) as DOMRect;
    const listbox = document.createElement('ul');
    wrap.append(anchor, listbox);
    panel.append(wrap);
    dialog.append(panel);
    document.body.append(dialog);
    const overlay = createOverlay();
    overlay.sync(listbox, anchor, true);
    expect(listbox.parentElement).toBe(dialog);
    expect(listbox.parentElement).not.toBe(document.body);
    overlay.detach();
    expect(listbox.parentElement).toBe(wrap);
    dialog.remove();
  });

  it('detach removes listbox from a non-body portal when the anchor is missing', () => {
    const dialog = document.createElement('dialog');
    dialog.className = 'au-dialog__native';
    dialog.setAttribute('open', '');
    const panel = document.createElement('div');
    panel.className = 'au-dialog__panel';
    const wrap = document.createElement('div');
    const anchor = document.createElement('div');
    anchor.getBoundingClientRect = () =>
      ({
        bottom: 40,
        left: 12,
        width: 200,
        top: 16,
        right: 212,
        height: 24,
        x: 12,
        y: 16,
        toJSON: () => ({}),
      }) as DOMRect;
    const listbox = document.createElement('ul');
    wrap.append(anchor, listbox);
    panel.append(wrap);
    dialog.append(panel);
    document.body.append(dialog);
    const overlay = createOverlay();
    overlay.sync(listbox, anchor, true);
    expect(listbox.parentElement).toBe(dialog);
    (overlay as unknown as { anchor: Comment | null }).anchor = null;
    overlay.detach();
    expect(dialog.contains(listbox)).toBe(false);
    dialog.remove();
  });

  it('portals listbox to body, positions it, and restores on detach', () => {
    const wrap = document.createElement('div');
    const anchor = document.createElement('div');
    anchor.getBoundingClientRect = () =>
      ({
        bottom: 40,
        left: 12,
        width: 200,
        top: 16,
        right: 212,
        height: 24,
        x: 12,
        y: 16,
        toJSON: () => ({}),
      }) as DOMRect;
    const listbox = document.createElement('ul');
    wrap.append(anchor, listbox);
    document.body.append(wrap);
    const overlay = createOverlay();
    overlay.sync(listbox, anchor, true);
    expect(listbox.parentElement).toBe(document.body);
    expect(listbox.classList.contains('au-field-listbox--overlay')).toBe(true);
    expect(listbox.style.top).toBe('44px');
    expect(listbox.style.width).toBe('200px');
    overlay.detach();
    expect(listbox.parentElement).toBe(wrap);
    expect(listbox.classList.contains('au-field-listbox--overlay')).toBe(false);
    wrap.remove();
  });

  it('repositions on scroll and resize', () => {
    const anchor = document.createElement('div');
    const listbox = document.createElement('ul');
    document.body.append(anchor, listbox);
    let call = 0;
    anchor.getBoundingClientRect = () => {
      call += 1;
      if (call === 1) {
        return {
          bottom: 10,
          left: 0,
          width: 100,
          top: 0,
          right: 100,
          height: 10,
          x: 0,
          y: 0,
          toJSON: () => ({}),
        } as DOMRect;
      }
      return {
        bottom: 50,
        left: 5,
        width: 120,
        top: 30,
        right: 125,
        height: 20,
        x: 5,
        y: 30,
        toJSON: () => ({}),
      } as DOMRect;
    };
    const overlay = createOverlay();
    overlay.sync(listbox, anchor, true);
    window.dispatchEvent(new Event('scroll'));
    expect(listbox.style.top).toBe('54px');
    window.dispatchEvent(new Event('resize'));
    expect(listbox.style.width).toBe('120px');
    overlay.detach();
    listbox.remove();
    anchor.remove();
  });

  it('does not reposition when scrolling inside the portaled listbox', () => {
    const anchor = document.createElement('div');
    anchor.getBoundingClientRect = () =>
      ({
        bottom: 10,
        left: 0,
        width: 100,
        top: 0,
        right: 100,
        height: 10,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }) as DOMRect;
    const listbox = document.createElement('ul');
    const scroller = document.createElement('div');
    listbox.append(scroller);
    document.body.append(anchor, listbox);
    const overlay = createOverlay();
    overlay.sync(listbox, anchor, true);
    const topBefore = listbox.style.top;
    scroller.dispatchEvent(new Event('scroll', { bubbles: true }));
    expect(listbox.style.top).toBe(topBefore);
    overlay.detach();
    listbox.remove();
    anchor.remove();
  });

  it('ensurePortaled appends when listbox has no parent', () => {
    const anchor = document.createElement('div');
    const listbox = document.createElement('ul');
    document.body.append(anchor);
    const overlay = createOverlay();
    overlay.sync(listbox, anchor, true);
    expect(listbox.parentElement).toBe(document.body);
    overlay.detach();
    anchor.remove();
  });

  it('uses default gap when --au-space-1 is not numeric', () => {
    const anchor = document.createElement('div');
    const listbox = document.createElement('ul');
    document.body.append(anchor, listbox);
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: () => 'not-a-number',
    } as unknown as CSSStyleDeclaration);
    anchor.getBoundingClientRect = () =>
      ({
        bottom: 10,
        left: 0,
        width: 80,
        top: 0,
        right: 80,
        height: 10,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }) as DOMRect;
    const overlay = createOverlay();
    overlay.sync(listbox, anchor, true);
    expect(listbox.style.top).toBe('14px');
    overlay.detach();
    listbox.remove();
    anchor.remove();
    vi.restoreAllMocks();
  });

  it('detach removes orphan listbox from body when anchor is missing', () => {
    const listbox = document.createElement('ul');
    document.body.append(listbox);
    const overlay = createOverlay();
    (overlay as unknown as { activeListbox: HTMLElement }).activeListbox = listbox;
    overlay.detach();
    expect(document.body.contains(listbox)).toBe(false);
  });

  it('sync(false) detaches an active overlay', () => {
    const wrap = document.createElement('div');
    const anchor = document.createElement('div');
    const listbox = document.createElement('ul');
    wrap.append(anchor, listbox);
    document.body.append(wrap);
    const overlay = createOverlay();
    overlay.sync(listbox, anchor, true);
    overlay.sync(listbox, anchor, false);
    expect(listbox.parentElement).toBe(wrap);
    wrap.remove();
  });

  it('detach is noop when nothing is active', () => {
    const overlay = createOverlay();
    expect(() => overlay.detach()).not.toThrow();
  });

  it('resolveFieldListboxPortalRoot prefers an open modal dialog', () => {
    const dialog = document.createElement('dialog') as HTMLDialogElement;
    Object.defineProperty(dialog, 'open', { value: true, configurable: true });
    document.body.append(dialog);
    const anchor = document.createElement('div');
    dialog.append(anchor);
    expect(resolveFieldListboxPortalRoot(anchor, document)).toBe(dialog);
    dialog.remove();
  });

  it('resolveFieldListboxPortalRoot falls back to body for closed dialogs', () => {
    const dialog = document.createElement('dialog');
    const anchor = document.createElement('div');
    dialog.append(anchor);
    document.body.append(dialog);
    expect(resolveFieldListboxPortalRoot(anchor, document)).toBe(document.body);
    dialog.remove();
  });

  it('onWindowChange is a no-op without an active anchor', () => {
    const overlay = createOverlay() as unknown as {
      activeListbox: HTMLElement | null;
      activeAnchor: HTMLElement | null;
      onWindowChange: () => void;
    };
    overlay.activeListbox = document.createElement('ul');
    overlay.activeAnchor = null;
    expect(() => overlay.onWindowChange()).not.toThrow();
  });
});
