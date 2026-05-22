import { Component } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { resetSnackbarStackForTests } from './snackbar-stack';
import { AuSnackbar } from './snackbar';

describe('AuSnackbar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuSnackbar],
    }).compileComponents();
  });

  afterEach(() => {
    resetSnackbarStackForTests();
  });

  function querySurface(fixture: ComponentFixture<AuSnackbar>) {
    return fixture.debugElement.query(By.css('.au-snackbar__surface'));
  }

  it('does not render surface when closed', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', false);
    fix.detectChanges();
    expect(querySurface(fix)).toBeNull();
  });

  it('renders message when open', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'Saved');
    fix.detectChanges();
    const message = fix.debugElement.query(By.css('.au-snackbar__message'))!.nativeElement;
    expect(message.textContent?.trim()).toBe('Saved');
  });

  it('defaults variant to default and position to bottom-center', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.detectChanges();
    const host = fix.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-variant')).toBe('default');
    expect(host.getAttribute('data-au-position')).toBe('bottom-center');
  });

  it('does not render an icon for the default variant', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('variant', 'default');
    fix.componentRef.setInput('showIcon', true);
    fix.detectChanges();
    expect(fix.nativeElement.querySelector('.au-snackbar__icon')).toBeNull();
  });

  it('renders a semantic icon when variant is not default', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('variant', 'success');
    fix.detectChanges();
    expect(fix.nativeElement.querySelector('.au-snackbar__icon')).not.toBeNull();
  });

  it('hides icon when showIcon is false', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('variant', 'error');
    fix.componentRef.setInput('showIcon', false);
    fix.detectChanges();
    expect(fix.nativeElement.querySelector('.au-snackbar__icon')).toBeNull();
  });

  it('maps variant to icon names', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('variant', 'info');
    fix.detectChanges();
    expect(fix.componentInstance.variantIcon()).toBe('info');
    fix.componentRef.setInput('variant', 'warning');
    fix.detectChanges();
    expect(fix.componentInstance.variantIcon()).toBe('warning');
  });

  it('applies variant and position attributes', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('variant', 'error');
    fix.componentRef.setInput('position', 'top-end');
    fix.detectChanges();
    const host = fix.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-variant')).toBe('error');
    expect(host.getAttribute('data-au-position')).toBe('top-end');
  });

  it('uses role alert and assertive live region for error variant', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('variant', 'error');
    fix.componentRef.setInput('message', 'Failed');
    fix.detectChanges();
    const surface = querySurface(fix)!.nativeElement as HTMLElement;
    expect(surface.getAttribute('role')).toBe('alert');
    expect(surface.getAttribute('aria-live')).toBe('assertive');
  });

  it('uses role status and polite live region for success variant', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('variant', 'success');
    fix.componentRef.setInput('message', 'OK');
    fix.detectChanges();
    const surface = querySurface(fix)!.nativeElement as HTMLElement;
    expect(surface.getAttribute('role')).toBe('status');
    expect(surface.getAttribute('aria-live')).toBe('polite');
  });

  it('uses role alert and assertive live region for warning variant', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('variant', 'warning');
    fix.componentRef.setInput('message', 'Careful');
    fix.detectChanges();
    const surface = querySurface(fix)!.nativeElement as HTMLElement;
    expect(surface.getAttribute('role')).toBe('alert');
    expect(surface.getAttribute('aria-live')).toBe('assertive');
  });

  it('closes via close button and emits dismiss', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    const dismiss = vi.fn();
    fix.componentInstance.dismiss.subscribe(dismiss);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'Hi');
    fix.detectChanges();
    const closeBtn = fix.debugElement.query(By.css('.au-snackbar__close'))!.nativeElement as HTMLButtonElement;
    closeBtn.click();
    fix.detectChanges();
    expect(fix.componentInstance.open()).toBe(false);
    expect(dismiss).toHaveBeenCalledTimes(1);
    expect(querySurface(fix)).toBeNull();
  });

  it('hides close button when showCloseButton is false', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'Hi');
    fix.componentRef.setInput('showCloseButton', false);
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-snackbar__close'))).toBeNull();
  });

  it('emits action and closes when action is clicked', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    const action = vi.fn();
    fix.componentInstance.action.subscribe(action);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'Undo?');
    fix.componentRef.setInput('actionLabel', 'Undo');
    fix.detectChanges();
    const actionBtn = fix.debugElement.query(By.css('.au-snackbar__action'))!.nativeElement as HTMLButtonElement;
    actionBtn.click();
    fix.detectChanges();
    expect(action).toHaveBeenCalledTimes(1);
    expect(fix.componentInstance.open()).toBe(false);
  });

  it('auto-dismisses after durationMs', async () => {
    vi.useFakeTimers();
    const fix = TestBed.createComponent(AuSnackbar);
    const dismiss = vi.fn();
    fix.componentInstance.dismiss.subscribe(dismiss);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'Bye');
    fix.componentRef.setInput('durationMs', 2000);
    fix.detectChanges();
    await fix.whenStable();
    await vi.advanceTimersByTimeAsync(2000);
    fix.detectChanges();
    expect(fix.componentInstance.open()).toBe(false);
    expect(dismiss).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('does not auto-dismiss when durationMs is 0', async () => {
    vi.useFakeTimers();
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'Stay');
    fix.componentRef.setInput('durationMs', 0);
    fix.detectChanges();
    await fix.whenStable();
    await vi.advanceTimersByTimeAsync(10000);
    fix.detectChanges();
    expect(fix.componentInstance.open()).toBe(true);
    expect(querySurface(fix)).not.toBeNull();
    vi.useRealTimers();
  });

  it('stacks newer snackbars on the edge and offsets older ones', () => {
    const first = TestBed.createComponent(AuSnackbar);
    first.componentRef.setInput('open', true);
    first.componentRef.setInput('message', 'Primero');
    first.detectChanges();

    const second = TestBed.createComponent(AuSnackbar);
    second.componentRef.setInput('open', true);
    second.componentRef.setInput('message', 'Segundo');
    second.detectChanges();

    expect(second.nativeElement.style.getPropertyValue('--au-snackbar-stack-offset')).toBe('0px');
    expect(Number.parseFloat(first.nativeElement.style.getPropertyValue('--au-snackbar-stack-offset'))).toBeGreaterThan(
      0,
    );
    expect(Number(second.nativeElement.style.getPropertyValue('--au-snackbar-stack-layer'))).toBeGreaterThan(
      Number(first.nativeElement.style.getPropertyValue('--au-snackbar-stack-layer')),
    );
  });

  it('Escape dismisses only the topmost snackbar in the stack', () => {
    const first = TestBed.createComponent(AuSnackbar);
    const firstDismiss = vi.fn();
    first.componentInstance.dismiss.subscribe(firstDismiss);
    first.componentRef.setInput('open', true);
    first.componentRef.setInput('message', 'Primero');
    first.componentRef.setInput('durationMs', 0);
    first.detectChanges();

    const second = TestBed.createComponent(AuSnackbar);
    second.componentRef.setInput('open', true);
    second.componentRef.setInput('message', 'Segundo');
    second.componentRef.setInput('durationMs', 0);
    second.detectChanges();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    second.detectChanges();
    first.detectChanges();

    expect(second.componentInstance.open()).toBe(false);
    expect(first.componentInstance.open()).toBe(true);
    expect(firstDismiss).not.toHaveBeenCalled();
  });

  it('closes on Escape via document keydown', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'Hi');
    fix.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fix.detectChanges();
    expect(fix.componentInstance.open()).toBe(false);
  });

  it('ignores Escape when closed', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', false);
    fix.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(fix.componentInstance.open()).toBe(false);
  });

  it('close is idempotent when already closed', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    const dismiss = vi.fn();
    fix.componentInstance.dismiss.subscribe(dismiss);
    fix.componentInstance.close();
    expect(dismiss).not.toHaveBeenCalled();
  });

  it('attaches host to document.body while open', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'Portaled');
    fix.detectChanges();
    expect(fix.nativeElement.parentElement).toBe(document.body);
    fix.detectChanges();
    expect(fix.nativeElement.parentElement).toBe(document.body);
    fix.componentInstance.close();
    fix.detectChanges();
  });

  it('does not portal to body outside the browser platform', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [AuSnackbar],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();
    const fix = TestBed.createComponent(AuSnackbar);
    const parentBefore = fix.nativeElement.parentElement;
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'SSR');
    fix.detectChanges();
    expect(fix.nativeElement.parentElement).toBe(parentBefore);
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({ imports: [AuSnackbar] }).compileComponents();
  });

  it('attachToBody appends host when it has no parent node', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    const host = fix.nativeElement;
    host.remove();
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    expect(host.parentElement).toBe(document.body);
    fix.destroy();
  });

  it('restoreFromBody is noop when anchor is missing', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    const inst = fix.componentInstance as unknown as { restoreFromBody: () => void };
    expect(() => inst.restoreFromBody()).not.toThrow();
  });

  it('restoreFromBody is noop when host was never portaled to body', () => {
    const wrapper = document.createElement('div');
    document.body.appendChild(wrapper);
    const fix = TestBed.createComponent(AuSnackbar);
    wrapper.append(fix.nativeElement);
    fix.detectChanges();
    const inst = fix.componentInstance as unknown as {
      restoreFromBody: () => void;
      bodyAnchor: Comment | null;
    };
    const anchor = document.createComment('au-snackbar-anchor');
    wrapper.insertBefore(anchor, fix.nativeElement);
    inst.bodyAnchor = anchor;
    expect(fix.nativeElement.parentElement).toBe(wrapper);
    inst.restoreFromBody();
    expect(fix.nativeElement.parentElement).toBe(wrapper);
    expect(wrapper.contains(anchor)).toBe(true);
    wrapper.remove();
  });

  it('attachToBody is noop when host is already on document.body', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    expect(fix.nativeElement.parentElement).toBe(document.body);
    const inst = fix.componentInstance as unknown as {
      attachToBody: () => void;
      bodyAnchor: Comment | null;
    };
    const anchor = inst.bodyAnchor;
    inst.attachToBody();
    expect(inst.bodyAnchor).toBe(anchor);
  });

  it('restores host to its anchor parent on destroy', () => {
    const wrapper = document.createElement('div');
    document.body.append(wrapper);
    const fix = TestBed.createComponent(AuSnackbar);
    wrapper.append(fix.nativeElement);
    fix.componentRef.setInput('open', true);
    fix.detectChanges();
    expect(fix.nativeElement.parentElement).toBe(document.body);
    fix.destroy();
    expect(wrapper.contains(fix.nativeElement)).toBe(true);
    wrapper.remove();
  });

  it('projects slot content when message is empty', () => {
    const fix = TestBed.createComponent(SnackbarSlotHost);
    fix.detectChanges();
    const custom = fix.debugElement.query(By.css('.snackbar-slot-custom'))!;
    expect(custom.nativeElement.textContent?.trim()).toBe('Custom body');
  });
});

@Component({
  imports: [AuSnackbar],
  template: `
    <au-snackbar [open]="true" message="">
      <span class="snackbar-slot-custom">Custom body</span>
    </au-snackbar>
  `,
})
class SnackbarSlotHost {}
