import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Dialog } from './dialog';

describe('Dialog', () => {
  function queryNativeDialog(fixture: ComponentFixture<Dialog>): HTMLDialogElement {
    return fixture.debugElement.query(By.css('.au-dialog__native'))!.nativeElement as HTMLDialogElement;
  }

  function isDialogOpen(dialog: HTMLDialogElement): boolean {
    if (typeof dialog.close === 'function') {
      return dialog.open;
    }
    return dialog.hasAttribute('open');
  }

  function clickOutsidePanel(fixture: ComponentFixture<Dialog>): void {
    const dialog = queryNativeDialog(fixture);
    const ev = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: dialog, configurable: true });
    fixture.componentInstance.onDialogClick(ev);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dialog],
    }).compileComponents();
  });

  it('keeps native dialog closed when open is false', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', false);
    fix.detectChanges();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(false);
  });

  it('opens native dialog when open is true', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    expect(isDialogOpen(queryNativeDialog(fix))).toBe(true);
  });

  it('renders with md size by default', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    const host = fix.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-size')).toBe('md');
  });

  it('applies size attribute to host', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('size', 'sm');
    fix.detectChanges();
    expect(fix.nativeElement.getAttribute('data-au-size')).toBe('sm');
  });

  it('applies lg size', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('size', 'lg');
    fix.detectChanges();
    expect(fix.nativeElement.getAttribute('data-au-size')).toBe('lg');
  });

  it('applies full size', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('size', 'full');
    fix.detectChanges();
    expect(fix.nativeElement.getAttribute('data-au-size')).toBe('full');
  });

  it('renders title when provided', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('title', 'Confirm Action');
    fix.detectChanges();
    const titleEl = fix.debugElement.query(By.css('.au-dialog__title'));
    expect(titleEl?.nativeElement.textContent).toBe('Confirm Action');
  });

  it('renders close button by default', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    const closeBtn = fix.debugElement.query(By.css('.au-dialog__close'));
    expect(closeBtn).toBeTruthy();
  });

  it('hides close button when showCloseButton is false', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('showCloseButton', false);
    fix.detectChanges();
    const closeBtn = fix.debugElement.query(By.css('.au-dialog__close'));
    expect(closeBtn).toBeNull();
  });

  it('hides header when no title and showCloseButton is false', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('title', '');
    fix.componentRef.setInput('showCloseButton', false);
    fix.detectChanges();
    const header = fix.debugElement.query(By.css('.au-dialog__header'));
    expect(header).toBeNull();
  });

  it('emits close on backdrop click when closeOnBackdrop is true', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    let emitted = false;
    fix.componentInstance.close.subscribe(() => (emitted = true));
    clickOutsidePanel(fix);
    fix.detectChanges();
    expect(emitted).toBe(true);
  });

  it('does not emit close on backdrop click when closeOnBackdrop is false', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('closeOnBackdrop', false);
    fix.detectChanges();
    let emitted = false;
    fix.componentInstance.close.subscribe(() => (emitted = true));
    clickOutsidePanel(fix);
    expect(emitted).toBe(false);
  });

  it('emits close on close button click', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    let emitted = false;
    fix.componentInstance.close.subscribe(() => (emitted = true));
    const closeBtn = fix.debugElement.query(By.css('.au-dialog__close'))!;
    closeBtn.triggerEventHandler('click', new MouseEvent('click'));
    expect(emitted).toBe(true);
  });

  it('emits close on Escape via cancel when closeOnEscape is true', () => {
    const fix = TestBed.createComponent(Dialog);
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
    const fix = TestBed.createComponent(Dialog);
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
    const fix = TestBed.createComponent(Dialog);
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

  it('skips open sync when open signal is unchanged', () => {
    const fix = TestBed.createComponent(Dialog);
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
    const fix = TestBed.createComponent(Dialog);
    fix.detectChanges();
    expect(queryNativeDialog(fix).tagName).toBe('DIALOG');
  });

  it('has aria-labelledby matching title id when title is provided', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('title', 'Test Title');
    fix.detectChanges();
    const dialog = fix.debugElement.query(By.css('.au-dialog__native'))!.nativeElement;
    const titleEl = fix.debugElement.query(By.css('.au-dialog__title'))!.nativeElement;
    expect(dialog.getAttribute('aria-labelledby')).toBe(titleEl.id);
    expect(titleEl.id.length).toBeGreaterThan(0);
  });

  it('does not have aria-labelledby when title is empty', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('title', '');
    fix.detectChanges();
    const dialog = fix.debugElement.query(By.css('.au-dialog__native'))!;
    expect(dialog.nativeElement.getAttribute('aria-labelledby')).toBeNull();
  });

  it('open input defaults to false', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.detectChanges();
    expect(fix.componentInstance.open()).toBe(false);
  });

  it('size input defaults to md', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.detectChanges();
    expect(fix.componentInstance.size()).toBe('md');
  });

  it('title input defaults to empty string', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.detectChanges();
    expect(fix.componentInstance.title()).toBe('');
  });

  it('showCloseButton input defaults to true', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.detectChanges();
    expect(fix.componentInstance.showCloseButton()).toBe(true);
  });

  it('closeOnBackdrop input defaults to true', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.detectChanges();
    expect(fix.componentInstance.closeOnBackdrop()).toBe(true);
  });

  it('closeOnEscape input defaults to true', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.detectChanges();
    expect(fix.componentInstance.closeOnEscape()).toBe(true);
  });

  it('uses native showModal/close when present on the element', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.detectChanges();
    const el = fix.debugElement.query(By.css('.au-dialog__native'))!.nativeElement as HTMLDialogElement;
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
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    const el = fix.debugElement.query(By.css('.au-dialog__native'))!.nativeElement as HTMLDialogElement;
    try {
      Object.defineProperty(el, 'close', { value: undefined, configurable: true });
      fix.componentRef.setInput('open', false);
      fix.detectChanges();
      expect(el.hasAttribute('open')).toBe(false);
    } finally {
      delete (el as unknown as { close?: unknown }).close;
    }
  });

  it('uses id input for title heading id', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('id', 'dlg-1');
    fix.componentRef.setInput('title', 'T');
    fix.detectChanges();
    expect(fix.componentInstance.titleHeadingId()).toBe('dlg-1-title');
    const h2 = fix.debugElement.query(By.css('.au-dialog__title'))!.nativeElement;
    expect(h2.id).toBe('dlg-1-title');
  });

  it('sets aria-label when title is empty and ariaLabel is set', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('title', '');
    fix.componentRef.setInput('ariaLabel', 'Photo preview');
    fix.detectChanges();
    const dialog = fix.debugElement.query(By.css('.au-dialog__native'))!.nativeElement;
    expect(dialog.getAttribute('aria-label')).toBe('Photo preview');
  });

  it('title change alone does not rerun dialog open sync', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.detectChanges();
    const el = fix.debugElement.query(By.css('.au-dialog__native'))!.nativeElement as HTMLDialogElement;
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
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', false);
    fix.detectChanges();
    const el = fix.debugElement.query(By.css('.au-dialog__native'))!.nativeElement as HTMLDialogElement;
    Object.defineProperty(el, 'close', { value: undefined, configurable: true });
    fix.componentInstance.onCloseButtonClick();
    delete (el as unknown as { close?: unknown }).close;
  });

  it('does not close on cancel when dialog is not displayed', () => {
    const fix = TestBed.createComponent(Dialog);
    fix.componentRef.setInput('open', false);
    fix.detectChanges();
    let n = 0;
    fix.componentInstance.close.subscribe(() => n++);
    const dialogDe = fix.debugElement.query(By.css('.au-dialog__native'))!;
    dialogDe.triggerEventHandler('cancel', new Event('cancel', { cancelable: true }));
    expect(n).toBe(0);
  });
});

@Component({
  selector: 'test-dialog',
  standalone: true,
  imports: [Dialog],
  template: `
    <au-dialog [open]="true">
      <span class="test-dialog-content">Dialog body content</span>
    </au-dialog>
  `,
})
class TestDialogComponent {}

@Component({
  selector: 'test-dialog-footer',
  standalone: true,
  imports: [Dialog],
  template: `
    <au-dialog [open]="true">
      <p>Dialog body</p>
      <button auDialogFooter>Footer action</button>
    </au-dialog>
  `,
})
class TestDialogWithFooterComponent {}