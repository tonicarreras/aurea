import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuAccordionItem } from './au-accordion-item.directive';
import { AuAccordionPanel } from './au-accordion-panel';
import { AuAccordion } from './accordion';

@Component({
  imports: [AuAccordion, AuAccordionItem, AuAccordionPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-accordion
      [(value)]="expanded"
      [multiple]="multiple"
      ariaLabel="FAQ"
    >
      <div class="au-accordion__item">
        <button
          type="button"
          auAccordionItem="one"
        >
          Section one
        </button>
        <au-accordion-panel panel="one">Panel one</au-accordion-panel>
      </div>
      <div class="au-accordion__item">
        <button
          type="button"
          auAccordionItem="two"
        >
          Section two
        </button>
        <au-accordion-panel panel="two">Panel two</au-accordion-panel>
      </div>
    </au-accordion>
  `,
})
class AccordionHost {
  expanded: string[] = ['one'];
  multiple = true;
}

describe('AuAccordion', () => {
  let fixture: ComponentFixture<AccordionHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AccordionHost] }).compileComponents();
    fixture = TestBed.createComponent(AccordionHost);
    fixture.detectChanges();
  });

  it('defaults to plain variant', () => {
    const accordion = fixture.nativeElement.querySelector('au-accordion') as HTMLElement;
    expect(accordion.getAttribute('data-au-variant')).toBe('plain');
  });

  it('renders triggers and shows the expanded panel', () => {
    const root = fixture.nativeElement as HTMLElement;
    expect(
      root.querySelector('.au-accordion__trigger[aria-expanded="true"]')?.textContent,
    ).toContain('Section one');
    expect(root.querySelector('[id$="-panel-one"]')?.textContent).toContain('Panel one');
    expect(root.querySelector('[id$="-panel-two"]')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('toggles sections when multiple is true', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.au-accordion__trigger');
    (buttons[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.expanded).toEqual(['one', 'two']);
  });

  it('replaces expanded section when multiple is false', () => {
    @Component({
      imports: [AuAccordion, AuAccordionItem, AuAccordionPanel],
      template: `
        <au-accordion
          [(value)]="expanded"
          [multiple]="false"
          ariaLabel="FAQ"
        >
          <div class="au-accordion__item">
            <button
              type="button"
              auAccordionItem="one"
            >
              Section one
            </button>
            <au-accordion-panel panel="one">Panel one</au-accordion-panel>
          </div>
          <div class="au-accordion__item">
            <button
              type="button"
              auAccordionItem="two"
            >
              Section two
            </button>
            <au-accordion-panel panel="two">Panel two</au-accordion-panel>
          </div>
        </au-accordion>
      `,
    })
    class SingleExpandHost {
      expanded: string[] = ['one'];
    }

    const singleFixture = TestBed.createComponent(SingleExpandHost);
    singleFixture.detectChanges();
    const buttons = singleFixture.nativeElement.querySelectorAll('.au-accordion__trigger');
    (buttons[1] as HTMLButtonElement).click();
    singleFixture.detectChanges();
    expect(singleFixture.componentInstance.expanded).toEqual(['two']);
  });

  it('collapses an expanded section on second click', () => {
    const button = fixture.nativeElement.querySelector(
      '.au-accordion__trigger',
    ) as HTMLButtonElement;
    button.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.expanded).toEqual([]);
  });

  it('ignores clicks on disabled triggers', () => {
    @Component({
      imports: [AuAccordion, AuAccordionItem, AuAccordionPanel],
      template: `
        <au-accordion [(value)]="expanded">
          <div class="au-accordion__item">
            <button
              type="button"
              auAccordionItem="one"
              [auAccordionItemDisabled]="true"
            >
              One
            </button>
            <au-accordion-panel panel="one">Panel one</au-accordion-panel>
          </div>
        </au-accordion>
      `,
    })
    class DisabledHost {
      expanded: string[] = [];
    }

    const disabledFixture = TestBed.createComponent(DisabledHost);
    disabledFixture.detectChanges();
    (
      disabledFixture.nativeElement.querySelector('.au-accordion__trigger') as HTMLButtonElement
    ).click();
    disabledFixture.detectChanges();
    expect(disabledFixture.componentInstance.expanded).toEqual([]);
  });

  it('ignores unrelated keys when triggers exist', () => {
    const root = fixture.nativeElement.querySelector('.au-accordion__root') as HTMLElement;
    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  });

  it('navigates from index zero when focus is outside triggers', () => {
    const root = fixture.nativeElement.querySelector('.au-accordion__root') as HTMLElement;
    const buttons = [
      ...fixture.nativeElement.querySelectorAll('.au-accordion__trigger'),
    ] as HTMLButtonElement[];
    root.focus();
    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(document.activeElement).toBe(buttons[1]);
  });

  it('moves focus with arrow keys', () => {
    const root = fixture.nativeElement.querySelector('.au-accordion__root') as HTMLElement;
    const buttons = [
      ...fixture.nativeElement.querySelectorAll('.au-accordion__trigger'),
    ] as HTMLButtonElement[];
    buttons[0].focus();
    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(document.activeElement).toBe(buttons[1]);
    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(document.activeElement).toBe(buttons[0]);
    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    expect(document.activeElement).toBe(buttons[0]);
    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    expect(document.activeElement).toBe(buttons[1]);
  });
});

describe('AuAccordion variant', () => {
  it('applies contained surface attributes', () => {
    @Component({
      imports: [AuAccordion, AuAccordionItem, AuAccordionPanel],
      template: `
        <au-accordion
          [(value)]="expanded"
          variant="contained"
        >
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
    class ContainedHost {
      expanded: string[] = ['one'];
    }

    const containedFixture = TestBed.createComponent(ContainedHost);
    containedFixture.detectChanges();
    const accordion = containedFixture.nativeElement.querySelector('au-accordion') as HTMLElement;
    expect(accordion.getAttribute('data-au-variant')).toBe('contained');
  });
});

describe('AuAccordion keyboard edge cases', () => {
  it('does not duplicate registry entries', () => {
    @Component({
      imports: [AuAccordion, AuAccordionItem, AuAccordionPanel],
      template: `
        <au-accordion [(value)]="expanded">
          <button
            type="button"
            auAccordionItem="one"
          >
            One
          </button>
          <au-accordion-panel panel="one">Panel</au-accordion-panel>
        </au-accordion>
      `,
    })
    class RegistryHost {
      expanded: string[] = [];
    }

    TestBed.configureTestingModule({ imports: [RegistryHost] });
    const registryFixture = TestBed.createComponent(RegistryHost);
    registryFixture.detectChanges();
    const accordion = registryFixture.debugElement.query(
      By.directive(AuAccordion),
    ).componentInstance;
    const item = registryFixture.debugElement
      .query(By.directive(AuAccordionItem))
      .injector.get(AuAccordionItem);
    accordion.registerItem(item);
    expect(accordion.getEnabledItems().length).toBe(1);
  });

  it('ignores unrelated keys and empty registries', () => {
    const accordionFixture = TestBed.createComponent(AuAccordion);
    accordionFixture.detectChanges();
    const accordion = accordionFixture.componentInstance;
    accordion.onRootKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
    accordion.onRootKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
  });
});
