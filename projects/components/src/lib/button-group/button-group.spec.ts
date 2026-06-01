import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuButton } from '../button/button';
import { AuButtonGroup } from './button-group';

describe('AuButtonGroup', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuButtonGroup, AuButton],
    }).compileComponents();
  });

  it('sets group role and aria-label', () => {
    const fix = TestBed.createComponent(AuButtonGroup);
    fix.componentRef.setInput('ariaLabel', 'Actions');
    fix.detectChanges();
    expect(fix.nativeElement.getAttribute('role')).toBe('group');
    expect(fix.nativeElement.getAttribute('aria-label')).toBe('Actions');
  });

  it('marks attached and orientation on the host', () => {
    const fix = TestBed.createComponent(AuButtonGroup);
    fix.componentRef.setInput('attached', false);
    fix.componentRef.setInput('orientation', 'vertical');
    fix.detectChanges();
    expect(fix.nativeElement.hasAttribute('data-au-attached')).toBe(false);
    expect(fix.nativeElement.getAttribute('data-au-orientation')).toBe('vertical');
  });

  it('projects au-button children', () => {
    @Component({
      selector: 'au-button-group-spec-host',
      imports: [AuButtonGroup, AuButton],
      template: `
        <au-button-group ariaLabel="Actions">
          <au-button variant="outline">Cancel</au-button>
          <au-button>Save</au-button>
        </au-button-group>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] });
    const fix = TestBed.createComponent(Host);
    fix.detectChanges();
    const buttons = fix.nativeElement.querySelectorAll('au-button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent?.trim()).toBe('Cancel');
  });

  it('coerces nullish ariaLabel to empty string', () => {
    const fix = TestBed.createComponent(AuButtonGroup);
    fix.componentRef.setInput('ariaLabel', null as unknown as string);
    fix.detectChanges();
    expect(fix.componentInstance.ariaLabel()).toBe('');
    expect(fix.componentInstance.resolvedAriaLabel()).toBeNull();
  });
});
