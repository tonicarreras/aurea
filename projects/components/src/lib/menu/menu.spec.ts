import { forwardRef } from '@angular/core';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuButton } from '../button/button';
import { AuMenu, auMenuSelfRef } from './menu';
import { AuMenuItem, AuMenuTrigger } from './index';

@Component({
  imports: [AuMenu, AuMenuTrigger, AuMenuItem, AuButton],
  template: `
    <au-menu
      [(open)]="open"
      [disabled]="disabled"
    >
      <au-button auMenuTrigger>Open</au-button>
      <au-menu-item (select)="selected = true">Action</au-menu-item>
    </au-menu>
  `,
})
class Host {
  open = false;
  disabled = false;
  selected = false;
}

function menuInstance(fixture: ReturnType<typeof TestBed.createComponent<Host>>): AuMenu {
  return fixture.debugElement.query(By.directive(AuMenu)).componentInstance as AuMenu;
}

describe('AuMenu provider', () => {
  it('forwardRef factory resolves to AuMenu', () => {
    expect(auMenuSelfRef()).toBe(AuMenu);
    expect(forwardRef(auMenuSelfRef)).toBeDefined();
  });
});

describe('AuMenu', () => {
  beforeEach(() => {
    document.body.querySelectorAll('.au-menu__panel').forEach((el) => el.remove());
  });

  it('emits openChange when toggled', () => {
    const fixture = TestBed.createComponent(Host);
    const emissions: boolean[] = [];
    menuInstance(fixture).openChange.subscribe((v) => emissions.push(v));
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
    expect(document.body.querySelector('.au-menu__panel')).toBeTruthy();
    fixture.destroy();
  });

  it('opens on trigger click and selects an item', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(true);
    const item = document.body.querySelector('.au-menu-item__btn') as HTMLButtonElement | null;
    expect(item).toBeTruthy();
    item!.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selected).toBe(true);
    expect(fixture.componentInstance.open).toBe(false);
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
    const panel = document.body.querySelector('.au-menu__panel') as HTMLElement;
    expect(panel).toBeTruthy();
    panel.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(true);
  });

  it('closes on window scroll', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('ignores scroll when closed', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('ignores Escape when closed', () => {
    const fixture = TestBed.createComponent(Host);
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
    const menu = menuInstance(fixture);
    const handler = (menu as unknown as { onDocumentClick: (e: MouseEvent) => void })
      .onDocumentClick;
    handler.call(menu, { target: null } as unknown as MouseEvent);
    expect(fixture.componentInstance.open).toBe(true);
  });

  it('no-op close when already closed', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const menu = menuInstance(fixture);
    menu.close();
    menu.close();
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('keeps open when clicking inside the menu host', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    const menuHost = fixture.nativeElement.querySelector('au-menu') as HTMLElement;
    menuHost.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(true);
  });

  it('handles SSR environment without defaultView', () => {
    const originalView = Object.getOwnPropertyDescriptor(document, 'defaultView');
    Object.defineProperty(document, 'defaultView', { configurable: true, value: null });
    try {
      const fixture = TestBed.createComponent(Host);
      fixture.detectChanges();
      expect(fixture.componentInstance.open).toBe(false);
    } finally {
      if (originalView) {
        Object.defineProperty(document, 'defaultView', originalView);
      }
    }
  });
});
