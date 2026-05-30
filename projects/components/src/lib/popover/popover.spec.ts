import { forwardRef } from '@angular/core';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuButton } from '../button/button';
import { AuPopoverTrigger } from './au-popover-trigger.directive';
import { AuPopover, auPopoverSelfRef } from './popover';

@Component({
  imports: [AuPopover, AuPopoverTrigger, AuButton],
  template: `
    <au-popover
      [(open)]="open"
      [disabled]="disabled"
    >
      <au-button auPopoverTrigger>Filters</au-button>
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

  it('emits openChange when toggled', () => {
    const fixture = TestBed.createComponent(Host);
    const emissions: boolean[] = [];
    popoverInstance(fixture).openChange.subscribe((v) => emissions.push(v));
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    expect(emissions).toEqual([true]);
    trigger.click();
    fixture.detectChanges();
    expect(emissions).toEqual([true, false]);
  });

  it('detaches overlay when destroyed while open', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    expect(document.body.querySelector('.au-popover__panel')).toBeTruthy();
    fixture.destroy();
  });

  it('opens on trigger click', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(true);
    expect(document.body.querySelector('.au-popover__panel')).toBeTruthy();
  });

  it('does not toggle when disabled', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('ignores document click when closed', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('keeps open when clicking inside the portaled panel', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    const panel = document.body.querySelector('.au-popover__panel') as HTMLElement;
    expect(panel).toBeTruthy();
    panel.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(true);
  });

  it('ignores non-Escape keys', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(true);
  });

  it('closes on Escape', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('closes on outside click', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('ignores document click when target is not a Node', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    const popover = popoverInstance(fixture);
    const handler = (popover as unknown as { onDocumentClick: (e: MouseEvent) => void })
      .onDocumentClick;
    handler.call(popover, { target: null } as unknown as MouseEvent);
    expect(fixture.componentInstance.open).toBe(true);
  });

  it('no-op close when already closed', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const popover = popoverInstance(fixture);
    popover.close();
    popover.close();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('closes when the page scrolls outside the panel', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    document.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('stays open when scrolling inside the panel', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    const panel = document.body.querySelector('.au-popover__panel') as HTMLElement;
    panel.dispatchEvent(new Event('scroll', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(true);
  });
});
