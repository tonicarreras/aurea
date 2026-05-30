import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuButton } from '../button/button';
import { AU_MENU } from './au-menu.token';
import { AuMenu } from './menu';
import { AuMenuItem } from './menu-item';
import { AuMenuTrigger } from './au-menu-trigger.directive';

@Component({
  imports: [AuMenu, AuMenuTrigger, AuMenuItem, AuButton],
  template: `
    <au-menu [(open)]="open">
      <au-button auMenuTrigger>Open</au-button>
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

  it('focuses the item button', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    const itemCmp = fixture.debugElement.query(By.directive(AuMenuItem))
      .componentInstance as AuMenuItem;
    const btn = document.body.querySelector('.au-menu-item__btn') as HTMLButtonElement;
    const focusSpy = vi.spyOn(btn, 'focus');
    itemCmp.focus();
    expect(focusSpy).toHaveBeenCalled();
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
