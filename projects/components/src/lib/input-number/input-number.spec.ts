import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuInputNumber } from './input-number';
import {
  AuInputNumberTestHost,
  applyFieldHarnessInputs,
  createFieldFixture,
  queryControl,
} from '../form-field/form-field.spec-hosts';

describe('AuInputNumber', () => {
  function CONTROL(fixture: ComponentFixture<AuInputNumberTestHost>) {
    return queryControl(fixture, AuInputNumber);
  }

  function queryInput(fixture: ComponentFixture<AuInputNumberTestHost>): HTMLInputElement {
    return fixture.debugElement.query(By.css('input[type="number"]'))!
      .nativeElement as HTMLInputElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuInputNumberTestHost],
    }).compileComponents();
  });

  it('sets numeric value on input', () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'Amount' });
    fix.detectChanges();
    const el = queryInput(fix);
    el.value = '12';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(CONTROL(fix).value()).toBe(12);
  });

  it('sets null when cleared', () => {
    const fix = createFieldFixture(AuInputNumberTestHost, { label: 'Amount' }, (f) => {
      f.componentInstance.value = 5;
    });
    const el = queryInput(fix);
    el.value = '';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('emits valueChange', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    const comp = CONTROL(fix);
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
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    const comp = CONTROL(fix);
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
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    fix.componentInstance.disabled = true;
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () =>
      outputToObservable(comp.valueChange).subscribe(() => n++),
    );
    fix.detectChanges();
    const el = queryInput(fix);
    el.value = '9';
    el.dispatchEvent(new Event('input'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('does not update model when readOnly', () => {
    const fix = createFieldFixture(AuInputNumberTestHost, { label: 'N' }, (f) => {
      f.componentInstance.value = 1;
      f.componentInstance.readOnly = true;
    });
    const el = queryInput(fix);
    el.value = '99';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(CONTROL(fix).value()).toBe(1);
  });

  it('does not update model when parsed number is not finite', () => {
    const fix = createFieldFixture(AuInputNumberTestHost, { label: 'N' }, (f) => {
      f.componentInstance.value = 2;
    });
    CONTROL(fix).onInput({ target: { value: 'Infinity' } } as unknown as Event);
    fix.detectChanges();
    expect(CONTROL(fix).value()).toBe(2);
  });

  it('sets min max and step attributes', () => {
    const fix = createFieldFixture(AuInputNumberTestHost, { label: 'N' }, (f) => {
      f.componentInstance.min = 0;
      f.componentInstance.max = 10;
      f.componentInstance.step = 0.5;
    });
    const el = queryInput(fix);
    expect(el.getAttribute('min')).toBe('0');
    expect(el.getAttribute('max')).toBe('10');
    expect(el.getAttribute('step')).toBe('0.5');
  });

  it('sets step any', () => {
    const fix = createFieldFixture(AuInputNumberTestHost, { label: 'N' }, (f) => {
      f.componentInstance.step = 'any';
    });
    expect(queryInput(fix).getAttribute('step')).toBe('any');
  });

  it('shows error and aria-invalid', () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    applyFieldHarnessInputs(fix, { controlId: 'num1' });
    applyFieldHarnessInputs(fix, { errorMessage: 'Bad' });
    fix.detectChanges();
    const el = queryInput(fix);
    expect(el.getAttribute('aria-invalid')).toBe('true');
    expect(el.getAttribute('aria-errormessage')).toBe('num1-error');
  });

  it('focus() focuses input', () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    fix.detectChanges();
    const el = queryInput(fix);
    const spy = vi.spyOn(el, 'focus');
    CONTROL(fix).focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('onControlRowFocusout early exit', () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    fix.detectChanges();
    CONTROL(fix).onControlRowFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onControlRowFocusout when focus stays in row', () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('div:has(> input[type="number"])'))!.nativeElement;
    const input = queryInput(fix);
    const ev = new FocusEvent('focusout', { relatedTarget: input });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(ev);
  });

  it('clears from-tab after leaving row', () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('div:has(> input[type="number"])'))!.nativeElement;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fix.debugElement
      .query(By.css('.au-input-number__control-row'))!
      .triggerEventHandler('focusin', new FocusEvent('focusin'));
    fix.detectChanges();
    expect(row.classList.contains('au-input-number__control-row--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(out);
    fix.detectChanges();
    expect(row.classList.contains('au-input-number__control-row--from-tab')).toBe(false);
  });

  it('sets hint and aria-describedby', () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    applyFieldHarnessInputs(fix, { hint: 'Numbers only' });
    fix.detectChanges();
    const hint = fix.debugElement.query(By.css('[id$="-hint"]'))!.nativeElement;
    expect(queryInput(fix).getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('coerces numeric placeholder through transform', () => {
    const fix = createFieldFixture(AuInputNumberTestHost, undefined, (f) => {
      f.componentInstance.placeholder = 42 as unknown as string;
    });
    expect(CONTROL(fix).placeholder()).toBe('42');
  });

  it('normalizes nullish placeholder transform', () => {
    const fix = createFieldFixture(AuInputNumberTestHost, undefined, (f) => {
      f.componentInstance.placeholder = null as unknown as string;
    });
    expect(CONTROL(fix).placeholder()).toBe('');
  });

  it('stringifies placeholder input', () => {
    const fix = createFieldFixture(AuInputNumberTestHost, { label: 'N' }, (f) => {
      f.componentInstance.placeholder = 'e.g. 42';
    });
    expect(CONTROL(fix).placeholder()).toBe('e.g. 42');
  });

  it('inputDisplay empty for null value', () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    fix.detectChanges();
    expect(CONTROL(fix).inputDisplay()).toBe('');
  });

  it('inputDisplay empty when value is undefined', () => {
    const fix = createFieldFixture(AuInputNumberTestHost, { label: 'N' }, (f) => {
      f.componentInstance.value = undefined as unknown as number | null;
    });
    expect(CONTROL(fix).inputDisplay()).toBe('');
  });

  it('shows error from errors input', () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    fix.componentInstance.errors = [{ kind: 'min', message: 'Too small' }];
    fix.detectChanges();
    expect(CONTROL(fix).displayError()).toBe('Too small');
  });

  it('displayError uses kind when message missing', () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    fix.componentInstance.errors = [{ kind: 'pattern' }] as any;
    fix.detectChanges();
    expect(CONTROL(fix).displayError()).toBe('pattern');
  });

  it('displayError empty when first error has no usable text', () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    fix.componentInstance.errors = [{ message: '', kind: '' }] as any;
    fix.detectChanges();
    expect(CONTROL(fix).displayError()).toBe('');
  });

  it('uses explicit id for resolvedId', () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    applyFieldHarnessInputs(fix, { controlId: 'my-num' });
    fix.detectChanges();
    expect(queryInput(fix).id).toBe('my-num');
  });

  it('onControlRowFocusin runs', () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    CONTROL(fix).onControlRowFocusin();
  });

  it('emits blur from onBlurHost', () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    let n = 0;
    CONTROL(fix).blur.subscribe(() => n++);
    fix.detectChanges();
    CONTROL(fix).onBlurHost();
    expect(n).toBe(1);
  });
});
