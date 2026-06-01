import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuInputPassword } from './input-password';
import {
  AuInputPasswordTestHost,
  applyFieldHarnessInputs,
  createFieldFixture,
  queryControl,
} from '../form-field/form-field.spec-hosts';

describe('AuInputPassword', () => {
  function CONTROL(fixture: ComponentFixture<AuInputPasswordTestHost>) {
    return queryControl(fixture, AuInputPassword);
  }

  function queryInput(fixture: ComponentFixture<AuInputPasswordTestHost>): HTMLInputElement {
    return fixture.debugElement.query(By.css('.au-input-password__input'))!
      .nativeElement as HTMLInputElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuInputPasswordTestHost],
    }).compileComponents();
  });

  it('sets value on input and null when cleared', () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' });
    fix.detectChanges();
    const el = queryInput(fix);
    el.value = 'secret';
    el.dispatchEvent(new Event('input'));
    expect(CONTROL(fix).value()).toBe('secret');
    el.value = '';
    el.dispatchEvent(new Event('input'));
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('toggles reveal', () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' });
    fix.detectChanges();
    expect(queryInput(fix).type).toBe('password');
    fix.debugElement.query(By.css('.au-input-password__reveal'))!.nativeElement.click();
    fix.detectChanges();
    expect(queryInput(fix).type).toBe('text');
  });

  it('shows aria-invalid when invalid', () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' }, (f) => {
      f.componentInstance.invalid = true;
    });
    applyFieldHarnessInputs(fix, { errorMessage: 'Required' });
    fix.detectChanges();
    expect(queryInput(fix).getAttribute('aria-invalid')).toBe('true');
  });

  it('sets hint and aria-describedby', () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, {
      label: 'Password',
      hint: 'Min 12 chars',
    });
    fix.detectChanges();
    const input = queryInput(fix);
    const hint = fix.debugElement.query(By.css('.au-form-field__hint'))!
      .nativeElement as HTMLElement;
    expect(input.getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('binds existing value to the native input', () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' }, (f) => {
      f.componentInstance.value = 'preset';
    });
    fix.detectChanges();
    expect(queryInput(fix).value).toBe('preset');
  });

  it('does not update when disabled', () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' }, (f) => {
      f.componentInstance.disabled = true;
    });
    fix.detectChanges();
    const el = queryInput(fix);
    el.value = 'secret';
    el.dispatchEvent(new Event('input'));
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('does not toggle reveal when disabled', () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' }, (f) => {
      f.componentInstance.disabled = true;
    });
    fix.detectChanges();
    (
      fix.debugElement.query(By.css('.au-input-password__reveal'))!
        .nativeElement as HTMLButtonElement
    ).click();
    expect(queryInput(fix).type).toBe('password');
  });

  it('does not toggle reveal when readOnly', () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' }, (f) => {
      f.componentInstance.readOnly = true;
    });
    fix.detectChanges();
    CONTROL(fix).toggleReveal();
    expect(queryInput(fix).type).toBe('password');
  });

  it('onControlRowFocusout handles focus leaving the row', () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' });
    const row = fix.debugElement.query(By.css('.au-input-password__control-row'))!.nativeElement;
    CONTROL(fix).onControlRowFocusin();
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(out);
    fix.detectChanges();
  });

  it('onControlRowFocusout ignores non-HTMLElement and internal focus moves', () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' });
    CONTROL(fix).onControlRowFocusout({ currentTarget: {} } as FocusEvent);
    const row = fix.debugElement.query(By.css('.au-input-password__control-row'))!.nativeElement;
    const reveal = fix.debugElement.query(By.css('.au-input-password__reveal'))!.nativeElement;
    const ev = new FocusEvent('focusout', { relatedTarget: reveal });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(ev);
  });

  it('emits blur and valueChange', async () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' });
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    fix.detectChanges();
    const valueP = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.valueChange).pipe(take(1))),
    );
    const el = queryInput(fix);
    el.value = 'x';
    el.dispatchEvent(new Event('input'));
    expect(await valueP).toBe('x');

    let blurN = 0;
    comp.blur.subscribe(() => blurN++);
    el.dispatchEvent(new FocusEvent('blur'));
    expect(blurN).toBe(1);
  });

  it('focus() focuses the native input', () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' });
    fix.detectChanges();
    const input = queryInput(fix);
    const spy = vi.spyOn(input, 'focus');
    CONTROL(fix).focus();
    expect(spy).toHaveBeenCalled();
  });

  it('coerces null placeholder through transform', () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' }, (f) => {
      f.componentInstance.placeholder = null as unknown as string;
    });
    expect(CONTROL(fix).placeholder()).toBe('');
  });

  it('uses custom reveal aria labels', () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' }, (f) => {
      f.componentInstance.revealLabelShow = 'Mostrar';
      f.componentInstance.revealLabelHide = 'Ocultar';
    });
    fix.detectChanges();
    const btn = fix.debugElement.query(By.css('.au-input-password__reveal'))!
      .nativeElement as HTMLButtonElement;
    expect(btn.getAttribute('aria-label')).toBe('Mostrar');
    btn.click();
    fix.detectChanges();
    expect(btn.getAttribute('aria-label')).toBe('Ocultar');
    expect(btn.getAttribute('aria-pressed')).toBe('true');
  });

  it('hides reveal toggle when showRevealToggle is false', () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' }, (f) => {
      f.componentInstance.showRevealToggle = false;
    });
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-input-password__reveal'))).toBeFalsy();
  });
});
