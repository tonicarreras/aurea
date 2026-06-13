import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuDialogFooter } from '../dialog/dialog-footer.directive';
import { resetPageScrollLockForTests } from '../overlay/page-scroll-lock';
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
    resetPageScrollLockForTests();
  });

  afterEach(() => {
    resetPageScrollLockForTests();
  });

  it('keeps native dialog closed when open is false', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', false);
    fix.detectChanges();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(false);
  });

  it('opens native dialog when open is true', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(true);
  });

  it('locks page scroll while open and restores on close', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.position).not.toBe('fixed');
    fix.componentRef.setInput('open', false);
    fix.detectChanges();
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('applies position and size on host', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('position', 'start');
    fix.componentRef.setInput('size', 'lg');
    fix.detectChanges();
    expect(fix.nativeElement.getAttribute('data-au-position')).toBe('start');
    expect(fix.nativeElement.getAttribute('data-au-size')).toBe('lg');
  });

  it('closes on backdrop click when enabled', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    const dialog = queryNativeDialog(fix);
    const ev = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: dialog, configurable: true });
    fix.componentInstance.onDialogClick(ev);
    fix.detectChanges();
    expect(isDialogOpen(dialog)).toBe(false);
  });

  it('ignores backdrop click when closeOnBackdrop is false', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('closeOnBackdrop', false);
    fix.detectChanges();
    const dialog = queryNativeDialog(fix);
    const ev = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: dialog, configurable: true });
    fix.componentInstance.onDialogClick(ev);
    expect(isDialogOpen(dialog)).toBe(true);
  });

  it('prevents cancel when closeOnEscape is false', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('closeOnEscape', false);
    fix.detectChanges();
    const event = new Event('cancel', { cancelable: true });
    fix.componentInstance.onDialogCancel(event);
    expect(event.defaultPrevented).toBe(true);
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(true);
  });

  it('triggers onDialogClose via native dialog close event', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    let emitted = false;
    fix.componentInstance.close.subscribe(() => (emitted = true));
    const dialogDe = fix.debugElement.query(By.css('.au-drawer__native'))!;
    dialogDe.triggerEventHandler('close', new Event('close'));
    fix.detectChanges();
    expect(emitted).toBe(true);
    expect(fix.componentInstance.open()).toBe(false);
  });

  it('closes on close button click', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('title', 'Settings');
    fix.detectChanges();
    const btn = fix.nativeElement.querySelector('.au-drawer__close') as HTMLButtonElement;
    btn.click();
    fix.detectChanges();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(false);
  });

  it('keeps open when clicking inside the panel', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    const panel = fix.nativeElement.querySelector('.au-drawer__panel') as HTMLElement;
    panel.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fix.detectChanges();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(true);
  });

  it('closes on Escape via cancel when closeOnEscape is true', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    const dialogDe = fix.debugElement.query(By.css('.au-drawer__native'))!;
    dialogDe.triggerEventHandler('cancel', new Event('cancel', { cancelable: true }));
    fix.detectChanges();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(false);
  });

  it('handles Tab keydown inside the panel', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('title', 'Settings');
    fix.detectChanges();
    const dialogDe = fix.debugElement.query(By.css('.au-drawer__native'))!;
    dialogDe.triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }),
    );
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(true);
  });

  it('no-ops keydown when closed', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.detectChanges();
    fix.componentInstance.onDialogKeydown(new KeyboardEvent('keydown', { key: 'Tab' }));
    expect(fix.componentInstance.open()).toBe(false);
  });

  it('detects projected drawer footer', () => {
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
    fix.detectChanges();
    const drawer = fix.debugElement.query(By.directive(AuDrawer)).componentInstance as AuDrawer;
    expect(drawer.hasFooter()).toBe(true);
  });

  it('polyfills close when close is not a function on the instance', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    const el = queryNativeDialog(fix);
    try {
      Object.defineProperty(el, 'close', { value: undefined, configurable: true });
      fix.componentRef.setInput('open', false);
      fix.detectChanges();
      expect(el.hasAttribute('open')).toBe(false);
    } finally {
      delete (el as unknown as { close?: unknown }).close;
    }
  });

  it('returns early from backdrop click when target is inside the panel', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    const panel = fix.nativeElement.querySelector('.au-drawer__panel') as HTMLElement;
    const ev = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: panel, configurable: true });
    fix.componentInstance.onDialogClick(ev);
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(true);
  });

  it('no-ops keydown when the panel is missing', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
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

  it('polyfills showModal when showModal is missing', () => {
    const fix = TestBed.createComponent(AuDrawer);
    const el = queryNativeDialog(fix);
    try {
      Object.defineProperty(el, 'showModal', { value: undefined, configurable: true });
      fix.componentRef.setInput('open', true);
      fix.detectChanges();
      expect(el.hasAttribute('open')).toBe(true);
    } finally {
      delete (el as unknown as { showModal?: unknown }).showModal;
    }
  });

  it('tolerates missing dialog node in host during render sync', () => {
    const fix = TestBed.createComponent(AuDrawer);
    vi.spyOn(fix.nativeElement, 'querySelector').mockReturnValue(null);
    fix.componentRef.setInput('open', true);
    expect(() => fix.detectChanges()).not.toThrow();
  });

  it('uses native showModal/close when present on the element', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.detectChanges();
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
      fix.detectChanges();
      expect(showSpy).toHaveBeenCalled();
      fix.componentRef.setInput('open', false);
      fix.detectChanges();
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

  it('ignores backdrop click when dialog node is missing', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    vi.spyOn(fix.nativeElement, 'querySelector').mockReturnValue(null);
    const ev = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: document.body, configurable: true });
    expect(() => fix.componentInstance.onDialogClick(ev)).not.toThrow();
  });

  it('no-ops cancel when the dialog is not displayed', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.detectChanges();
    const event = new Event('cancel', { cancelable: true });
    fix.componentInstance.onDialogCancel(event);
    expect(event.defaultPrevented).toBe(true);
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(false);
  });

  it('skips scroll unlock when closing an already closed dialog element', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.detectChanges();
    const el = queryNativeDialog(fix);
    const inst = fix.componentInstance as unknown as {
      closeDialogElement: (dialog: HTMLDialogElement) => void;
    };
    document.body.style.overflow = 'auto';
    inst.closeDialogElement(el);
    expect(document.body.style.overflow).toBe('auto');
  });

  it('skips focus save when native dialog is already open', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
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

  it('savedFocus is null when activeElement is not an HTMLElement', () => {
    const fix = TestBed.createComponent(AuDrawer);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    document.body.append(svg);
    const activeSpy = vi.spyOn(document, 'activeElement', 'get').mockReturnValue(svg);
    try {
      fix.componentRef.setInput('open', true);
      fix.detectChanges();
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
    fix.detectChanges();
    await fix.whenStable();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(false);
  });

  it('skips initial focus when the panel node is removed before the microtask', async () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    queryNativeDialog(fix).querySelector('.au-drawer__panel')?.remove();
    await fix.whenStable();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(true);
  });

  it('uses custom id prefix for the title heading', () => {
    const fix = TestBed.createComponent(AuDrawer);
    fix.componentRef.setInput('id', 'settings');
    fix.componentRef.setInput('title', 'Settings');
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    expect(fix.componentInstance.titleHeadingId()).toBe('settings-title');
    const heading = fix.nativeElement.querySelector('.au-drawer__title') as HTMLElement;
    expect(heading.id).toBe('settings-title');
  });
});
