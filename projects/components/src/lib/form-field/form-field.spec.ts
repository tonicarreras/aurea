import {
  Component,
  ElementRef,
  inject,
  type WritableSignal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuInputText } from '../input-text/au-input-text.directive';
import {
  AU_FORM_FIELD,
  AuFormField,
  auFormFieldSelfRef,
  createStandaloneAuFormFieldContext,
  injectAuFormField,
  queryFieldNative,
  syncFormFieldControlState,
} from './form-field';
import { AuInputTextTestHost, createFieldFixture } from './form-field.spec-hosts';
import {
  defaultFieldChromeArgs,
  formFieldControlRender,
  formFieldHintOnlyRender,
} from './form-field.stories-chrome';

@Component({
  selector: 'au-test-form-field-child',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
})
class FormFieldChildProbe {
  readonly ctx = inject(AU_FORM_FIELD);
}

@Component({
  imports: [AuFormField, FormFieldChildProbe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<au-form-field label="Probe"><au-test-form-field-child /></au-form-field>',
})
class FormFieldProviderHost {}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<input class="probe-input" />',
})
class ProbeHost {
  readonly host = inject(ElementRef<HTMLElement>);
}

type WritableFormFieldContext = ReturnType<typeof createStandaloneAuFormFieldContext> & {
  label: WritableSignal<string>;
  hint: WritableSignal<string>;
  errorMessage: WritableSignal<string>;
  invalid: WritableSignal<boolean>;
  required: WritableSignal<boolean>;
  showRequired: WritableSignal<boolean>;
};

describe('AuFormField', () => {
  let fixture: ComponentFixture<AuFormField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuFormField],
    }).compileComponents();

    fixture = TestBed.createComponent(AuFormField);
    await fixture.whenStable();
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('auFormFieldSelfRef returns the component class', () => {
    expect(auFormFieldSelfRef()).toBe(AuFormField);
  });

  it('renders label with for attribute',async  () => {
    fixture.componentRef.setInput('label', 'Email');
    fixture.componentRef.setInput('controlIdInput', 'email');
    await fixture.whenStable();
    const label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    expect(label.textContent).toContain('Email');
    expect(label.getAttribute('for')).toBe('email');
  });

  it('shows error when invalid',async  () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.componentRef.setInput('errorMessage', 'Required');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.au-field-error')).not.toBeNull();
  });

  it('renders hint with id',async  () => {
    fixture.componentRef.setInput('hint', 'We never share your email.');
    fixture.componentRef.setInput('controlIdInput', 'email');
    await fixture.whenStable();
    const hint = fixture.nativeElement.querySelector('.au-form-field__hint') as HTMLElement;
    expect(hint.id).toBe('email-hint');
  });

  it('treats null errorMessage as empty',async  () => {
    fixture.componentRef.setInput('errorMessage', null as unknown as string);
    fixture.componentRef.setInput('invalid', true);
    await fixture.whenStable();
    expect(fixture.componentInstance.isInvalid()).toBe(true);
  });

  it('treats null hint as empty',async  () => {
    fixture.componentRef.setInput('hint', null as unknown as string);
    await fixture.whenStable();
    expect(fixture.componentInstance.hasHint()).toBe(false);
  });

  it('treats null label as empty',async  () => {
    fixture.componentRef.setInput('label', null as unknown as string);
    await fixture.whenStable();
    expect(fixture.componentInstance.hasLabel()).toBe(false);
  });

  it('treats null controlId as auto id',async  () => {
    fixture.componentRef.setInput('controlIdInput', null as unknown as string);
    await fixture.whenStable();
    expect(fixture.componentInstance.controlId()).toMatch(/^au-field-\d+$/);
  });

  it('uses auto id when controlId is only whitespace',async  () => {
    fixture.componentRef.setInput('controlIdInput', '   ');
    await fixture.whenStable();
    expect(fixture.componentInstance.controlId()).toMatch(/^au-field-\d+$/);
  });
});

