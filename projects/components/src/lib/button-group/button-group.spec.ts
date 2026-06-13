import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuButton } from '../button/au-button.directive';
import { AuButtonGroup } from './button-group';

describe('AuButtonGroup', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuButtonGroup, AuButton],
    }).compileComponents();
  });

  it('sets group role and aria-label',async  () => {
    const fix = TestBed.createComponent(AuButtonGroup);
    fix.componentRef.setInput('ariaLabel', 'Actions');
    await fix.whenStable();
    expect(fix.nativeElement.getAttribute('role')).toBe('group');
    expect(fix.nativeElement.getAttribute('aria-label')).toBe('Actions');
  });

  it('marks attached and orientation on the host',async  () => {
    const fix = TestBed.createComponent(AuButtonGroup);
    fix.componentRef.setInput('attached', false);
    fix.componentRef.setInput('orientation', 'vertical');
    await fix.whenStable();
    expect(fix.nativeElement.hasAttribute('data-au-attached')).toBe(false);
    expect(fix.nativeElement.getAttribute('data-au-orientation')).toBe('vertical');
  });

  it('projects au-button children',async  () => {
    @Component({
      selector: 'au-button-group-spec-host',
      imports: [AuButtonGroup, AuButton],
      template: `
        <au-button-group ariaLabel="Actions">
          <button auButton variant="outline">Cancel</button>
          <button auButton>Save</button>
        </au-button-group>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] });
    const fix = TestBed.createComponent(Host);
    await fix.whenStable();
    const buttons = fix.nativeElement.querySelectorAll('button.au-button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent?.trim()).toBe('Cancel');
  });

  it('coerces nullish ariaLabel to empty string',async  () => {
    const fix = TestBed.createComponent(AuButtonGroup);
    fix.componentRef.setInput('ariaLabel', null as unknown as string);
    await fix.whenStable();
    expect(fix.componentInstance.ariaLabel()).toBe('');
    expect(fix.componentInstance.resolvedAriaLabel()).toBeNull();
  });

  it('sets aria-labelledby when provided',async  () => {
    const fix = TestBed.createComponent(AuButtonGroup);
    fix.componentRef.setInput('ariaLabelledBy', 'actions-label');
    await fix.whenStable();
    expect(fix.nativeElement.getAttribute('aria-labelledby')).toBe('actions-label');
  });

  it('coerces nullish ariaLabelledBy to empty string',async  () => {
    const fix = TestBed.createComponent(AuButtonGroup);
    fix.componentRef.setInput('ariaLabelledBy', null as unknown as string);
    await fix.whenStable();
    expect(fix.componentInstance.ariaLabelledBy()).toBe('');
    expect(fix.componentInstance.resolvedAriaLabelledBy()).toBeNull();
  });

  it('scrolls focused buttons into view on focusin',async  () => {
    const fix = TestBed.createComponent(AuButtonGroup);
    await fix.whenStable();
    const target = document.createElement('button');
    target.scrollIntoView = vi.fn();
    fix.nativeElement.querySelector('.au-button-group__inner')?.appendChild(target);
    target.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    expect(target.scrollIntoView).toHaveBeenCalledWith({
      block: 'nearest',
      inline: 'nearest',
    });
  });

  it('ignores focusin when target is not an HTMLElement',async  () => {
    const fix = TestBed.createComponent(AuButtonGroup);
    await fix.whenStable();
    const inner = fix.nativeElement.querySelector('.au-button-group__inner') as HTMLElement;
    const event = new FocusEvent('focusin', { bubbles: true });
    Object.defineProperty(event, 'target', { value: document });
    expect(() => inner.dispatchEvent(event)).not.toThrow();
  });
});
