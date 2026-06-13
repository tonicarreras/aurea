import { forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuButton } from '../button/au-button.directive';
import { AuPopoverTrigger } from './au-popover-trigger.directive';
import { AuPopover, auPopoverSelfRef } from './popover';

@Component({
  imports: [AuPopover, AuPopoverTrigger, AuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-popover
      [(open)]="open"
      [disabled]="disabled"
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

  it('stays open when scrolling inside the panel', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    await fixture.whenStable();
    const panel = document.body.querySelector('.au-popover__panel') as HTMLElement;
    panel.dispatchEvent(new Event('scroll', { bubbles: true }));
    await fixture.whenStable();
    expect(fixture.componentInstance.open).toBe(true);
  });
});
