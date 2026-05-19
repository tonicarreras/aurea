import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuInputNumber } from './input-number';

describe('AuInputNumber', () => {
  function queryInput(fixture: ComponentFixture<AuInputNumber>): HTMLInputElement {
    return fixture.debugElement.query(By.css('.au-input-number__input'))!.nativeElement as HTMLInputElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuInputNumber],
    }).compileComponents();
  });

  it('sets numeric value on input', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'Amount');
    fix.detectChanges();
    const el = queryInput(fix);
    el.value = '12';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBe(12);
  });

  it('sets null when cleared', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'Amount');
    fix.componentRef.setInput('value', 5);
    fix.detectChanges();
    const el = queryInput(fix);
    el.value = '';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('emits valueChange', async () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    fix.detectChanges();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.valueChange).pipe(take(1))),
    );
    const el = queryInput(fix);
    el.value = '3';
    el.dispatchEvent(new Event('input'));
    expect(await p).toBe(3);
  });

  it('emits null on clear via valueChange', async () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    fix.detectChanges();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.valueChange).pipe(take(1))),
    );
    const el = queryInput(fix);
    el.value = '';
    el.dispatchEvent(new Event('input'));
    expect(await p).toBeNull();
  });

  it('does not emit when disabled', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    fix.componentRef.setInput('disabled', true);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () => outputToObservable(comp.valueChange).subscribe(() => n++));
    fix.detectChanges();
    const el = queryInput(fix);
    el.value = '9';
    el.dispatchEvent(new Event('input'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('does not update model when readOnly', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    fix.componentRef.setInput('value', 1);
    fix.componentRef.setInput('readOnly', true);
    fix.detectChanges();
    const el = queryInput(fix);
    el.value = '99';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBe(1);
  });

  it('does not update model when parsed number is not finite', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    fix.componentRef.setInput('value', 2);
    fix.detectChanges();
    fix.componentInstance.onInput({ target: { value: 'Infinity' } } as unknown as Event);
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBe(2);
  });

  it('sets min max and step attributes', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    fix.componentRef.setInput('min', 0);
    fix.componentRef.setInput('max', 10);
    fix.componentRef.setInput('step', 0.5);
    fix.detectChanges();
    const el = queryInput(fix);
    expect(el.getAttribute('min')).toBe('0');
    expect(el.getAttribute('max')).toBe('10');
    expect(el.getAttribute('step')).toBe('0.5');
  });

  it('sets step any', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    fix.componentRef.setInput('step', 'any');
    fix.detectChanges();
    expect(queryInput(fix).getAttribute('step')).toBe('any');
  });

  it('shows error and aria-invalid', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    fix.componentRef.setInput('id', 'num1');
    fix.componentRef.setInput('errorMessage', 'Bad');
    fix.detectChanges();
    const el = queryInput(fix);
    expect(el.getAttribute('aria-invalid')).toBe('true');
    expect(el.getAttribute('aria-errormessage')).toBe('num1-error');
  });

  it('focus() focuses input', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    fix.detectChanges();
    const el = queryInput(fix);
    const spy = vi.spyOn(el, 'focus');
    fix.componentInstance.focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('onControlRowFocusout early exit', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.detectChanges();
    fix.componentInstance.onControlRowFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onControlRowFocusout when focus stays in row', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-input-number__control-row'))!.nativeElement;
    const input = queryInput(fix);
    const ev = new FocusEvent('focusout', { relatedTarget: input });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(ev);
  });

  it('clears from-tab after leaving row', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-input-number__control-row'))!.nativeElement;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fix.debugElement.query(By.css('.au-input-number__control-row'))!.triggerEventHandler('focusin', new FocusEvent('focusin'));
    fix.detectChanges();
    expect(row.classList.contains('au-input-number__control-row--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(out);
    fix.detectChanges();
    expect(row.classList.contains('au-input-number__control-row--from-tab')).toBe(false);
  });

  it('sets hint and aria-describedby', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    fix.componentRef.setInput('hint', 'Numbers only');
    fix.detectChanges();
    const hint = fix.debugElement.query(By.css('.au-input-number__hint'))!.nativeElement;
    expect(queryInput(fix).getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('stringifies placeholder input', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    fix.componentRef.setInput('placeholder', 'e.g. 42');
    fix.detectChanges();
    expect(fix.componentInstance.placeholder()).toBe('e.g. 42');
  });

  it('normalizes nullish transforms', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', null as unknown as string);
    fix.componentRef.setInput('hint', undefined as unknown as string);
    fix.componentRef.setInput('errorMessage', null as unknown as string);
    fix.componentRef.setInput('placeholder', null as unknown as string);
    fix.detectChanges();
    expect(fix.componentInstance.label()).toBe('');
    expect(fix.componentInstance.hint()).toBe('');
    expect(fix.componentInstance.errorMessage()).toBe('');
    expect(fix.componentInstance.placeholder()).toBe('');
  });

  it('inputDisplay empty for null value', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    fix.detectChanges();
    expect(fix.componentInstance.inputDisplay()).toBe('');
  });

  it('inputDisplay empty when value is undefined', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    fix.detectChanges();
    (fix.componentInstance as unknown as { value: { set: (v: unknown) => void } }).value.set(undefined);
    fix.detectChanges();
    expect(fix.componentInstance.inputDisplay()).toBe('');
  });

  it('shows error from errors input', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    fix.componentRef.setInput('errors', [{ kind: 'min', message: 'Too small' }]);
    fix.detectChanges();
    expect(fix.componentInstance.displayError()).toBe('Too small');
  });

  it('displayError uses kind when message missing', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    fix.componentRef.setInput('errors', [{ kind: 'pattern' }] as any);
    fix.detectChanges();
    expect(fix.componentInstance.displayError()).toBe('pattern');
  });

  it('displayError empty when first error has no usable text', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    fix.componentRef.setInput('errors', [{ message: '', kind: '' }] as any);
    fix.detectChanges();
    expect(fix.componentInstance.displayError()).toBe('');
  });

  it('uses explicit id for resolvedId', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    fix.componentRef.setInput('id', 'my-num');
    fix.detectChanges();
    expect(queryInput(fix).id).toBe('my-num');
  });

  it('emits blur from onBlurHost', () => {
    const fix = TestBed.createComponent(AuInputNumber);
    fix.componentRef.setInput('label', 'N');
    let n = 0;
    fix.componentInstance.blur.subscribe(() => n++);
    fix.detectChanges();
    fix.componentInstance.onBlurHost();
    expect(n).toBe(1);
  });
});
