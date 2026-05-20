import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuRadioGroup, AuRadioOption } from './radio-group';

describe('AuRadioGroup', () => {
  const opts: AuRadioOption[] = [
    { value: 'a', label: 'Alpha' },
    { value: 'b', label: 'Beta' },
  ];

  function queryRadios(fixture: ComponentFixture<AuRadioGroup>): HTMLInputElement[] {
    return fixture.debugElement
      .queryAll(By.css('.au-radio-group__input'))
      .map((d) => d.nativeElement as HTMLInputElement);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuRadioGroup],
    }).compileComponents();
  });

  it('updates value when a radio is selected', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('label', 'Pick');
    fix.detectChanges();
    const radios = queryRadios(fix);
    radios[1]!.checked = true;
    radios[1]!.dispatchEvent(new Event('change'));
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBe('b');
  });

  it('emits valueChange', async () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('label', 'Pick');
    const comp = fix.componentInstance;
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
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('label', 'Pick');
    fix.componentRef.setInput('disabled', true);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () => outputToObservable(comp.valueChange).subscribe(() => n++));
    fix.detectChanges();
    const radios = queryRadios(fix);
    radios[1]!.dispatchEvent(new Event('change'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('uses custom name when provided', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('label', 'Pick');
    fix.componentRef.setInput('name', 'choice');
    fix.detectChanges();
    expect(queryRadios(fix)[0]!.getAttribute('name')).toBe('choice');
  });

  it('shows error and aria-errormessage on radios', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('label', 'Pick');
    fix.componentRef.setInput('id', 'rg1');
    fix.componentRef.setInput('errorMessage', 'Choose one');
    fix.detectChanges();
    const r = queryRadios(fix)[0]!;
    expect(r.getAttribute('aria-invalid')).toBe('true');
    expect(r.getAttribute('aria-errormessage')).toBe('rg1-error');
  });

  it('sets required only on first radio', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('label', 'Pick');
    fix.componentRef.setInput('required', true);
    fix.detectChanges();
    const radios = queryRadios(fix);
    expect(radios[0]!.hasAttribute('required')).toBe(true);
    expect(radios[1]!.hasAttribute('required')).toBe(false);
  });

  it('disables individual option', () => {
    const withDis: AuRadioOption[] = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
    ];
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', withDis);
    fix.componentRef.setInput('label', 'Pick');
    fix.detectChanges();
    expect(queryRadios(fix)[1]!.disabled).toBe(true);
  });

  it('focus() focuses first enabled radio', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('label', 'Pick');
    fix.detectChanges();
    const first = queryRadios(fix)[0]!;
    const spy = vi.spyOn(first, 'focus');
    fix.componentInstance.focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('optionInputId escapes special characters', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('id', 'rg');
    fix.detectChanges();
    expect(fix.componentInstance.optionInputId('a/b')).toContain('rg');
    expect(fix.componentInstance.optionInputId('a/b')).toContain('a-b');
  });

  it('emits blur when focus leaves shell', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('label', 'Pick');
    let n = 0;
    fix.componentInstance.blur.subscribe(() => n++);
    fix.detectChanges();
    const shell = fix.debugElement.query(By.css('.au-radio-group__shell'))!.nativeElement;
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: shell, configurable: true });
    fix.componentInstance.onShellFocusout(out);
    expect(n).toBe(1);
  });

  it('onShellFocusout returns early for non-HTMLElement', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.detectChanges();
    fix.componentInstance.onShellFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onShellFocusout returns when focus stays inside shell', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('label', 'Pick');
    let n = 0;
    fix.componentInstance.blur.subscribe(() => n++);
    fix.detectChanges();
    const shell = fix.debugElement.query(By.css('.au-radio-group__shell'))!.nativeElement;
    const inner = queryRadios(fix)[0]!;
    const ev = new FocusEvent('focusout', { relatedTarget: inner });
    Object.defineProperty(ev, 'currentTarget', { value: shell, configurable: true });
    fix.componentInstance.onShellFocusout(ev);
    expect(n).toBe(0);
  });

  it('legend fallback when label empty', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.detectChanges();
    const legend = fix.debugElement.query(By.css('.au-radio-group__fieldset legend'))!.nativeElement;
    expect(legend.textContent?.trim().length).toBeGreaterThan(0);
    expect(legend.classList.contains('au-sr-only')).toBe(true);
  });

  it('uses kind when message missing in errors', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('label', 'Pick');
    fix.componentRef.setInput('errors', [{ kind: 'required' }] as any);
    fix.detectChanges();
    const err = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('required');
  });

  it('uses explicit id for option ids', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('label', 'Pick');
    fix.componentRef.setInput('id', 'rg99');
    fix.detectChanges();
    expect(queryRadios(fix)[0]!.id.startsWith('rg99')).toBe(true);
  });

  it('legend fallback uses name when label empty', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('name', 'channel');
    fix.detectChanges();
    const legend = fix.debugElement.query(By.css('.au-radio-group__fieldset legend'))!.nativeElement;
    expect(legend.textContent?.trim()).toBe('channel');
    expect(legend.classList.contains('au-sr-only')).toBe(true);
  });

  it('ignores radio change when target not checked', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('label', 'Pick');
    fix.componentRef.setInput('value', 'b');
    fix.detectChanges();
    fix.componentInstance.onRadioChange({ target: { checked: false, value: 'a' } } as unknown as Event);
    expect(fix.componentInstance.value()).toBe('b');
  });

  it('optionInputId falls back to opt when value is only symbols', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('id', 'rg');
    fix.detectChanges();
    expect(fix.componentInstance.optionInputId('---')).toMatch(/rg-opt$/);
  });

  it('prefers manual errorMessage over errors', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('label', 'Pick');
    fix.componentRef.setInput('errorMessage', 'Manual');
    fix.componentRef.setInput('errors', [{ kind: 'x', message: 'ignored' }] as any);
    fix.detectChanges();
    expect(fix.componentInstance.displayError()).toBe('Manual');
  });

  it('displayError empty when first error has no usable text', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('label', 'Pick');
    fix.componentRef.setInput('errors', [{ message: '', kind: '' }] as any);
    fix.detectChanges();
    expect(fix.componentInstance.displayError()).toBe('');
  });

  it('sets aria-invalid from invalid without visible error', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('label', 'Pick');
    fix.componentRef.setInput('invalid', true);
    fix.detectChanges();
    expect(queryRadios(fix)[0]!.getAttribute('aria-invalid')).toBe('true');
  });

  it('sets hint and aria-describedby on radios', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('label', 'Pick');
    fix.componentRef.setInput('hint', 'Choose one option');
    fix.detectChanges();
    const hint = fix.debugElement.query(By.css('.au-radio-group__hint'))!.nativeElement;
    expect(queryRadios(fix)[0]!.getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('normalizes nullish string inputs', () => {
    const fix = TestBed.createComponent(AuRadioGroup);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('label', null as unknown as string);
    fix.componentRef.setInput('hint', undefined as unknown as string);
    fix.componentRef.setInput('errorMessage', null as unknown as string);
    fix.detectChanges();
    expect(fix.componentInstance.label()).toBe('');
    expect(fix.componentInstance.hint()).toBe('');
    expect(fix.componentInstance.errorMessage()).toBe('');
  });
});
