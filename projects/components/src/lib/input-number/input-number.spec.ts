import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuInputNumber } from './au-input-number.directive';
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
    return fixture.debugElement.query(By.css('input.au-input-number'))!
      .nativeElement as HTMLInputElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuInputNumberTestHost],
    }).compileComponents();
  });

  it('sets numeric value on input', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'Amount' });
    await fix.whenStable();
    const el = queryInput(fix);
    el.value = '12';
    el.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBe(12);
  });

  it('sets null when cleared', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost, { label: 'Amount' }, (f) => {
      f.componentInstance.value = 5;
    });
    const el = queryInput(fix);
    el.value = '';
    el.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('emits valueChange', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    await fix.whenStable();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.value).pipe(take(1))),
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
    await fix.whenStable();
    const el = queryInput(fix);
    el.value = '3';
    el.dispatchEvent(new Event('input'));
    await fix.whenStable();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.value).pipe(take(1))),
    );
    el.value = '';
    el.dispatchEvent(new Event('input'));
    expect(await p).toBeNull();
  });

  it('does not emit when disabled', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    fix.componentInstance.disabled = true;
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () =>
      outputToObservable(comp.value).subscribe(() => n++),
    );
    await fix.whenStable();
    const el = queryInput(fix);
    el.value = '9';
    el.dispatchEvent(new Event('input'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('does not update model when readOnly', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost, { label: 'N' }, (f) => {
      f.componentInstance.value = 1;
      f.componentInstance.readOnly = true;
    });
    const el = queryInput(fix);
    el.value = '99';
    el.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBe(1);
  });

  it('does not update model when parsed number is not finite', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost, { label: 'N' }, (f) => {
      f.componentInstance.value = 2;
    });
    CONTROL(fix).onInput({ target: { value: 'Infinity' } } as unknown as Event);
    await fix.whenStable();
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

  it('shows error and aria-invalid', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    applyFieldHarnessInputs(fix, { controlId: 'num1' });
    applyFieldHarnessInputs(fix, { errorMessage: 'Bad' });
    await fix.whenStable();
    const el = queryInput(fix);
    expect(el.getAttribute('aria-invalid')).toBe('true');
    expect(el.getAttribute('aria-errormessage')).toBe('num1-error');
  });

  it('focus() focuses input', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    await fix.whenStable();
    const el = queryInput(fix);
    const spy = vi.spyOn(el, 'focus');
    CONTROL(fix).focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('onControlRowFocusout early exit', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    await fix.whenStable();
    CONTROL(fix).onControlRowFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onControlRowFocusout when focus stays in row', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    await fix.whenStable();
    const input = queryInput(fix);
    const ev = new FocusEvent('focusout', { relatedTarget: input });
    Object.defineProperty(ev, 'currentTarget', { value: input, configurable: true });
    CONTROL(fix).onControlRowFocusout(ev);
  });

  it('clears from-tab after leaving row', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    await fix.whenStable();
    const input = queryInput(fix);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fix.debugElement
      .query(By.css('input.au-input-number'))!
      .triggerEventHandler('focusin', new FocusEvent('focusin'));
    await fix.whenStable();
    expect(input.classList.contains('au-input-number--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: input, configurable: true });
    CONTROL(fix).onControlRowFocusout(out);
    await fix.whenStable();
    expect(input.classList.contains('au-input-number--from-tab')).toBe(false);
  });

  it('sets hint and aria-describedby', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    applyFieldHarnessInputs(fix, { hint: 'Numbers only' });
    await fix.whenStable();
    const hint = fix.debugElement.query(By.css('.au-form-field__hint'))!.nativeElement;
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

  it('inputDisplay empty for null value', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    await fix.whenStable();
    expect(CONTROL(fix).inputDisplay()).toBe('');
  });

  it('inputDisplay empty when value is undefined', () => {
    const fix = createFieldFixture(AuInputNumberTestHost, { label: 'N' }, (f) => {
      f.componentInstance.value = undefined as unknown as number | null;
    });
    expect(CONTROL(fix).inputDisplay()).toBe('');
  });

  it('shows error from errors input', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    fix.componentInstance.errors = [{ kind: 'min', message: 'Too small' }];
    await fix.whenStable();
    expect(CONTROL(fix).displayError()).toBe('Too small');
  });

  it('displayError uses kind when message missing', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    fix.componentInstance.errors = [{ kind: 'pattern' }] as any;
    await fix.whenStable();
    expect(CONTROL(fix).displayError()).toBe('pattern');
  });

  it('displayError empty when first error has no usable text', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    fix.componentInstance.errors = [{ message: '', kind: '' }] as any;
    await fix.whenStable();
    expect(CONTROL(fix).displayError()).toBe('');
  });

  it('uses explicit id for resolvedId', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    applyFieldHarnessInputs(fix, { controlId: 'my-num' });
    await fix.whenStable();
    expect(queryInput(fix).id).toBe('my-num');
  });

  it('onControlRowFocusin runs', () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    CONTROL(fix).onControlRowFocusin();
  });

  it('emits blur from onBlurHost', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost);
    applyFieldHarnessInputs(fix, { label: 'N' });
    let n = 0;
    CONTROL(fix).blur.subscribe(() => n++);
    await fix.whenStable();
    CONTROL(fix).onBlurHost();
    expect(n).toBe(1);
  });

  it('emits blur from native blur event', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost, { label: 'N' });
    let n = 0;
    CONTROL(fix).blur.subscribe(() => n++);
    await fix.whenStable();
    await fix.whenStable();
    fix.debugElement
      .query(By.css('input.au-input-number'))!
      .nativeElement.dispatchEvent(new FocusEvent('blur'));
    expect(n).toBe(1);
  });

  it('ignores non-finite numeric input', async () => {
    const fix = createFieldFixture(AuInputNumberTestHost, { label: 'N' }, (f) => {
      f.componentInstance.value = 5;
    });
    await fix.whenStable();
    CONTROL(fix).onInput({ target: { value: 'not-a-number' } } as unknown as Event);
    expect(CONTROL(fix).value()).toBe(5);
  });
});
