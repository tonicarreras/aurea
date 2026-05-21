import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  AuSwitchTestHost,
  createFieldFixture,
  queryControl,
} from '../form-field/form-field-test-support';
import { AuSwitch } from './switch';

describe('AuSwitch', () => {
  function queryInput(fixture: ComponentFixture<AuSwitchTestHost>): HTMLInputElement {
    return fixture.debugElement.query(By.css('.au-switch__element'))!.nativeElement as HTMLInputElement;
  }

  function control(fixture: ComponentFixture<AuSwitchTestHost>): AuSwitch {
    return queryControl(fixture, AuSwitch);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuSwitchTestHost],
    }).compileComponents();
  });

  it('binds checked on change', () => {
    const fix = createFieldFixture(AuSwitchTestHost, { label: 'Enable' }, (f) => {
    f.componentInstance.label = 'Enable';
});
    const el = queryInput(fix);
    el.checked = true;
    el.dispatchEvent(new Event('change'));
    fix.detectChanges();
    expect(control(fix).checked()).toBe(true);
  });

  it('emits checkedChange', async () => {
    const fix = createFieldFixture(AuSwitchTestHost);
    const comp = control(fix);
    const inj = TestBed.inject(Injector);
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.checkedChange).pipe(take(1))),
    );
    const el = queryInput(fix);
    el.checked = true;
    el.dispatchEvent(new Event('change'));
    expect(await p).toBe(true);
  });

  it('does not emit when disabled', () => {
    const fix = createFieldFixture(AuSwitchTestHost, undefined, (f) => {
    f.componentInstance.disabled = true;
});
    const comp = control(fix);
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () => outputToObservable(comp.checkedChange).subscribe(() => n++));
    const el = queryInput(fix);
    el.checked = true;
    el.dispatchEvent(new Event('change'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('sets role switch and aria-checked', () => {
    const fix = createFieldFixture(AuSwitchTestHost, undefined, (f) => {
    f.componentInstance.label = 'Notifications';
    f.componentInstance.checked = true;
});
    const el = queryInput(fix);
    expect(el.getAttribute('role')).toBe('switch');
    expect(el.getAttribute('aria-checked')).toBe('true');
  });

  it('shows error and aria-invalid', () => {
    const fix = createFieldFixture(AuSwitchTestHost, { controlId: 'sw1', errorMessage: 'Required' });
    const el = queryInput(fix);
    expect(el.getAttribute('aria-invalid')).toBe('true');
    expect(el.getAttribute('aria-errormessage')).toBe('sw1-error');
  });

  it('uses kind when message missing in errors', () => {
    const fix = createFieldFixture(AuSwitchTestHost, undefined, (f) => {
    f.componentInstance.errors = [{ kind: 'pattern' }];
});
    const err = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('pattern');
  });

  it('sets hint and aria-describedby', () => {
    const fix = createFieldFixture(AuSwitchTestHost, { hint: 'Help' });
    const el = queryInput(fix);
    const hint = fix.debugElement.query(By.css('.au-form-field__hint'))!.nativeElement;
    expect(el.getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('focus() focuses native input', () => {
    const fix = createFieldFixture(AuSwitchTestHost);
    const el = queryInput(fix);
    const spy = vi.spyOn(el, 'focus');
    control(fix).focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('clears from-tab when focus leaves control row', () => {
    const fix = createFieldFixture(AuSwitchTestHost);
    const row = fix.debugElement.query(By.css('.au-switch__control-row'))!.nativeElement;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fix.debugElement.query(By.css('.au-switch__control-row'))!.triggerEventHandler('focusin', new FocusEvent('focusin'));
    fix.detectChanges();
    expect(row.classList.contains('au-switch__control-row--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    control(fix).onControlRowFocusout(out);
    fix.detectChanges();
    expect(row.classList.contains('au-switch__control-row--from-tab')).toBe(false);
  });

  it('onControlRowFocusout returns early for non-HTMLElement', () => {
    const fix = createFieldFixture(AuSwitchTestHost);
    control(fix).onControlRowFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onControlRowFocusout returns when focus stays inside row', () => {
    const fix = createFieldFixture(AuSwitchTestHost);
    const row = fix.debugElement.query(By.css('.au-switch__control-row'))!.nativeElement;
    const input = queryInput(fix);
    const ev = new FocusEvent('focusout', { relatedTarget: input });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    control(fix).onControlRowFocusout(ev);
  });

  it('onControlRowFocusin runs', () => {
    const fix = createFieldFixture(AuSwitchTestHost);
    control(fix).onControlRowFocusin();
  });

  it('coerces numeric label through transform', () => {
    const fix = createFieldFixture(AuSwitchTestHost, undefined, (f) => {
      f.componentInstance.label = 42 as unknown as string;
    });
    expect(control(fix).label()).toBe('42');
  });

  it('normalizes nullish inline label transform', () => {
    const fix = createFieldFixture(AuSwitchTestHost, { label: null as unknown as string }, (f) => {
    f.componentInstance.label = null as unknown as string;
});
    expect(control(fix).label()).toBe('');
  });

  it('displayError empty when first error has no usable message or kind', () => {
    const fix = createFieldFixture(AuSwitchTestHost, undefined, (f) => {
    f.componentInstance.errors = [{ message: '', kind: '' }];
});
    expect(control(fix).displayError()).toBe('');
  });

  it('sets aria-invalid from invalid without visible error', () => {
    const fix = createFieldFixture(AuSwitchTestHost, undefined, (f) => {
    f.componentInstance.invalid = true;
});
    expect(queryInput(fix).getAttribute('aria-invalid')).toBe('true');
  });

  it('emits blur on blur handler', () => {
    const fix = createFieldFixture(AuSwitchTestHost);
    let n = 0;
    control(fix).blur.subscribe(() => n++);
    control(fix).onBlurHost();
    expect(n).toBe(1);
  });
});
