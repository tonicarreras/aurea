import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, inject, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TooltipOverlay } from './tooltip-overlay';

@Component({ template: '' })
class OverlayHost {
  readonly renderer = inject(Renderer2);
  readonly destroyRef = inject(DestroyRef);
}

describe('TooltipOverlay', () => {
  let host: OverlayHost;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayHost],
    }).compileComponents();
    host = TestBed.createComponent(OverlayHost).componentInstance;
  });

  function createOverlay(platformId: object = 'browser' as unknown as object) {
    return new TooltipOverlay(
      TestBed.inject(DOCUMENT),
      host.renderer,
      platformId,
      host.destroyRef,
    );
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

  it('portals bubble to body and sets fixed coordinates', () => {
    const wrap = document.createElement('div');
    const anchor = document.createElement('span');
    anchor.getBoundingClientRect = () => new DOMRect(20, 30, 40, 20);
    const bubble = document.createElement('div');
    bubble.getBoundingClientRect = () => new DOMRect(0, 0, 50, 24);
    wrap.append(anchor, bubble);
    document.body.append(wrap);

    const overlay = createOverlay();
    const placement = overlay.sync(bubble, anchor, 'bottom');
    expect(placement).toBe('bottom');
    expect(bubble.classList.contains('au-tooltip__bubble--overlay')).toBe(true);
    expect(bubble.style.position).toBe('fixed');
    overlay.detach();
    wrap.remove();
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
});
