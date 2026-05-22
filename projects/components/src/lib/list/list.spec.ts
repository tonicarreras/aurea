import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuListItem } from './au-list-item.directive';
import { AuList } from './list';

describe('AuList', () => {
  let fixture: ComponentFixture<AuList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuList],
    }).compileComponents();

    fixture = TestBed.createComponent(AuList);
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exposes list semantics on the host', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('role')).toBe('list');
    expect(host.classList.contains('au-list')).toBe(true);
  });

  it('sets aria-label when provided', () => {
    fixture.componentRef.setInput('ariaLabel', 'Technologies');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-label')).toBe('Technologies');
  });

  it('sets aria-labelledby when provided', () => {
    fixture.componentRef.setInput('ariaLabelledBy', 'tags-heading');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-labelledby')).toBe('tags-heading');
  });

  it('treats null ariaLabel as empty', () => {
    fixture.componentRef.setInput('ariaLabel', null as unknown as string);
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-label')).toBeNull();
  });

  it('treats null ariaLabelledBy as empty', () => {
    fixture.componentRef.setInput('ariaLabelledBy', null as unknown as string);
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-labelledby')).toBeNull();
  });
});

@Component({
  imports: [AuList, AuListItem],
  template: `
    <au-list ariaLabel="Items">
      <div auListItem>One</div>
      <div
        auListItem
        [auListItemDisabled]="skip"
      >
        Two
      </div>
    </au-list>
  `,
})
class ListWithItemsHost {
  skip = false;
}

describe('AuListItem', () => {
  it('sets listitem inside au-list', () => {
    const fix = TestBed.createComponent(ListWithItemsHost);
    fix.detectChanges();
    const items = fix.nativeElement.querySelectorAll('[auListItem]');
    expect(items[0].getAttribute('role')).toBe('listitem');
    expect(items[1].getAttribute('role')).toBe('listitem');
  });

  it('suppresses listitem when auListItemDisabled is true', () => {
    const fix = TestBed.createComponent(ListWithItemsHost);
    fix.componentInstance.skip = true;
    fix.detectChanges();
    const items = fix.nativeElement.querySelectorAll('[auListItem]');
    expect(items[0].getAttribute('role')).toBe('listitem');
    expect(items[1].getAttribute('role')).toBeNull();
  });

  it('omits listitem outside au-list', () => {
    @Component({
      imports: [AuListItem],
      template: `<span auListItem>Solo</span>`,
    })
    class SoloHost {}

    const fix = TestBed.createComponent(SoloHost);
    fix.detectChanges();
    expect(fix.nativeElement.querySelector('span')?.getAttribute('role')).toBeNull();
  });
});
