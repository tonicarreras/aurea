import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuFormDirective, resolveFormFieldShowValidation } from './au-form';
import { AuFormField } from './form-field';
import { AuInputText } from '../input-text/au-input-text.directive';

describe('resolveFormFieldShowValidation', () => {
  it('prefers the field value when set', () => {
    expect(resolveFormFieldShowValidation(false, true)).toBe(false);
    expect(resolveFormFieldShowValidation(true, false)).toBe(true);
  });

  it('falls back to the form value when the field is unset', () => {
    expect(resolveFormFieldShowValidation(undefined, true)).toBe(true);
    expect(resolveFormFieldShowValidation(undefined, false)).toBe(false);
  });

  it('returns undefined when neither level is set', () => {
    expect(resolveFormFieldShowValidation(undefined, undefined)).toBeUndefined();
  });
});

describe('AuFormDirective', () => {
  @Component({
    imports: [AuFormDirective, AuFormField, AuInputText],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
      <form
        auForm
        [showValidation]="showValidation()"
      >
        <au-form-field label="Email">
          <input auInputText />
        </au-form-field>
      </form>
    `,
  })
  class FormInheritanceHost {
    readonly showValidation = signal<boolean | undefined>(undefined);
  }

  let fixture: ComponentFixture<FormInheritanceHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInheritanceHost],
    }).compileComponents();
    fixture = TestBed.createComponent(FormInheritanceHost);
    fixture.detectChanges();
  });

  it('inherits showValidation on descendant au-form-field', () => {
    const field = fixture.debugElement.query(By.directive(AuFormField)).componentInstance;
    expect(field.showValidation()).toBeUndefined();

    fixture.componentInstance.showValidation.set(true);
    fixture.detectChanges();
    expect(field.showValidation()).toBe(true);
  });
});
