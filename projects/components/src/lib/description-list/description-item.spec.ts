import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuDescriptionItem } from './description-item';
import { AuDescriptionList } from './description-list';

describe('AuDescriptionItem', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuDescriptionList, AuDescriptionItem],
    }).compileComponents();
  });

  it('renders term and projected description inside the parent dl',async  () => {
    @Component({
      selector: 'au-description-item-spec-host',
      imports: [AuDescriptionList, AuDescriptionItem],
      template: `
        <au-description-list>
          <au-description-item term="Name">Ada Lovelace</au-description-item>
        </au-description-list>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] });
    const fix = TestBed.createComponent(Host);
    await fix.whenStable();
    const dl = fix.nativeElement.querySelector('.au-description-list__list') as HTMLElement;
    expect(dl.querySelector('dt')?.textContent?.trim()).toBe('Name');
    expect(dl.querySelector('dd')?.textContent?.trim()).toBe('Ada Lovelace');
    expect(dl.querySelector('au-description-item')).toBeNull();
  });

  it('coerces nullish term to empty string',async  () => {
    const fix = TestBed.createComponent(AuDescriptionItem);
    fix.componentRef.setInput('term', null as unknown as string);
    await fix.whenStable();
    expect(fix.componentInstance.term()).toBe('');
  });
});
