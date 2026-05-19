import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuSelect, SelectOption } from './select';

describe('AuSelect', () => {
  const testOptions: SelectOption[] = [
    { value: 'opt1', label: 'Option One' },
    { value: 'opt2', label: 'Option Two' },
    { value: 'opt3', label: 'Option Three' },
  ];

  function queryTrigger(fixture: ComponentFixture<AuSelect>): HTMLButtonElement {
    return fixture.debugElement.query(By.css('.au-select__trigger'))!.nativeElement as HTMLButtonElement;
  }

  function keydown(fixture: ComponentFixture<AuSelect>, key: string): void {
    queryTrigger(fixture).dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    fixture.detectChanges();
  }

  function openListbox(fixture: ComponentFixture<AuSelect>): void {
    queryTrigger(fixture).click();
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuSelect],
    }).compileComponents();
  });

  it('resolves triggerEl view child after render', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    expect(fix.componentInstance['triggerRef']!.nativeElement).toBe(queryTrigger(fix));
  });

  it('portals listbox to document.body while open', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    queryTrigger(fix).click();
    fix.detectChanges();
    const listbox = fix.debugElement.query(By.css('.au-field-listbox'))!.nativeElement as HTMLElement;
    expect(listbox.parentElement).toBe(document.body);
    expect(listbox.classList.contains('au-field-listbox--overlay')).toBe(true);
  });

  it('binds value when an option is chosen', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    queryTrigger(fix).click();
    fix.detectChanges();
    const option = fix.debugElement.queryAll(By.css('.au-field-listbox__option'))[1]!.nativeElement;
    option.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBe('opt2');
  });

  it('sets null when placeholder option is chosen', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('placeholder', 'Choose');
    fix.componentRef.setInput('value', 'opt1');
    fix.detectChanges();
    queryTrigger(fix).click();
    fix.detectChanges();
    const placeholder = fix.debugElement.query(By.css('.au-field-listbox__option--placeholder'))!
      .nativeElement;
    placeholder.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('inputDisplay is empty when value is null', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    expect(fix.componentInstance.inputDisplay()).toBe('');
  });

  it('inputDisplay returns the current value string', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('value', 'opt2');
    fix.detectChanges();
    expect(fix.componentInstance.inputDisplay()).toBe('opt2');
  });

  it('emits valueChange via outputToObservable', async () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    fix.detectChanges();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.valueChange).pipe(take(1))),
    );
    fix.componentInstance.selectOption(testOptions[2]!);
    const v = await p;
    expect(v).toBe('opt3');
  });

  it('shows error, aria-errormessage, and invalid on the combobox', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('id', 'f-select');
    fix.componentRef.setInput('errorMessage', 'This field is required');
    fix.detectChanges();
    const trigger = queryTrigger(fix);
    expect(trigger.getAttribute('aria-invalid')).toBe('true');
    expect(trigger.getAttribute('aria-errormessage')).toBe('f-select-error');
    const errText = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(errText?.nativeElement.textContent?.trim()).toBe('This field is required');
  });

  it('does not emit when disabled and changing', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('disabled', true);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () => outputToObservable(comp.valueChange).subscribe(() => n++));
    fix.detectChanges();
    fix.componentInstance.selectOption(testOptions[1]!);
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('renders placeholder option when provided', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('placeholder', 'Select one...');
    fix.detectChanges();
    queryTrigger(fix).click();
    fix.detectChanges();
    const options = fix.debugElement.queryAll(By.css('.au-field-listbox__option'));
    expect(options.length).toBe(4);
    expect(options[0].nativeElement.textContent?.trim()).toBe('Select one...');
  });

  it('renders option disabled when option has disabled flag', () => {
    const optionsWithDisabled: SelectOption[] = [
      { value: 'opt1', label: 'Option One' },
      { value: 'opt2', label: 'Option Two', disabled: true },
    ];
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', optionsWithDisabled);
    fix.detectChanges();
    queryTrigger(fix).click();
    fix.detectChanges();
    const options = fix.debugElement.queryAll(By.css('.au-field-listbox__option'));
    expect(options[1].nativeElement.getAttribute('aria-disabled')).toBe('true');
  });

  it('renders label when provided', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('label', 'Choose option');
    fix.detectChanges();
    const label = fix.debugElement.query(By.css('.au-select__label'));
    expect(label?.nativeElement.textContent).toContain('Choose option');
  });

  it('sets hint and aria-describedby on the select', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('hint', 'Pick any');
    fix.detectChanges();
    const trigger = queryTrigger(fix);
    const hint = fix.debugElement.query(By.css('.au-select__hint'))!.nativeElement;
    expect(trigger.getAttribute('aria-describedby')).toBe(hint.id);
    expect(hint.textContent?.trim()).toBe('Pick any');
  });

  it('emits blur from trigger blur', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    let n = 0;
    fix.componentInstance.blur.subscribe(() => n++);
    fix.detectChanges();
    queryTrigger(fix).dispatchEvent(new FocusEvent('blur'));
    expect(n).toBe(1);
  });

  it('focus() focuses the combobox trigger', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const trigger = queryTrigger(fix);
    const spy = vi.spyOn(trigger, 'focus');
    fix.componentInstance.focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('shows displayError from errors when no manual message', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('errors', [{ kind: 'required', message: 'Field required' }] as any);
    fix.detectChanges();
    const err = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('Field required');
  });

  it('falls back to kind when message missing', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('errors', [{ kind: 'broken' }] as any);
    fix.detectChanges();
    const err = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('broken');
  });

  it('marks aria-invalid when invalid without visible error', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('invalid', true);
    fix.detectChanges();
    expect(queryTrigger(fix).getAttribute('aria-invalid')).toBe('true');
  });

  it('hides required asterisk when showRequired is false', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('label', 'Country');
    fix.componentRef.setInput('required', true);
    fix.componentRef.setInput('showRequired', false);
    fix.detectChanges();
    const label = fix.debugElement.query(By.css('.au-select__label'))!.nativeElement;
    expect(label.textContent).not.toContain('*');
  });

  it('omits placeholder option when placeholder empty', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    queryTrigger(fix).click();
    fix.detectChanges();
    expect(fix.debugElement.queryAll(By.css('.au-field-listbox__option')).length).toBe(3);
  });

  it('exposes autocomplete attribute input', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('autocomplete', 'country');
    fix.detectChanges();
    expect(fix.componentInstance.autocomplete()).toBe('country');
  });

  it('uses explicit id when provided', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('id', 'custom-select');
    fix.detectChanges();
    expect(queryTrigger(fix).id).toBe('custom-select');
  });

  it('renders hidden name input for form posts', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('name', 'country');
    fix.componentRef.setInput('value', 'opt2');
    fix.detectChanges();
    const hidden = fix.debugElement.query(By.css('input[type="hidden"]'))!.nativeElement as HTMLInputElement;
    expect(hidden.name).toBe('country');
    expect(hidden.value).toBe('opt2');
  });

  it('generates id when id omitted', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    expect(queryTrigger(fix).id.startsWith('au-select-')).toBe(true);
  });

  it('onControlRowFocusout ignores non-HTMLElement currentTarget', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    fix.componentInstance.onControlRowFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onControlRowFocusout returns when focus stays inside control row', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-select__control-row'))!.nativeElement;
    const trigger = queryTrigger(fix);
    const ev = new FocusEvent('focusout', { relatedTarget: trigger });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(ev);
  });

  it('prefers manual errorMessage over errors', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('errorMessage', 'Manual');
    fix.componentRef.setInput('errors', [{ kind: 'x', message: 'ignored' }] as any);
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-field-error__text'))?.nativeElement.textContent?.trim()).toBe('Manual');
  });

  it('applies and clears from-tab on control row', () => {
    const fix = TestBed.createComponent(AuSelect);
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
    const fix = TestBed.createComponent(AuSelect);
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
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('errors', [{ message: '', kind: '' }] as any);
    fix.detectChanges();
    expect(fix.componentInstance.displayError()).toBe('');
  });

  it('keyboard ArrowDown and Enter selects option', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    keydown(fix, 'ArrowDown');
    keydown(fix, 'Enter');
    expect(fix.componentInstance.value()).toBe('opt1');
  });

  it('Space opens panel when closed', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    keydown(fix, ' ');
    expect(document.querySelector('.au-field-listbox')).toBeTruthy();
  });

  it('Escape closes open panel', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    openListbox(fix);
    keydown(fix, 'Escape');
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('Home and End move highlight', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    openListbox(fix);
    keydown(fix, 'End');
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Option Three');
    keydown(fix, 'Home');
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Option One');
  });

  it('keyboard no-ops when panel closed for Home, End, Escape', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    for (const key of ['Home', 'End', 'Escape']) {
      keydown(fix, key);
    }
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('ArrowUp opens panel and highlights last option', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    keydown(fix, 'ArrowUp');
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Option Three');
  });

  it('ArrowDown moves highlight when panel is already open', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    openListbox(fix);
    keydown(fix, 'ArrowDown');
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Option Two');
  });

  it('ArrowDown wraps from last to first highlightable', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    openListbox(fix);
    keydown(fix, 'End');
    keydown(fix, 'ArrowDown');
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Option One');
  });

  it('ArrowUp wraps from first to last highlightable', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    openListbox(fix);
    keydown(fix, 'Home');
    keydown(fix, 'ArrowUp');
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Option Three');
  });

  it('skips disabled options on ArrowDown', () => {
    const opts: SelectOption[] = [
      { value: 'a', label: 'Alpha', disabled: true },
      { value: 'b', label: 'Beta' },
    ];
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', opts);
    fix.detectChanges();
    openListbox(fix);
    keydown(fix, 'ArrowDown');
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Beta');
  });

  it('trigger click toggles panel closed', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    openListbox(fix);
    queryTrigger(fix).click();
    fix.detectChanges();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('onKeydown is a no-op when disabled', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('disabled', true);
    fix.detectChanges();
    keydown(fix, 'ArrowDown');
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('onKeydown is a no-op when readOnly', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('readOnly', true);
    fix.detectChanges();
    keydown(fix, 'ArrowDown');
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('onTriggerClick is a no-op when disabled only', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('disabled', true);
    fix.detectChanges();
    queryTrigger(fix).click();
    fix.detectChanges();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('onTriggerClick is a no-op when readOnly only', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('readOnly', true);
    fix.detectChanges();
    queryTrigger(fix).click();
    fix.detectChanges();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('highlights placeholder row on pointer enter', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('placeholder', 'Choose');
    fix.detectChanges();
    openListbox(fix);
    fix.componentInstance.onOptionPointerEnter(0);
    fix.detectChanges();
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Choose');
  });

  it('does not toggle when disabled or readOnly', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('disabled', true);
    fix.detectChanges();
    queryTrigger(fix).click();
    fix.detectChanges();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
    fix.componentRef.setInput('disabled', false);
    fix.componentRef.setInput('readOnly', true);
    fix.detectChanges();
    queryTrigger(fix).click();
    fix.detectChanges();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('openPanel is a no-op when disabled or readOnly', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('disabled', true);
    fix.detectChanges();
    const comp = fix.componentInstance as unknown as { openPanel(): void };
    comp.openPanel();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
    fix.componentRef.setInput('disabled', false);
    fix.componentRef.setInput('readOnly', true);
    fix.detectChanges();
    comp.openPanel();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('openPanel highlights current value when reopening', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('value', 'opt2');
    fix.detectChanges();
    openListbox(fix);
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Option Two');
  });

  it('Enter on placeholder clears value', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('placeholder', 'Choose');
    fix.componentRef.setInput('value', 'opt1');
    fix.detectChanges();
    openListbox(fix);
    keydown(fix, 'Home');
    keydown(fix, 'Enter');
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('setValue does not emit when value unchanged', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('value', 'opt1');
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () =>
      outputToObservable(comp.valueChange).subscribe(() => n++),
    );
    fix.detectChanges();
    comp.selectOption(testOptions[0]!);
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('highlights option on pointer enter', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    openListbox(fix);
    const option = fix.debugElement.queryAll(By.css('.au-field-listbox__option'))[1]!.nativeElement;
    option.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fix.detectChanges();
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Option Two');
  });

  it('ignores pointer enter on disabled option', () => {
    const opts: SelectOption[] = [{ value: 'x', label: 'X', disabled: true }];
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', opts);
    fix.detectChanges();
    openListbox(fix);
    fix.componentInstance.onOptionPointerEnter(0, opts[0]!);
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-field-listbox__option--active'))).toBeFalsy();
  });

  it('ignores pointer enter when disabled or readOnly', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('disabled', true);
    fix.detectChanges();
    fix.componentInstance.onOptionPointerEnter(0, testOptions[0]!);
    fix.componentRef.setInput('disabled', false);
    fix.componentRef.setInput('readOnly', true);
    fix.detectChanges();
    fix.componentInstance.onOptionPointerEnter(0, testOptions[0]!);
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('ignores mousedown on disabled option', () => {
    const opts: SelectOption[] = [{ value: 'x', label: 'X', disabled: true }];
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', opts);
    fix.detectChanges();
    fix.componentInstance.onOptionPointerDown(new Event('mousedown'), opts[0]!);
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('ignores placeholder mousedown when readOnly', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('placeholder', 'Choose');
    fix.componentRef.setInput('readOnly', true);
    fix.detectChanges();
    fix.componentInstance.onPlaceholderPointerDown(new Event('mousedown'));
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('onControlRowFocusout ignores focus moving into portaled listbox', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    openListbox(fix);
    const row = fix.debugElement.query(By.css('.au-select__control-row'))!.nativeElement;
    const option = fix.debugElement.query(By.css('.au-field-listbox__option'))!.nativeElement;
    const ev = new FocusEvent('focusout', { relatedTarget: option });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(ev);
    expect(document.querySelector('.au-field-listbox')).toBeTruthy();
  });

  it('triggerLabel is empty for unknown value', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('value', 'missing');
    fix.detectChanges();
    expect(fix.componentInstance.triggerLabel()).toBe('');
  });

  it('showingPlaceholder is true when value is null and placeholder set', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('placeholder', 'Pick');
    fix.detectChanges();
    expect(fix.componentInstance.showingPlaceholder()).toBe(true);
  });

  it('activeDescendantId uses placeholder id when highlighted', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('placeholder', 'Choose');
    fix.detectChanges();
    openListbox(fix);
    keydown(fix, 'Home');
    expect(queryTrigger(fix).getAttribute('aria-activedescendant')).toContain('-option-placeholder');
  });

  it('activeDescendantId is null when highlight is out of range', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const comp = fix.componentInstance as unknown as {
      panelOpen: { set(v: boolean): void };
      highlightedIndex: { set(v: number): void };
    };
    comp.panelOpen.set(true);
    comp.highlightedIndex.set(99);
    fix.detectChanges();
    expect(queryTrigger(fix).getAttribute('aria-activedescendant')).toBeNull();
  });

  it('lastHighlightableIndex is -1 when every option is disabled', () => {
    const opts: SelectOption[] = [
      { value: 'a', label: 'A', disabled: true },
      { value: 'b', label: 'B', disabled: true },
    ];
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', opts);
    fix.detectChanges();
    keydown(fix, 'ArrowUp');
    expect(fix.debugElement.query(By.css('.au-field-listbox__option--active'))).toBeFalsy();
  });

  it('ArrowDown on empty list keeps highlight unset', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', []);
    fix.detectChanges();
    keydown(fix, 'ArrowDown');
    expect(queryTrigger(fix).getAttribute('aria-activedescendant')).toBeNull();
  });

  it('ignores unhandled keys in onKeydown', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    keydown(fix, 'Tab');
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('Enter does not select when no highlightable option', () => {
    const opts: SelectOption[] = [{ value: 'x', label: 'X', disabled: true }];
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', opts);
    fix.detectChanges();
    openListbox(fix);
    keydown(fix, 'Enter');
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('nextHighlightableIndex returns -1 when list is empty', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', []);
    fix.detectChanges();
    const comp = fix.componentInstance as unknown as {
      panelOpen: { set(v: boolean): void };
      highlightedIndex: { set(v: number): void; (): number };
    };
    comp.panelOpen.set(true);
    comp.highlightedIndex.set(0);
    fix.detectChanges();
    keydown(fix, 'ArrowDown');
    expect(comp.highlightedIndex()).toBe(-1);
  });

  it('nextHighlightableIndex returns current when no enabled target exists', () => {
    const opts: SelectOption[] = [
      { value: 'a', label: 'A', disabled: true },
      { value: 'b', label: 'B', disabled: true },
    ];
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', opts);
    fix.detectChanges();
    const comp = fix.componentInstance as unknown as {
      panelOpen: { set(v: boolean): void };
      highlightedIndex: { set(v: number): void; (): number };
    };
    comp.panelOpen.set(true);
    comp.highlightedIndex.set(0);
    fix.detectChanges();
    keydown(fix, 'ArrowDown');
    expect(comp.highlightedIndex()).toBe(0);
  });

  it('ArrowUp from unset highlight uses last enabled index', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const comp = fix.componentInstance as unknown as {
      panelOpen: { set(v: boolean): void };
      highlightedIndex: { set(v: number): void };
    };
    comp.panelOpen.set(true);
    comp.highlightedIndex.set(-1);
    fix.detectChanges();
    keydown(fix, 'ArrowUp');
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Option Three');
  });

  it('exposes option and placeholder id helpers', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('placeholder', 'Choose');
    fix.detectChanges();
    const comp = fix.componentInstance;
    expect(comp.placeholderOptionIndex()).toBe(0);
    expect(comp.placeholderOptionId()).toContain('-option-placeholder');
    expect(comp.optionListIndex(1)).toBe(2);
    expect(comp.optionId(0)).toContain('-option-0');
  });

  it('placeholderOptionIndex is -1 without placeholder', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    expect(fix.componentInstance.placeholderOptionIndex()).toBe(-1);
  });

  it('openPanel keeps highlight when already set', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const comp = fix.componentInstance as unknown as {
      panelOpen: { set(v: boolean): void };
      highlightedIndex: { set(v: number): void; (): number };
    };
    openListbox(fix);
    comp.panelOpen.set(false);
    comp.highlightedIndex.set(2);
    fix.detectChanges();
    queryTrigger(fix).click();
    fix.detectChanges();
    expect(comp.highlightedIndex()).toBe(2);
  });

  it('onTriggerClick returns early for disabled and readOnly guards', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('disabled', true);
    fix.detectChanges();
    fix.componentInstance.onTriggerClick();
    fix.componentRef.setInput('disabled', false);
    fix.componentRef.setInput('readOnly', true);
    fix.detectChanges();
    fix.componentInstance.onTriggerClick();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('onTriggerClick is a no-op when disabled and readOnly', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('disabled', true);
    fix.componentRef.setInput('readOnly', true);
    fix.detectChanges();
    queryTrigger(fix).click();
    fix.detectChanges();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('End highlights placeholder when it is the only list row', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', []);
    fix.componentRef.setInput('placeholder', 'Pick one');
    fix.detectChanges();
    openListbox(fix);
    keydown(fix, 'End');
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Pick one');
  });

  it('Enter selects option when list includes a placeholder row', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('placeholder', 'Choose');
    fix.detectChanges();
    openListbox(fix);
    keydown(fix, 'ArrowDown');
    keydown(fix, 'ArrowDown');
    keydown(fix, 'Enter');
    expect(fix.componentInstance.value()).toBe('opt2');
  });

  it('pointer enter on option row resolves index with placeholder offset', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('placeholder', 'Choose');
    fix.detectChanges();
    openListbox(fix);
    fix.componentInstance.onOptionPointerEnter(2, testOptions[1]);
    fix.detectChanges();
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Option Two');
  });

  it('Enter selects highlighted option without placeholder', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    openListbox(fix);
    keydown(fix, 'Home');
    keydown(fix, 'Enter');
    expect(fix.componentInstance.value()).toBe('opt1');
  });

  it('Enter does not select a disabled highlighted option', () => {
    const opts: SelectOption[] = [{ value: 'x', label: 'X', disabled: true }];
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', opts);
    fix.detectChanges();
    openListbox(fix);
    keydown(fix, 'Enter');
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('ArrowDown from unset highlight starts search at index -1', () => {
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const comp = fix.componentInstance as unknown as {
      panelOpen: { set(v: boolean): void };
      highlightedIndex: { set(v: number): void; (): number };
    };
    comp.panelOpen.set(true);
    comp.highlightedIndex.set(-1);
    fix.detectChanges();
    keydown(fix, 'ArrowDown');
    expect(comp.highlightedIndex()).toBe(0);
  });

  it('openPanel highlights matching value when current option is disabled', () => {
    const opts: SelectOption[] = [
      { value: 'opt1', label: 'One', disabled: true },
      { value: 'opt2', label: 'Two' },
    ];
    const fix = TestBed.createComponent(AuSelect);
    fix.componentRef.setInput('options', opts);
    fix.componentRef.setInput('value', 'opt1');
    fix.detectChanges();
    openListbox(fix);
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Two');
  });
});