import {
  Component,
  DestroyRef,
  inject,
  PLATFORM_ID,
  Renderer2,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  AU_RESPONSIVE_FLOATING_MODAL_MQ,
  FloatingPickerOverlay,
  prefersResponsiveFloatingModal,
} from './floating-picker-overlay';

@Component({ changeDetection: ChangeDetectionStrategy.OnPush, template: '' })
class OverlayHost {
  readonly renderer = inject(Renderer2);
  readonly destroyRef = inject(DestroyRef);
}

describe('prefersResponsiveFloatingModal', () => {
  it('reads matchMedia on the window', () => {
    const matchMedia = vi.fn().mockReturnValue({ matches: true });
    expect(prefersResponsiveFloatingModal({ matchMedia } as unknown as Window)).toBe(true);
    expect(matchMedia).toHaveBeenCalledWith(AU_RESPONSIVE_FLOATING_MODAL_MQ);
  });

  it('returns false when window is undefined', () => {
    expect(prefersResponsiveFloatingModal(undefined)).toBe(false);
  });
});

describe('FloatingPickerOverlay', () => {
  let overlay: FloatingPickerOverlay;
  let anchor: HTMLElement;
  let panel: HTMLElement;
  let wrapper: HTMLElement;
  let matchMediaMatches: boolean;
  let mediaListeners: Array<() => void>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [OverlayHost] }).compileComponents();
    const hostFixture = TestBed.createComponent(OverlayHost);
    const { renderer, destroyRef } = hostFixture.componentInstance;

    matchMediaMatches = false;
    mediaListeners = [];
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        matches: query === AU_RESPONSIVE_FLOATING_MODAL_MQ ? matchMediaMatches : false,
        media: query,
        addEventListener: (_: string, listener: () => void) => {
          mediaListeners.push(listener);
        },
        removeEventListener: (_: string, listener: () => void) => {
          mediaListeners = mediaListeners.filter((item) => item !== listener);
        },
      })),
    );

    anchor = document.createElement('button');
    panel = document.createElement('div');
    panel.className = 'au-date-calendar';
    wrapper = document.createElement('div');
    wrapper.append(panel, anchor);
    document.body.append(wrapper);

    overlay = new FloatingPickerOverlay(
      document,
      renderer,
      TestBed.inject(PLATFORM_ID),
      destroyRef,
    );
  });

  afterEach(() => {
    overlay.detach();
    document.body.innerHTML = '';
    vi.unstubAllGlobals();
  });

  it('uses popover positioning on wide viewports', () => {
    matchMediaMatches = false;
    overlay.sync(panel, anchor, 'bottom');
    expect(panel.classList.contains('au-floating-panel--responsive-modal')).toBe(false);
    expect(document.body.querySelector('.au-floating-panel-backdrop')).toBeNull();
    expect(panel.style.top).not.toBe('');
  });

  it('uses modal bottom sheet on narrow viewports', () => {
    matchMediaMatches = true;
    overlay.sync(panel, anchor, 'bottom');
    expect(panel.classList.contains('au-floating-panel--responsive-modal')).toBe(true);
    expect(document.body.querySelector('.au-floating-panel-backdrop')).not.toBeNull();
    expect(panel.parentElement).toBe(document.body);
    expect(panel.style.top).toBe('');
  });

  it('switches layout when the media query changes', () => {
    matchMediaMatches = false;
    overlay.sync(panel, anchor, 'bottom');
    expect(panel.classList.contains('au-floating-panel--responsive-modal')).toBe(false);

    matchMediaMatches = true;
    mediaListeners.forEach((listener) => listener());
    expect(panel.classList.contains('au-floating-panel--responsive-modal')).toBe(true);
  });

  it('removes the panel from the document on detach', () => {
    matchMediaMatches = true;
    overlay.sync(panel, anchor, 'bottom');
    expect(panel.parentElement).toBe(document.body);

    overlay.detach();
    expect(panel.isConnected).toBe(false);
    expect(document.body.querySelector('.au-floating-panel-backdrop')).toBeNull();
  });

  it('reuses an existing portaled panel without re-appending', () => {
    matchMediaMatches = true;
    overlay.sync(panel, anchor, 'bottom');
    overlay.sync(panel, anchor, 'bottom');
    expect(document.body.querySelectorAll('.au-date-calendar').length).toBe(1);
  });

  it('ignores layout media changes after detach', () => {
    matchMediaMatches = true;
    overlay.sync(panel, anchor, 'bottom');
    overlay.detach();
    mediaListeners.forEach((listener) => listener());
    expect(document.body.querySelector('.au-floating-panel-backdrop')).toBeNull();
  });

  it('skips layout media binding when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined);
    overlay.sync(panel, anchor, 'bottom');
    expect(panel.classList.contains('au-floating-panel--responsive-modal')).toBe(false);
  });

  it('no-ops sync when panel is undefined', () => {
    overlay.sync(undefined, anchor, 'bottom');
    expect(document.body.querySelector('.au-floating-panel-backdrop')).toBeNull();
  });

  it('no-ops sync outside the browser', () => {
    const hostFixture = TestBed.createComponent(OverlayHost);
    const serverOverlay = new FloatingPickerOverlay(
      document,
      hostFixture.componentInstance.renderer,
      {} as object,
      hostFixture.componentInstance.destroyRef,
    );
    serverOverlay.sync(panel, anchor, 'bottom');
    expect(panel.classList.contains('au-floating-panel--responsive-modal')).toBe(false);
  });

  it('ignores layout media changes when the panel was cleared', () => {
    matchMediaMatches = true;
    overlay.sync(panel, anchor, 'bottom');
    (overlay as unknown as { activePanel: HTMLElement | null }).activePanel = null;
    expect(() => mediaListeners.forEach((listener) => listener())).not.toThrow();
  });

  it('re-appends the backdrop when the portal root changes', () => {
    matchMediaMatches = true;
    overlay.sync(panel, anchor, 'bottom');
    const backdrop = document.body.querySelector('.au-floating-panel-backdrop')!;
    const otherRoot = document.createElement('div');
    document.body.append(otherRoot);
    otherRoot.append(backdrop);

    overlay.sync(panel, anchor, 'bottom');
    expect(backdrop.parentElement).toBe(document.body);
    expect(backdrop.nextElementSibling).toBe(panel);
  });

  it('re-portals a detached panel without duplicating the anchor comment', () => {
    matchMediaMatches = true;
    overlay.sync(panel, anchor, 'bottom');
    panel.remove();

    overlay.sync(panel, anchor, 'bottom');
    expect(panel.parentElement).toBe(document.body);
    const comments = [...wrapper.childNodes].filter((n) => n.nodeType === Node.COMMENT_NODE);
    expect(comments.length).toBe(1);
  });
});
