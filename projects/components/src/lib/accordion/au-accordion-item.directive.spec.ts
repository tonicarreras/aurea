import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuAccordionItem } from './au-accordion-item.directive';
import { AuAccordionPanel } from './au-accordion-panel';
import { AuAccordion } from './accordion';

@Component({
  imports: [AuAccordion, AuAccordionItem, AuAccordionPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-accordion [(value)]="expanded">
      <div class="au-accordion__item">
        <button
          type="button"
          auAccordionItem="one"
        >
          One
        </button>
        <au-accordion-panel panel="one">Panel</au-accordion-panel>
      </div>
    </au-accordion>
  `,
})
class ItemHost {
  expanded: string[] = ['one'];
}

describe('AuAccordionItem', () => {
  it('focuses the host button',async  () => {
    TestBed.configureTestingModule({ imports: [ItemHost] });
    const fixture = TestBed.createComponent(ItemHost);
    await fixture.whenStable();
    const item = fixture.debugElement
      .query(By.directive(AuAccordionItem))
      .injector.get(AuAccordionItem);
    const button = fixture.nativeElement.querySelector(
      '.au-accordion__trigger',
    ) as HTMLButtonElement;
    const focusSpy = vi.spyOn(button, 'focus');
    item.focus();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('prevents click when disabled',async  () => {
    @Component({
      imports: [AuAccordion, AuAccordionItem, AuAccordionPanel],
      template: `
        <au-accordion [(value)]="expanded">
          <button
            type="button"
            auAccordionItem="one"
            [auAccordionItemDisabled]="true"
          >
            One
          </button>
          <au-accordion-panel panel="one">Panel</au-accordion-panel>
        </au-accordion>
      `,
    })
    class DisabledItemHost {
      expanded: string[] = [];
    }

    const fixture = TestBed.createComponent(DisabledItemHost);
    await fixture.whenStable();
    const item = fixture.debugElement
      .query(By.directive(AuAccordionItem))
      .injector.get(AuAccordionItem);
    const preventDefault = vi.fn();
    item['onClick']({ preventDefault } as unknown as MouseEvent);
    expect(preventDefault).toHaveBeenCalled();
  });
});
