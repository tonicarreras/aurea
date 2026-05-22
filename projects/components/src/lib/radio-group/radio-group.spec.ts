import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuRadioGroup, AuRadioOption } from './radio-group';
import {
  AuRadioGroupTestHost,
  applyFieldHarnessInputs,
  createFieldFixture,
  queryControl,
} from '../form-field/form-field.spec-hosts';

describe('AuRadioGroup', () => {
  function CONTROL(fixture: ComponentFixture<AuRadioGroupTestHost>) {
    return queryControl(fixture, AuRadioGroup);
  }

  const opts: AuRadioOption[] = [
    { value: 'a', label: 'Alpha' },
    { value: 'b', label: 'Beta' },
  ];

  function queryRadios(fixture: ComponentFixture<AuRadioGroupTestHost>): HTMLInputElement[] {
    return fixture.debugElement
      .queryAll(By.css('.au-radio-group__input'))
      .map((d) => d.nativeElement as HTMLInputElement);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuRadioGroupTestHost],
    }).compileComponents();
  });

  it('does not duplicate the form-field label in the legend', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: 'Pick' });
    });
    expect(fix.debugElement.query(By.css('.au-form-field__label'))).toBeFalsy();
    const legend = fix.debugElement.query(By.css('.au-radio-group__legend'))!.nativeElement;
    expect(legend.textContent).toContain('Pick');
  });

  it('updates value when a radio is selected', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: 'Pick' });
    });
    const radios = queryRadios(fix);
    radios[1]!.checked = true;
    radios[1]!.dispatchEvent(new Event('change'));
    fix.detectChanges();
    expect(CONTROL(fix).value()).toBe('b');
  });

  it('emits valueChange', async () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: 'Pick' });
    });
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    fix.detectChanges();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.valueChange).pipe(take(1))),
    );
    const radios = queryRadios(fix);
    radios[0]!.checked = true;
    radios[0]!.dispatchEvent(new Event('change'));
    expect(await p).toBe('a');
  });

  it('does not emit when disabled', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: 'Pick' });
      f.componentInstance.disabled = true;
    });
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () =>
      outputToObservable(comp.valueChange).subscribe(() => n++),
    );
    fix.detectChanges();
    const radios = queryRadios(fix);
    radios[1]!.dispatchEvent(new Event('change'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('uses custom name when provided', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: 'Pick' });
      f.componentInstance.name = 'choice';
    });
    expect(queryRadios(fix)[0]!.getAttribute('name')).toBe('choice');
  });

  it('shows error and aria-errormessage on radios', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: 'Pick' });
      applyFieldHarnessInputs(f, { controlId: 'rg1' });
      applyFieldHarnessInputs(f, { errorMessage: 'Choose one' });
    });
    const r = queryRadios(fix)[0]!;
    expect(r.getAttribute('aria-invalid')).toBe('true');
    expect(r.getAttribute('aria-errormessage')).toBe('rg1-error');
  });

  it('sets required only on first radio', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: 'Pick' });
      f.componentInstance.required = true;
    });
    const radios = queryRadios(fix);
    expect(radios[0]!.hasAttribute('required')).toBe(true);
    expect(radios[1]!.hasAttribute('required')).toBe(false);
  });

  it('disables individual option', () => {
    const withDis: AuRadioOption[] = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
    ];
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = withDis;
      applyFieldHarnessInputs(f, { label: 'Pick' });
    });
    expect(queryRadios(fix)[1]!.disabled).toBe(true);
  });

  it('focus() focuses first enabled radio', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: 'Pick' });
    });
    const first = queryRadios(fix)[0]!;
    const spy = vi.spyOn(first, 'focus');
    CONTROL(fix).focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('optionInputId escapes special characters', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      applyFieldHarnessInputs(f, { controlId: 'rg' });
    });
    expect(CONTROL(fix).optionInputId('a/b')).toContain('rg');
    expect(CONTROL(fix).optionInputId('a/b')).toContain('a-b');
  });

  it('onRadioChange is a no-op when disabled', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      f.componentInstance.disabled = true;
    });
    const radio = queryRadios(fix)[0]!;
    radio.checked = true;
    CONTROL(fix).onRadioChange({ target: radio } as unknown as Event);
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('onShellFocusin runs', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
    });
    CONTROL(fix).onShellFocusin();
  });

  it('emits blur when focus leaves shell', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: 'Pick' });
    });
    let n = 0;
    CONTROL(fix).blur.subscribe(() => n++);
    fix.detectChanges();
    const shell = fix.debugElement.query(By.css('.au-radio-group__shell'))!.nativeElement;
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: shell, configurable: true });
    CONTROL(fix).onShellFocusout(out);
    expect(n).toBe(1);
  });

  it('onShellFocusout returns early for non-HTMLElement', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost);
    fix.detectChanges();
    CONTROL(fix).onShellFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onShellFocusout returns when focus stays inside shell', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: 'Pick' });
    });
    let n = 0;
    CONTROL(fix).blur.subscribe(() => n++);
    fix.detectChanges();
    const shell = fix.debugElement.query(By.css('.au-radio-group__shell'))!.nativeElement;
    const inner = queryRadios(fix)[0]!;
    const ev = new FocusEvent('focusout', { relatedTarget: inner });
    Object.defineProperty(ev, 'currentTarget', { value: shell, configurable: true });
    CONTROL(fix).onShellFocusout(ev);
    expect(n).toBe(0);
  });

  it('legend fallback when label empty', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: '' });
    });
    const legend = fix.debugElement.query(
      By.css('.au-radio-group__fieldset legend'),
    )!.nativeElement;
    expect(legend.textContent?.trim().length).toBeGreaterThan(0);
    expect(legend.classList.contains('au-sr-only')).toBe(true);
  });

  it('uses kind when message missing in errors', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: 'Pick' });
      f.componentInstance.errors = [{ kind: 'required' }] as any;
    });
    const err = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('required');
  });

  it('uses explicit id for option ids', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: 'Pick' });
      applyFieldHarnessInputs(f, { controlId: 'rg99' });
    });
    expect(queryRadios(fix)[0]!.id.startsWith('rg99')).toBe(true);
  });

  it('legend fallback uses name when label empty', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      f.componentInstance.name = 'channel';
      applyFieldHarnessInputs(f, { label: '' });
    });
    const legend = fix.debugElement.query(
      By.css('.au-radio-group__fieldset legend'),
    )!.nativeElement;
    expect(legend.textContent?.trim()).toBe('channel');
    expect(legend.classList.contains('au-sr-only')).toBe(true);
  });

  it('ignores radio change when target not checked', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: 'Pick' });
      f.componentInstance.value = 'b';
    });
    CONTROL(fix).onRadioChange({ target: { checked: false, value: 'a' } } as unknown as Event);
    expect(CONTROL(fix).value()).toBe('b');
  });

  it('optionInputId falls back to opt when value is only symbols', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      applyFieldHarnessInputs(f, { controlId: 'rg' });
    });
    expect(CONTROL(fix).optionInputId('---')).toMatch(/rg-opt$/);
  });

  it('prefers manual errorMessage over errors', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: 'Pick' });
      applyFieldHarnessInputs(f, { errorMessage: 'Manual' });
      f.componentInstance.errors = [{ kind: 'x', message: 'ignored' }] as any;
    });
    expect(
      fix.debugElement.query(By.css('.au-field-error__text'))?.nativeElement.textContent?.trim(),
    ).toBe('Manual');
  });

  it('displayError empty when first error has no usable text', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: 'Pick' });
      f.componentInstance.errors = [{ message: '', kind: '' }] as any;
    });
    expect(CONTROL(fix).displayError()).toBe('');
  });

  it('sets aria-invalid from invalid without visible error', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: 'Pick' });
      f.componentInstance.invalid = true;
    });
    expect(queryRadios(fix)[0]!.getAttribute('aria-invalid')).toBe('true');
  });

  it('sets hint and aria-describedby on radios', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: 'Pick' });
      applyFieldHarnessInputs(f, { hint: 'Choose one option' });
    });
    const hint = fix.debugElement.query(By.css('.au-form-field__hint'))!.nativeElement;
    expect(queryRadios(fix)[0]!.getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('normalizes nullish field harness strings', () => {
    const fix = createFieldFixture(AuRadioGroupTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      applyFieldHarnessInputs(f, { label: null as unknown as string });
      applyFieldHarnessInputs(f, { hint: undefined as unknown as string });
      applyFieldHarnessInputs(f, { errorMessage: null as unknown as string });
    });
    expect(fix.componentInstance.ffLabel()).toBe('');
    expect(fix.componentInstance.ffHint()).toBe('');
    expect(fix.componentInstance.ffErrorMessage()).toBe('');
  });
});
