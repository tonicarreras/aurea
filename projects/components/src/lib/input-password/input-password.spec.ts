import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { describe, expect, it, vi } from 'vitest';
import { AuInputPassword } from './au-input-password.directive';
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
    return fixture.debugElement.query(By.css('input.au-input-password'))!
      .nativeElement as HTMLInputElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuInputPasswordTestHost],
    }).compileComponents();
  });

  it('sets value on input and null when cleared', async () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' });
    await fix.whenStable();
    const el = queryInput(fix);
    el.value = 'secret';
    el.dispatchEvent(new Event('input'));
    expect(CONTROL(fix).value()).toBe('secret');
    el.value = '';
    el.dispatchEvent(new Event('input'));
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('toggles reveal', async () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' });
    await fix.whenStable();
    expect(queryInput(fix).type).toBe('password');
    fix.debugElement.query(By.css('.au-input-password__reveal'))!.nativeElement.click();
    await fix.whenStable();
    expect(queryInput(fix).type).toBe('text');
  });

  it('shows aria-invalid when invalid', async () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' }, (f) => {
      f.componentInstance.invalid = true;
    });
    applyFieldHarnessInputs(fix, { errorMessage: 'Required' });
    await fix.whenStable();
    expect(queryInput(fix).getAttribute('aria-invalid')).toBe('true');
  });

  it('sets hint and aria-describedby', async () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, {
      label: 'Password',
      hint: 'Min 12 chars',
    });
    await fix.whenStable();
    const input = queryInput(fix);
    const hint = fix.debugElement.query(By.css('.au-form-field__hint'))!
      .nativeElement as HTMLElement;
    expect(input.getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('binds existing value to the native input', async () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' }, (f) => {
      f.componentInstance.value = 'preset';
    });
    await fix.whenStable();
    expect(queryInput(fix).value).toBe('preset');
  });

  it('does not update when disabled', async () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' }, (f) => {
      f.componentInstance.disabled = true;
    });
    await fix.whenStable();
    const el = queryInput(fix);
    el.value = 'secret';
    el.dispatchEvent(new Event('input'));
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('does not toggle reveal when disabled', async () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' }, (f) => {
      f.componentInstance.disabled = true;
    });
    await fix.whenStable();
    (
      fix.debugElement.query(By.css('.au-input-password__reveal'))!
        .nativeElement as HTMLButtonElement
    ).click();
    expect(queryInput(fix).type).toBe('password');
  });

  it('does not toggle reveal when readOnly', async () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' }, (f) => {
      f.componentInstance.readOnly = true;
    });
    await fix.whenStable();
    CONTROL(fix).toggleReveal();
    expect(queryInput(fix).type).toBe('password');
  });

  it('onControlRowFocusout handles focus leaving the row', async () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' });
    const input = queryInput(fix);
    CONTROL(fix).onControlRowFocusin();
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: input, configurable: true });
    CONTROL(fix).onControlRowFocusout(out);
    await fix.whenStable();
  });

  it('onControlRowFocusout ignores non-HTMLElement and internal focus moves', async () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' });
    await fix.whenStable();
    CONTROL(fix).onControlRowFocusout({ currentTarget: {} } as FocusEvent);
    const input = queryInput(fix);
    const reveal = fix.debugElement.query(By.css('.au-input-password__reveal'))!.nativeElement;
    const ev = new FocusEvent('focusout', { relatedTarget: reveal });
    Object.defineProperty(ev, 'currentTarget', { value: input, configurable: true });
    CONTROL(fix).onControlRowFocusout(ev);
  });

  it('emits blur and valueChange', async () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' });
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    await fix.whenStable();
    const valueP = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.value).pipe(take(1))),
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

  it('focus() focuses the native input', async () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' });
    await fix.whenStable();
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

  it('uses custom reveal aria labels', async () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' }, (f) => {
      f.componentInstance.revealLabelShow = 'Mostrar';
      f.componentInstance.revealLabelHide = 'Ocultar';
    });
    await fix.whenStable();
    const btn = fix.debugElement.query(By.css('.au-input-password__reveal'))!
      .nativeElement as HTMLButtonElement;
    expect(btn.getAttribute('aria-label')).toBe('Mostrar');
    btn.click();
    await fix.whenStable();
    expect(btn.getAttribute('aria-label')).toBe('Ocultar');
    expect(btn.getAttribute('aria-pressed')).toBe('true');
  });

  it('hides reveal toggle when showRevealToggle is false', async () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' }, (f) => {
      f.componentInstance.showRevealToggle = false;
    });
    await fix.whenStable();
    expect(fix.debugElement.query(By.css('.au-input-password__reveal'))).toBeFalsy();
  });

  it('removes reveal toggle when showRevealToggle becomes false', async () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' }, (f) => {
      f.componentInstance.showRevealToggle = true;
    });
    await fix.whenStable();
    const dir = CONTROL(fix) as unknown as {
      syncRevealToggle(): void;
      revealBtn: HTMLButtonElement | null;
      revealIconRef: unknown;
      hasRevealUi: () => boolean;
    };
    expect(dir.revealBtn).toBeTruthy();
    vi.spyOn(dir, 'hasRevealUi').mockReturnValue(false);
    dir.syncRevealToggle();
    await fix.whenStable();
    expect(dir.revealBtn).toBeNull();
    expect(fix.debugElement.query(By.css('.au-input-password__reveal'))).toBeFalsy();
  });

  it('treats focus inside the host as the same control group', async () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' });
    await fix.whenStable();
    const input = fix.debugElement.query(By.css('input.au-input-password'))!.nativeElement;
    CONTROL(fix).onControlRowFocusout(new FocusEvent('focusout', { relatedTarget: input }));
    expect(input.classList.contains('au-input-password--from-tab')).toBe(false);
  });

  it('syncRevealToggle returns when parent is not an HTMLElement', async () => {
    const fix = createFieldFixture(AuInputPasswordTestHost, { label: 'Password' });
    await fix.whenStable();
    const dir = CONTROL(fix) as unknown as { syncRevealToggle(): void };
    const input = fix.debugElement.query(By.css('input.au-input-password'))!
      .nativeElement as HTMLInputElement;
    document.createDocumentFragment().appendChild(input);
    expect(() => dir.syncRevealToggle()).not.toThrow();
  });
});
