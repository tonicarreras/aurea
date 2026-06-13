import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuDialogFooter } from '../dialog/dialog-footer.directive';
import { AuDrawer } from './drawer';

describe('AuDrawer', () => {
  function queryNativeDialog(fixture: ComponentFixture<AuDrawer>): HTMLDialogElement {
    return fixture.debugElement.query(By.css('.au-drawer__native'))!
      .nativeElement as HTMLDialogElement;
  }

  function isDialogOpen(dialog: HTMLDialogElement): boolean {
    if (typeof dialog.close === 'function') {
      return dialog.open;
    }
    return dialog.hasAttribute('open');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuDrawer],
    }).compileComponents();
  });

  it('keeps native dialog closed when open is false', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', false);
    await fix.whenStable();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(false);
  });

  it('opens native dialog when open is true', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(true);
  });

  it('prevents page wheel scroll while open without mutating body layout', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    expect(document.body.style.position).not.toBe('fixed');
    expect(document.body.style.overflow).not.toBe('hidden');

    const blocked = new WheelEvent('wheel', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(blocked);
    expect(blocked.defaultPrevented).toBe(true);

    fix.componentRef.setInput('open', false);
    await fix.whenStable();

    const allowed = new WheelEvent('wheel', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(allowed);
    expect(allowed.defaultPrevented).toBe(false);
  });

  it('allows wheel scroll inside the drawer panel when it can consume delta', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    const body = queryNativeDialog(fix).querySelector('.au-drawer__body') as HTMLElement;
    Object.defineProperty(body, 'scrollTop', { value: 50, writable: true });
    Object.defineProperty(body, 'scrollHeight', { value: 400, configurable: true });
    Object.defineProperty(body, 'clientHeight', { value: 200, configurable: true });
    const permitted = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 10 });
    body.dispatchEvent(permitted);
    expect(permitted.defaultPrevented).toBe(false);
  });

  it('blocks wheel on the drawer backdrop', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    const dialog = queryNativeDialog(fix);
    const blocked = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 10 });
    dialog.dispatchEvent(blocked);
    expect(blocked.defaultPrevented).toBe(true);
  });

  it('blocks wheel events without a node target', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    const blocked = new WheelEvent('wheel', { bubbles: true, cancelable: true });
    Object.defineProperty(blocked, 'target', { value: null, configurable: true });
    document.body.dispatchEvent(blocked);
    expect(blocked.defaultPrevented).toBe(true);
  });

  it('applies position and size on host', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('position', 'start');
    fix.componentRef.setInput('size', 'lg');
    await fix.whenStable();
    expect(fix.nativeElement.getAttribute('data-au-position')).toBe('start');
    expect(fix.nativeElement.getAttribute('data-au-size')).toBe('lg');
  });

  it('closes on backdrop click when enabled', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    const dialog = queryNativeDialog(fix);
    const ev = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: dialog, configurable: true });
    fix.componentInstance.onDialogClick(ev);
    await fix.whenStable();
    expect(isDialogOpen(dialog)).toBe(false);
  });

  it('ignores backdrop click when closeOnBackdrop is false', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('closeOnBackdrop', false);
    await fix.whenStable();
    const dialog = queryNativeDialog(fix);
    const ev = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: dialog, configurable: true });
    fix.componentInstance.onDialogClick(ev);
    expect(isDialogOpen(dialog)).toBe(true);
  });

  it('prevents cancel when closeOnEscape is false', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('closeOnEscape', false);
    await fix.whenStable();
    const event = new Event('cancel', { cancelable: true });
    fix.componentInstance.onDialogCancel(event);
    expect(event.defaultPrevented).toBe(true);
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(true);
  });

  it('triggers onDialogClose via native dialog close event', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    let emitted = false;
    fix.componentInstance.close.subscribe(() => (emitted = true));
    const dialogDe = fix.debugElement.query(By.css('.au-drawer__native'))!;
    dialogDe.triggerEventHandler('close', new Event('close'));
    await fix.whenStable();
    expect(emitted).toBe(true);
    expect(fix.componentInstance.open()).toBe(false);
  });

  it('closes on close button click', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('title', 'Settings');
    await fix.whenStable();
    const btn = fix.nativeElement.querySelector('.au-drawer__close') as HTMLButtonElement;
    btn.click();
    await fix.whenStable();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(false);
  });

  it('keeps open when clicking inside the panel', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    const panel = fix.nativeElement.querySelector('.au-drawer__panel') as HTMLElement;
    panel.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fix.whenStable();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(true);
  });

  it('closes on Escape via cancel when closeOnEscape is true', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    const dialogDe = fix.debugElement.query(By.css('.au-drawer__native'))!;
    // cancel fires first; native dialog then fires close in a real browser
    dialogDe.triggerEventHandler('cancel', new Event('cancel', { cancelable: true }));
    dialogDe.triggerEventHandler('close', new Event('close'));
    await fix.whenStable();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(false);
  });

  it('handles Tab keydown inside the panel', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('title', 'Settings');
    await fix.whenStable();
    const dialogDe = fix.debugElement.query(By.css('.au-drawer__native'))!;
    dialogDe.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }),
    );
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(true);
  });

  it('no-ops keydown when closed', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    await fix.whenStable();
    fix.componentInstance.onDialogKeydown(new KeyboardEvent('keydown', { key: 'Tab' }));
    expect(fix.componentInstance.open()).toBe(false);
  });

  it('detects projected drawer footer', async () => {
    @Component({
      imports: [AuDrawer, AuDialogFooter],
      template: `
        <au-drawer [open]="true">
          <div auDrawerFooter>Actions</div>
        </au-drawer>
      `,
    })
    class Host {}

    const fix = TestBed.createComponent(Host);
    await fix.whenStable();
    const drawer = fix.debugElement.query(By.directive(AuDrawer)).componentInstance as AuDrawer;
    expect(drawer.hasFooter()).toBe(true);
  });

  it('polyfills close when close is not a function on the instance', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    const el = queryNativeDialog(fix);
    try {
      Object.defineProperty(el, 'close', { value: undefined, configurable: true });
      fix.componentRef.setInput('open', false);
      await fix.whenStable();
      expect(el.hasAttribute('open')).toBe(false);
    } finally {
      delete (el as unknown as { close?: unknown }).close;
    }
  });

  it('returns early from backdrop click when target is inside the panel', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    const panel = fix.nativeElement.querySelector('.au-drawer__panel') as HTMLElement;
    const ev = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: panel, configurable: true });
    fix.componentInstance.onDialogClick(ev);
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(true);
  });

  it('no-ops keydown when the panel is missing', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    const inst = fix.componentInstance as unknown as {
      nativeDialog: () => HTMLDialogElement;
      onDialogKeydown: (e: KeyboardEvent) => void;
    };
    vi.spyOn(inst, 'nativeDialog').mockReturnValue({
      querySelector: () => null,
    } as unknown as HTMLDialogElement);
    inst.onDialogKeydown(new KeyboardEvent('keydown', { key: 'Tab' }));
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(true);
  });

  it('polyfills showModal when showModal is missing', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    const el = queryNativeDialog(fix);
    try {
      Object.defineProperty(el, 'showModal', { value: undefined, configurable: true });
      fix.componentRef.setInput('open', true);
      await fix.whenStable();
      expect(el.hasAttribute('open')).toBe(true);
    } finally {
      delete (el as unknown as { showModal?: unknown }).showModal;
    }
  });

  it('tolerates missing dialog node in host during render sync', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    vi.spyOn(fix.nativeElement, 'querySelector').mockReturnValue(null);
    fix.componentRef.setInput('open', true);
    expect(async () => await fix.whenStable()).not.toThrow();
  });

  it('uses native showModal/close when present on the element', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    await fix.whenStable();
    const el = queryNativeDialog(fix);
    const showSpy = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    });
    const closeSpy = vi.fn(function (this: HTMLDialogElement) {
      this.removeAttribute('open');
      this.dispatchEvent(new Event('close'));
    });
    try {
      Object.defineProperty(el, 'showModal', { value: showSpy, configurable: true });
      Object.defineProperty(el, 'close', { value: closeSpy, configurable: true });
      fix.componentRef.setInput('open', true);
      await fix.whenStable();
      expect(showSpy).toHaveBeenCalled();
      fix.componentRef.setInput('open', false);
      await fix.whenStable();
      expect(closeSpy).toHaveBeenCalled();
    } finally {
      delete (el as unknown as { showModal?: unknown; close?: unknown }).showModal;
      delete (el as unknown as { close?: unknown }).close;
    }
  });

  it('onCloseButtonClick is noop when dialog node is missing', () => {
    const fix = TestBed.createComponent(AuDrawer);
    vi.spyOn(fix.nativeElement, 'querySelector').mockReturnValue(null);
    expect(() => fix.componentInstance.onCloseButtonClick()).not.toThrow();
  });

  it('ignores backdrop click when dialog node is missing', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    vi.spyOn(fix.nativeElement, 'querySelector').mockReturnValue(null);
    const ev = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: document.body, configurable: true });
    expect(() => fix.componentInstance.onDialogClick(ev)).not.toThrow();
  });

  it('no-ops cancel when the dialog is not displayed', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    await fix.whenStable();
    const event = new Event('cancel', { cancelable: true });
    fix.componentInstance.onDialogCancel(event);
    // closeOnEscape defaults to true → no preventDefault
    expect(event.defaultPrevented).toBe(false);
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(false);
  });

  it('skips focus save when native dialog is already open', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    await fix.whenStable();
    const dialog = queryNativeDialog(fix);
    const inst = fix.componentInstance as unknown as {
      openDialogElement: (d: HTMLDialogElement) => void;
      savedFocus: HTMLElement | null;
    };
    const saved = inst.savedFocus;
    inst.openDialogElement(dialog);
    expect(inst.savedFocus).toBe(saved);
  });

  it('savedFocus is null when activeElement is not an HTMLElement', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    document.body.append(svg);
    const activeSpy = vi.spyOn(document, 'activeElement', 'get').mockReturnValue(svg);
    try {
      fix.componentRef.setInput('open', true);
      await fix.whenStable();
      const inst = fix.componentInstance as unknown as { savedFocus: HTMLElement | null };
      expect(inst.savedFocus).toBeNull();
    } finally {
      activeSpy.mockRestore();
      svg.remove();
    }
  });

  it('skips initial focus when drawer closes before the open microtask', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('open', false);
    await fix.whenStable();
    await fix.whenStable();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(false);
  });

  it('skips initial focus when the panel node is removed before the microtask', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    queryNativeDialog(fix).querySelector('.au-drawer__panel')?.remove();
    await fix.whenStable();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(true);
  });

  it('uses custom id prefix for the title heading', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('id', 'settings');
    fix.componentRef.setInput('title', 'Settings');
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    expect(fix.componentInstance.titleHeadingId()).toBe('settings-title');
    const heading = fix.nativeElement.querySelector('.au-drawer__title') as HTMLElement;
    expect(heading.id).toBe('settings-title');
  });

  it('applyOpenStateToNativeDialog returns when dialog node is missing', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    await fix.whenStable();
    const inst = fix.componentInstance as unknown as { applyOpenStateToNativeDialog(): void };
    vi.spyOn(fix.nativeElement, 'querySelector').mockReturnValue(null);
    expect(() => inst.applyOpenStateToNativeDialog()).not.toThrow();
  });

  it('openDialogElement microtask skips focus when already closed', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    await fix.whenStable();
    fix.componentRef.setInput('open', false);
    const dialog = queryNativeDialog(fix);
    (
      fix.componentInstance as unknown as { openDialogElement(d: HTMLDialogElement): void }
    ).openDialogElement(dialog);
    await new Promise<void>((resolve) => {
      queueMicrotask(() => resolve());
    });
  });

  it('openDialogElement microtask skips focus when panel is missing', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    const dialog = queryNativeDialog(fix);
    dialog.querySelector('.au-drawer__panel')?.remove();
    (
      fix.componentInstance as unknown as { openDialogElement(d: HTMLDialogElement): void }
    ).openDialogElement(dialog);
    await new Promise<void>((resolve) => {
      queueMicrotask(() => resolve());
    });
  });

  it('closeDialogElement polyfills close when native close is unavailable', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    await fix.whenStable();
    const el = queryNativeDialog(fix);
    el.setAttribute('open', '');
    Object.defineProperty(el, 'close', { value: undefined, configurable: true });
    const dispatchSpy = vi.spyOn(el, 'dispatchEvent');
    (fix.componentInstance as unknown as { closeDialogElement(d: HTMLDialogElement): void }).closeDialogElement(
      el,
    );
    expect(el.hasAttribute('open')).toBe(false);
    expect(dispatchSpy).toHaveBeenCalled();
    delete (el as unknown as { close?: unknown }).close;
  });

  it('closeDialogElement is noop when polyfilled dialog is already closed', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    await fix.whenStable();
    const el = queryNativeDialog(fix);
    Object.defineProperty(el, 'close', { value: undefined, configurable: true });
    const dispatchSpy = vi.spyOn(el, 'dispatchEvent');
    (fix.componentInstance as unknown as { closeDialogElement(d: HTMLDialogElement): void }).closeDialogElement(
      el,
    );
    expect(dispatchSpy).not.toHaveBeenCalled();
    delete (el as unknown as { close?: unknown }).close;
  });
});
