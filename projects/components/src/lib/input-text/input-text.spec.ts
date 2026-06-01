import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  AuInputTextTestHost,
  applyFieldHarnessInputs,
  createFieldFixture,
  queryControl,
} from '../form-field/form-field.spec-hosts';
import { AuInputText } from './input-text';

describe('AuInputText', () => {
  function queryInput(fixture: ComponentFixture<AuInputTextTestHost>): HTMLInputElement {
    return fixture.debugElement.query(By.css('.au-input-text__input'))!
      .nativeElement as HTMLInputElement;
  }

  function control(fixture: ComponentFixture<AuInputTextTestHost>): AuInputText {
    return queryControl(fixture, AuInputText);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuInputTextTestHost],
    }).compileComponents();
  });

  it('sets null when cleared', () => {
    const fix = createFieldFixture(AuInputTextTestHost, undefined, (f) => {
      f.componentInstance.value = 'abc';
    });
    const el = queryInput(fix);
    el.value = '';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(control(fix).value()).toBeNull();
  });

  it('inputDisplay is empty when value is null', () => {
    const fix = createFieldFixture(AuInputTextTestHost);
    expect(control(fix).inputDisplay()).toBe('');
  });

  it('binds value on input (model) and input reflects value', () => {
    const fix = createFieldFixture(AuInputTextTestHost);
    const comp = control(fix);
    const el = queryInput(fix);
    el.value = 'hello';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(comp.value()).toBe('hello');
  });

  it('emits valueChange via outputToObservable', async () => {
    const fix = createFieldFixture(AuInputTextTestHost);
    const comp = control(fix);
    const inj = TestBed.inject(Injector);
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.valueChange).pipe(take(1))),
    );
    const el = queryInput(fix);
    el.value = 'x';
    el.dispatchEvent(new Event('input'));
    expect(await p).toBe('x');
  });

  it('forwards form-field invalid from harness inputs', () => {
    const fix = createFieldFixture(AuInputTextTestHost, { invalid: true });
    expect(fix.componentInstance.ffInvalid()).toBe(true);
  });

  it('shows error, aria-errormessage, and invalid on the input (not the host)', () => {
    const fix = createFieldFixture(AuInputTextTestHost, {
      controlId: 'f-email',
      errorMessage: 'This field is required',
    });
    const input = queryInput(fix);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-errormessage')).toBe('f-email-error');
    const errText = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(errText?.nativeElement.textContent?.trim()).toBe('This field is required');
  });

  it('does not emit when disabled and typing', () => {
    const fix = createFieldFixture(AuInputTextTestHost, undefined, (f) => {
      f.componentInstance.disabled = true;
    });
    const comp = control(fix);
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () =>
      outputToObservable(comp.valueChange).subscribe(() => n++),
    );
    const el = queryInput(fix);
    el.value = 'x';
    el.dispatchEvent(new Event('input'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('onControlRowFocusin runs', () => {
    const fix = createFieldFixture(AuInputTextTestHost);
    control(fix).onControlRowFocusin();
  });

  it('emits blur from onBlurHost', () => {
    const fix = createFieldFixture(AuInputTextTestHost);
    let n = 0;
    control(fix).blur.subscribe(() => n++);
    fix.detectChanges();
    control(fix).onBlurHost();
    expect(n).toBe(1);
  });

  it('emits blur from native blur', () => {
    const fix = createFieldFixture(AuInputTextTestHost);
    let n = 0;
    control(fix).blur.subscribe(() => n++);
    queryInput(fix).dispatchEvent(new FocusEvent('blur'));
    expect(n).toBe(1);
  });

  it('focus() focuses the native input', () => {
    const fix = createFieldFixture(AuInputTextTestHost);
    const el = queryInput(fix);
    const spy = vi.spyOn(el, 'focus');
    control(fix).focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('sets hint and aria-describedby', () => {
    const fix = createFieldFixture(AuInputTextTestHost, { hint: 'Use work email' });
    const input = queryInput(fix);
    const hint = fix.debugElement.query(By.css('.au-form-field__hint'))!.nativeElement;
    expect(input.getAttribute('aria-describedby')).toBe(hint.id);
    expect(hint.textContent?.trim()).toBe('Use work email');
  });

  it('shows required marker when required and showRequired', () => {
    const fix = createFieldFixture(AuInputTextTestHost, { label: 'Email', required: true });
    const label = fix.debugElement.query(By.css('.au-form-field__label'))!.nativeElement;
    expect(label.textContent?.replace(/\s+/g, ' ').trim()).toContain('*');
  });

  it('hides required marker when showRequired false', () => {
    const fix = createFieldFixture(AuInputTextTestHost, {
      label: 'Email',
      required: true,
      showRequired: false,
    });
    const label = fix.debugElement.query(By.css('.au-form-field__label'))!.nativeElement;
    expect(label.textContent).not.toContain('*');
  });

  it('binds native input type', () => {
    const fix = createFieldFixture(AuInputTextTestHost, undefined, (f) => {
      f.componentInstance.type = 'email';
    });
    expect(queryInput(fix).getAttribute('type')).toBe('email');
  });

  it('sets readOnly on the input', () => {
    const fix = createFieldFixture(AuInputTextTestHost, undefined, (f) => {
      f.componentInstance.readOnly = true;
    });
    expect(queryInput(fix).readOnly).toBe(true);
  });

  it('sets name, placeholder, autocomplete, min and max length', () => {
    const fix = createFieldFixture(AuInputTextTestHost, undefined, (f) => {
      f.componentInstance.name = 'user';
      f.componentInstance.placeholder = 'Type here';
      f.componentInstance.autocomplete = 'username';
      f.componentInstance.minLength = 2;
      f.componentInstance.maxLength = 10;
      f.componentInstance.size = 'lg';
    });
    const el = queryInput(fix);
    expect(el.getAttribute('name')).toBe('user');
    expect(el.getAttribute('placeholder')).toBe('Type here');
    expect(el.getAttribute('autocomplete')).toBe('username');
    expect(el.getAttribute('minlength')).toBe('2');
    expect(el.getAttribute('maxlength')).toBe('10');
    expect(
      fix.debugElement.query(By.css('au-input-text')).nativeElement.getAttribute('data-au-size'),
    ).toBe('lg');
  });

  it('shows error from errors when no manual message', () => {
    const fix = createFieldFixture(AuInputTextTestHost, undefined, (f) => {
      f.componentInstance.errors = [{ kind: 'minLength', message: 'Too short' }];
    });
    const err = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('Too short');
  });

  it('uses kind when message missing in errors', () => {
    const fix = createFieldFixture(AuInputTextTestHost, undefined, (f) => {
      f.componentInstance.errors = [{ kind: 'pattern' }];
    });
    const err = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('pattern');
  });

  it('marks aria-invalid when invalid without message', () => {
    const fix = createFieldFixture(AuInputTextTestHost, undefined, (f) => {
      f.componentInstance.invalid = true;
    });
    expect(queryInput(fix).getAttribute('aria-invalid')).toBe('true');
  });

  it('generates id when controlId omitted', () => {
    const fix = createFieldFixture(AuInputTextTestHost);
    expect(queryInput(fix).id.startsWith('au-field-')).toBe(true);
  });

  it('applies from-tab on control row after Tab', () => {
    const fix = createFieldFixture(AuInputTextTestHost);
    const row = fix.debugElement.query(By.css('.au-input-text__control-row'))!;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    row.triggerEventHandler('focusin', new FocusEvent('focusin'));
    fix.detectChanges();
    expect(row.nativeElement.classList.contains('au-input-text__control-row--from-tab')).toBe(true);
  });

  it('clears from-tab after focus leaves control row', () => {
    const fix = createFieldFixture(AuInputTextTestHost);
    const row = fix.debugElement.query(By.css('.au-input-text__control-row'))!.nativeElement;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fix.debugElement
      .query(By.css('.au-input-text__control-row'))!
      .triggerEventHandler('focusin', new FocusEvent('focusin'));
    fix.detectChanges();
    expect(row.classList.contains('au-input-text__control-row--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    control(fix).onControlRowFocusout(out);
    fix.detectChanges();
    expect(row.classList.contains('au-input-text__control-row--from-tab')).toBe(false);
  });

  it('prefers manual errorMessage over errors', () => {
    const fix = createFieldFixture(AuInputTextTestHost, { errorMessage: 'Manual' }, (f) => {
      f.componentInstance.errors = [{ kind: 'x', message: 'ignored' }];
    });
    expect(
      fix.debugElement.query(By.css('.au-field-error__text'))?.nativeElement.textContent?.trim(),
    ).toBe('Manual');
  });

  it('onControlRowFocusout ignores non-HTMLElement', () => {
    const fix = createFieldFixture(AuInputTextTestHost);
    control(fix).onControlRowFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onControlRowFocusout returns when focus stays inside row', () => {
    const fix = createFieldFixture(AuInputTextTestHost);
    const row = fix.debugElement.query(By.css('.au-input-text__control-row'))!.nativeElement;
    const input = queryInput(fix);
    const ev = new FocusEvent('focusout', { relatedTarget: input });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    control(fix).onControlRowFocusout(ev);
  });

  it('coerces numeric placeholder through transform', () => {
    const fix = createFieldFixture(AuInputTextTestHost, undefined, (f) => {
      f.componentInstance.placeholder = 42 as unknown as string;
    });
    expect(control(fix).placeholder()).toBe('42');
  });

  it('normalizes nullish placeholder transform', () => {
    const fix = createFieldFixture(AuInputTextTestHost, undefined, (f) => {
      f.componentInstance.placeholder = undefined as unknown as string;
    });
    expect(control(fix).placeholder()).toBe('');
  });

  it('displayError returns empty when first error has no usable message or kind', () => {
    const fix = createFieldFixture(AuInputTextTestHost, undefined, (f) => {
      f.componentInstance.errors = [{ message: '', kind: '' }];
    });
    expect(control(fix).displayError()).toBe('');
  });

  it('treats null field harness strings as empty', () => {
    const fix = TestBed.createComponent(AuInputTextTestHost);
    applyFieldHarnessInputs(fix, {
      label: null as unknown as string,
      hint: undefined as unknown as string,
      errorMessage: null as unknown as string,
    });
    fix.detectChanges();
    expect(fix.componentInstance.ffLabel()).toBe('');
    expect(fix.componentInstance.ffHint()).toBe('');
    expect(fix.componentInstance.ffErrorMessage()).toBe('');
  });
});
