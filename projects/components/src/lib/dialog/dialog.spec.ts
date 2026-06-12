import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuDialog } from './dialog';
import { AuDialogFooter } from './dialog-footer.directive';
import { resetPageScrollLockForTests } from '../overlay/page-scroll-lock';
import {
  focusInitialInDialogPanel,
  getDialogFocusableElements,
  handleDialogTabKeydown,
} from './dialog-focus-trap';

describe('AuDialog', () => {
  function queryNativeDialog(fixture: ComponentFixture<AuDialog>): HTMLDialogElement {
    return fixture.debugElement.query(By.css('.au-dialog__native'))!
      .nativeElement as HTMLDialogElement;
  }

  function isDialogOpen(dialog: HTMLDialogElement): boolean {
    if (typeof dialog.close === 'function') {
      return dialog.open;
    }
    return dialog.hasAttribute('open');
  }

  function clickOutsidePanel(fixture: ComponentFixture<AuDialog>): void {
    const dialog = queryNativeDialog(fixture);
    const ev = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: dialog, configurable: true });
    fixture.componentInstance.onDialogClick(ev);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuDialog],
    }).compileComponents();
    resetPageScrollLockForTests();
  });

  afterEach(() => {
    resetPageScrollLockForTests();
  });

  it('keeps native dialog closed when open is false', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', false);
    fix.detectChanges();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(false);
  });

  it('opens native dialog when open is true', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(true);
  });

  it('does not mutate page scroll styles (native dialog handles scroll)', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    expect(document.body.style.position).not.toBe('fixed');
    expect(document.body.style.overflow).not.toBe('hidden');
    fix.componentRef.setInput('open', false);
    fix.detectChanges();
  });

  it('renders with md size by default', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    const host = fix.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-size')).toBe('md');
  });

  it('applies size attribute to host', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('size', 'sm');
    fix.detectChanges();
    expect(fix.nativeElement.getAttribute('data-au-size')).toBe('sm');
  });

  it('applies lg size', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('size', 'lg');
    fix.detectChanges();
    expect(fix.nativeElement.getAttribute('data-au-size')).toBe('lg');
  });

  it('applies full size', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('size', 'full');
    fix.detectChanges();
    expect(fix.nativeElement.getAttribute('data-au-size')).toBe('full');
  });

  it('renders title when provided', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('title', 'Confirm Action');
    fix.detectChanges();
    const titleEl = fix.debugElement.query(By.css('.au-dialog__title'));
    expect(titleEl?.nativeElement.textContent.trim()).toBe('Confirm Action');
  });

  it('renders close button by default', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    const closeBtn = fix.debugElement.query(By.css('.au-dialog__close'));
    expect(closeBtn).toBeTruthy();
  });

  it('hides close button when showCloseButton is false', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('showCloseButton', false);
    fix.detectChanges();
    const closeBtn = fix.debugElement.query(By.css('.au-dialog__close'));
    expect(closeBtn).toBeNull();
  });

  it('hides header when no title and showCloseButton is false', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('title', '');
    fix.componentRef.setInput('showCloseButton', false);
    fix.detectChanges();
    const header = fix.debugElement.query(By.css('.au-dialog__header'));
    expect(header).toBeNull();
  });

  it('emits close on backdrop click when closeOnBackdrop is true', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    let emitted = false;
    fix.componentInstance.close.subscribe(() => (emitted = true));
    clickOutsidePanel(fix);
    fix.detectChanges();
    expect(emitted).toBe(true);
  });

  it('does not emit close on backdrop click when closeOnBackdrop is false', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('closeOnBackdrop', false);
    fix.detectChanges();
    let emitted = false;
    fix.componentInstance.close.subscribe(() => (emitted = true));
    clickOutsidePanel(fix);
    expect(emitted).toBe(false);
  });

  it('emits close on close button click', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    let emitted = false;
    fix.componentInstance.close.subscribe(() => (emitted = true));
    const closeBtn = fix.debugElement.query(By.css('.au-dialog__close'))!;
    closeBtn.triggerEventHandler('click', new MouseEvent('click'));
    expect(emitted).toBe(true);
  });

  it('triggers onDialogClose via native dialog close event', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    let emitted = false;
    fix.componentInstance.close.subscribe(() => (emitted = true));
    const dialogDe = fix.debugElement.query(By.css('.au-dialog__native'))!;
    dialogDe.triggerEventHandler('close', new Event('close'));
    fix.detectChanges();
    expect(emitted).toBe(true);
  });

  it('emits close on Escape via cancel when closeOnEscape is true', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    let emitted = false;
    fix.componentInstance.close.subscribe(() => (emitted = true));
    const dialogDe = fix.debugElement.query(By.css('.au-dialog__native'))!;
    dialogDe.triggerEventHandler('cancel', new Event('cancel', { cancelable: true }));
    fix.detectChanges();
    expect(emitted).toBe(true);
  });

  it('does not emit close on cancel when closeOnEscape is false', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('closeOnEscape', false);
    fix.detectChanges();
    let emitted = false;
    fix.componentInstance.close.subscribe(() => (emitted = true));
    const dialogDe = fix.debugElement.query(By.css('.au-dialog__native'))!;
    const ev = new Event('cancel', { cancelable: true });
    dialogDe.triggerEventHandler('cancel', ev);
    fix.detectChanges();
    expect(emitted).toBe(false);
    expect(ev.defaultPrevented).toBe(true);
  });

  it('does not emit close when clicking inside the panel', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    let emitted = false;
    fix.componentInstance.close.subscribe(() => (emitted = true));
    const panel = fix.debugElement.query(By.css('.au-dialog__panel'))!.nativeElement;
    const ev = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: panel, configurable: true });
    fix.componentInstance.onDialogClick(ev);
    expect(emitted).toBe(false);
  });

  it('skips render sync when open stays false', async () => {
    const fix = TestBed.createComponent(AuDialog);
    const el = queryNativeDialog(fix);
    const closeSpy = vi.fn(function (this: HTMLDialogElement) {
      this.removeAttribute('open');
    });
    try {
      Object.defineProperty(el, 'close', { value: closeSpy, configurable: true });
      fix.componentRef.setInput('open', false);
      fix.detectChanges();
      await fix.whenStable();
      const n = closeSpy.mock.calls.length;
      fix.detectChanges();
      await fix.whenStable();
      expect(closeSpy.mock.calls.length).toBe(n);
    } finally {
      delete (el as unknown as { close?: unknown }).close;
    }
  });

  it('skips open sync when open signal is unchanged', () => {
    const fix = TestBed.createComponent(AuDialog);
    const el = queryNativeDialog(fix);
    const openSpy = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    });
    try {
      Object.defineProperty(el, 'showModal', { value: openSpy, configurable: true });
      fix.componentRef.setInput('open', true);
      fix.detectChanges();
      const n = openSpy.mock.calls.length;
      fix.detectChanges();
      expect(openSpy.mock.calls.length).toBe(n);
    } finally {
      delete (el as unknown as { showModal?: unknown }).showModal;
    }
  });

  it('renders body content via ng-content', () => {
    const fix = TestBed.createComponent(TestDialogComponent);
    fix.detectChanges();
    const content = fix.debugElement.query(By.css('.test-dialog-content'))!;
    expect(content).toBeTruthy();
    expect(content.nativeElement.textContent).toBe('Dialog body content');
  });

  it('renders footer slot', () => {
    const fix = TestBed.createComponent(TestDialogWithFooterComponent);
    fix.detectChanges();
    const footer = fix.debugElement.query(By.css('.au-dialog__footer'))!;
    expect(footer).toBeTruthy();
    const footerContent = footer.nativeElement.textContent.trim();
    expect(footerContent).toContain('Footer action');
  });

  it('uses native dialog element', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.detectChanges();
    expect(queryNativeDialog(fix).tagName).toBe('DIALOG');
  });

  it('has aria-labelledby matching title id when title is provided', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('title', 'Test Title');
    fix.detectChanges();
    const dialog = fix.debugElement.query(By.css('.au-dialog__native'))!.nativeElement;
    const titleEl = fix.debugElement.query(By.css('.au-dialog__title'))!.nativeElement;
    expect(dialog.getAttribute('aria-labelledby')).toBe(titleEl.id);
    expect(titleEl.id.length).toBeGreaterThan(0);
  });

  it('does not have aria-labelledby when title is empty', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('title', '');
    fix.detectChanges();
    const dialog = fix.debugElement.query(By.css('.au-dialog__native'))!;
    expect(dialog.nativeElement.getAttribute('aria-labelledby')).toBeNull();
  });

  it('open input defaults to false', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.detectChanges();
    expect(fix.componentInstance.open()).toBe(false);
  });

  it('size input defaults to md', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.detectChanges();
    expect(fix.componentInstance.size()).toBe('md');
  });

  it('title input defaults to empty string', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.detectChanges();
    expect(fix.componentInstance.title()).toBe('');
  });

  it('showCloseButton input defaults to true', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.detectChanges();
    expect(fix.componentInstance.showCloseButton()).toBe(true);
  });

  it('closeOnBackdrop input defaults to true', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.detectChanges();
    expect(fix.componentInstance.closeOnBackdrop()).toBe(true);
  });

  it('closeOnEscape input defaults to true', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.detectChanges();
    expect(fix.componentInstance.closeOnEscape()).toBe(true);
  });

  it('uses native showModal/close when present on the element', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.detectChanges();
    const el = fix.debugElement.query(By.css('.au-dialog__native'))!
      .nativeElement as HTMLDialogElement;
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

  it('polyfills close when close is not a function on the instance', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    const el = fix.debugElement.query(By.css('.au-dialog__native'))!
      .nativeElement as HTMLDialogElement;
    try {
      Object.defineProperty(el, 'close', { value: undefined, configurable: true });
      fix.componentRef.setInput('open', false);
      fix.detectChanges();
      expect(el.hasAttribute('open')).toBe(false);
    } finally {
      delete (el as unknown as { close?: unknown }).close;
    }
  });

  it('titleHeadingId uses generated id when id input is empty', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.detectChanges();
    expect(fix.componentInstance.titleHeadingId()).toMatch(/^au-dialog-title-\d+$/);
  });

  it('uses id input for title heading id', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('id', 'dlg-1');
    fix.componentRef.setInput('title', 'T');
    fix.detectChanges();
    expect(fix.componentInstance.titleHeadingId()).toBe('dlg-1-title');
    const h2 = fix.debugElement.query(By.css('.au-dialog__title'))!.nativeElement;
    expect(h2.id).toBe('dlg-1-title');
  });

  it('sets aria-label when title is empty and ariaLabel is set', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('title', '');
    fix.componentRef.setInput('ariaLabel', 'Photo preview');
    fix.detectChanges();
    const dialog = fix.debugElement.query(By.css('.au-dialog__native'))!.nativeElement;
    expect(dialog.getAttribute('aria-label')).toBe('Photo preview');
  });

  it('title change alone does not rerun dialog open sync', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.detectChanges();
    const el = fix.debugElement.query(By.css('.au-dialog__native'))!
      .nativeElement as HTMLDialogElement;
    const openSpy = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    });
    try {
      Object.defineProperty(el, 'showModal', { value: openSpy, configurable: true });
      fix.componentRef.setInput('open', true);
      fix.componentRef.setInput('title', 'First');
      fix.detectChanges();
      const n = openSpy.mock.calls.length;
      fix.componentRef.setInput('title', 'Second');
      fix.detectChanges();
      expect(openSpy.mock.calls.length).toBe(n);
    } finally {
      delete (el as unknown as { showModal?: unknown }).showModal;
    }
  });

  it('close button tolerates polyfilled dialog already closed', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', false);
    fix.detectChanges();
    const el = fix.debugElement.query(By.css('.au-dialog__native'))!
      .nativeElement as HTMLDialogElement;
    Object.defineProperty(el, 'close', { value: undefined, configurable: true });
    fix.componentInstance.onCloseButtonClick();
    delete (el as unknown as { close?: unknown }).close;
  });

  it('does not close on cancel when dialog is not displayed', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', false);
    fix.detectChanges();
    let n = 0;
    fix.componentInstance.close.subscribe(() => n++);
    const dialogDe = fix.debugElement.query(By.css('.au-dialog__native'))!;
    dialogDe.triggerEventHandler('cancel', new Event('cancel', { cancelable: true }));
    expect(n).toBe(0);
  });

  it('does not render footer when auDialogFooter is absent', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-dialog__footer'))).toBeNull();
    expect(fix.componentInstance.hasFooter()).toBe(false);
  });

  it('hasFooter is true when auDialogFooter is projected', () => {
    const fix = TestBed.createComponent(TestDialogWithFooterComponent);
    fix.detectChanges();
    const dialog = fix.debugElement.query(By.directive(AuDialog))!.componentInstance as AuDialog;
    expect(dialog.hasFooter()).toBe(true);
  });

  it('polyfills showModal when showModal is missing', () => {
    const fix = TestBed.createComponent(AuDialog);
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

  it('onDialogClose does not emit when dialog is already closed', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', false);
    fix.detectChanges();
    let n = 0;
    fix.componentInstance.close.subscribe(() => n++);
    fix.componentInstance.onDialogClose();
    expect(n).toBe(0);
  });

  it('tolerates missing dialog node in host during render sync', () => {
    const fix = TestBed.createComponent(AuDialog);
    vi.spyOn(fix.nativeElement, 'querySelector').mockReturnValue(null);
    fix.componentRef.setInput('open', true);
    expect(() => fix.detectChanges()).not.toThrow();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(false);
  });

  it('onCloseButtonClick is noop when dialog node is missing', () => {
    const fix = TestBed.createComponent(AuDialog);
    vi.spyOn(fix.nativeElement, 'querySelector').mockReturnValue(null);
    expect(() => fix.componentInstance.onCloseButtonClick()).not.toThrow();
  });

  it('onDialogClick is noop when dialog node is missing', () => {
    const fix = TestBed.createComponent(AuDialog);
    vi.spyOn(fix.nativeElement, 'querySelector').mockReturnValue(null);
    const ev = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: fix.nativeElement, configurable: true });
    expect(() => fix.componentInstance.onDialogClick(ev)).not.toThrow();
  });

  it('onDialogKeydown is noop when dialog is closed', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.detectChanges();
    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    fix.componentInstance.onDialogKeydown(ev);
    expect(ev.defaultPrevented).toBe(false);
  });

  it('onDialogKeydown is noop when panel is missing', () => {
    const fix = TestBed.createComponent(AuDialog);
    vi.spyOn(fix.nativeElement, 'querySelector').mockImplementation((sel: unknown) => {
      if (sel === 'dialog') {
        return document.createElement('dialog');
      }
      return null;
    });
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    fix.componentInstance.onDialogKeydown(ev);
    expect(ev.defaultPrevented).toBe(false);
  });

  it('wraps Tab from last focusable to first inside the panel', async () => {
    const fix = TestBed.createComponent(TestDialogFocusTrapComponent);
    fix.detectChanges();
    await fix.whenStable();
    const panel = fix.debugElement.query(By.css('.au-dialog__panel'))!.nativeElement as HTMLElement;
    const first = panel.querySelector('#trap-first') as HTMLButtonElement;
    const last = panel.querySelector('#trap-last') as HTMLButtonElement;
    last.focus();
    const dialogDe = fix.debugElement.query(By.css('.au-dialog__native'))!;
    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    dialogDe.triggerEventHandler('keydown', ev);
    expect(ev.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(first);
  });

  it('does not overwrite saved focus when dialog is already displayed', async () => {
    const trigger = document.createElement('button');
    document.body.append(trigger);
    trigger.focus();
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    await fix.whenStable();
    const outside = document.createElement('button');
    document.body.append(outside);
    outside.focus();
    fix.componentRef.setInput('title', 'Updated');
    fix.detectChanges();
    await fix.whenStable();
    fix.componentRef.setInput('open', false);
    fix.detectChanges();
    await fix.whenStable();
    queryNativeDialog(fix).dispatchEvent(new Event('close'));
    fix.detectChanges();
    expect(document.activeElement).toBe(trigger);
    trigger.remove();
    outside.remove();
  });

  it('skips focus save and initial focus when native dialog is already open', async () => {
    const fix = TestBed.createComponent(AuDialog);
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
    const fix = TestBed.createComponent(AuDialog);
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

  it('skips initial focus when dialog closes before the open microtask', async () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('open', false);
    fix.detectChanges();
    await fix.whenStable();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(false);
  });

  it('restores focus to the element that opened the dialog', async () => {
    const trigger = document.createElement('button');
    trigger.type = 'button';
    document.body.append(trigger);
    trigger.focus();
    const fix = TestBed.createComponent(AuDialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    await fix.whenStable();
    fix.componentRef.setInput('open', false);
    fix.detectChanges();
    await fix.whenStable();
    queryNativeDialog(fix).dispatchEvent(new Event('close'));
    fix.detectChanges();
    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });

  it('close polyfill is noop when open attribute is already absent', () => {
    const fix = TestBed.createComponent(AuDialog);
    fix.detectChanges();
    const el = queryNativeDialog(fix);
    Object.defineProperty(el, 'close', { value: undefined, configurable: true });
    expect(el.hasAttribute('open')).toBe(false);
    fix.componentInstance.onCloseButtonClick();
    delete (el as unknown as { close?: unknown }).close;
  });
});

@Component({
  selector: 'test-dialog',
  imports: [AuDialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-dialog [open]="true">
      <span class="test-dialog-content">Dialog body content</span>
    </au-dialog>
  `,
})
class TestDialogComponent {}

@Component({
  selector: 'test-dialog-footer',
  imports: [AuDialog, AuDialogFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-dialog [open]="true">
      <p>Dialog body</p>
      <button
        type="button"
        auDialogFooter
      >
        Footer action
      </button>
    </au-dialog>
  `,
})
class TestDialogWithFooterComponent {}

@Component({
  selector: 'test-dialog-focus-trap',
  imports: [AuDialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-dialog
      [open]="true"
      title="Trap"
      [showCloseButton]="false"
    >
      <button
        type="button"
        id="trap-first"
      >
        First
      </button>
      <button
        type="button"
        id="trap-last"
      >
        Last
      </button>
    </au-dialog>
  `,
})
class TestDialogFocusTrapComponent {}

describe('dialog-focus-trap', () => {
  function panelWith(...html: string[]): HTMLElement {
    const panel = document.createElement('div');
    panel.className = 'au-dialog__panel';
    panel.innerHTML = html.join('');
    document.body.append(panel);
    return panel;
  }

  afterEach(() => {
    document.body.replaceChildren();
  });

  it('lists focusable elements in order', () => {
    const panel = panelWith(
      '<button type="button" id="a">A</button>',
      '<input id="b" />',
      '<button type="button" disabled id="c">C</button>',
    );
    const ids = getDialogFocusableElements(panel).map((el) => el.id);
    expect(ids).toEqual(['a', 'b']);
  });

  it('excludes hidden and aria-hidden elements', () => {
    const panel = panelWith(
      '<button type="button" id="a">A</button>',
      '<button type="button" hidden id="h">H</button>',
      '<button type="button" aria-hidden="true" id="ah">AH</button>',
    );
    expect(getDialogFocusableElements(panel).map((el) => el.id)).toEqual(['a']);
  });

  it('does not trap Tab from a middle focusable', () => {
    const panel = panelWith(
      '<button type="button" id="a">A</button>',
      '<button type="button" id="b">B</button>',
      '<button type="button" id="c">C</button>',
    );
    const b = panel.querySelector('#b') as HTMLButtonElement;
    b.focus();
    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    handleDialogTabKeydown(ev, panel);
    expect(ev.defaultPrevented).toBe(false);
  });

  it('does not trap Shift+Tab from a middle focusable', () => {
    const panel = panelWith(
      '<button type="button" id="a">A</button>',
      '<button type="button" id="b">B</button>',
      '<button type="button" id="c">C</button>',
    );
    const b = panel.querySelector('#b') as HTMLButtonElement;
    b.focus();
    const ev = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    handleDialogTabKeydown(ev, panel);
    expect(ev.defaultPrevented).toBe(false);
  });

  it('wraps Tab from last to first', () => {
    const panel = panelWith(
      '<button type="button" id="a">A</button>',
      '<button type="button" id="b">B</button>',
    );
    const a = panel.querySelector('#a') as HTMLButtonElement;
    const b = panel.querySelector('#b') as HTMLButtonElement;
    b.focus();
    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    handleDialogTabKeydown(ev, panel);
    expect(ev.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(a);
  });

  it('wraps Shift+Tab from first to last', () => {
    const panel = panelWith(
      '<button type="button" id="a">A</button>',
      '<button type="button" id="b">B</button>',
    );
    const a = panel.querySelector('#a') as HTMLButtonElement;
    const b = panel.querySelector('#b') as HTMLButtonElement;
    a.focus();
    const ev = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    handleDialogTabKeydown(ev, panel);
    expect(ev.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(b);
  });

  it('wraps Shift+Tab from outside to last focusable', () => {
    const panel = panelWith(
      '<button type="button" id="a">A</button>',
      '<button type="button" id="b">B</button>',
    );
    const b = panel.querySelector('#b') as HTMLButtonElement;
    const outside = document.createElement('button');
    outside.type = 'button';
    document.body.append(outside);
    outside.focus();
    const ev = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    handleDialogTabKeydown(ev, panel);
    expect(ev.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(b);
  });

  it('pulls focus into the panel when Tab escapes outside', () => {
    const panel = panelWith('<button type="button" id="a">A</button>');
    const outside = document.createElement('button');
    outside.type = 'button';
    document.body.append(outside);
    outside.focus();
    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    handleDialogTabKeydown(ev, panel);
    expect(document.activeElement).toBe(panel.querySelector('#a'));
  });

  it('does nothing when the panel has no focusable elements', () => {
    const panel = panelWith('<p>Text only</p>');
    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    handleDialogTabKeydown(ev, panel);
    expect(ev.defaultPrevented).toBe(false);
  });

  it('ignores non-Tab keys', () => {
    const panel = panelWith('<button type="button">A</button>');
    const ev = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
    handleDialogTabKeydown(ev, panel);
    expect(ev.defaultPrevented).toBe(false);
  });

  it('focusInitialInDialogPanel focuses first control', () => {
    const panel = panelWith(
      '<button type="button" id="a">A</button>',
      '<button type="button" id="b">B</button>',
    );
    focusInitialInDialogPanel(panel);
    expect(document.activeElement?.id).toBe('a');
  });

  it('focusInitialInDialogPanel focuses panel when empty', () => {
    const panel = panelWith('<p>Text only</p>');
    focusInitialInDialogPanel(panel);
    expect(document.activeElement).toBe(panel);
    expect(panel.tabIndex).toBe(-1);
  });

  it('focusInitialInDialogPanel does not override an existing tabindex', () => {
    const panel = panelWith('<p>Text only</p>');
    panel.tabIndex = 0;
    focusInitialInDialogPanel(panel);
    expect(document.activeElement).toBe(panel);
    expect(panel.tabIndex).toBe(0);
  });
});

describe('AuDialogFooter', () => {
  it('is a directive class', () => {
    expect(AuDialogFooter).toBeDefined();
  });
});
