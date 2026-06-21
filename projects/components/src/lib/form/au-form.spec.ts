import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuFormDirective, resolveFormFieldShowValidation } from './au-form';
import { AU_FORM_FIELD, AuFormField, effectiveInvalidWithField } from '../form-field/form-field';

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
    selector: 'validation-probe',
    template: '',
  })
  class ValidationProbe {
    readonly formField = inject(AU_FORM_FIELD);
    readonly effectiveInvalid = effectiveInvalidWithField(this.formField, {
      invalid: () => true,
      isInvalid: () => false,
      touched: () => false,
    });
  }

  @Component({
    imports: [AuFormDirective, AuFormField, ValidationProbe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
      <form
        auForm
        [showValidation]="showValidation()"
      >
        <au-form-field label="Email">
          <validation-probe />
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

  it('inherits showValidation on descendant controls via effectiveInvalidWithField', () => {
    const field = fixture.debugElement.query(By.directive(AuFormField)).componentInstance;
    const probe = fixture.debugElement.query(By.directive(ValidationProbe)).componentInstance;

    expect(field.showValidation()).toBeUndefined();
    expect(probe.effectiveInvalid()).toBe(false);

    fixture.componentInstance.showValidation.set(true);
    fixture.detectChanges();
    expect(probe.effectiveInvalid()).toBe(true);
  });
});
