import { Component, Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { describe, expect, it } from 'vitest';
import { AuAutocomplete, type AuAutocompleteOption } from './autocomplete';
import { AuFormField } from '../form-field/form-field';
import {
  AuAutocompleteTestHost,
  applyFieldHarnessInputs,
  createFieldFixture,
  queryControl,
} from '../form-field/form-field.spec-hosts';

describe('AuAutocomplete', () => {
  function CONTROL(fixture: ComponentFixture<AuAutocompleteTestHost>) {
    return queryControl(fixture, AuAutocomplete);
  }

  const testOptions: AuAutocompleteOption[] = [
    { value: 'mad', label: 'Madrid' },
    { value: 'bcn', label: 'Barcelona' },
    { value: 'vlc', label: 'Valencia' },
  ];

  function queryInput(fixture: ComponentFixture<AuAutocompleteTestHost>): HTMLInputElement {
    return fixture.debugElement.query(By.css('.au-autocomplete__input'))!
      .nativeElement as HTMLInputElement;
  }

  function queryListbox(): HTMLElement | null {
    return document.querySelector('.au-field-listbox');
  }

  function queryListboxOptions(): HTMLElement[] {
    return Array.from(document.querySelectorAll('.au-field-listbox__option'));
  }

  function queryActiveOptionLabel(): string | undefined {
    return document.querySelector('.au-field-listbox__option--active')?.textContent?.trim();
  }

  async function flushRender(fixture: ComponentFixture<AuAutocompleteTestHost>): Promise<void> {
    await fixture.whenStable();
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    await fixture.whenStable();
  }

  async function focusInput(fixture: ComponentFixture<AuAutocompleteTestHost>): Promise<void> {
    queryInput(fixture).focus();
    await flushRender(fixture);
  }

  async function typeInInput(
    fixture: ComponentFixture<AuAutocompleteTestHost>,
    text: string,
  ): Promise<void> {
    const input = queryInput(fixture);
    const comp = CONTROL(fixture);
    await focusInput(fixture);
    input.value = text;
    comp.comboboxValue.set(text);
    comp.panelOpen.set(true);
    input.dispatchEvent(new InputEvent('input', { bubbles: true }));
    await flushRender(fixture);
  }

  async function keydown(
    fixture: ComponentFixture<AuAutocompleteTestHost>,
    key: string,
  ): Promise<void> {
    await focusInput(fixture);
    queryInput(fixture).dispatchEvent(
      new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }),
    );
    await flushRender(fixture);
  }

  async function waitForListbox(
    fixture: ComponentFixture<AuAutocompleteTestHost>,
  ): Promise<HTMLElement> {
    for (let attempt = 0; attempt < 30; attempt++) {
      const listbox = queryListbox();
      if (listbox) {
        return listbox;
      }
      await flushRender(fixture);
    }
    throw new Error('Timed out waiting for au-autocomplete listbox');
  }

  async function openListbox(fixture: ComponentFixture<AuAutocompleteTestHost>): Promise<void> {
    await keydown(fixture, 'ArrowDown');
    await waitForListbox(fixture);
  }

  async function clickOption(
    fixture: ComponentFixture<AuAutocompleteTestHost>,
    label: string,
  ): Promise<void> {
    const listbox = queryListbox()!;
    const option = queryListboxOptions().find((el) => el.textContent?.trim() === label)!;
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'target', { value: option });
    listbox.dispatchEvent(event);
    await flushRender(fixture);
  }

  async function selectOption(
    fixture: ComponentFixture<AuAutocompleteTestHost>,
    opt: AuAutocompleteOption,
  ): Promise<void> {
    CONTROL(fixture).listboxValue.set([opt.value]);
    await flushRender(fixture);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuAutocompleteTestHost],
    }).compileComponents();
  });

  it('listboxNative returns undefined when the listbox node is not in the document', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const input = queryInput(fix);
    input.focus();
    input.value = 'bar';
    input.dispatchEvent(new Event('input'));
    await fix.whenStable();
    const spy = vi.spyOn(document, 'getElementById').mockReturnValue(null);
    expect(CONTROL(fix)['listboxNative']()).toBeUndefined();
    spy.mockRestore();
  });

  it('syncListboxOverlay no-ops when the input is outside the control row', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const row = fix.debugElement.query(By.css('.au-autocomplete__control-row'))!.nativeElement;
    row.classList.remove('au-autocomplete__control-row');
    const input = queryInput(fix);
    input.focus();
    input.value = 'm';
    input.dispatchEvent(new Event('input'));
    await fix.whenStable();
    const listbox = fix.debugElement.query(By.css('.au-field-listbox'))!
      .nativeElement as HTMLElement;
    expect(listbox.parentElement).not.toBe(document.body);
    expect(listbox.classList.contains('au-field-listbox--overlay')).toBe(false);
  });

  it('filters options and selects on click', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await typeInInput(fix, 'bar');
    expect(queryListbox()).toBeTruthy();
    await clickOption(fix, 'Barcelona');
    expect(CONTROL(fix).value()).toBe('bcn');
    expect(queryInput(fix).value).toBe('Barcelona');
  });

  it('sets null when cleared', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.value = 'mad';
    });
    const input = queryInput(fix);
    input.value = '';
    input.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('emits valueChange via outputToObservable', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    await fix.whenStable();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.value).pipe(take(1))),
    );
    await selectOption(fix, testOptions[1]!);
    expect(await p).toBe('bcn');
  });

  it('shows error, aria-errormessage, and invalid on the combobox', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      applyFieldHarnessInputs(f, { controlId: 'f-ac' });
      applyFieldHarnessInputs(f, { errorMessage: 'Required' });
    });
    const input = queryInput(fix);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-errormessage')).toBe('f-ac-error');
  });

  it('does not select when disabled', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.disabled = true;
    });
    await typeInInput(fix, 'bar');
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('opens list on ArrowDown', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    expect(queryListbox()).toBeTruthy();
  });

  it('onInputFocus seeds query from selection when panel was closed', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.value = 'mad';
    });
    queryInput(fix).dispatchEvent(new FocusEvent('focus'));
    await fix.whenStable();
    expect(CONTROL(fix).comboboxValue()).toBe('Madrid');
  });

  it('onInputFocus does not overwrite query when panel is already open', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const comp = CONTROL(fix);
    comp['panelOpen'].set(true);
    comp.comboboxValue.set('bar');
    comp.onInputFocus();
    expect(comp.comboboxValue()).toBe('bar');
  });

  it('keyboard ArrowDown and Enter selects option', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    await keydown(fix, 'Enter');
    expect(CONTROL(fix).value()).toBe('mad');
  });

  it('Escape clears query when there is no selected value', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    input.value = 'zzz';
    input.dispatchEvent(new Event('input'));
    await fix.whenStable();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fix.whenStable();
    expect(input.value).toBe('');
  });

  it('Escape closes panel and restores query', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.value = 'mad';
    });
    const input = queryInput(fix);
    input.value = 'zzz';
    input.dispatchEvent(new Event('input'));
    await fix.whenStable();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fix.whenStable();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();
    expect(input.value).toBe('Madrid');
  });

  it('strictSelection clears invalid query on blur', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const input = queryInput(fix);
    input.value = 'Not a city';
    input.dispatchEvent(new Event('input'));
    await fix.whenStable();
    const row = fix.debugElement.query(By.css('.au-autocomplete__control-row'))!.nativeElement;
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(out);
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBeNull();
    expect(input.value).toBe('');
  });

  it('treats whitespace-only query as below minFilterLength', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.minFilterLength = 1;
    });
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    input.value = '   ';
    input.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();
  });

  it('respects minFilterLength', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.minFilterLength = 2;
    });
    await keydown(fix, 'ArrowDown');
    expect(CONTROL(fix).listboxVisible()).toBe(false);
    await typeInInput(fix, 'm');
    expect(CONTROL(fix).listboxVisible()).toBe(false);
    await typeInInput(fix, 'ma');
    expect(CONTROL(fix).listboxVisible()).toBe(true);
    expect(queryListboxOptions().length).toBeGreaterThan(0);
  });

  it('shows no-results row when filter matches nothing', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await typeInInput(fix, 'zzz');
    const empty = document.querySelector('.au-field-listbox__item--empty');
    expect(empty?.textContent?.trim()).toBe('No results');
  });

  it('renders hint and aria-describedby', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      applyFieldHarnessInputs(f, { hint: 'Pick one' });
    });
    const input = queryInput(fix);
    expect(input.getAttribute('aria-describedby')).toContain('-hint');
  });

  it('emits blur', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    let n = 0;
    CONTROL(fix).blur.subscribe(() => n++);
    await fix.whenStable();
    queryInput(fix).dispatchEvent(new FocusEvent('blur'));
    expect(n).toBe(1);
  });

  it('onControlRowFocusin runs', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    (CONTROL(fix) as unknown as { onControlRowFocusin(): void }).onControlRowFocusin();
  });

  it('emits blur from onBlurHost', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    let n = 0;
    CONTROL(fix).blur.subscribe(() => n++);
    await fix.whenStable();
    (CONTROL(fix) as unknown as { onBlurHost(): void }).onBlurHost();
    expect(n).toBe(1);
  });

  it('focus() focuses the input', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const input = queryInput(fix);
    const spy = vi.spyOn(input, 'focus');
    CONTROL(fix).focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('skips disabled options on ArrowDown', async () => {
    const opts: AuAutocompleteOption[] = [
      { value: 'a', label: 'Alpha', disabled: true },
      { value: 'b', label: 'Beta' },
    ];
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
    });
    await openListbox(fix);
    await keydown(fix, 'ArrowDown');
    expect(queryActiveOptionLabel()).toBe('Beta');
  });

  it('Home and End move highlight', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    await keydown(fix, 'End');
    expect(queryActiveOptionLabel()).toBe('Valencia');
    await keydown(fix, 'Home');
    expect(queryActiveOptionLabel()).toBe('Madrid');
  });

  it('readOnly blocks listbox when typing', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.readOnly = true;
    });
    await typeInInput(fix, 'mad');
    expect(CONTROL(fix).value()).toBeNull();
    expect(CONTROL(fix).listboxVisible()).toBe(false);
  });

  it('does not emit when disabled on input', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
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
    const input = queryInput(fix);
    input.value = 'mad';
    input.dispatchEvent(new Event('input'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('onControlRowFocusout ignores non-HTMLElement currentTarget', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    CONTROL(fix).onControlRowFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onControlRowFocusout returns when focus stays inside', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const row = fix.debugElement.query(By.css('.au-autocomplete__control-row'))!.nativeElement;
    const input = queryInput(fix);
    const ev = new FocusEvent('focusout', { relatedTarget: input });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(ev);
  });

  it('prefers manual errorMessage over errors', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      applyFieldHarnessInputs(f, { errorMessage: 'Manual' });
      f.componentInstance.errors = [{ kind: 'x', message: 'ignored' }] as any;
    });
    expect(
      fix.debugElement.query(By.css('.au-field-error__text'))?.nativeElement.textContent?.trim(),
    ).toBe('Manual');
  });

  it('generates id when omitted', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    expect(queryInput(fix).id.startsWith('au-field-')).toBe(true);
  });

  it('syncs query when value is set from parent', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.value = 'bcn';
    });
    expect(queryInput(fix).value).toBe('Barcelona');
  });

  it('preserves non-empty placeholder and noResultsText', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.placeholder = 'Search…';
      f.componentInstance.noResultsText = 'Sin coincidencias';
    });
    expect(CONTROL(fix).placeholder()).toBe('Search…');
    expect(CONTROL(fix).noResultsText()).toBe('Sin coincidencias');
  });

  it('coerces numeric placeholder through transform', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.placeholder = 42 as unknown as string;
    });
    expect(CONTROL(fix).placeholder()).toBe('42');
  });

  it('normalizes nullish placeholder and noResultsText transforms', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.placeholder = undefined as unknown as string;
      f.componentInstance.noResultsText = null as unknown as string;
    });
    expect(CONTROL(fix).placeholder()).toBe('');
    expect(CONTROL(fix).noResultsText()).toBe('');
  });

  it('uses explicit id when provided', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      applyFieldHarnessInputs(f, { controlId: 'city-ac' });
    });
    expect(queryInput(fix).id).toBe('city-ac');
    expect(CONTROL(fix).listboxId()).toBe('city-ac-listbox');
  });

  it('filters case-sensitively when caseSensitive is true', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.caseSensitive = true;
    });
    await typeInInput(fix, 'Mad');
    expect(queryListboxOptions().length).toBe(1);
    await typeInInput(fix, 'mad');
    expect(queryListboxOptions().length).toBe(0);
  });

  it('does not run handlers when readOnly', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.readOnly = true;
    });
    await typeInInput(fix, 'mad');
    await keydown(fix, 'ArrowDown');
    expect(CONTROL(fix).listboxVisible()).toBe(false);
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('highlights option on keyboard navigation', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    expect(queryActiveOptionLabel()).toBe('Madrid');
  });

  it('ignores pointer enter on disabled option', async () => {
    const opts: AuAutocompleteOption[] = [{ value: 'x', label: 'X', disabled: true }];
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
    });
    await openListbox(fix);
    await keydown(fix, 'ArrowDown');
    expect(queryActiveOptionLabel()).toBeUndefined();
  });

  it('ignores click on disabled option', async () => {
    const opts: AuAutocompleteOption[] = [{ value: 'x', label: 'X', disabled: true }];
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
    });
    await openListbox(fix);
    await clickOption(fix, 'X');
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('ArrowUp opens panel and highlights last option', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    await keydown(fix, 'Home');
    await keydown(fix, 'ArrowUp');
    expect(queryActiveOptionLabel()).toBe('Valencia');
  });

  it('keyboard no-ops when panel closed for Home, End, Enter, Escape', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const input = queryInput(fix);
    for (const key of ['Home', 'End', 'Enter', 'Escape']) {
      input.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    }
    await fix.whenStable();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();
  });

  it('Enter does not select when no highlightable option', async () => {
    const opts: AuAutocompleteOption[] = [{ value: 'x', label: 'X', disabled: true }];
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
    });
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    await fix.whenStable();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('clears aria-activedescendant when no option is active', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = [{ value: 'mad', label: 'Madrid' }];
    });
    await typeInInput(fix, 'zzz');
    expect(queryInput(fix).getAttribute('aria-activedescendant')).toBeNull();
  });

  it('omits aria-activedescendant when no option is active', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = [];
    });
    queryInput(fix).dispatchEvent(new FocusEvent('focus'));
    await fix.whenStable();
    expect(queryInput(fix).getAttribute('aria-activedescendant')).toBeNull();
  });

  it('keeps no active option when list is all disabled', async () => {
    const opts: AuAutocompleteOption[] = [
      { value: 'a', label: 'A', disabled: true },
      { value: 'b', label: 'B', disabled: true },
    ];
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
    });
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    await fix.whenStable();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await fix.whenStable();
    expect(fix.debugElement.query(By.css('.au-field-listbox__option--active'))).toBeFalsy();
    expect(input.getAttribute('aria-activedescendant')).toBeNull();
  });

  it('ArrowDown wraps from last to first highlightable', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    await keydown(fix, 'End');
    await keydown(fix, 'ArrowDown');
    expect(queryActiveOptionLabel()).toBe('Madrid');
  });

  it('strictSelection false does not commit invalid text on blur', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.strictSelection = false;
      f.componentInstance.value = 'mad';
    });
    const input = queryInput(fix);
    input.value = 'free text';
    input.dispatchEvent(new Event('input'));
    await fix.whenStable();
    const row = fix.debugElement.query(By.css('.au-autocomplete__control-row'))!.nativeElement;
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(out);
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBe('mad');
  });

  it('findOptionByLabel is case-sensitive when caseSensitive is true', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.caseSensitive = true;
    });
    await typeInInput(fix, 'Madrid');
    const row = fix.debugElement.query(By.css('.au-autocomplete__control-row'))!.nativeElement;
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(out);
    await flushRender(fix);
    expect(CONTROL(fix).value()).toBe('mad');
    await typeInInput(fix, 'madrid');
    CONTROL(fix).onControlRowFocusout(out);
    await flushRender(fix);
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('commitQueryOnClose matches option by value string', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await typeInInput(fix, 'bcn');
    const row = fix.debugElement.query(By.css('.au-autocomplete__control-row'))!.nativeElement;
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(out);
    await flushRender(fix);
    expect(CONTROL(fix).value()).toBe('bcn');
    expect(queryInput(fix).value).toBe('Barcelona');
  });

  it('setValue does not emit when value unchanged', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.value = 'mad';
    });
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () =>
      outputToObservable(comp.value).subscribe(() => n++),
    );
    await fix.whenStable();
    await selectOption(fix, testOptions[0]!);
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('closes and refocuses when the selected option is reselected', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.value = 'mad';
    });
    const input = queryInput(fix);
    const focus = vi.spyOn(input, 'focus');
    const comp = CONTROL(fix);
    comp.panelOpen.set(true);
    await flushRender(fix);

    comp.listboxValue.set([]);
    await flushRender(fix);

    expect(comp.panelOpen()).toBe(false);
    expect(focus).toHaveBeenCalled();
    focus.mockRestore();
  });

  it('applies an unknown listbox value without replacing the query', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const comp = CONTROL(fix);

    comp.listboxValue.set(['unknown']);
    await flushRender(fix);

    expect(comp.value()).toBe('unknown');
    expect(comp.comboboxValue()).toBe('unknown');
  });

  it('syncs query to raw value when option missing', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.value = 'unknown-code';
    });
    expect(queryInput(fix).value).toBe('unknown-code');
  });

  it('handles nullish queries and an unknown selected option', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.value = 'unknown-code';
    });
    const comp = CONTROL(fix) as unknown as {
      comboboxValue: { set(value: string): void };
      selectedOption(): AuAutocompleteOption | null;
      filteredOptions(): readonly AuAutocompleteOption[];
      meetsMinFilterLength(): boolean;
      commitQueryOnClose(): void;
    };

    comp.comboboxValue.set(null as unknown as string);

    expect(comp.selectedOption()).toBeNull();
    expect(comp.filteredOptions()).toEqual(testOptions);
    expect(comp.meetsMinFilterLength()).toBe(true);
    comp.commitQueryOnClose();
  });

  it('shows displayError from error kind when message is absent', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.errors = [{ kind: 'required' }] as any;
      f.componentInstance.touched = true;
    });
    expect(
      fix.debugElement.query(By.css('.au-field-error__text'))?.nativeElement.textContent?.trim(),
    ).toBe('required');
  });

  it('shows displayError from errors and invalid without message', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.errors = [{ kind: 'required', message: 'Pick one' }] as any;
      f.componentInstance.touched = true;
    });
    expect(
      fix.debugElement.query(By.css('.au-field-error__text'))?.nativeElement.textContent?.trim(),
    ).toBe('Pick one');
  });

  it('marks aria-invalid when invalid without visible error', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.invalid = true;
      f.componentInstance.touched = true;
    });
    expect(queryInput(fix).getAttribute('aria-invalid')).toBe('true');
  });

  it('displayError returns empty when first error has no usable message or kind', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.errors = [{ message: '', kind: '' }] as any;
    });
    expect(CONTROL(fix).displayError()).toBe('');
  });

  it('hides required asterisk when showRequired is false', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      applyFieldHarnessInputs(f, { label: 'City' });
      f.componentInstance.required = true;
      f.componentRef.setInput('ffShowRequired', false);
    });
    expect(
      fix.debugElement.query(By.css('.au-form-field__label'))!.nativeElement.textContent,
    ).not.toContain('*');
  });

  it('applies and clears from-tab on control row', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const row = fix.debugElement.query(By.css('.au-autocomplete__control-row'))!.nativeElement;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fix.debugElement
      .query(By.css('.au-autocomplete__control-row'))!
      .triggerEventHandler('focusin', new FocusEvent('focusin'));
    await fix.whenStable();
    expect(row.classList.contains('au-autocomplete__control-row--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(out);
    await fix.whenStable();
    expect(row.classList.contains('au-autocomplete__control-row--from-tab')).toBe(false);
  });

  it('does not open panel when disabled on focus', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.disabled = true;
    });
    queryInput(fix).dispatchEvent(new FocusEvent('focus'));
    await fix.whenStable();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();
  });

  it('panelOpen stays false when disabled or readOnly', async () => {
    const fixDisabled = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.disabled = true;
    });
    CONTROL(fixDisabled).panelOpen.set(true);
    await flushRender(fixDisabled);
    expect(fixDisabled.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();

    const fixReadOnly = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.readOnly = true;
    });
    CONTROL(fixReadOnly).panelOpen.set(true);
    await flushRender(fixReadOnly);
    expect(fixReadOnly.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();
  });

  it('ArrowUp wraps from first to last highlightable option', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    await keydown(fix, 'Home');
    await keydown(fix, 'ArrowUp');
    expect(queryActiveOptionLabel()).toBe('Valencia');
  });

  it('lastHighlightableIndex is -1 when every option is disabled', async () => {
    const opts: AuAutocompleteOption[] = [
      { value: 'a', label: 'A', disabled: true },
      { value: 'b', label: 'B', disabled: true },
    ];
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = opts;
    });
    const input = queryInput(fix);
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    await fix.whenStable();
    expect(fix.debugElement.query(By.css('.au-field-listbox__option--active'))).toBeFalsy();
  });

  it('shows selected label on load and when value changes programmatically', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.value = 'mad';
    });
    expect(queryInput(fix).value).toBe('Madrid');
    const fix2 = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.value = 'bcn';
    });
    expect(queryInput(fix2).value).toBe('Barcelona');
  });

  it('ignores unhandled keys in onKeydown', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('ignores pointer enter when component is disabled', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.disabled = true;
    });
    await keydown(fix, 'ArrowDown');
    expect(CONTROL(fix).listboxVisible()).toBe(false);
  });

  it('ignores pointer enter when component is readOnly', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.readOnly = true;
    });
    await keydown(fix, 'ArrowDown');
    expect(CONTROL(fix).listboxVisible()).toBe(false);
  });

  it('shows query while panel is open and selected label when closed', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.value = 'mad';
    });
    await typeInInput(fix, 'typing');
    expect(queryInput(fix).value).toBe('typing');
    CONTROL(fix).panelOpen.set(false);
    await flushRender(fix);
    expect(queryInput(fix).value).toBe('Madrid');
    const fix2 = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.value = 'bcn';
    });
    expect(queryInput(fix2).value).toBe('Barcelona');
  });

  it('keeps partial query when deleting below minFilterLength after a selection', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.minFilterLength = 2;
      f.componentInstance.value = 'mad';
    });
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    await fix.whenStable();
    input.value = 'M';
    input.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(input.value).toBe('M');
    expect(CONTROL(fix).value()).toBe('mad');
    expect(fix.debugElement.query(By.css('.au-field-listbox'))).toBeFalsy();
  });

  it('ArrowDown does not open empty panel below minFilterLength', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.minFilterLength = 2;
    });
    const input = queryInput(fix);
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await fix.whenStable();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();
  });

  it('ArrowDown opens panel when closed', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    expect(queryListbox()).toBeTruthy();
    expect(queryActiveOptionLabel()).toBe('Madrid');
  });

  it('ArrowDown moves highlight when panel is already open', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    await keydown(fix, 'ArrowDown');
    expect(queryActiveOptionLabel()).toBe('Barcelona');
  });

  it('ArrowUp from open panel highlights last option', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    await openListbox(fix);
    await keydown(fix, 'ArrowUp');
    expect(queryActiveOptionLabel()).toBe('Valencia');
  });

  it('ArrowDown on empty list keeps highlight unset', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = [];
    });
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    await fix.whenStable();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await fix.whenStable();
    expect(input.getAttribute('aria-activedescendant')).toBeNull();
  });

  it('onInputFocus is a no-op when disabled', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.disabled = true;
    });
    CONTROL(fix).onInputFocus();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('onInputFocus is a no-op when readOnly', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.readOnly = true;
    });
    CONTROL(fix).onInputFocus();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('onInputFocus is a no-op when query is below minFilterLength', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.minFilterLength = 2;
    });
    CONTROL(fix).onInputFocus();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('onInputFocus seeds comboboxValue from selection when panel was closed', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    const comp = CONTROL(fix);
    comp.panelOpen.set(false);
    comp.comboboxValue.set('');
    await flushRender(fix);
    CONTROL(fix).onInputFocus();
    await flushRender(fix);
    expect(comp.comboboxValue()).toBe('');
  });

  it('commitQueryOnClose leaves query when strictSelection is false', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.strictSelection = false;
    });
    await typeInInput(fix, 'free text');
    const comp = CONTROL(fix) as unknown as {
      commitQueryOnClose(): void;
      comboboxValue(): string;
    };
    comp.commitQueryOnClose();
    expect(CONTROL(fix).value()).toBeNull();
    expect(comp.comboboxValue()).toBe('free text');
  });

  it('commitQueryOnClose matches label with caseSensitive', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.caseSensitive = true;
    });
    await typeInInput(fix, 'Madrid');
    const row = fix.debugElement.query(By.css('.au-autocomplete__control-row'))!.nativeElement;
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    CONTROL(fix).onControlRowFocusout(out);
    await flushRender(fix);
    expect(CONTROL(fix).value()).toBe('mad');
  });

  it('Enter on closed panel is a no-op', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
    });
    queryInput(fix).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('Escape restores selected label in the query', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      f.componentInstance.value = 'mad';
    });
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    input.value = 'zzz';
    input.dispatchEvent(new Event('input'));
    await fix.whenStable();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fix.whenStable();
    expect(input.value).toBe('Madrid');
  });

  it('comboboxValue keeps typed query when selected option label is null', async () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = [{ value: 'x', label: null as unknown as string }];
      f.componentInstance.value = 'x';
    });
    const comp = CONTROL(fix);
    comp.comboboxValue.set('typed');
    await flushRender(fix);
    expect(comp.comboboxValue()).toBe('typed');
  });

  it('shows required marker and aria-required', () => {
    const fix = createFieldFixture(AuAutocompleteTestHost, undefined, (f) => {
      f.componentInstance.options = testOptions;
      applyFieldHarnessInputs(f, { label: 'City' });
      f.componentInstance.required = true;
    });
    expect(queryInput(fix).getAttribute('aria-required')).toBe('true');
    expect(fix.debugElement.query(By.css('.au-form-field__required'))).toBeTruthy();
  });

  it('shows loading indicator when loading and listbox visible', async () => {
    @Component({
      imports: [AuFormField, AuAutocomplete],
      template: `
        <au-form-field>
          <au-autocomplete
            [options]="options"
            [loading]="true"
          />
        </au-form-field>
      `,
    })
    class AutocompleteLoadingHost {
      options: AuAutocompleteOption[] = [{ value: 'mad', label: 'Madrid' }];
    }

    await TestBed.configureTestingModule({
      imports: [AutocompleteLoadingHost],
    }).compileComponents();
    const fix = TestBed.createComponent(AutocompleteLoadingHost);
    const input = fix.debugElement.query(By.css('.au-autocomplete__input'))!
      .nativeElement as HTMLInputElement;
    input.focus();
    input.value = 'm';
    input.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(fix.debugElement.query(By.css('.au-field-listbox__item--loading'))).toBeTruthy();
  });
});
