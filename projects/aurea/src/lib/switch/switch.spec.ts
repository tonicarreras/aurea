import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { Switch } from './switch';

describe('Switch', () => {
  function queryInput(fixture: ComponentFixture<Switch>): HTMLInputElement {
    return fixture.debugElement.query(By.css('.au-switch__element'))!.nativeElement as HTMLInputElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Switch],
    }).compileComponents();
  });

  it('binds checked on change', () => {
    const fix = TestBed.createComponent(Switch);
    fix.componentRef.setInput('label', 'Enable');
    fix.detectChanges();
    const el = queryInput(fix);
    el.checked = true;
    el.dispatchEvent(new Event('change'));
    fix.detectChanges();
    expect(fix.componentInstance.checked()).toBe(true);
  });

  it('emits checkedChange', async () => {
    const fix = TestBed.createComponent(Switch);
    fix.componentRef.setInput('label', 'X');
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    fix.detectChanges();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.checkedChange).pipe(take(1))),
    );
    const el = queryInput(fix);
    el.checked = true;
    el.dispatchEvent(new Event('change'));
    expect(await p).toBe(true);
  });

  it('does not emit when disabled', () => {
    const fix = TestBed.createComponent(Switch);
    fix.componentRef.setInput('label', 'X');
    fix.componentRef.setInput('disabled', true);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () => outputToObservable(comp.checkedChange).subscribe(() => n++));
    fix.detectChanges();
    const el = queryInput(fix);
    el.checked = true;
    el.dispatchEvent(new Event('change'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('sets role switch and aria-checked', () => {
    const fix = TestBed.createComponent(Switch);
    fix.componentRef.setInput('label', 'Notifications');
    fix.componentRef.setInput('checked', true);
    fix.detectChanges();
    const el = queryInput(fix);
    expect(el.getAttribute('role')).toBe('switch');
    expect(el.getAttribute('aria-checked')).toBe('true');
  });

  it('shows error and aria-invalid', () => {
    const fix = TestBed.createComponent(Switch);
    fix.componentRef.setInput('label', 'X');
    fix.componentRef.setInput('id', 'sw1');
    fix.componentRef.setInput('errorMessage', 'Required');
    fix.detectChanges();
    const el = queryInput(fix);
    expect(el.getAttribute('aria-invalid')).toBe('true');
    expect(el.getAttribute('aria-errormessage')).toBe('sw1-error');
  });

  it('uses kind when message missing in errors', () => {
    const fix = TestBed.createComponent(Switch);
    fix.componentRef.setInput('label', 'X');
    fix.componentRef.setInput('errors', [{ kind: 'pattern' }] as any);
    fix.detectChanges();
    const err = fix.debugElement.query(By.css('.au-switch__error-text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('pattern');
  });

  it('sets hint and aria-describedby', () => {
    const fix = TestBed.createComponent(Switch);
    fix.componentRef.setInput('label', 'X');
    fix.componentRef.setInput('hint', 'Help');
    fix.detectChanges();
    const el = queryInput(fix);
    const hint = fix.debugElement.query(By.css('.au-switch__hint'))!.nativeElement;
    expect(el.getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('focus() focuses native input', () => {
    const fix = TestBed.createComponent(Switch);
    fix.componentRef.setInput('label', 'X');
    fix.detectChanges();
    const el = queryInput(fix);
    const spy = vi.spyOn(el, 'focus');
    fix.componentInstance.focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('clears from-tab when focus leaves control row', () => {
    const fix = TestBed.createComponent(Switch);
    fix.componentRef.setInput('label', 'X');
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-switch__control-row'))!.nativeElement;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fix.debugElement.query(By.css('.au-switch__control-row'))!.triggerEventHandler('focusin', new FocusEvent('focusin'));
    fix.detectChanges();
    expect(row.classList.contains('au-switch__control-row--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(out);
    fix.detectChanges();
    expect(row.classList.contains('au-switch__control-row--from-tab')).toBe(false);
  });

  it('onControlRowFocusout returns early for non-HTMLElement', () => {
    const fix = TestBed.createComponent(Switch);
    fix.detectChanges();
    fix.componentInstance.onControlRowFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onControlRowFocusout returns when focus stays inside row', () => {
    const fix = TestBed.createComponent(Switch);
    fix.componentRef.setInput('label', 'X');
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-switch__control-row'))!.nativeElement;
    const input = queryInput(fix);
    const ev = new FocusEvent('focusout', { relatedTarget: input });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(ev);
  });

  it('normalizes nullish label, hint, errorMessage', () => {
    const fix = TestBed.createComponent(Switch);
    fix.componentRef.setInput('label', null as unknown as string);
    fix.componentRef.setInput('hint', undefined as unknown as string);
    fix.componentRef.setInput('errorMessage', null as unknown as string);
    fix.detectChanges();
    expect(fix.componentInstance.label()).toBe('');
    expect(fix.componentInstance.hint()).toBe('');
    expect(fix.componentInstance.errorMessage()).toBe('');
  });

  it('displayError empty when first error has no usable message or kind', () => {
    const fix = TestBed.createComponent(Switch);
    fix.componentRef.setInput('label', 'X');
    fix.componentRef.setInput('errors', [{ message: '', kind: '' }] as any);
    fix.detectChanges();
    expect(fix.componentInstance.displayError()).toBe('');
  });

  it('sets aria-invalid from invalid without visible error', () => {
    const fix = TestBed.createComponent(Switch);
    fix.componentRef.setInput('label', 'X');
    fix.componentRef.setInput('invalid', true);
    fix.detectChanges();
    expect(queryInput(fix).getAttribute('aria-invalid')).toBe('true');
  });

  it('emits blur on blur handler', () => {
    const fix = TestBed.createComponent(Switch);
    fix.componentRef.setInput('label', 'X');
    let n = 0;
    fix.componentInstance.blur.subscribe(() => n++);
    fix.detectChanges();
    fix.componentInstance.onBlurHost();
    expect(n).toBe(1);
  });
});
