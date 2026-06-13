import { Component, ChangeDetectionStrategy } from '@angular/core';
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

  it('does not render surface when closed',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', false);
    await fix.whenStable();
    expect(querySurface(fix)).toBeNull();
  });

  it('renders message when open',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'Saved');
    await fix.whenStable();
    const message = fix.debugElement.query(By.css('.au-snackbar__message'))!.nativeElement;
    expect(message.textContent?.trim()).toBe('Saved');
  });

  it('defaults variant to default and position to bottom-center',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    await fix.whenStable();
    const host = fix.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-variant')).toBe('default');
    expect(host.getAttribute('data-au-position')).toBe('bottom-center');
  });

  it('does not render an icon for the default variant',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('variant', 'default');
    fix.componentRef.setInput('showIcon', true);
    await fix.whenStable();
    expect(fix.nativeElement.querySelector('.au-snackbar__icon')).toBeNull();
  });

  it('renders a semantic icon when variant is not default',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('variant', 'success');
    await fix.whenStable();
    expect(fix.nativeElement.querySelector('.au-snackbar__icon')).not.toBeNull();
  });

  it('hides icon when showIcon is false',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('variant', 'error');
    fix.componentRef.setInput('showIcon', false);
    await fix.whenStable();
    expect(fix.nativeElement.querySelector('.au-snackbar__icon')).toBeNull();
  });

  it('maps variant to icon names',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('variant', 'info');
    await fix.whenStable();
    expect(fix.componentInstance.variantIcon()).toBe('info');
    fix.componentRef.setInput('variant', 'warning');
    await fix.whenStable();
    expect(fix.componentInstance.variantIcon()).toBe('warning');
    fix.componentRef.setInput('variant', 'error');
    await fix.whenStable();
    expect(fix.componentInstance.variantIcon()).toBe('error');
    fix.componentRef.setInput('variant', 'default');
    await fix.whenStable();
    expect(fix.componentInstance.variantIcon()).toBeNull();
  });

  it('applies variant and position attributes',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('variant', 'error');
    fix.componentRef.setInput('position', 'top-end');
    await fix.whenStable();
    const host = fix.nativeElement as HTMLElement;
    expect(host.getAttribute('data-au-variant')).toBe('error');
    expect(host.getAttribute('data-au-position')).toBe('top-end');
  });

  it('uses role alert and assertive live region for error variant',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('variant', 'error');
    fix.componentRef.setInput('message', 'Failed');
    await fix.whenStable();
    const surface = querySurface(fix)!.nativeElement as HTMLElement;
    expect(surface.getAttribute('role')).toBe('alert');
    expect(surface.getAttribute('aria-live')).toBe('assertive');
  });

  it('uses role status and polite live region for success variant',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('variant', 'success');
    fix.componentRef.setInput('message', 'OK');
    await fix.whenStable();
    const surface = querySurface(fix)!.nativeElement as HTMLElement;
    expect(surface.getAttribute('role')).toBe('status');
    expect(surface.getAttribute('aria-live')).toBe('polite');
  });

  it('uses role alert and assertive live region for warning variant',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('variant', 'warning');
    fix.componentRef.setInput('message', 'Careful');
    await fix.whenStable();
    const surface = querySurface(fix)!.nativeElement as HTMLElement;
    expect(surface.getAttribute('role')).toBe('alert');
    expect(surface.getAttribute('aria-live')).toBe('assertive');
  });

  it('closes via close button and emits dismiss',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    const dismiss = vi.fn();
    fix.componentInstance.dismiss.subscribe(dismiss);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'Hi');
    await fix.whenStable();
    const closeBtn = fix.debugElement.query(By.css('.au-snackbar__close'))!
      .nativeElement as HTMLButtonElement;
    closeBtn.click();
    await fix.whenStable();
    expect(fix.componentInstance.open()).toBe(false);
    expect(dismiss).toHaveBeenCalledTimes(1);
    expect(querySurface(fix)).toBeNull();
  });

  it('omits actions row when there is no action or close control',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'Sin acciones');
    fix.componentRef.setInput('actionLabel', '');
    fix.componentRef.setInput('showCloseButton', false);
    await fix.whenStable();
    expect(fix.nativeElement.querySelector('.au-snackbar__actions')).toBeNull();
  });

  it('hides close button when showCloseButton is false',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'Hi');
    fix.componentRef.setInput('showCloseButton', false);
    await fix.whenStable();
    expect(fix.debugElement.query(By.css('.au-snackbar__close'))).toBeNull();
  });

  it('emits action and closes when action is clicked',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    const action = vi.fn();
    fix.componentInstance.action.subscribe(action);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'Undo?');
    fix.componentRef.setInput('actionLabel', 'Undo');
    await fix.whenStable();
    const actionBtn = fix.debugElement.query(By.css('.au-snackbar__action'))!
      .nativeElement as HTMLButtonElement;
    actionBtn.click();
    await fix.whenStable();
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

  it('stacks newer snackbars on the edge and offsets older ones', async () => {
    const first = TestBed.createComponent(AuSnackbar);
    first.componentRef.setInput('open', true);
    first.componentRef.setInput('message', 'Primero');
    await first.whenStable();

    const second = TestBed.createComponent(AuSnackbar);
    second.componentRef.setInput('open', true);
    second.componentRef.setInput('message', 'Segundo');
    await second.whenStable();

    expect(second.nativeElement.style.getPropertyValue('--au-snackbar-stack-offset')).toBe('0px');
    expect(
      Number.parseFloat(first.nativeElement.style.getPropertyValue('--au-snackbar-stack-offset')),
    ).toBeGreaterThan(0);
    expect(
      Number(second.nativeElement.style.getPropertyValue('--au-snackbar-stack-layer')),
    ).toBeGreaterThan(
      Number(first.nativeElement.style.getPropertyValue('--au-snackbar-stack-layer')),
    );
  });

  it('only the topmost stacked snackbar uses an active live region', async () => {
    const first = TestBed.createComponent(AuSnackbar);
    first.componentRef.setInput('open', true);
    first.componentRef.setInput('variant', 'success');
    first.componentRef.setInput('message', 'First');
    await first.whenStable();

    const second = TestBed.createComponent(AuSnackbar);
    second.componentRef.setInput('open', true);
    second.componentRef.setInput('variant', 'error');
    second.componentRef.setInput('message', 'Second');
    await second.whenStable();

    const firstSurface = querySurface(first)!.nativeElement as HTMLElement;
    const secondSurface = querySurface(second)!.nativeElement as HTMLElement;
    expect(firstSurface.getAttribute('aria-live')).toBe('off');
    expect(secondSurface.getAttribute('aria-live')).toBe('assertive');
  });

  it('Escape dismisses only the topmost snackbar in the stack', async () => {
    const first = TestBed.createComponent(AuSnackbar);
    const firstDismiss = vi.fn();
    first.componentInstance.dismiss.subscribe(firstDismiss);
    first.componentRef.setInput('open', true);
    first.componentRef.setInput('message', 'Primero');
    first.componentRef.setInput('durationMs', 0);
    await first.whenStable();

    const second = TestBed.createComponent(AuSnackbar);
    second.componentRef.setInput('open', true);
    second.componentRef.setInput('message', 'Segundo');
    second.componentRef.setInput('durationMs', 0);
    await second.whenStable();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await second.whenStable();
    await first.whenStable();

    expect(second.componentInstance.open()).toBe(false);
    expect(first.componentInstance.open()).toBe(true);
    expect(firstDismiss).not.toHaveBeenCalled();
  });

  it('closes on Escape via document keydown',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'Hi');
    await fix.whenStable();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fix.whenStable();
    expect(fix.componentInstance.open()).toBe(false);
  });

  it('ignores Escape when closed',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', false);
    await fix.whenStable();
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

  it('attaches host to document.body while open',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'Portaled');
    await fix.whenStable();
    expect(fix.nativeElement.parentElement).toBe(document.body);
    await fix.whenStable();
    expect(fix.nativeElement.parentElement).toBe(document.body);
    fix.componentInstance.close();
    await fix.whenStable();
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
    await fix.whenStable();
    expect(fix.nativeElement.parentElement).toBe(parentBefore);
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({ imports: [AuSnackbar] }).compileComponents();
  });

  it('attachToBody appends host when it has no parent node',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    const host = fix.nativeElement;
    host.remove();
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    expect(host.parentElement).toBe(document.body);
    fix.destroy();
  });

  it('restoreFromBody is noop when anchor is missing', () => {
    const fix = TestBed.createComponent(AuSnackbar);
    const inst = fix.componentInstance as unknown as { restoreFromBody: () => void };
    expect(() => inst.restoreFromBody()).not.toThrow();
  });

  it('restoreFromBody is noop when host was never portaled to body',async  () => {
    const wrapper = document.createElement('div');
    document.body.appendChild(wrapper);
    const fix = TestBed.createComponent(AuSnackbar);
    wrapper.append(fix.nativeElement);
    await fix.whenStable();
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

  it('attachToBody is noop when host is already on document.body',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    expect(fix.nativeElement.parentElement).toBe(document.body);
    const inst = fix.componentInstance as unknown as {
      attachToBody: () => void;
      bodyAnchor: Comment | null;
    };
    const anchor = inst.bodyAnchor;
    inst.attachToBody();
    expect(inst.bodyAnchor).toBe(anchor);
  });

  it('restores host to its anchor parent on destroy',async  () => {
    const wrapper = document.createElement('div');
    document.body.append(wrapper);
    const fix = TestBed.createComponent(AuSnackbar);
    wrapper.append(fix.nativeElement);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    expect(fix.nativeElement.parentElement).toBe(document.body);
    fix.destroy();
    expect(wrapper.contains(fix.nativeElement)).toBe(true);
    wrapper.remove();
  });

  it('reuses the stack id when syncStack runs while already open',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    const inst = fix.componentInstance as unknown as {
      syncStack: () => void;
      stackId: number | null;
    };
    const stackId = inst.stackId;
    inst.syncStack();
    expect(inst.stackId).toBe(stackId);
  });

  it('shows action without close when only actionLabel is set',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'Con acción');
    fix.componentRef.setInput('actionLabel', 'Deshacer');
    fix.componentRef.setInput('showCloseButton', false);
    await fix.whenStable();
    expect(fix.nativeElement.querySelector('.au-snackbar__action')).not.toBeNull();
    expect(fix.nativeElement.querySelector('.au-snackbar__close')).toBeNull();
  });

  it('relayouts stack when ResizeObserver fires',async  () => {
    const callbacks: ResizeObserverCallback[] = [];
    const observe = vi.fn();
    const disconnect = vi.fn();
    const ResizeObserverMock = vi.fn(function (
      this: ResizeObserver,
      callback: ResizeObserverCallback,
    ) {
      callbacks.push(callback);
      return Object.assign(this, { observe, disconnect, unobserve: vi.fn() });
    });
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);

    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'Resize');
    await fix.whenStable();

    const surface = fix.nativeElement.querySelector('.au-snackbar__surface') as HTMLElement;
    expect(observe).toHaveBeenCalledWith(surface);
    const inst = fix.componentInstance as unknown as {
      teardownStack: () => void;
      stackId: number | null;
    };
    const entry = { target: surface } as unknown as ResizeObserverEntry;
    const observer = {} as ResizeObserver;
    callbacks[0]?.([entry], observer);
    inst.teardownStack();
    callbacks[0]?.([entry], observer);
    expect(inst.stackId).toBeNull();

    vi.unstubAllGlobals();
  });

  it('observeStackResize is noop without surface or stack id',async  () => {
    const fix = TestBed.createComponent(AuSnackbar);
    await fix.whenStable();
    const inst = fix.componentInstance as unknown as {
      observeStackResize: (surface: HTMLElement | null) => void;
      stackId: number | null;
    };
    inst.stackId = null;
    expect(() => inst.observeStackResize(null)).not.toThrow();

    const surface = document.createElement('div');
    expect(() => inst.observeStackResize(surface)).not.toThrow();
  });

  it('observeStackResize returns early after the stack entry is torn down',async  () => {
    const ResizeObserverMock = vi.fn(function (this: ResizeObserver) {
      return Object.assign(this, { observe: vi.fn(), disconnect: vi.fn(), unobserve: vi.fn() });
    });
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);

    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    const inst = fix.componentInstance as unknown as {
      observeStackResize: (surface: HTMLElement | null) => void;
      teardownStack: () => void;
      stackId: number | null;
    };
    const surface = fix.nativeElement.querySelector('.au-snackbar__surface') as HTMLElement;
    expect(inst.stackId).not.toBeNull();
    inst.teardownStack();
    expect(inst.stackId).toBeNull();
    inst.observeStackResize(surface);
    expect(ResizeObserverMock).toHaveBeenCalledTimes(1);

    vi.unstubAllGlobals();
  });

  it('observeStackResize disconnects a prior observer before attaching',async  () => {
    const disconnect = vi.fn();
    const observe = vi.fn();
    const ResizeObserverMock = vi.fn(function (this: ResizeObserver) {
      return Object.assign(this, { observe, disconnect, unobserve: vi.fn() });
    });
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);

    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    const inst = fix.componentInstance as unknown as {
      observeStackResize: (surface: HTMLElement | null) => void;
    };
    const surface = fix.nativeElement.querySelector('.au-snackbar__surface') as HTMLElement;
    inst.observeStackResize(surface);
    expect(disconnect).toHaveBeenCalled();

    vi.unstubAllGlobals();
  });

  it('skips ResizeObserver when it is not available',async  () => {
    vi.stubGlobal('ResizeObserver', undefined);
    const fix = TestBed.createComponent(AuSnackbar);
    fix.componentRef.setInput('open', true);
    fix.componentRef.setInput('message', 'No RO');
    expect(async () => await fix.whenStable()).not.toThrow();
    vi.unstubAllGlobals();
  });

  it('syncStack is noop outside the browser platform', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [AuSnackbar],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();
    const fix = TestBed.createComponent(AuSnackbar);
    const inst = fix.componentInstance as unknown as {
      syncStack: () => void;
      stackId: number | null;
    };
    fix.componentRef.setInput('open', true);
    await fix.whenStable();
    expect(inst.stackId).toBeNull();
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({ imports: [AuSnackbar] }).compileComponents();
  });

  it('projects slot content when message is empty',async  () => {
    const fix = TestBed.createComponent(SnackbarSlotHost);
    await fix.whenStable();
    const custom = fix.debugElement.query(By.css('.snackbar-slot-custom'))!;
    expect(custom.nativeElement.textContent?.trim()).toBe('Custom body');
  });
});

@Component({
  imports: [AuSnackbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-snackbar
      [open]="true"
      message=""
    >
      <span class="snackbar-slot-custom">Custom body</span>
    </au-snackbar>
  `,
})
class SnackbarSlotHost {}
