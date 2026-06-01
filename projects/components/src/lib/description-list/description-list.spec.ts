import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuDescriptionItem } from './description-item';
import { AuDescriptionList } from './description-list';

describe('AuDescriptionList', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AuDescriptionList] }).compileComponents();
  });

  it('renders layout and columns host attributes', () => {
    const fix = TestBed.createComponent(AuDescriptionList);
    fix.componentRef.setInput('layout', 'horizontal');
    fix.componentRef.setInput('columns', 2);
    fix.detectChanges();
    expect(fix.nativeElement.getAttribute('data-au-layout')).toBe('horizontal');
    expect(fix.nativeElement.getAttribute('data-au-columns')).toBe('2');
  });

  it('projects description items into the inner dl', () => {
    @Component({
      selector: 'au-description-list-items-host',
      imports: [AuDescriptionList, AuDescriptionItem],
      template: `
        <au-description-list>
          <au-description-item term="Name">Ada</au-description-item>
          <au-description-item term="Role">Engineer</au-description-item>
        </au-description-list>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] });
    const fix = TestBed.createComponent(Host);
    fix.detectChanges();
    const terms = fix.nativeElement.querySelectorAll('dt');
    expect(terms.length).toBe(2);
    expect(terms[0].textContent?.trim()).toBe('Name');
    expect(terms[1].textContent?.trim()).toBe('Role');
  });

  it('projects native dt and dd into the inner dl', () => {
    @Component({
      selector: 'au-description-list-spec-host',
      imports: [AuDescriptionList],
      template: `
        <au-description-list>
          <dt>Name</dt>
          <dd>Ada</dd>
        </au-description-list>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] });
    const fix = TestBed.createComponent(Host);
    fix.detectChanges();
    const dl = fix.nativeElement.querySelector('.au-description-list__list') as HTMLElement;
    expect(dl.querySelector('dt')?.textContent).toBe('Name');
    expect(dl.querySelector('dd')?.textContent).toBe('Ada');
  });
});
