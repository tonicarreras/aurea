import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { InputText } from './input-text';

describe('InputText', () => {
  function queryInput(fixture: ComponentFixture<InputText>): HTMLInputElement {
    return fixture.debugElement.query(By.css('.au-input-text__input'))!.nativeElement as HTMLInputElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputText],
    }).compileComponents();
  });

  it('sets null when cleared', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('label', 'Field');
    fix.componentRef.setInput('value', 'abc');
    fix.detectChanges();
    const el = queryInput(fix);
    el.value = '';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('inputDisplay is empty when value is null', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('label', 'x');
    fix.detectChanges();
    expect(fix.componentInstance.inputDisplay()).toBe('');
  });

  it('binds value on input (model) and input reflects value', async () => {
    const fix = TestBed.createComponent(InputText);
    fix.detectChanges();
    const comp = fix.componentInstance;
    const el = queryInput(fix);
    el.value = 'hello';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(comp.value()).toBe('hello');
  });

  it('emits valueChange via outputToObservable', async () => {
    const fix = TestBed.createComponent(InputText);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    fix.detectChanges();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.valueChange).pipe(take(1))),
    );
    const el = queryInput(fix);
    el.value = 'x';
    el.dispatchEvent(new Event('input'));
    const v = await p;
    expect(v).toBe('x');
  });

  it('shows error, aria-errormessage, and invalid on the input (not the host)', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('id', 'f-email');
    fix.componentRef.setInput('errorMessage', 'This field is required');
    fix.detectChanges();
    const input = queryInput(fix);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-errormessage')).toBe('f-email-error');
    const errText = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(errText?.nativeElement.textContent?.trim()).toBe('This field is required');
  });

  it('does not emit when disabled and typing', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('disabled', true);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () => outputToObservable(comp.valueChange).subscribe(() => n++));
    fix.detectChanges();
    const el = queryInput(fix);
    el.value = 'x';
    el.dispatchEvent(new Event('input'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('emits blur from native blur', () => {
    const fix = TestBed.createComponent(InputText);
    let n = 0;
    fix.componentInstance.blur.subscribe(() => n++);
    fix.detectChanges();
    queryInput(fix).dispatchEvent(new FocusEvent('blur'));
    expect(n).toBe(1);
  });

  it('focus() focuses the native input', () => {
    const fix = TestBed.createComponent(InputText);
    fix.detectChanges();
    const el = queryInput(fix);
    const spy = vi.spyOn(el, 'focus');
    fix.componentInstance.focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('sets hint and aria-describedby', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('hint', 'Use work email');
    fix.detectChanges();
    const input = queryInput(fix);
    const hint = fix.debugElement.query(By.css('.au-input-text__hint'))!.nativeElement;
    expect(input.getAttribute('aria-describedby')).toBe(hint.id);
    expect(hint.textContent?.trim()).toBe('Use work email');
  });

  it('shows required marker when required and showRequired', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('label', 'Email');
    fix.componentRef.setInput('required', true);
    fix.detectChanges();
    const label = fix.debugElement.query(By.css('.au-input-text__label'))!.nativeElement;
    expect(label.textContent?.replace(/\s+/g, ' ').trim()).toContain('*');
  });

  it('hides required marker when showRequired false', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('label', 'Email');
    fix.componentRef.setInput('required', true);
    fix.componentRef.setInput('showRequired', false);
    fix.detectChanges();
    const label = fix.debugElement.query(By.css('.au-input-text__label'))!.nativeElement;
    expect(label.textContent).not.toContain('*');
  });

  it('toggles password visibility', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('type', 'password');
    fix.detectChanges();
    const reveal = fix.debugElement.query(By.css('.au-input-text__reveal'))!.nativeElement;
    const input = queryInput(fix);
    expect(input.getAttribute('type')).toBe('password');
    expect(reveal.getAttribute('aria-pressed')).toBe('false');
    reveal.click();
    fix.detectChanges();
    expect(input.getAttribute('type')).toBe('text');
    expect(reveal.getAttribute('aria-pressed')).toBe('true');
    reveal.click();
    fix.detectChanges();
    expect(input.getAttribute('type')).toBe('password');
  });

  it('does not render password toggle when showPasswordToggle is false', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('type', 'password');
    fix.componentRef.setInput('showPasswordToggle', false);
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-input-text__reveal'))).toBeNull();
  });

  it('keeps non-password type from effectiveInputType', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('type', 'email');
    fix.detectChanges();
    expect(queryInput(fix).getAttribute('type')).toBe('email');
  });

  it('sets readOnly on the input', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('readOnly', true);
    fix.detectChanges();
    expect(queryInput(fix).readOnly).toBe(true);
  });

  it('sets name, placeholder, autocomplete, min and max length', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('name', 'user');
    fix.componentRef.setInput('placeholder', 'Type here');
    fix.componentRef.setInput('autocomplete', 'username');
    fix.componentRef.setInput('minLength', 2);
    fix.componentRef.setInput('maxLength', 10);
    fix.componentRef.setInput('size', 'lg');
    fix.detectChanges();
    const el = queryInput(fix);
    expect(el.getAttribute('name')).toBe('user');
    expect(el.getAttribute('placeholder')).toBe('Type here');
    expect(el.getAttribute('autocomplete')).toBe('username');
    expect(el.getAttribute('minlength')).toBe('2');
    expect(el.getAttribute('maxlength')).toBe('10');
    expect(fix.nativeElement.getAttribute('data-au-size')).toBe('lg');
  });

  it('shows error from errors when no manual message', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('errors', [{ kind: 'minLength', message: 'Too short' }] as any);
    fix.detectChanges();
    const err = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('Too short');
  });

  it('uses kind when message missing in errors', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('errors', [{ kind: 'pattern' }] as any);
    fix.detectChanges();
    const err = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('pattern');
  });

  it('marks aria-invalid when invalid without message', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('invalid', true);
    fix.detectChanges();
    expect(queryInput(fix).getAttribute('aria-invalid')).toBe('true');
  });

  it('generates id when id omitted', () => {
    const fix = TestBed.createComponent(InputText);
    fix.detectChanges();
    expect(queryInput(fix).id.startsWith('au-input-text-')).toBe(true);
  });

  it('applies from-tab on control row after Tab', () => {
    const fix = TestBed.createComponent(InputText);
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-input-text__control-row'))!;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    row.triggerEventHandler('focusin', new FocusEvent('focusin'));
    fix.detectChanges();
    expect(row.nativeElement.classList.contains('au-input-text__control-row--from-tab')).toBe(true);
  });

  it('clears from-tab after focus leaves control row', () => {
    const fix = TestBed.createComponent(InputText);
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-input-text__control-row'))!.nativeElement;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fix.debugElement.query(By.css('.au-input-text__control-row'))!.triggerEventHandler('focusin', new FocusEvent('focusin'));
    fix.detectChanges();
    expect(row.classList.contains('au-input-text__control-row--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(out);
    fix.detectChanges();
    expect(row.classList.contains('au-input-text__control-row--from-tab')).toBe(false);
  });

  it('adds password control row class when toggle shown', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('type', 'password');
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-input-text__control-row'))!.nativeElement;
    expect(row.classList.contains('au-input-text__control-row--password')).toBe(true);
  });

  it('prefers manual errorMessage over errors', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('errorMessage', 'Manual');
    fix.componentRef.setInput('errors', [{ kind: 'x', message: 'ignored' }] as any);
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-field-error__text'))?.nativeElement.textContent?.trim()).toBe('Manual');
  });

  it('onControlRowFocusout ignores non-HTMLElement', () => {
    const fix = TestBed.createComponent(InputText);
    fix.detectChanges();
    fix.componentInstance.onControlRowFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onControlRowFocusout returns when focus stays inside row', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('type', 'password');
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-input-text__control-row'))!.nativeElement;
    const reveal = fix.debugElement.query(By.css('.au-input-text__reveal'))!.nativeElement;
    const ev = new FocusEvent('focusout', { relatedTarget: reveal });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(ev);
  });

  it('normalizes nullish string inputs in transforms', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('label', null as unknown as string);
    fix.componentRef.setInput('hint', undefined as unknown as string);
    fix.componentRef.setInput('errorMessage', null as unknown as string);
    fix.componentRef.setInput('placeholder', undefined as unknown as string);
    fix.detectChanges();
    expect(fix.componentInstance.label()).toBe('');
    expect(fix.componentInstance.hint()).toBe('');
    expect(fix.componentInstance.errorMessage()).toBe('');
    expect(fix.componentInstance.placeholder()).toBe('');
  });

  it('displayError returns empty when first error has no usable message or kind', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('errors', [{ message: '', kind: '' }] as any);
    fix.detectChanges();
    expect(fix.componentInstance.displayError()).toBe('');
  });

  it('togglePasswordVisibility toggles type without using the reveal button', () => {
    const fix = TestBed.createComponent(InputText);
    fix.componentRef.setInput('type', 'password');
    fix.detectChanges();
    fix.componentInstance.togglePasswordVisibility();
    fix.detectChanges();
    expect(queryInput(fix).getAttribute('type')).toBe('text');
    fix.componentInstance.togglePasswordVisibility();
    fix.detectChanges();
    expect(queryInput(fix).getAttribute('type')).toBe('password');
  });
});
