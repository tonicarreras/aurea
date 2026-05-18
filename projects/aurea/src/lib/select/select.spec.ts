import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { Select, SelectOption } from './select';

describe('Select', () => {
  const testOptions: SelectOption[] = [
    { value: 'opt1', label: 'Option One' },
    { value: 'opt2', label: 'Option Two' },
    { value: 'opt3', label: 'Option Three' },
  ];

  function querySelect(fixture: ComponentFixture<Select>): HTMLSelectElement {
    return fixture.debugElement.query(By.css('.au-select__element'))!.nativeElement as HTMLSelectElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Select],
    }).compileComponents();
  });

  it('binds value on change (model) and select reflects value', async () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const comp = fix.componentInstance;
    const el = querySelect(fix);
    el.value = 'opt2';
    el.dispatchEvent(new Event('change'));
    fix.detectChanges();
    expect(comp.value()).toBe('opt2');
  });

  it('sets null when cleared to empty option', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('placeholder', 'Choose');
    fix.componentRef.setInput('value', 'opt1');
    fix.detectChanges();
    const el = querySelect(fix);
    el.value = '';
    el.dispatchEvent(new Event('change'));
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('inputDisplay is empty when value is null', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    expect(fix.componentInstance.inputDisplay()).toBe('');
  });

  it('emits valueChange via outputToObservable', async () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    fix.detectChanges();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.valueChange).pipe(take(1))),
    );
    const el = querySelect(fix);
    el.value = 'opt3';
    el.dispatchEvent(new Event('change'));
    const v = await p;
    expect(v).toBe('opt3');
  });

  it('shows error, aria-errormessage, and invalid on the select', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('id', 'f-select');
    fix.componentRef.setInput('errorMessage', 'This field is required');
    fix.detectChanges();
    const select = querySelect(fix);
    expect(select.getAttribute('aria-invalid')).toBe('true');
    expect(select.getAttribute('aria-errormessage')).toBe('f-select-error');
    const errText = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(errText?.nativeElement.textContent?.trim()).toBe('This field is required');
  });

  it('does not emit when disabled and changing', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('disabled', true);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () => outputToObservable(comp.valueChange).subscribe(() => n++));
    fix.detectChanges();
    const el = querySelect(fix);
    el.value = 'opt2';
    el.dispatchEvent(new Event('change'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('renders placeholder option when provided', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('placeholder', 'Select one...');
    fix.detectChanges();
    const options = fix.debugElement.queryAll(By.css('option'));
    expect(options.length).toBe(4); // placeholder + 3 options
    expect(options[0].nativeElement.value).toBe('');
    expect(options[0].nativeElement.textContent?.trim()).toBe('Select one...');
  });

  it('renders option disabled when option has disabled flag', () => {
    const optionsWithDisabled: SelectOption[] = [
      { value: 'opt1', label: 'Option One' },
      { value: 'opt2', label: 'Option Two', disabled: true },
    ];
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', optionsWithDisabled);
    fix.detectChanges();
    const options = fix.debugElement.queryAll(By.css('option'));
    expect(options[1].nativeElement.disabled).toBe(true);
  });

  it('renders label when provided', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('label', 'Choose option');
    fix.detectChanges();
    const label = fix.debugElement.query(By.css('.au-select__label'));
    expect(label?.nativeElement.textContent).toContain('Choose option');
  });

  it('sets hint and aria-describedby on the select', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('hint', 'Pick any');
    fix.detectChanges();
    const sel = querySelect(fix);
    const hint = fix.debugElement.query(By.css('.au-select__hint'))!.nativeElement;
    expect(sel.getAttribute('aria-describedby')).toBe(hint.id);
    expect(hint.textContent?.trim()).toBe('Pick any');
  });

  it('emits blur from native select blur', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    let n = 0;
    fix.componentInstance.blur.subscribe(() => n++);
    fix.detectChanges();
    querySelect(fix).dispatchEvent(new FocusEvent('blur'));
    expect(n).toBe(1);
  });

  it('focus() focuses the native select', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const sel = querySelect(fix);
    const spy = vi.spyOn(sel, 'focus');
    fix.componentInstance.focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('shows displayError from errors when no manual message', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('errors', [{ kind: 'required', message: 'Field required' }] as any);
    fix.detectChanges();
    const err = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('Field required');
  });

  it('falls back to kind when message missing', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('errors', [{ kind: 'broken' }] as any);
    fix.detectChanges();
    const err = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('broken');
  });

  it('marks aria-invalid when invalid without visible error', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('invalid', true);
    fix.detectChanges();
    expect(querySelect(fix).getAttribute('aria-invalid')).toBe('true');
  });

  it('hides required asterisk when showRequired is false', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('label', 'Country');
    fix.componentRef.setInput('required', true);
    fix.componentRef.setInput('showRequired', false);
    fix.detectChanges();
    const label = fix.debugElement.query(By.css('.au-select__label'))!.nativeElement;
    expect(label.textContent).not.toContain('*');
  });

  it('omits placeholder option when placeholder empty', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    expect(fix.debugElement.queryAll(By.css('option')).length).toBe(3);
  });

  it('generates id when id omitted', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    expect(querySelect(fix).id.startsWith('au-select-')).toBe(true);
  });

  it('onControlRowFocusout ignores non-HTMLElement currentTarget', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    fix.componentInstance.onControlRowFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onControlRowFocusout returns when focus stays inside control row', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-select__control-row'))!.nativeElement;
    const sel = querySelect(fix);
    const ev = new FocusEvent('focusout', { relatedTarget: sel });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(ev);
  });

  it('prefers manual errorMessage over errors', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('errorMessage', 'Manual');
    fix.componentRef.setInput('errors', [{ kind: 'x', message: 'ignored' }] as any);
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-field-error__text'))?.nativeElement.textContent?.trim()).toBe('Manual');
  });

  it('applies and clears from-tab on control row', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-select__control-row'))!.nativeElement;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fix.debugElement.query(By.css('.au-select__control-row'))!.triggerEventHandler('focusin', new FocusEvent('focusin'));
    fix.detectChanges();
    expect(row.classList.contains('au-select__control-row--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(out);
    fix.detectChanges();
    expect(row.classList.contains('au-select__control-row--from-tab')).toBe(false);
  });

  it('normalizes nullish string inputs in transforms', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('label', null as unknown as string);
    fix.componentRef.setInput('hint', undefined as unknown as string);
    fix.componentRef.setInput('errorMessage', null as unknown as string);
    fix.componentRef.setInput('placeholder', undefined as unknown as string);
    fix.detectChanges();
    expect(fix.componentInstance.label()).toBe('');
    expect(fix.componentInstance.hint()).toBe('');
    expect(fix.componentInstance.errorMessage()).toBe('');
    expect(fix.componentInstance.placeholder()).toBe('');
  });

  it('displayError returns empty when first error has no usable message or kind', () => {
    const fix = TestBed.createComponent(Select);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('errors', [{ message: '', kind: '' }] as any);
    fix.detectChanges();
    expect(fix.componentInstance.displayError()).toBe('');
  });
});