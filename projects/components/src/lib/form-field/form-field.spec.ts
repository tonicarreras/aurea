import { Component, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AU_FORM_FIELD } from './au-form-field.context';
import { AuFormField, auFormFieldSelfRef } from './form-field';
import { AuInputTextTestHost, createFieldFixture } from './form-field-test-support';

@Component({
  selector: 'au-test-form-field-child',
  template: '',
})
class FormFieldChildProbe {
  readonly ctx = inject(AU_FORM_FIELD);
}

@Component({
  imports: [AuFormField, FormFieldChildProbe],
  template: '<au-form-field label="Probe"><au-test-form-field-child /></au-form-field>',
})
class FormFieldProviderHost {}

describe('AuFormField', () => {
  let fixture: ComponentFixture<AuFormField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuFormField],
    }).compileComponents();

    fixture = TestBed.createComponent(AuFormField);
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('auFormFieldSelfRef returns the component class', () => {
    expect(auFormFieldSelfRef()).toBe(AuFormField);
  });

  it('renders label with for attribute', () => {
    fixture.componentRef.setInput('label', 'Email');
    fixture.componentRef.setInput('controlIdInput', 'email');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    expect(label.textContent).toContain('Email');
    expect(label.getAttribute('for')).toBe('email');
  });

  it('shows error when invalid', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.componentRef.setInput('errorMessage', 'Required');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.au-field-error')).not.toBeNull();
  });

  it('renders hint with id', () => {
    fixture.componentRef.setInput('hint', 'We never share your email.');
    fixture.componentRef.setInput('controlIdInput', 'email');
    fixture.detectChanges();
    const hint = fixture.nativeElement.querySelector('.au-form-field__hint') as HTMLElement;
    expect(hint.id).toBe('email-hint');
  });

  it('treats null errorMessage as empty', () => {
    fixture.componentRef.setInput('errorMessage', null as unknown as string);
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.isInvalid()).toBe(true);
  });

  it('treats null hint as empty', () => {
    fixture.componentRef.setInput('hint', null as unknown as string);
    fixture.detectChanges();
    expect(fixture.componentInstance.hasHint()).toBe(false);
  });

  it('treats null label as empty', () => {
    fixture.componentRef.setInput('label', null as unknown as string);
    fixture.detectChanges();
    expect(fixture.componentInstance.hasLabel()).toBe(false);
  });

  it('treats null controlId as auto id', () => {
    fixture.componentRef.setInput('controlIdInput', null as unknown as string);
    fixture.detectChanges();
    expect(fixture.componentInstance.controlId()).toMatch(/^au-field-\d+$/);
  });

  it('uses auto id when controlId is only whitespace', () => {
    fixture.componentRef.setInput('controlIdInput', '   ');
    fixture.detectChanges();
    expect(fixture.componentInstance.controlId()).toMatch(/^au-field-\d+$/);
  });

});

describe('AuFormField AU_FORM_FIELD provider', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldProviderHost],
    }).compileComponents();
  });

  it('provides AU_FORM_FIELD to projected children via forwardRef', () => {
    const hostFix = TestBed.createComponent(FormFieldProviderHost);
    hostFix.detectChanges();
    const field = hostFix.debugElement.query(By.directive(AuFormField))!.componentInstance as AuFormField;
    const probe = hostFix.debugElement.query(By.directive(FormFieldChildProbe))!.componentInstance as FormFieldChildProbe;
    expect(probe.ctx).toBe(field);
  });
});

describe('AuFormField with projected control', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuInputTextTestHost],
    }).compileComponents();
  });

  it('shows linked control validation message when errorMessage is empty', () => {
    const fix = createFieldFixture(AuInputTextTestHost, undefined, (f) => {
      f.componentInstance.errors = [{ kind: 'required', message: 'From control' }];
    });
    const err = fix.nativeElement.querySelector('.au-field-error__text') as HTMLElement;
    expect(err.textContent?.trim()).toBe('From control');
  });

  it('shows required marker from linked control required state', () => {
    const fix = createFieldFixture(AuInputTextTestHost, { label: 'Email', required: false }, (f) => {
      f.componentInstance.required = true;
    });
    expect(fix.nativeElement.textContent).toContain('*');
  });

  it('is invalid when linked control is invalid without error text', () => {
    const fix = createFieldFixture(AuInputTextTestHost, undefined, (f) => {
      f.componentInstance.invalid = true;
    });
    const ff = fix.debugElement.query(By.directive(AuFormField))!.componentInstance as AuFormField;
    expect(ff.isInvalid()).toBe(true);
    expect(ff.displayError()).toBe('');
  });
});
