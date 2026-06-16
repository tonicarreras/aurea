import { Component, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import {
  bindPortaledModalHostContextObserver,
  ensureModalDialogPortaledToBody,
  restoreModalDialogPortal,
  syncPortaledModalHostContext,
  type ModalDialogPortalState,
} from './modal-dialog-portal';

@Component({ template: '', host: { 'data-au-size': 'lg', 'data-au-theme': 'dark' } })
class RendererHost {}

describe('modal-dialog-portal', () => {
  let renderer: Renderer2;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [RendererHost] }).compileComponents();
    const fix = TestBed.createComponent(RendererHost);
    renderer = fix.componentRef.injector.get(Renderer2);
    host = fix.nativeElement;
  });

  function emptyPortalState(): ModalDialogPortalState {
    return { anchor: null, unbindHostContext: null };
  }

  it('portals dialog to document.body and restores via anchor comment', () => {
    const wrap = document.createElement('div');
    wrap.style.overflow = 'hidden';
    const dialog = document.createElement('dialog');
    wrap.append(dialog);
    document.body.append(wrap);

    const portalState = emptyPortalState();
    ensureModalDialogPortaledToBody(document, renderer, dialog, portalState, host);
    expect(dialog.parentElement).toBe(document.body);
    expect(dialog.getAttribute('data-au-size')).toBe('lg');
    expect(dialog.getAttribute('data-au-theme')).toBe('dark');
    expect(portalState.anchor?.parentNode).toBe(wrap);

    restoreModalDialogPortal(document, dialog, portalState);
    expect(dialog.parentElement).toBe(wrap);
    expect(dialog.hasAttribute('data-au-size')).toBe(false);
    expect(portalState.anchor).toBeNull();

    wrap.remove();
  });

  it('portals dialog without anchor comment when parentNode is unavailable', () => {
    const wrap = document.createElement('div');
    wrap.style.overflow = 'hidden';
    const dialog = document.createElement('dialog');
    wrap.append(dialog);
    document.body.append(wrap);
    vi.spyOn(dialog, 'parentNode', 'get').mockReturnValue(null);

    const portalState = emptyPortalState();
    ensureModalDialogPortaledToBody(document, renderer, dialog, portalState, host);

    expect(portalState.anchor).toBeNull();
    expect(dialog.parentElement).toBe(document.body);

    dialog.remove();
    wrap.remove();
  });

  it('is a no-op when no ancestor clips overflow', () => {
    const wrap = document.createElement('div');
    const dialog = document.createElement('dialog');
    wrap.append(dialog);
    document.body.append(wrap);
    const portalState = emptyPortalState();

    ensureModalDialogPortaledToBody(document, renderer, dialog, portalState, host);
    expect(dialog.parentElement).toBe(wrap);
    expect(portalState.anchor).toBeNull();

    wrap.remove();
  });

  it('is a no-op when the dialog is already on document.body', () => {
    const dialog = document.createElement('dialog');
    document.body.append(dialog);
    const portalState = emptyPortalState();

    ensureModalDialogPortaledToBody(document, renderer, dialog, portalState, host);
    expect(portalState.anchor).toBeNull();

    dialog.remove();
  });

  it('syncPortaledModalHostContext copies host attrs onto the dialog', () => {
    const dialog = document.createElement('dialog');
    host.setAttribute('data-au-position', 'end');
    syncPortaledModalHostContext(dialog, host);
    expect(dialog.getAttribute('data-au-size')).toBe('lg');
    expect(dialog.getAttribute('data-au-position')).toBe('end');
  });

  it('bindPortaledModalHostContextObserver syncs host attrs when they change', async () => {
    const dialog = document.createElement('dialog');
    const unbind = bindPortaledModalHostContextObserver(dialog, host);
    host.setAttribute('data-au-size', 'sm');
    await vi.waitFor(() => {
      expect(dialog.getAttribute('data-au-size')).toBe('sm');
    });
    unbind();
  });

  it('bindPortaledModalHostContextObserver skips MutationObserver when unavailable', () => {
    const original = globalThis.MutationObserver;
    Object.defineProperty(globalThis, 'MutationObserver', {
      configurable: true,
      value: undefined,
    });
    const dialog = document.createElement('dialog');
    const unbind = bindPortaledModalHostContextObserver(dialog, host);
    expect(typeof unbind).toBe('function');
    unbind();
    Object.defineProperty(globalThis, 'MutationObserver', {
      configurable: true,
      value: original,
    });
  });

  it('restoreModalDialogPortal is noop when the dialog was never portaled to body', () => {
    const wrap = document.createElement('div');
    const dialog = document.createElement('dialog');
    const anchor = document.createComment('au-modal-dialog-anchor');
    wrap.append(anchor, dialog);
    document.body.append(wrap);
    const portalState = emptyPortalState();
    portalState.anchor = anchor;

    restoreModalDialogPortal(document, dialog, portalState);

    expect(dialog.parentElement).toBe(wrap);
    expect(portalState.anchor).toBe(anchor);
    wrap.remove();
  });

  it('restoreModalDialogPortal is noop when the anchor comment is missing', () => {
    const dialog = document.createElement('dialog');
    document.body.append(dialog);
    const portalState = emptyPortalState();

    restoreModalDialogPortal(document, dialog, portalState);

    expect(dialog.parentElement).toBe(document.body);
    dialog.remove();
  });
});
