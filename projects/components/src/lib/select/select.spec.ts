import { Component, Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuSelect, AuSelectOption } from './select';
import { AuFormField } from '../form-field/form-field';
import {
  AuSelectTestHost,
  applyFieldHarnessInputs,
  createFieldFixture,
  queryControl,
} from '../form-field/form-field.spec-hosts';

describe('AuSelect', () => {
  function CONTROL(fixture: ComponentFixture<AuSelectTestHost>) {
    return queryControl(fixture, AuSelect);
  }

  const testOptions: AuSelectOption[] = [
    { value: 'opt1', label: 'Option One' },
    { value: 'opt2', label: 'Option Two' },
    { value: 'opt3', label: 'Option Three' },
  ];

  function queryTrigger(fixture: ComponentFixture<AuSelectTestHost>): HTMLButtonElement {
    return fixture.debugElement.query(By.css('.au-select__trigger'))!
      .nativeElement as HTMLButtonElement;
  }

  async function keydown(fixture: ComponentFixture<AuSelectTestHost>, key: string): Promise<void> {
    queryTrigger(fixture).dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    await fixture.whenStable();
  }

  async function openListbox(fixture: ComponentFixture<AuSelectTestHost>): Promise<void> {
    queryTrigger(fixture).click();
    await fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuSelectTestHost],
    }).compileComponents();
  });

  it('portals listbox to document.body while open',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    queryTrigger(fix).click();
    await fix.whenStable();
    const listbox = fix.debugElement.query(By.css('.au-field-listbox'))!
      .nativeElement as HTMLElement;
    expect(listbox.parentElement).toBe(document.body);
    expect(listbox.classList.contains('au-field-listbox--overlay')).toBe(true);
  });

  it('listboxNative returns undefined when the listbox node is not in the document', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    const spy = vi.spyOn(document, 'getElementById').mockReturnValue(null);
    expect(CONTROL(fix)['listboxNative']()).toBeUndefined();
    spy.mockRestore();
  });

  it('syncListboxOverlay no-ops when the trigger is outside the control row', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const row = fix.debugElement.query(By.css('.au-select__control-row'))!.nativeElement;
    row.classList.remove('au-select__control-row');
    await openListbox(fix);
    const listbox = fix.debugElement.query(By.css('.au-field-listbox'))!
      .nativeElement as HTMLElement;
    expect(listbox.parentElement).not.toBe(document.body);
    expect(listbox.classList.contains('au-field-listbox--overlay')).toBe(false);
  });

  it('binds value when an option is chosen',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    queryTrigger(fix).click();
    await fix.whenStable();
    const option = fix.debugElement.queryAll(By.css('.au-field-listbox__option'))[1]!.nativeElement;
    option.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBe('opt2');
  });

  it('coerces numeric placeholder through transform', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.placeholder = 42 as unknown as string;
    });
    expect(CONTROL(fix).placeholder()).toBe('42');
  });

  it('normalizes nullish placeholder transform', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.placeholder = null as unknown as string;
    });
    expect(CONTROL(fix).placeholder()).toBe('');
  });

  it('sets null when placeholder option is chosen',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.placeholder = 'Choose';
      f.componentInstance.value = 'opt1';
    });
    queryTrigger(fix).click();
    await fix.whenStable();
    const placeholder = fix.debugElement.query(
      By.css('.au-field-listbox__option--placeholder'),
    )!.nativeElement;
    placeholder.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('inputDisplay is empty when value is null', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    expect(CONTROL(fix).inputDisplay()).toBe('');
  });

  it('inputDisplay returns the current value string', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.value = 'opt2';
    });
    expect(CONTROL(fix).inputDisplay()).toBe('opt2');
  });

  it('emits valueChange via outputToObservable', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    await fix.whenStable();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.value).pipe(take(1))),
    );
    CONTROL(fix).selectOption(testOptions[2]!);
    const v = await p;
    expect(v).toBe('opt3');
  });

  it('shows error, aria-errormessage, and invalid on the combobox', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      applyFieldHarnessInputs(f, { controlId: 'f-select' });
      applyFieldHarnessInputs(f, { errorMessage: 'This field is required' });
    });
    const trigger = queryTrigger(fix);
    expect(trigger.getAttribute('aria-invalid')).toBe('true');
    expect(trigger.getAttribute('aria-errormessage')).toBe('f-select-error');
    const errText = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(errText?.nativeElement.textContent?.trim()).toBe('This field is required');
  });

  it('does not emit when disabled and changing',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.disabled = true;
    });
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () =>
      outputToObservable(comp.value).subscribe(() => n++),
    );
    await fix.whenStable();
    CONTROL(fix).selectOption(testOptions[1]!);
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('renders placeholder option when provided',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.placeholder = 'Select one...';
    });
    queryTrigger(fix).click();
    await fix.whenStable();
    const options = fix.debugElement.queryAll(By.css('.au-field-listbox__option'));
    expect(options.length).toBe(4);
    expect(options[0].nativeElement.textContent?.trim()).toBe('Select one...');
  });

  it('renders option disabled when option has disabled flag',async  () => {
    const optionsWithDisabled: AuSelectOption[] = [
      { value: 'opt1', label: 'Option One' },
      { value: 'opt2', label: 'Option Two', disabled: true },
    ];
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = optionsWithDisabled;
    });
    queryTrigger(fix).click();
    await fix.whenStable();
    const options = fix.debugElement.queryAll(By.css('.au-field-listbox__option'));
    expect(options[1].nativeElement.getAttribute('aria-disabled')).toBe('true');
  });

  it('renders label when provided', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      applyFieldHarnessInputs(f, { label: 'Choose option' });
    });
    const label = fix.debugElement.query(By.css('.au-form-field__label'));
    expect(label?.nativeElement.textContent).toContain('Choose option');
  });

  it('sets hint and aria-describedby on the select', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      applyFieldHarnessInputs(f, { hint: 'Pick any' });
    });
    const trigger = queryTrigger(fix);
    const hint = fix.debugElement.query(By.css('.au-form-field__hint'))!.nativeElement;
    expect(trigger.getAttribute('aria-describedby')).toBe(hint.id);
    expect(hint.textContent?.trim()).toBe('Pick any');
  });

  it('onControlRowFocusin runs', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    (CONTROL(fix) as unknown as { onControlRowFocusin(): void }).onControlRowFocusin();
  });

  it('emits blur from trigger blur',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    let n = 0;
    CONTROL(fix).blur.subscribe(() => n++);
    await fix.whenStable();
    queryTrigger(fix).dispatchEvent(new FocusEvent('blur'));
    expect(n).toBe(1);
  });

  it('focus() focuses the combobox trigger', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const trigger = queryTrigger(fix);
    const spy = vi.spyOn(trigger, 'focus');
    CONTROL(fix).focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('shows displayError from errors when no manual message', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.errors = [{ kind: 'required', message: 'Field required' }] as any;
    });
    const err = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('Field required');
  });

  it('falls back to kind when message missing', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.errors = [{ kind: 'broken' }] as any;
    });
    const err = fix.debugElement.query(By.css('.au-field-error__text'));
    expect(err?.nativeElement.textContent?.trim()).toBe('broken');
  });

  it('marks aria-invalid when invalid without visible error', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.invalid = true;
    });
    expect(queryTrigger(fix).getAttribute('aria-invalid')).toBe('true');
  });

  it('hides required asterisk when showRequired is false', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      applyFieldHarnessInputs(f, { label: 'Country' });
      f.componentInstance.required = true;
      f.componentRef.setInput('ffShowRequired', false);
    });
    const label = fix.debugElement.query(By.css('.au-form-field__label'))!.nativeElement;
    expect(label.textContent).not.toContain('*');
  });

  it('omits placeholder option when placeholder empty',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    queryTrigger(fix).click();
    await fix.whenStable();
    expect(fix.debugElement.queryAll(By.css('.au-field-listbox__option')).length).toBe(3);
  });

  it('exposes autocomplete attribute input', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.autocomplete = 'country' as string;
    });
    expect(CONTROL(fix).autocomplete()).toBe('country');
  });

  it('uses explicit id when provided', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      applyFieldHarnessInputs(f, { controlId: 'custom-select' });
    });
    expect(queryTrigger(fix).id).toBe('custom-select');
  });

  it('renders hidden name input for form posts', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.name = 'country';
      f.componentInstance.value = 'opt2';
    });
    const hidden = fix.debugElement.query(By.css('input[type="hidden"]'))!
      .nativeElement as HTMLInputElement;
    expect(hidden.name).toBe('country');
    expect(hidden.value).toBe('opt2');
  });

  it('generates id when id omitted', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    expect(queryTrigger(fix).id.startsWith('au-field-')).toBe(true);
  });

  it('onControlRowFocusout ignores non-HTMLElement currentTarget', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    CONTROL(fix).onControlRowFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onControlRowFocusout returns when focus stays inside control row', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const row = fix.debugElement.query(By.css('.au-select__control-row'))!.nativeElement;
    const trigger = queryTrigger(fix);
    const ev = new FocusEvent('focusout', { relatedTarget: trigger });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(ev);
  });

  it('prefers manual errorMessage over errors', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      applyFieldHarnessInputs(f, { errorMessage: 'Manual' });
      f.componentInstance.errors = [{ kind: 'x', message: 'ignored' }] as any;
    });
    expect(
      fix.debugElement.query(By.css('.au-field-error__text'))?.nativeElement.textContent?.trim(),
    ).toBe('Manual');
  });

  it('applies and clears from-tab on control row',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const row = fix.debugElement.query(By.css('.au-select__control-row'))!.nativeElement;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fix.debugElement
      .query(By.css('.au-select__control-row'))!
      .triggerEventHandler('focusin', new FocusEvent('focusin'));
    await fix.whenStable();
    expect(row.classList.contains('au-select__control-row--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(out);
    await fix.whenStable();
    expect(row.classList.contains('au-select__control-row--from-tab')).toBe(false);
  });

  it('displayError returns empty when first error has no usable message or kind', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.errors = [{ message: '', kind: '' }] as any;
    });
    expect(CONTROL(fix).displayError()).toBe('');
  });

  it('keyboard ArrowDown and Enter selects option', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await keydown(fix, 'ArrowDown');
    await keydown(fix, 'Enter');
    expect(CONTROL(fix).value()).toBe('opt1');
  });

  it('Space opens panel when closed', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await keydown(fix, ' ');
    expect(document.querySelector('.au-field-listbox')).toBeTruthy();
  });

  it('Escape closes open panel', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    await keydown(fix, 'Escape');
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('Home and End move highlight', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    await keydown(fix, 'End');
    expect(
      fix.debugElement
        .query(By.css('.au-field-listbox__option--active'))
        ?.nativeElement.textContent?.trim(),
    ).toBe('Option Three');
    await keydown(fix, 'Home');
    expect(
      fix.debugElement
        .query(By.css('.au-field-listbox__option--active'))
        ?.nativeElement.textContent?.trim(),
    ).toBe('Option One');
  });

  it('keyboard no-ops when panel closed for Home, End, Escape', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    for (const key of ['Home', 'End', 'Escape']) {
      await keydown(fix, key);
    }
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('ArrowUp opens panel and highlights last option', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await keydown(fix, 'ArrowUp');
    expect(
      fix.debugElement
        .query(By.css('.au-field-listbox__option--active'))
        ?.nativeElement.textContent?.trim(),
    ).toBe('Option Three');
  });

  it('ArrowDown moves highlight when panel is already open', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    await keydown(fix, 'ArrowDown');
    expect(
      fix.debugElement
        .query(By.css('.au-field-listbox__option--active'))
        ?.nativeElement.textContent?.trim(),
    ).toBe('Option Two');
  });

  it('ArrowDown wraps from last to first highlightable', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    await keydown(fix, 'End');
    await keydown(fix, 'ArrowDown');
    expect(
      fix.debugElement
        .query(By.css('.au-field-listbox__option--active'))
        ?.nativeElement.textContent?.trim(),
    ).toBe('Option One');
  });

  it('ArrowUp wraps from first to last highlightable', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    await keydown(fix, 'Home');
    await keydown(fix, 'ArrowUp');
    expect(
      fix.debugElement
        .query(By.css('.au-field-listbox__option--active'))
        ?.nativeElement.textContent?.trim(),
    ).toBe('Option Three');
  });

  it('skips disabled options on ArrowDown', async () => {
    const opts: AuSelectOption[] = [
      { value: 'a', label: 'Alpha', disabled: true },
      { value: 'b', label: 'Beta' },
    ];
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
    });
    await openListbox(fix);
    await keydown(fix, 'ArrowDown');
    expect(
      fix.debugElement
        .query(By.css('.au-field-listbox__option--active'))
        ?.nativeElement.textContent?.trim(),
    ).toBe('Beta');
  });

  it('trigger click toggles panel closed',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    queryTrigger(fix).click();
    await fix.whenStable();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('onKeydown is a no-op when disabled', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.disabled = true;
    });
    await keydown(fix, 'ArrowDown');
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('onKeydown is a no-op when readOnly', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.readOnly = true;
    });
    await keydown(fix, 'ArrowDown');
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('onTriggerClick is a no-op when disabled only',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.disabled = true;
    });
    queryTrigger(fix).click();
    await fix.whenStable();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('onTriggerClick is a no-op when readOnly only',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.readOnly = true;
    });
    queryTrigger(fix).click();
    await fix.whenStable();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('highlights placeholder row on pointer enter',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.placeholder = 'Choose';
    });
    await openListbox(fix);
    CONTROL(fix).onOptionPointerEnter(0);
    await fix.whenStable();
    expect(
      fix.debugElement
        .query(By.css('.au-field-listbox__option--active'))
        ?.nativeElement.textContent?.trim(),
    ).toBe('Choose');
  });

  it('does not toggle when disabled or readOnly', async () => {
    const fixDisabled = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.disabled = true;
    });
    queryTrigger(fixDisabled).click();
    await fixDisabled.whenStable();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();

    const fixReadOnly = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.readOnly = true;
    });
    queryTrigger(fixReadOnly).click();
    await fixReadOnly.whenStable();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('openPanel is a no-op when disabled or readOnly', () => {
    const fixDisabled = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.disabled = true;
    });
    (CONTROL(fixDisabled) as unknown as { openPanel(): void }).openPanel();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();

    const fixReadOnly = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.readOnly = true;
    });
    (CONTROL(fixReadOnly) as unknown as { openPanel(): void }).openPanel();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('openPanel highlights current value when reopening', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.value = 'opt2';
    });
    await openListbox(fix);
    expect(
      fix.debugElement
        .query(By.css('.au-field-listbox__option--active'))
        ?.nativeElement.textContent?.trim(),
    ).toBe('Option Two');
  });

  it('Enter on placeholder clears value', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.placeholder = 'Choose';
      f.componentInstance.value = 'opt1';
    });
    await openListbox(fix);
    await keydown(fix, 'Home');
    await keydown(fix, 'Enter');
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('setValue does not emit when value unchanged',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.value = 'opt1';
    });
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () =>
      outputToObservable(comp.value).subscribe(() => n++),
    );
    await fix.whenStable();
    comp.selectOption(testOptions[0]!);
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('highlights option on pointer enter',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    const option = fix.debugElement.queryAll(By.css('.au-field-listbox__option'))[1]!.nativeElement;
    option.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await fix.whenStable();
    expect(
      fix.debugElement
        .query(By.css('.au-field-listbox__option--active'))
        ?.nativeElement.textContent?.trim(),
    ).toBe('Option Two');
  });

  it('ignores pointer enter on disabled option',async  () => {
    const opts: AuSelectOption[] = [{ value: 'x', label: 'X', disabled: true }];
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
    });
    await openListbox(fix);
    CONTROL(fix).onOptionPointerEnter(0, opts[0]!);
    await fix.whenStable();
    expect(fix.debugElement.query(By.css('.au-field-listbox__option--active'))).toBeFalsy();
  });

  it('ignores pointer enter when disabled or readOnly', () => {
    const fixDisabled = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.disabled = true;
    });
    CONTROL(fixDisabled).onOptionPointerEnter(0, testOptions[0]!);

    const fixReadOnly = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.readOnly = true;
    });
    CONTROL(fixReadOnly).onOptionPointerEnter(0, testOptions[0]!);
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('ignores mousedown on disabled option', () => {
    const opts: AuSelectOption[] = [{ value: 'x', label: 'X', disabled: true }];
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
    });
    CONTROL(fix).onOptionPointerDown(new Event('mousedown'), opts[0]!);
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('ignores placeholder mousedown when readOnly', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.placeholder = 'Choose';
      f.componentInstance.readOnly = true;
    });
    CONTROL(fix).onPlaceholderPointerDown(new Event('mousedown'));
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('onControlRowFocusout ignores focus moving into portaled listbox', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    const row = fix.debugElement.query(By.css('.au-select__control-row'))!.nativeElement;
    const option = fix.debugElement.query(By.css('.au-field-listbox__option'))!.nativeElement;
    const ev = new FocusEvent('focusout', { relatedTarget: option });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(ev);
    expect(document.querySelector('.au-field-listbox')).toBeTruthy();
  });

  it('triggerLabel is empty for unknown value', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.value = 'missing';
    });
    expect(CONTROL(fix).triggerLabel()).toBe('');
  });

  it('showingPlaceholder is true when value is null and placeholder set', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.placeholder = 'Pick';
    });
    expect(CONTROL(fix).showingPlaceholder()).toBe(true);
  });

  it('activeDescendantId uses placeholder id when highlighted', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.placeholder = 'Choose';
    });
    await openListbox(fix);
    await keydown(fix, 'Home');
    expect(queryTrigger(fix).getAttribute('aria-activedescendant')).toContain(
      '-option-placeholder',
    );
  });

  it('activeDescendantId is null when highlight is out of range',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const comp = CONTROL(fix) as unknown as {
      panelOpen: { set(v: boolean): void };
      highlightedIndex: { set(v: number): void };
    };
    comp.panelOpen.set(true);
    comp.highlightedIndex.set(99);
    await fix.whenStable();
    expect(queryTrigger(fix).getAttribute('aria-activedescendant')).toBeNull();
  });

  it('lastHighlightableIndex is -1 when every option is disabled', async () => {
    const opts: AuSelectOption[] = [
      { value: 'a', label: 'A', disabled: true },
      { value: 'b', label: 'B', disabled: true },
    ];
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
    });
    await keydown(fix, 'ArrowUp');
    expect(fix.debugElement.query(By.css('.au-field-listbox__option--active'))).toBeFalsy();
  });

  it('ArrowDown on empty list keeps highlight unset', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = [];
    });
    await keydown(fix, 'ArrowDown');
    expect(queryTrigger(fix).getAttribute('aria-activedescendant')).toBeNull();
  });

  it('ignores unhandled keys in onKeydown', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await keydown(fix, 'Tab');
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('Enter does not select when no highlightable option', async () => {
    const opts: AuSelectOption[] = [{ value: 'x', label: 'X', disabled: true }];
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
    });
    await openListbox(fix);
    await keydown(fix, 'Enter');
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('nextHighlightableIndex returns -1 when list is empty',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = [];
    });
    const comp = CONTROL(fix) as unknown as {
      panelOpen: { set(v: boolean): void };
      highlightedIndex: { set(v: number): void; (): number };
    };
    comp.panelOpen.set(true);
    comp.highlightedIndex.set(0);
    await fix.whenStable();
    await keydown(fix, 'ArrowDown');
    expect(comp.highlightedIndex()).toBe(-1);
  });

  it('nextHighlightableIndex returns current when no enabled target exists',async  () => {
    const opts: AuSelectOption[] = [
      { value: 'a', label: 'A', disabled: true },
      { value: 'b', label: 'B', disabled: true },
    ];
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
    });
    const comp = CONTROL(fix) as unknown as {
      panelOpen: { set(v: boolean): void };
      highlightedIndex: { set(v: number): void; (): number };
    };
    comp.panelOpen.set(true);
    comp.highlightedIndex.set(0);
    await fix.whenStable();
    await keydown(fix, 'ArrowDown');
    expect(comp.highlightedIndex()).toBe(0);
  });

  it('ArrowUp from unset highlight uses last enabled index',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const comp = CONTROL(fix) as unknown as {
      panelOpen: { set(v: boolean): void };
      highlightedIndex: { set(v: number): void };
    };
    comp.panelOpen.set(true);
    comp.highlightedIndex.set(-1);
    await fix.whenStable();
    await keydown(fix, 'ArrowUp');
    expect(
      fix.debugElement
        .query(By.css('.au-field-listbox__option--active'))
        ?.nativeElement.textContent?.trim(),
    ).toBe('Option Three');
  });

  it('exposes option and placeholder id helpers', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.placeholder = 'Choose';
    });
    const comp = CONTROL(fix);
    expect(comp.placeholderOptionIndex()).toBe(0);
    expect(comp.placeholderOptionId()).toContain('-option-placeholder');
    expect(comp.optionListIndex(1)).toBe(2);
    expect(comp.optionId(0)).toContain('-option-0');
  });

  it('placeholderOptionIndex is -1 without placeholder', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    expect(CONTROL(fix).placeholderOptionIndex()).toBe(-1);
  });

  it('openPanel keeps highlight when already set',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const comp = CONTROL(fix) as unknown as {
      panelOpen: { set(v: boolean): void };
      highlightedIndex: { set(v: number): void; (): number };
    };
    await openListbox(fix);
    comp.panelOpen.set(false);
    comp.highlightedIndex.set(2);
    await fix.whenStable();
    queryTrigger(fix).click();
    await fix.whenStable();
    expect(comp.highlightedIndex()).toBe(2);
  });

  it('onTriggerClick returns early for disabled and readOnly guards', () => {
    const fixDisabled = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.disabled = true;
    });
    CONTROL(fixDisabled).onTriggerClick();

    const fixReadOnly = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.readOnly = true;
    });
    CONTROL(fixReadOnly).onTriggerClick();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('onTriggerClick is a no-op when disabled and readOnly',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.disabled = true;
      f.componentInstance.readOnly = true;
    });
    queryTrigger(fix).click();
    await fix.whenStable();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('End highlights placeholder when it is the only list row', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = [];
      f.componentInstance.placeholder = 'Pick one';
    });
    await openListbox(fix);
    await keydown(fix, 'End');
    expect(
      fix.debugElement
        .query(By.css('.au-field-listbox__option--active'))
        ?.nativeElement.textContent?.trim(),
    ).toBe('Pick one');
  });

  it('Enter selects option when list includes a placeholder row', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.placeholder = 'Choose';
    });
    await openListbox(fix);
    await keydown(fix, 'ArrowDown');
    await keydown(fix, 'ArrowDown');
    await keydown(fix, 'Enter');
    expect(CONTROL(fix).value()).toBe('opt2');
  });

  it('pointer enter on option row resolves index with placeholder offset',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.placeholder = 'Choose';
    });
    await openListbox(fix);
    CONTROL(fix).onOptionPointerEnter(2, testOptions[1]);
    await fix.whenStable();
    expect(
      fix.debugElement
        .query(By.css('.au-field-listbox__option--active'))
        ?.nativeElement.textContent?.trim(),
    ).toBe('Option Two');
  });

  it('Enter selects highlighted option without placeholder', async () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    await keydown(fix, 'Home');
    await keydown(fix, 'Enter');
    expect(CONTROL(fix).value()).toBe('opt1');
  });

  it('Enter does not select a disabled highlighted option', async () => {
    const opts: AuSelectOption[] = [{ value: 'x', label: 'X', disabled: true }];
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
    });
    await openListbox(fix);
    await keydown(fix, 'Enter');
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('ArrowDown from unset highlight starts search at index -1',async  () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const comp = CONTROL(fix) as unknown as {
      panelOpen: { set(v: boolean): void };
      highlightedIndex: { set(v: number): void; (): number };
    };
    comp.panelOpen.set(true);
    comp.highlightedIndex.set(-1);
    await fix.whenStable();
    await keydown(fix, 'ArrowDown');
    expect(comp.highlightedIndex()).toBe(0);
  });

  it('openPanel highlights matching value when current option is disabled', async () => {
    const opts: AuSelectOption[] = [
      { value: 'opt1', label: 'One', disabled: true },
      { value: 'opt2', label: 'Two' },
    ];
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
      f.componentInstance.value = 'opt1';
    });
    await openListbox(fix);
    expect(
      fix.debugElement
        .query(By.css('.au-field-listbox__option--active'))
        ?.nativeElement.textContent?.trim(),
    ).toBe('Two');
  });

  it('renders hidden input with empty value when value is null', () => {
    const fix = createFieldFixture(AuSelectTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.name = 'country';
    });
    const hidden = fix.debugElement.query(By.css('input[type="hidden"]'))
      .nativeElement as HTMLInputElement;
    expect(hidden.name).toBe('country');
    expect(hidden.value).toBe('');
  });

  it('shows loading indicator when loading and listbox visible', async () => {
    @Component({
      imports: [AuFormField, AuSelect],
      template: `
        <au-form-field>
          <au-select
            [options]="options"
            [loading]="true"
            [placeholder]="'Pick'"
          />
        </au-form-field>
      `,
    })
    class SelectLoadingHost {
      options = testOptions;
    }

    await TestBed.configureTestingModule({ imports: [SelectLoadingHost] }).compileComponents();
    const fix = TestBed.createComponent(SelectLoadingHost);
    await fix.whenStable();
    // Open the listbox
    const trigger = fix.debugElement.query(By.css('.au-select__trigger'))!
      .nativeElement as HTMLElement;
    trigger.click();
    await fix.whenStable();
    const loadingEl = fix.debugElement.query(By.css('.au-field-listbox__item--loading'));
    expect(loadingEl?.nativeElement.textContent).toContain('Loading');
  });
});
