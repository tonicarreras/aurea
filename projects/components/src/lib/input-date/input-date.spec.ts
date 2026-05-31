import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { describe, expect, it, vi } from 'vitest';
import { AuInputDate } from './input-date';
import {
  AuInputDateTestHost,
  applyFieldHarnessInputs,
  createFieldFixture,
  queryControl,
} from '../form-field/form-field.spec-hosts';

describe('AuInputDate', () => {
  function CONTROL(fixture: ComponentFixture<AuInputDateTestHost>) {
    return queryControl(fixture, AuInputDate);
  }

  function queryInput(fixture: ComponentFixture<AuInputDateTestHost>): HTMLInputElement {
    return fixture.debugElement.query(By.css('.au-input-date__input'))!
      .nativeElement as HTMLInputElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuInputDateTestHost],
    }).compileComponents();
  });

  it('coerces numeric placeholder through transform', () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.placeholder = 42 as unknown as string;
    });
    expect(CONTROL(fix).placeholder()).toBe('42');
  });

  it('normalizes placeholder input', () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.placeholder = null as unknown as string;
    });
    expect(CONTROL(fix).placeholder()).toBe('');
  });

  it('preserves non-empty placeholder string', () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.placeholder = 'Pick a date';
    });
    expect(CONTROL(fix).placeholder()).toBe('Pick a date');
  });

  it('sets value on input', () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'Start' });
    fix.detectChanges();
    const el = queryInput(fix);
    el.value = '2026-01-15';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(CONTROL(fix).value()).toBe('2026-01-15');
  });

  it('sets null when cleared', () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'Start' }, (f) => {
      f.componentInstance.value = '2026-01-01';
    });
    const el = queryInput(fix);
    el.value = '';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('inputDisplay is empty when value is undefined', () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.value = undefined as unknown as string | null;
    });
    expect(CONTROL(fix).inputDisplay()).toBe('');
  });

  it('inputDisplay is empty when value is null', () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    fix.detectChanges();
    expect(CONTROL(fix).inputDisplay()).toBe('');
  });

  it('emits valueChange', async () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    fix.detectChanges();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.valueChange).pipe(take(1))),
    );
    const el = queryInput(fix);
    el.value = '2026-02-01';
    el.dispatchEvent(new Event('input'));
    expect(await p).toBe('2026-02-01');
  });

  it('does not emit when disabled', () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    fix.componentInstance.disabled = true;
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () =>
      outputToObservable(comp.valueChange).subscribe(() => n++),
    );
    fix.detectChanges();
    const el = queryInput(fix);
    el.value = '2026-03-01';
    el.dispatchEvent(new Event('input'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('does not update model when readOnly', () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.value = '2026-01-01';
      f.componentInstance.readOnly = true;
    });
    const el = queryInput(fix);
    el.value = '2026-12-31';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(CONTROL(fix).value()).toBe('2026-01-01');
  });

  it('sets min max attributes', () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    fix.componentInstance.minDate = '2026-01-01';
    fix.componentInstance.maxDate = '2026-12-31';
    fix.detectChanges();
    const el = queryInput(fix);
    expect(el.getAttribute('min')).toBe('2026-01-01');
    expect(el.getAttribute('max')).toBe('2026-12-31');
  });

  it('shows error and aria-invalid', () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    applyFieldHarnessInputs(fix, { controlId: 'd1' });
    applyFieldHarnessInputs(fix, { errorMessage: 'Bad' });
    fix.detectChanges();
    const el = queryInput(fix);
    expect(el.getAttribute('aria-invalid')).toBe('true');
    expect(el.getAttribute('aria-errormessage')).toBe('d1-error');
  });

  it('focus() focuses input', () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    fix.detectChanges();
    const el = queryInput(fix);
    const spy = vi.spyOn(el, 'focus');
    CONTROL(fix).focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('onControlRowFocusout early exit', () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    fix.detectChanges();
    CONTROL(fix).onControlRowFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onControlRowFocusout when focus stays in row', () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-input-date__control-row'))!.nativeElement;
    const input = queryInput(fix);
    const ev = new FocusEvent('focusout', { relatedTarget: input });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(ev);
  });

  it('clears from-tab after leaving row', () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-input-date__control-row'))!.nativeElement;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fix.debugElement
      .query(By.css('.au-input-date__control-row'))!
      .triggerEventHandler('focusin', new FocusEvent('focusin'));
    fix.detectChanges();
    expect(row.classList.contains('au-input-date__control-row--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(out);
    fix.detectChanges();
    expect(row.classList.contains('au-input-date__control-row--from-tab')).toBe(false);
  });

  it('sets hint and aria-describedby', () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    applyFieldHarnessInputs(fix, { hint: 'ISO format' });
    fix.detectChanges();
    const hint = fix.debugElement.query(By.css('.au-form-field__hint'))!.nativeElement;
    expect(queryInput(fix).getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('shows error from errors input', () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    fix.componentInstance.errors = [{ kind: 'required', message: 'Pick a date' }];
    fix.detectChanges();
    expect(CONTROL(fix).displayError()).toBe('Pick a date');
  });

  it('displayError uses kind when message missing', () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    fix.componentInstance.errors = [{ kind: 'pattern' }] as any;
    fix.detectChanges();
    expect(CONTROL(fix).displayError()).toBe('pattern');
  });

  it('displayError empty when first error has no usable text', () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    fix.componentInstance.errors = [{ message: '', kind: '' }] as any;
    fix.detectChanges();
    expect(CONTROL(fix).displayError()).toBe('');
  });

  it('uses explicit id for resolvedId', () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    applyFieldHarnessInputs(fix, { controlId: 'my-date' });
    fix.detectChanges();
    expect(queryInput(fix).id).toBe('my-date');
  });

  it('onControlRowFocusin runs', () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' });
    CONTROL(fix).onControlRowFocusin();
  });

  it('emits blur from onBlurHost', () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    let n = 0;
    CONTROL(fix).blur.subscribe(() => n++);
    fix.detectChanges();
    CONTROL(fix).onBlurHost();
    expect(n).toBe(1);
  });

  it('effectiveInvalid from invalid input without message', () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.invalid = true;
    });
    expect(queryInput(fix).getAttribute('aria-invalid')).toBe('true');
  });

  it('onPickerIconClick opens native picker when enabled', () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' });
    fix.detectChanges();
    const input = queryInput(fix);
    const showPicker = vi.fn();
    input.showPicker = showPicker;
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefault = vi.spyOn(event, 'preventDefault');
    const stopPropagation = vi.spyOn(event, 'stopPropagation');
    CONTROL(fix).onPickerIconClick(event);
    expect(preventDefault).toHaveBeenCalled();
    expect(stopPropagation).toHaveBeenCalled();
    expect(showPicker).toHaveBeenCalledOnce();
  });

  it('onPickerIconClick is no-op when disabled or readOnly', () => {
    for (const flag of ['disabled', 'readOnly'] as const) {
      const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
        f.componentInstance[flag] = true;
      });
      fix.detectChanges();
      const input = queryInput(fix);
      const showPicker = vi.fn();
      input.showPicker = showPicker;
      CONTROL(fix).onPickerIconClick(new MouseEvent('click'));
      expect(showPicker).not.toHaveBeenCalled();
    }
  });
});
