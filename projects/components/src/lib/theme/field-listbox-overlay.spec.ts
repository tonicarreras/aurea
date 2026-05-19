import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, inject, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { FieldListboxOverlay, focusLeftFieldControl } from './field-listbox-overlay';

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

@Component({ template: '' })
class OverlayHost {
  readonly renderer = inject(Renderer2);
  readonly destroyRef = inject(DestroyRef);
}

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
