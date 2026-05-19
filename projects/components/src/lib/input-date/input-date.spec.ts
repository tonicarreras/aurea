import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuInputDate } from './input-date';

describe('AuInputDate', () => {
  function queryInput(fixture: ComponentFixture<AuInputDate>): HTMLInputElement {
    return fixture.debugElement.query(By.css('.au-input-date__input'))!.nativeElement as HTMLInputElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuInputDate],
    }).compileComponents();
  });

  it('normalizes placeholder input', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'D');
    fix.componentRef.setInput('placeholder', null as unknown as string);
    fix.detectChanges();
    expect(fix.componentInstance.placeholder()).toBe('');
  });

  it('preserves non-empty placeholder string', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'D');
    fix.componentRef.setInput('placeholder', 'Pick a date');
    fix.detectChanges();
    expect(fix.componentInstance.placeholder()).toBe('Pick a date');
  });

  it('sets value on input', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'Start');
    fix.detectChanges();
    const el = queryInput(fix);
    el.value = '2026-01-15';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBe('2026-01-15');
  });

  it('sets null when cleared', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'Start');
    fix.componentRef.setInput('value', '2026-01-01');
    fix.detectChanges();
    const el = queryInput(fix);
    el.value = '';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('inputDisplay is empty when value is null', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'D');
    fix.detectChanges();
    expect(fix.componentInstance.inputDisplay()).toBe('');
  });

  it('emits valueChange', async () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'D');
    const comp = fix.componentInstance;
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
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'D');
    fix.componentRef.setInput('disabled', true);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () => outputToObservable(comp.valueChange).subscribe(() => n++));
    fix.detectChanges();
    const el = queryInput(fix);
    el.value = '2026-03-01';
    el.dispatchEvent(new Event('input'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('does not update model when readOnly', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'D');
    fix.componentRef.setInput('value', '2026-01-01');
    fix.componentRef.setInput('readOnly', true);
    fix.detectChanges();
    const el = queryInput(fix);
    el.value = '2026-12-31';
    el.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBe('2026-01-01');
  });

  it('sets min max attributes', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'D');
    fix.componentRef.setInput('minDate', '2026-01-01');
    fix.componentRef.setInput('maxDate', '2026-12-31');
    fix.detectChanges();
    const el = queryInput(fix);
    expect(el.getAttribute('min')).toBe('2026-01-01');
    expect(el.getAttribute('max')).toBe('2026-12-31');
  });

  it('shows error and aria-invalid', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'D');
    fix.componentRef.setInput('id', 'd1');
    fix.componentRef.setInput('errorMessage', 'Bad');
    fix.detectChanges();
    const el = queryInput(fix);
    expect(el.getAttribute('aria-invalid')).toBe('true');
    expect(el.getAttribute('aria-errormessage')).toBe('d1-error');
  });

  it('focus() focuses input', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'D');
    fix.detectChanges();
    const el = queryInput(fix);
    const spy = vi.spyOn(el, 'focus');
    fix.componentInstance.focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('onControlRowFocusout early exit', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.detectChanges();
    fix.componentInstance.onControlRowFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onControlRowFocusout when focus stays in row', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'D');
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-input-date__control-row'))!.nativeElement;
    const input = queryInput(fix);
    const ev = new FocusEvent('focusout', { relatedTarget: input });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(ev);
  });

  it('clears from-tab after leaving row', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'D');
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-input-date__control-row'))!.nativeElement;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fix.debugElement.query(By.css('.au-input-date__control-row'))!.triggerEventHandler('focusin', new FocusEvent('focusin'));
    fix.detectChanges();
    expect(row.classList.contains('au-input-date__control-row--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(out);
    fix.detectChanges();
    expect(row.classList.contains('au-input-date__control-row--from-tab')).toBe(false);
  });

  it('sets hint and aria-describedby', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'D');
    fix.componentRef.setInput('hint', 'ISO format');
    fix.detectChanges();
    const hint = fix.debugElement.query(By.css('.au-input-date__hint'))!.nativeElement;
    expect(queryInput(fix).getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('normalizes nullish transforms', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', null as unknown as string);
    fix.componentRef.setInput('hint', undefined as unknown as string);
    fix.componentRef.setInput('errorMessage', null as unknown as string);
    fix.detectChanges();
    expect(fix.componentInstance.label()).toBe('');
    expect(fix.componentInstance.hint()).toBe('');
    expect(fix.componentInstance.errorMessage()).toBe('');
  });

  it('shows error from errors input', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'D');
    fix.componentRef.setInput('errors', [{ kind: 'required', message: 'Pick a date' }]);
    fix.detectChanges();
    expect(fix.componentInstance.displayError()).toBe('Pick a date');
  });

  it('displayError uses kind when message missing', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'D');
    fix.componentRef.setInput('errors', [{ kind: 'pattern' }] as any);
    fix.detectChanges();
    expect(fix.componentInstance.displayError()).toBe('pattern');
  });

  it('displayError empty when first error has no usable text', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'D');
    fix.componentRef.setInput('errors', [{ message: '', kind: '' }] as any);
    fix.detectChanges();
    expect(fix.componentInstance.displayError()).toBe('');
  });

  it('uses explicit id for resolvedId', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'D');
    fix.componentRef.setInput('id', 'my-date');
    fix.detectChanges();
    expect(queryInput(fix).id).toBe('my-date');
  });

  it('emits blur from onBlurHost', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'D');
    let n = 0;
    fix.componentInstance.blur.subscribe(() => n++);
    fix.detectChanges();
    fix.componentInstance.onBlurHost();
    expect(n).toBe(1);
  });

  it('effectiveInvalid from invalid input without message', () => {
    const fix = TestBed.createComponent(AuInputDate);
    fix.componentRef.setInput('label', 'D');
    fix.componentRef.setInput('invalid', true);
    fix.detectChanges();
    expect(queryInput(fix).getAttribute('aria-invalid')).toBe('true');
  });
});
