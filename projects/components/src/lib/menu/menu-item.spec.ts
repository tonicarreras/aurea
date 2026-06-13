import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuButton } from '../button/au-button.directive';
import { AU_MENU } from './au-menu.token';
import { AuMenu } from './menu';
import { AuMenuItem } from './menu-item';
import { AuMenuTrigger } from './au-menu-trigger.directive';

@Component({
  imports: [AuMenu, AuMenuTrigger, AuMenuItem, AuButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-menu [(open)]="open">
      <button auButton auMenuTrigger>Open</button>
      <au-menu-item
        [disabled]="disabled"
        (select)="selected = true"
        >Action</au-menu-item
      >
    </au-menu>
  `,
})
class Host {
  open = true;
  disabled = false;
  selected = false;
}

describe('AuMenuItem', () => {
  beforeEach(() => {
    document.body.querySelectorAll('.au-menu__panel').forEach((el) => el.remove());
  });

  it('emits select and closes menu', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const item = document.body.querySelector('.au-menu-item__btn') as HTMLButtonElement;
    item.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selected).toBe(true);
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('does not emit when disabled', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    const item = document.body.querySelector('.au-menu-item__btn') as HTMLButtonElement;
    expect(item.disabled).toBe(true);
    const itemCmp = fixture.debugElement.queryAll(By.directive(AuMenuItem))[0]
      .componentInstance as AuMenuItem;
    (itemCmp as unknown as { onClick: (e: MouseEvent) => void }).onClick(new MouseEvent('click'));
    fixture.detectChanges();
    expect(fixture.componentInstance.selected).toBe(false);
    expect(fixture.componentInstance.open).toBe(true);
  });

  it('focuses the item button and marks it active', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    const itemCmp = fixture.debugElement.query(By.directive(AuMenuItem))
      .componentInstance as AuMenuItem;
    const menu = fixture.debugElement.query(By.directive(AuMenu)).componentInstance as AuMenu;
    const btn = document.body.querySelector('.au-menu-item__btn') as HTMLButtonElement;
    const focusSpy = vi.spyOn(btn, 'focus');
    itemCmp.focus();
    expect(focusSpy).toHaveBeenCalled();
    expect(menu.isActiveMenuItem(itemCmp)).toBe(true);
  });

  it('exposes label text for typeahead', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    const itemCmp = fixture.debugElement.query(By.directive(AuMenuItem))
      .componentInstance as AuMenuItem;
    expect(itemCmp.labelText()).toBe('Action');
  });

  it('labelText returns empty string when button has no text content', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    const itemCmp = fixture.debugElement.query(By.directive(AuMenuItem))
      .componentInstance as AuMenuItem;
    vi.spyOn(
      itemCmp as unknown as { buttonEl: () => HTMLButtonElement },
      'buttonEl',
    ).mockReturnValue({ textContent: null } as unknown as HTMLButtonElement);
    expect(itemCmp.labelText()).toBe('');
  });

  it('sets roving tabindex via focus handler', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    const btn = document.body.querySelector('.au-menu-item__btn') as HTMLButtonElement;
    expect(btn.getAttribute('tabindex')).toBe('0');
    btn.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    expect(btn.getAttribute('tabindex')).toBe('0');
  });

  it('containsElement matches nodes inside and outside the button', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    const itemCmp = fixture.debugElement.query(By.directive(AuMenuItem))
      .componentInstance as AuMenuItem;
    const btn = document.body.querySelector('.au-menu-item__btn') as HTMLButtonElement;
    expect(itemCmp.containsElement(btn)).toBe(true);
    expect(itemCmp.containsElement(btn.firstChild!)).toBe(true);
    expect(itemCmp.containsElement(document.body)).toBe(false);
  });

  it('unregisters from menu on destroy', () => {
    const unregister = vi.fn();

    @Component({
      imports: [AuMenuItem],
      template: `<au-menu-item>Action</au-menu-item>`,
      providers: [
        {
          provide: AU_MENU,
          useValue: {
            registerMenuItem: vi.fn(),
            unregisterMenuItem: unregister,
            isActiveMenuItem: () => false,
            setActiveMenuItem: vi.fn(),
            close: vi.fn(),
          },
        },
      ],
    })
    class DestroyHost {}

    const fixture = TestBed.createComponent(DestroyHost);
    fixture.detectChanges();
    const itemCmp = fixture.debugElement.query(By.directive(AuMenuItem))
      .componentInstance as AuMenuItem;
    fixture.destroy();
    expect(unregister).toHaveBeenCalledWith(itemCmp);
  });
});