describe('AuFormField AU_FORM_FIELD provider', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldProviderHost],
    }).compileComponents();
  });

  it('provides AU_FORM_FIELD to projected children via forwardRef', async () => {
    const hostFix = TestBed.createComponent(FormFieldProviderHost);
    await hostFix.whenStable();
    const field = hostFix.debugElement.query(By.directive(AuFormField))!
      .componentInstance as AuFormField;
    const probe = hostFix.debugElement.query(By.directive(FormFieldChildProbe))!
      .componentInstance as FormFieldChildProbe;
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
    const fix = createFieldFixture(
      AuInputTextTestHost,
      { label: 'Email', required: false },
      (f) => {
        f.componentInstance.required = true;
      },
    );
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

describe('syncFormFieldControlState', () => {
  it('pushes validation state into the form field context', () => {
    const formField = createStandaloneAuFormFieldContext();
    const sync = syncFormFieldControlState(formField, {
      displayError: () => 'Invalid email',
      effectiveInvalid: () => true,
      required: () => true,
    });

    sync();

    expect(formField.isInvalid()).toBe(true);
  });
});

describe('AuFormField showsLabel', () => {
  it('hides the wrapper label when the control reports usesLegend', async () => {
    await TestBed.configureTestingModule({ imports: [AuFormField] }).compileComponents();
    const fixture = TestBed.createComponent(AuFormField);
    fixture.componentRef.setInput('label', 'Pick');
    await fixture.whenStable();
    expect(fixture.componentInstance.showsLabel()).toBe(true);

    fixture.componentInstance.updateControlState({
      displayError: '',
      effectiveInvalid: false,
      required: false,
      usesLegend: true,
    });
    await fixture.whenStable();
    expect(fixture.componentInstance.showsLabel()).toBe(false);
    expect(fixture.nativeElement.querySelector('.au-form-field__label')).toBeNull();
  });
});

describe('queryFieldNative', () => {
  it('returns the element matching the selector inside the host',async  () => {
    const fixture = TestBed.createComponent(ProbeHost);
    await fixture.whenStable();
    const input = queryFieldNative<HTMLInputElement>(
      fixture.componentInstance.host,
      '.probe-input',
    );
    expect(input.tagName).toBe('INPUT');
    expect(input.classList.contains('probe-input')).toBe(true);
  });

  it('throws when no element matches the selector',async  () => {
    const fixture = TestBed.createComponent(ProbeHost);
    await fixture.whenStable();
    expect(() => queryFieldNative(fixture.componentInstance.host, '.missing')).toThrow(
      'queryFieldNative: no element matches ".missing"',
    );
  });
});

describe('createStandaloneAuFormFieldContext', () => {
  it('assigns unique control, hint, and error ids', () => {
    const a = createStandaloneAuFormFieldContext();
    const b = createStandaloneAuFormFieldContext();

    expect(a.controlId()).toMatch(/^au-field-\d+$/);
    expect(b.controlId()).not.toBe(a.controlId());
    expect(a.hintId()).toBe(`${a.controlId()}-hint`);
    expect(a.errorId()).toBe(`${a.controlId()}-error`);
  });

  it('reports invalid from the manual errorMessage signal', () => {
    const ctx = createStandaloneAuFormFieldContext() as WritableFormFieldContext;
    ctx.errorMessage.set('  Required field  ');
    expect(ctx.isInvalid()).toBe(true);
  });

  it('prefers manual errorMessage over control displayError', () => {
    const ctx = createStandaloneAuFormFieldContext() as WritableFormFieldContext;
    ctx.errorMessage.set('Wrapper error');
    ctx.updateControlState({
      displayError: 'Control error',
      effectiveInvalid: true,
      required: false,
    });
    expect(ctx.isInvalid()).toBe(true);
    ctx.errorMessage.set('');
    expect(ctx.isInvalid()).toBe(true);
  });

  it('uses control displayError when manual errorMessage is empty', () => {
    const ctx = createStandaloneAuFormFieldContext();
    ctx.updateControlState({
      displayError: 'Control error',
      effectiveInvalid: false,
      required: true,
    });
    expect(ctx.isInvalid()).toBe(true);
  });

  it('reports invalid from the invalid flag alone', () => {
    const ctx = createStandaloneAuFormFieldContext() as WritableFormFieldContext;
    ctx.invalid.set(true);
    expect(ctx.isInvalid()).toBe(true);
  });

  it('reports invalid from control effectiveInvalid alone', () => {
    const ctx = createStandaloneAuFormFieldContext();
    ctx.updateControlState({
      displayError: '',
      effectiveInvalid: true,
      required: false,
    });
    expect(ctx.isInvalid()).toBe(true);
  });

  it('is not invalid when all signals are clear', () => {
    const ctx = createStandaloneAuFormFieldContext();
    expect(ctx.isInvalid()).toBe(false);
  });

  it('syncs writable field metadata signals', () => {
    const ctx = createStandaloneAuFormFieldContext() as WritableFormFieldContext;
    ctx.label.set('Label');
    ctx.hint.set('Hint');
    ctx.required.set(true);
    ctx.showRequired.set(false);
    expect(ctx.label()).toBe('Label');
    expect(ctx.hint()).toBe('Hint');
    expect(ctx.required()).toBe(true);
    expect(ctx.showRequired()).toBe(false);
  });
});

describe('injectAuFormField', () => {
  @Component({
    selector: 'au-standalone-field-probe',
    template: '',
    providers: [{ provide: AU_FORM_FIELD, useFactory: createStandaloneAuFormFieldContext }],
  })
  class StandaloneFieldProbe {
    readonly ctx = injectAuFormField();
  }

  @Component({
    imports: [StandaloneFieldProbe],
    template: '<au-standalone-field-probe />',
  })
  class BareStandaloneHost {}

  @Component({
    imports: [AuFormField, StandaloneFieldProbe],
    template: '<au-form-field label="Parent"><au-standalone-field-probe /></au-form-field>',
  })
  class WrappedStandaloneHost {}

  it('returns the host standalone context when no ancestor field exists',async  () => {
    const fix = TestBed.createComponent(BareStandaloneHost);
    await fix.whenStable();
    const probeDe = fix.debugElement.query(By.directive(StandaloneFieldProbe))!;
    const probe = probeDe.componentInstance as StandaloneFieldProbe;
    expect(probe.ctx).toBe(probeDe.injector.get(AU_FORM_FIELD));
  });

  it('returns the ancestor au-form-field context when wrapped',async  () => {
    const fix = TestBed.createComponent(WrappedStandaloneHost);
    await fix.whenStable();
    const parentField = fix.debugElement.query(By.directive(AuFormField))!
      .componentInstance as AuFormField;
    const probe = fix.debugElement.query(By.directive(StandaloneFieldProbe))!
      .componentInstance as StandaloneFieldProbe;
    expect(probe.ctx).toBe(parentField);
    expect(probe.ctx.controlId()).toBe(parentField.controlId());
  });
});

describe('formFieldControlRender', () => {
  it('returns au-form-field template with chrome bindings', () => {
    const args = { ...defaultFieldChromeArgs, label: 'Email' };
    const result = formFieldControlRender([AuFormField, AuInputText], args, '<input auInputText />');

    expect(result.props).toBe(args);
    expect(result.moduleMetadata.imports).toEqual([AuFormField, AuInputText]);
    expect(result.template).toContain('[label]="label"');
    expect(result.template).toContain('[controlIdInput]="controlIdInput"');
    expect(result.template).toContain('<input auInputText />');
  });
});

describe('formFieldHintOnlyRender', () => {
  it('omits label binding on au-form-field', () => {
    const args = {
      hint: 'Hint',
      errorMessage: '',
      invalid: false,
      required: false,
      controlIdInput: 'x',
    };
    const result = formFieldHintOnlyRender([AuFormField], args, '<button type="button" auSwitch></button>');

    expect(result.template).not.toContain('[label]="label"');
    expect(result.template).toContain('[hint]="hint"');
    expect(result.template).toContain('<button type="button" auSwitch></button>');
  });
});
