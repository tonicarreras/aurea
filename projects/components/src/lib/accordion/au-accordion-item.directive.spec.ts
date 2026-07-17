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
  it('registers with the parent accordion and exposes the label', async () => {
    TestBed.configureTestingModule({ imports: [ItemHost] });
    const fixture = TestBed.createComponent(ItemHost);
    await fixture.whenStable();
    const accordion = fixture.debugElement.query(By.directive(AuAccordion)).componentInstance;
    const item = fixture.debugElement
      .query(By.directive(AuAccordionItem))
      .injector.get(AuAccordionItem);
    expect(accordion.renderedItems().length).toBe(1);
    expect(item.label()).toBe('One');
  });

  it('marks projected trigger as hidden from assistive tech', async () => {
    TestBed.configureTestingModule({ imports: [ItemHost] });
    const fixture = TestBed.createComponent(ItemHost);
    await fixture.whenStable();
    const projected = fixture.nativeElement.querySelector(
      'button[auAccordionItem]',
    ) as HTMLButtonElement;
    expect(projected.hidden).toBe(true);
    expect(projected.getAttribute('aria-hidden')).toBe('true');
  });
});
