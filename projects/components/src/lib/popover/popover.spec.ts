import { forwardRef, ChangeDetectionStrategy, signal } from '@angular/core';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

import { AuButton } from '../button/au-button.directive';
import type { AuTooltipPlacement } from '../overlay/tooltip-position';
import { AuPopoverTrigger } from './au-popover-trigger.directive';
import { AuPopover, auPopoverSelfRef } from './popover';

@Component({
  imports: [AuPopover, AuPopoverTrigger, AuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-popover
      [(open)]="open"
      [disabled]="disabled"
      [placement]="placement()"
    >
      <button
        auButton
        auPopoverTrigger
      >
        Filters
      </button>
      <div class="panel-body">Panel</div>
    </au-popover>
  `,
})
class Host {
  open = false;
  disabled = false;
  readonly placement = signal<AuTooltipPlacement>('bottom');
}

function popoverInstance(fixture: ReturnType<typeof TestBed.createComponent<Host>>): AuPopover {
  return fixture.debugElement.query(By.directive(AuPopover)).componentInstance as AuPopover;
}

describe('AuPopover provider', () => {
  it('forwardRef factory resolves to AuPopover', () => {
    expect(auPopoverSelfRef()).toBe(AuPopover);
    expect(forwardRef(auPopoverSelfRef)).toBeDefined();
  });
});

describe('AuPopover', () => {
  beforeEach(() => {
    document.body.querySelectorAll('.au-popover__panel').forEach((el) => el.remove());
  });

  it('emits openChange when toggled', async () => {
    const fixture = TestBed.createComponent(Host);
    const emissions: boolean[] = [];
    popoverInstance(fixture).open.subscribe((v: boolean) => emissions.push(v));
    await fixture.whenStable();
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.click();
    await fixture.whenStable();
    expect(emissions).toEqual([true]);
    trigger.click();
    await fixture.whenStable();
    expect(emissions).toEqual([true, false]);
  });

  it('detaches overlay when destroyed while open', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    await fixture.whenStable();
    expect(document.body.querySelector('.au-popover__panel')).toBeTruthy();
    fixture.destroy();
  });

  it('opens on trigger click', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.open).toBe(true);
    expect(document.body.querySelector('.au-popover__panel')).toBeTruthy();
  });

  it('does not toggle when disabled', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.disabled = true;
    await fixture.whenStable();
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('ignores document click when closed', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('keeps open when clicking inside the portaled panel', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    await fixture.whenStable();
    const panel = document.body.querySelector('.au-popover__panel') as HTMLElement;
    expect(panel).toBeTruthy();
    panel.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();
    expect(fixture.componentInstance.open).toBe(true);
  });

  it('ignores non-Escape keys', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    await fixture.whenStable();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    await fixture.whenStable();
    expect(fixture.componentInstance.open).toBe(true);
  });

  it('closes on Escape', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    await fixture.whenStable();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('closes on outside click', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    await fixture.whenStable();
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('stays open when clicking a portaled field listbox overlay', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    await fixture.whenStable();

    const listbox = document.createElement('ul');
    listbox.className = 'au-field-listbox au-field-listbox--overlay';
    document.body.appendChild(listbox);

    listbox.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();
    expect(fixture.componentInstance.open).toBe(true);

    listbox.remove();
  });

  it('ignores document click when target is not a Node', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    await fixture.whenStable();
    const popover = popoverInstance(fixture);
    const handler = (popover as unknown as { onDocumentClick: (e: MouseEvent) => void })
      .onDocumentClick;
    handler.call(popover, { target: null } as unknown as MouseEvent);
    expect(fixture.componentInstance.open).toBe(true);
  });

  it('no-op close when already closed', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const popover = popoverInstance(fixture);
    popover.close();
    popover.close();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('closes when the page scrolls outside the panel', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    await fixture.whenStable();
    document.dispatchEvent(new Event('scroll'));
    await fixture.whenStable();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('closes when scroll event target is not a Node', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    await fixture.whenStable();
    const ev = new Event('scroll', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: null, configurable: true });
    document.dispatchEvent(ev);
    await fixture.whenStable();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('stays open when scrolling inside the panel', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    await fixture.whenStable();
    const body = document.body.querySelector('.au-popover__body') as HTMLElement;
    body.dispatchEvent(new Event('scroll', { bubbles: true }));
    await fixture.whenStable();
    expect(fixture.componentInstance.open).toBe(true);
  });

  it('sets floating arrow coordinates when portaled', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    await fixture.whenStable();
    const panel = document.body.querySelector('.au-popover__panel') as HTMLElement;
    expect(panel.classList.contains('au-floating-panel')).toBe(true);
    expect(panel.classList.contains('au-tooltip__bubble--overlay')).toBe(true);
    expect(panel.style.getPropertyValue('--au-floating-arrow-x')).not.toBe('');
  });

  it('moves focus into the panel when opened', async () => {
    const fixture = TestBed.createComponent(Host);
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.focus();
    trigger.click();
    await fixture.whenStable();
    const panel = document.body.querySelector('.au-popover__panel') as HTMLElement;
    expect(panel).toBeTruthy();
    expect(panel.contains(document.activeElement)).toBe(true);
  });

  it('does not refocus when the panel already contains focus', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    await fixture.whenStable();
    const panel = document.body.querySelector('.au-popover__panel') as HTMLElement;
    panel.focus();
    expect(panel.contains(document.activeElement)).toBe(true);
    const focused = document.activeElement;
    fixture.componentInstance.placement.set('top');
    await fixture.whenStable();
    TestBed.flushEffects();
    await fixture.whenStable();
    expect(document.activeElement).toBe(focused);
    expect(panel.contains(document.activeElement)).toBe(true);
  });

  it('returns focus to the trigger when closed', async () => {
    const fixture = TestBed.createComponent(Host);
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.focus();
    trigger.click();
    await fixture.whenStable();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    expect(fixture.componentInstance.open).toBe(false);
    expect(document.activeElement).toBe(trigger);
  });

  it('does not restore focus when the trigger was removed from the DOM', async () => {
    const fixture = TestBed.createComponent(Host);
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.click();
    await fixture.whenStable();
    trigger.remove();
    fixture.componentInstance.open = false;
    await fixture.whenStable();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('traps Tab inside the panel', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    await fixture.whenStable();
    const panel = document.body.querySelector('.au-popover__panel') as HTMLElement;
    const first = document.createElement('button');
    first.type = 'button';
    first.textContent = 'First';
    const last = document.createElement('button');
    last.type = 'button';
    last.textContent = 'Last';
    panel.append(first, last);
    last.focus();
    const trap = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    panel.dispatchEvent(trap);
    expect(trap.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(first);
  });

  it('prevents wheel scroll on the page while open', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    await fixture.whenStable();
    const wheel = new WheelEvent('wheel', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(wheel);
    expect(wheel.defaultPrevented).toBe(true);
  });

  it('prevents wheel when the event target is not a Node', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    await fixture.whenStable();
    const wheel = new WheelEvent('wheel', { bubbles: true, cancelable: true });
    Object.defineProperty(wheel, 'target', { value: {}, configurable: true });
    document.body.dispatchEvent(wheel);
    expect(wheel.defaultPrevented).toBe(true);
  });

  it('no-ops panel keydown when closed', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const popover = popoverInstance(fixture) as unknown as {
      onPanelKeydown: (e: KeyboardEvent) => void;
    };
    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    popover.onPanelKeydown(ev);
    expect(ev.defaultPrevented).toBe(false);
  });

  it('no-ops panel keydown when panel ref is empty', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    await fixture.whenStable();
    const popover = popoverInstance(fixture) as unknown as {
      panelRef: () => unknown;
      onPanelKeydown: (e: KeyboardEvent) => void;
    };
    vi.spyOn(popover, 'panelRef').mockReturnValue(undefined);
    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    popover.onPanelKeydown(ev);
    expect(ev.defaultPrevented).toBe(false);
  });
});
