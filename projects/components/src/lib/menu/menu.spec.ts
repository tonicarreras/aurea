import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuButton } from '../button/button';
import { AuMenu, AuMenuItem, AuMenuTrigger } from './index';

@Component({
  imports: [AuMenu, AuMenuTrigger, AuMenuItem, AuButton],
  template: `
    <au-menu [(open)]="open">
      <au-button auMenuTrigger>Open</au-button>
      <au-menu-item (select)="selected = true">Action</au-menu-item>
    </au-menu>
  `,
})
class Host {
  open = false;
  selected = false;
}

describe('AuMenu', () => {
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
});
