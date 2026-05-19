import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { Autocomplete, type AutocompleteOption } from './autocomplete';

describe('Autocomplete', () => {
  const testOptions: AutocompleteOption[] = [
    { value: 'mad', label: 'Madrid' },
    { value: 'bcn', label: 'Barcelona' },
    { value: 'vlc', label: 'Valencia' },
  ];

  function queryInput(fixture: ComponentFixture<Autocomplete>): HTMLInputElement {
    return fixture.debugElement.query(By.css('.au-autocomplete__input'))!
      .nativeElement as HTMLInputElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Autocomplete],
    }).compileComponents();
  });

  it('resolves inputEl view child after render', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    expect(fix.componentInstance['inputRef']!.nativeElement).toBe(queryInput(fix));
  });

  it('filters options and selects on mousedown', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const input = queryInput(fix);
    input.focus();
    input.value = 'bar';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeTruthy();
    const option = fix.debugElement.query(By.css('.au-field-listbox__option'))!.nativeElement;
    option.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBe('bcn');
    expect(input.value).toBe('Barcelona');
  });

  it('sets null when cleared', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('value', 'mad');
    fix.detectChanges();
    const input = queryInput(fix);
    input.value = '';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('emits valueChange via outputToObservable', async () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    fix.detectChanges();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.valueChange).pipe(take(1))),
    );
    comp.selectOption(testOptions[1]!);
    expect(await p).toBe('bcn');
  });

  it('shows error, aria-errormessage, and invalid on the combobox', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('id', 'f-ac');
    fix.componentRef.setInput('errorMessage', 'Required');
    fix.detectChanges();
    const input = queryInput(fix);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-errormessage')).toBe('f-ac-error');
  });

  it('does not select when disabled', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('disabled', true);
    fix.detectChanges();
    fix.componentInstance.selectOption(testOptions[0]!);
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('opens list on focus', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    queryInput(fix).dispatchEvent(new FocusEvent('focus'));
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeTruthy();
  });

  it('onInputFocus seeds query from selection when panel was closed', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('value', 'mad');
    fix.detectChanges();
    queryInput(fix).dispatchEvent(new FocusEvent('focus'));
    fix.detectChanges();
    expect(fix.componentInstance['query']()).toBe('Madrid');
  });

  it('onInputFocus does not overwrite query when panel is already open', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const comp = fix.componentInstance;
    comp['panelOpen'].set(true);
    comp['query'].set('bar');
    comp.onInputFocus();
    expect(comp['query']()).toBe('bar');
  });

  it('keyboard ArrowDown and Enter selects option', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    fix.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBe('mad');
  });

  it('Escape clears query when there is no selected value', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    input.value = 'zzz';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fix.detectChanges();
    expect(input.value).toBe('');
  });

  it('Escape closes panel and restores query', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('value', 'mad');
    fix.detectChanges();
    const input = queryInput(fix);
    input.value = 'zzz';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();
    expect(input.value).toBe('Madrid');
  });

  it('strictSelection clears invalid query on blur', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const input = queryInput(fix);
    input.value = 'Not a city';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-autocomplete__control-row'))!.nativeElement;
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(out);
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBeNull();
    expect(input.value).toBe('');
  });

  it('treats whitespace-only query as below minFilterLength', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('minFilterLength', 1);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    input.value = '   ';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();
  });

  it('respects minFilterLength', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('minFilterLength', 2);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();
    expect(input.getAttribute('aria-expanded')).toBe('false');
    input.value = 'm';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();
    input.value = 'ma';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeTruthy();
    expect(fix.debugElement.queryAll(By.css('.au-field-listbox__option')).length).toBeGreaterThan(0);
  });

  it('shows no-results row when filter matches nothing', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    input.value = 'zzz';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    const empty = fix.debugElement.query(By.css('.au-autocomplete__empty'));
    expect(empty?.nativeElement.textContent?.trim()).toBe('No results');
  });

  it('renders hint and aria-describedby', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('hint', 'Pick one');
    fix.detectChanges();
    const input = queryInput(fix);
    expect(input.getAttribute('aria-describedby')).toContain('-hint');
  });

  it('emits blur', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    let n = 0;
    fix.componentInstance.blur.subscribe(() => n++);
    fix.detectChanges();
    queryInput(fix).dispatchEvent(new FocusEvent('blur'));
    expect(n).toBe(1);
  });

  it('focus() focuses the input', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const input = queryInput(fix);
    const spy = vi.spyOn(input, 'focus');
    fix.componentInstance.focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('skips disabled options on ArrowDown', () => {
    const opts: AutocompleteOption[] = [
      { value: 'a', label: 'Alpha', disabled: true },
      { value: 'b', label: 'Beta' },
    ];
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', opts);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    fix.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim()).toBe(
      'Beta',
    );
  });

  it('Home and End move highlight', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    fix.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    fix.detectChanges();
    expect(
      fix.debugElement.queryAll(By.css('.au-field-listbox__option--active'))[0]?.nativeElement.textContent?.trim(),
    ).toBe('Valencia');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    fix.detectChanges();
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Madrid');
  });

  it('onInput is a no-op when readOnly', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('readOnly', true);
    fix.detectChanges();
    const input = queryInput(fix);
    input.value = 'mad';
    fix.componentInstance.onInput({ target: input } as unknown as Event);
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBeNull();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('does not emit when disabled on input', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('disabled', true);
    const comp = fix.componentInstance;
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () =>
      outputToObservable(comp.valueChange).subscribe(() => n++),
    );
    fix.detectChanges();
    const input = queryInput(fix);
    input.value = 'mad';
    input.dispatchEvent(new Event('input'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('onControlRowFocusout ignores non-HTMLElement currentTarget', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    fix.componentInstance.onControlRowFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onControlRowFocusout returns when focus stays inside', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-autocomplete__control-row'))!.nativeElement;
    const input = queryInput(fix);
    const ev = new FocusEvent('focusout', { relatedTarget: input });
    Object.defineProperty(ev, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(ev);
  });

  it('prefers manual errorMessage over errors', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('errorMessage', 'Manual');
    fix.componentRef.setInput('errors', [{ kind: 'x', message: 'ignored' }] as any);
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-field-error__text'))?.nativeElement.textContent?.trim()).toBe(
      'Manual',
    );
  });

  it('generates id when omitted', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    expect(queryInput(fix).id.startsWith('au-autocomplete-')).toBe(true);
  });

  it('syncs query when value is set from parent', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('value', 'bcn');
    fix.detectChanges();
    expect(queryInput(fix).value).toBe('Barcelona');
  });

  it('normalizes nullish string inputs', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('label', null as unknown as string);
    fix.componentRef.setInput('hint', undefined as unknown as string);
    fix.componentRef.setInput('errorMessage', null as unknown as string);
    fix.componentRef.setInput('placeholder', undefined as unknown as string);
    fix.componentRef.setInput('noResultsText', undefined as unknown as string);
    fix.detectChanges();
    expect(fix.componentInstance.label()).toBe('');
    expect(fix.componentInstance.hint()).toBe('');
    expect(fix.componentInstance.errorMessage()).toBe('');
    expect(fix.componentInstance.placeholder()).toBe('');
    expect(fix.componentInstance.noResultsText()).toBe('');
  });

  it('preserves non-empty placeholder and noResultsText', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('placeholder', 'Search…');
    fix.componentRef.setInput('noResultsText', 'Sin coincidencias');
    fix.detectChanges();
    expect(fix.componentInstance.placeholder()).toBe('Search…');
    expect(fix.componentInstance.noResultsText()).toBe('Sin coincidencias');
  });

  it('uses explicit id when provided', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('id', 'city-ac');
    fix.detectChanges();
    expect(queryInput(fix).id).toBe('city-ac');
    expect(fix.componentInstance.listboxId()).toBe('city-ac-listbox');
  });

  it('filters case-sensitively when caseSensitive is true', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('caseSensitive', true);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    input.value = 'Mad';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(fix.debugElement.queryAll(By.css('.au-field-listbox__option')).length).toBe(1);
    input.value = 'mad';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(fix.debugElement.queryAll(By.css('.au-field-listbox__option')).length).toBe(0);
  });

  it('does not run handlers when readOnly', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('readOnly', true);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();
    fix.componentInstance.onOptionPointerEnter(0, testOptions[0]!);
    fix.componentInstance.onOptionPointerDown(new Event('mousedown'), testOptions[0]!);
    fix.componentInstance.selectOption(testOptions[0]!);
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('highlights option on pointer enter', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    queryInput(fix).dispatchEvent(new FocusEvent('focus'));
    fix.detectChanges();
    const option = fix.debugElement.query(By.css('.au-field-listbox__option'))!.nativeElement;
    option.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fix.detectChanges();
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Madrid');
  });

  it('ignores pointer enter on disabled option', () => {
    const opts: AutocompleteOption[] = [{ value: 'x', label: 'X', disabled: true }];
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', opts);
    fix.detectChanges();
    queryInput(fix).dispatchEvent(new FocusEvent('focus'));
    fix.detectChanges();
    const option = fix.debugElement.query(By.css('.au-field-listbox__option'))!.nativeElement;
    option.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-field-listbox__option--active'))).toBeFalsy();
  });

  it('ignores mousedown on disabled option', () => {
    const opts: AutocompleteOption[] = [{ value: 'x', label: 'X', disabled: true }];
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', opts);
    fix.detectChanges();
    fix.componentInstance.onOptionPointerDown(new Event('mousedown'), opts[0]!);
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('ArrowUp opens panel and highlights last option', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeTruthy();
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Valencia');
  });

  it('keyboard no-ops when panel closed for Home, End, Enter, Escape', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const input = queryInput(fix);
    for (const key of ['Home', 'End', 'Enter', 'Escape']) {
      input.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    }
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();
  });

  it('Enter does not select when no highlightable option', () => {
    const opts: AutocompleteOption[] = [{ value: 'x', label: 'X', disabled: true }];
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', opts);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    fix.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('clears aria-activedescendant when highlight is past filtered length', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    fix.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    fix.detectChanges();
    expect(input.getAttribute('aria-activedescendant')).toContain('-option-2');
    fix.componentRef.setInput('options', [{ value: 'mad', label: 'Madrid' }]);
    fix.detectChanges();
    expect(input.getAttribute('aria-activedescendant')).toBeNull();
  });

  it('omits aria-activedescendant when no option is active', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', []);
    fix.detectChanges();
    queryInput(fix).dispatchEvent(new FocusEvent('focus'));
    fix.detectChanges();
    expect(queryInput(fix).getAttribute('aria-activedescendant')).toBeNull();
  });

  it('keeps no active option when list is all disabled', () => {
    const opts: AutocompleteOption[] = [
      { value: 'a', label: 'A', disabled: true },
      { value: 'b', label: 'B', disabled: true },
    ];
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', opts);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    fix.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-field-listbox__option--active'))).toBeFalsy();
    expect(input.getAttribute('aria-activedescendant')).toBeNull();
  });

  it('ArrowDown wraps from last to first highlightable', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    fix.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fix.detectChanges();
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Madrid');
  });

  it('strictSelection false does not commit invalid text on blur', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('strictSelection', false);
    fix.componentRef.setInput('value', 'mad');
    fix.detectChanges();
    const input = queryInput(fix);
    input.value = 'free text';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-autocomplete__control-row'))!.nativeElement;
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(out);
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBe('mad');
  });

  it('findOptionByLabel is case-sensitive when caseSensitive is true', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('caseSensitive', true);
    fix.detectChanges();
    const input = queryInput(fix);
    input.value = 'Madrid';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-autocomplete__control-row'))!.nativeElement;
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(out);
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBe('mad');
    input.value = 'madrid';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    fix.componentInstance.onControlRowFocusout(out);
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('commitQueryOnClose matches option by value string', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const input = queryInput(fix);
    input.value = 'bcn';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-autocomplete__control-row'))!.nativeElement;
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(out);
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBe('bcn');
    expect(input.value).toBe('Barcelona');
  });

  it('setValue does not emit when value unchanged', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('value', 'mad');
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

  it('syncs query to raw value when option missing', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('value', 'unknown-code');
    fix.detectChanges();
    expect(queryInput(fix).value).toBe('unknown-code');
  });

  it('shows displayError from error kind when message is absent', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('errors', [{ kind: 'required' }] as any);
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-field-error__text'))?.nativeElement.textContent?.trim()).toBe(
      'required',
    );
  });

  it('shows displayError from errors and invalid without message', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('errors', [{ kind: 'required', message: 'Pick one' }] as any);
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-field-error__text'))?.nativeElement.textContent?.trim()).toBe(
      'Pick one',
    );
  });

  it('marks aria-invalid when invalid without visible error', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('invalid', true);
    fix.detectChanges();
    expect(queryInput(fix).getAttribute('aria-invalid')).toBe('true');
  });

  it('displayError returns empty when first error has no usable message or kind', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('errors', [{ message: '', kind: '' }] as any);
    fix.detectChanges();
    expect(fix.componentInstance.displayError()).toBe('');
  });

  it('hides required asterisk when showRequired is false', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('label', 'City');
    fix.componentRef.setInput('required', true);
    fix.componentRef.setInput('showRequired', false);
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-autocomplete__label'))!.nativeElement.textContent).not.toContain('*');
  });

  it('applies and clears from-tab on control row', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-autocomplete__control-row'))!.nativeElement;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fix.debugElement.query(By.css('.au-autocomplete__control-row'))!.triggerEventHandler('focusin', new FocusEvent('focusin'));
    fix.detectChanges();
    expect(row.classList.contains('au-autocomplete__control-row--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(out);
    fix.detectChanges();
    expect(row.classList.contains('au-autocomplete__control-row--from-tab')).toBe(false);
  });

  it('does not open panel when disabled on focus', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('disabled', true);
    fix.detectChanges();
    queryInput(fix).dispatchEvent(new FocusEvent('focus'));
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();
  });

  it('openPanel is a no-op when disabled or readOnly', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('disabled', true);
    fix.detectChanges();
    const comp = fix.componentInstance as unknown as { openPanel(): void };
    comp.openPanel();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();
    fix.componentRef.setInput('disabled', false);
    fix.componentRef.setInput('readOnly', true);
    fix.detectChanges();
    comp.openPanel();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();
  });

  it('ArrowUp wraps from first to last highlightable option', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    fix.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    fix.detectChanges();
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Valencia');
  });

  it('lastHighlightableIndex is -1 when every option is disabled', () => {
    const opts: AutocompleteOption[] = [
      { value: 'a', label: 'A', disabled: true },
      { value: 'b', label: 'B', disabled: true },
    ];
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', opts);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-field-listbox__option--active'))).toBeFalsy();
  });

  it('shows selected label on load and when value changes programmatically', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('value', 'mad');
    fix.detectChanges();
    expect(queryInput(fix).value).toBe('Madrid');
    fix.componentRef.setInput('value', 'bcn');
    fix.detectChanges();
    expect(queryInput(fix).value).toBe('Barcelona');
  });

  it('ignores unhandled keys in onKeydown', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('ignores pointer enter when component is disabled', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('disabled', true);
    fix.detectChanges();
    fix.componentInstance.onOptionPointerEnter(0, testOptions[0]!);
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();
  });

  it('ignores pointer enter when component is readOnly', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('readOnly', true);
    fix.detectChanges();
    fix.componentInstance.onOptionPointerEnter(0, testOptions[0]!);
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();
  });

  it('shows query while panel is open and selected label when closed', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('value', 'mad');
    fix.detectChanges();
    const input = queryInput(fix);
    input.value = 'typing';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(input.value).toBe('typing');
    const comp = fix.componentInstance as unknown as { panelOpen: { set(v: boolean): void } };
    comp.panelOpen.set(false);
    fix.detectChanges();
    expect(input.value).toBe('Madrid');
    fix.componentRef.setInput('value', 'bcn');
    fix.detectChanges();
    expect(input.value).toBe('Barcelona');
  });

  it('ArrowDown does not open empty panel below minFilterLength', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('minFilterLength', 2);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeFalsy();
  });

  it('ArrowDown opens panel when closed', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fix.detectChanges();
    expect(fix.debugElement.query(By.css('.au-autocomplete__listbox'))).toBeTruthy();
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Madrid');
  });

  it('ArrowDown moves highlight when panel is already open', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    fix.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fix.detectChanges();
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Barcelona');
  });

  it('ArrowUp from unset highlight uses nextHighlightableIndex', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const input = queryInput(fix);
    const comp = fix.componentInstance as unknown as {
      panelOpen: { set(v: boolean): void };
      highlightedIndex: { set(v: number): void };
    };
    comp.panelOpen.set(true);
    comp.highlightedIndex.set(-1);
    fix.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    fix.detectChanges();
    expect(
      fix.debugElement.query(By.css('.au-field-listbox__option--active'))?.nativeElement.textContent?.trim(),
    ).toBe('Valencia');
  });

  it('ArrowDown on empty list keeps highlight unset', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', []);
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    fix.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fix.detectChanges();
    expect(input.getAttribute('aria-activedescendant')).toBeNull();
  });

  it('onInputFocus is a no-op when disabled', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('disabled', true);
    fix.detectChanges();
    fix.componentInstance.onInputFocus();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('onInputFocus is a no-op when readOnly', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('readOnly', true);
    fix.detectChanges();
    fix.componentInstance.onInputFocus();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('onInputFocus is a no-op when query is below minFilterLength', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('minFilterLength', 2);
    fix.detectChanges();
    fix.componentInstance.onInputFocus();
    expect(document.querySelector('.au-field-listbox')).toBeFalsy();
  });

  it('onInputFocus keeps highlight when already set', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    const comp = fix.componentInstance as unknown as {
      panelOpen: { set(v: boolean): void };
      highlightedIndex: { set(v: number): void; (): number };
    };
    queryInput(fix).dispatchEvent(new FocusEvent('focus'));
    fix.detectChanges();
    comp.panelOpen.set(false);
    comp.highlightedIndex.set(1);
    fix.detectChanges();
    fix.componentInstance.onInputFocus();
    fix.detectChanges();
    expect(comp.highlightedIndex()).toBe(1);
  });

  it('commitQueryOnClose leaves query when strictSelection is false', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('strictSelection', false);
    fix.detectChanges();
    const input = queryInput(fix);
    input.value = 'free text';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    const comp = fix.componentInstance as unknown as { commitQueryOnClose(): void; query(): string };
    comp.commitQueryOnClose();
    expect(fix.componentInstance.value()).toBeNull();
    expect(comp.query()).toBe('free text');
  });

  it('commitQueryOnClose matches label with caseSensitive', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('caseSensitive', true);
    fix.detectChanges();
    const input = queryInput(fix);
    input.value = 'Madrid';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    const row = fix.debugElement.query(By.css('.au-autocomplete__control-row'))!.nativeElement;
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: row, configurable: true });
    fix.componentInstance.onControlRowFocusout(out);
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBe('mad');
  });

  it('Enter on closed panel is a no-op', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.detectChanges();
    queryInput(fix).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fix.detectChanges();
    expect(fix.componentInstance.value()).toBeNull();
  });

  it('Escape restores selected label in the query', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('value', 'mad');
    fix.detectChanges();
    const input = queryInput(fix);
    input.dispatchEvent(new FocusEvent('focus'));
    input.value = 'zzz';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fix.detectChanges();
    expect(input.value).toBe('Madrid');
  });

  it('shows required marker and aria-required', () => {
    const fix = TestBed.createComponent(Autocomplete);
    fix.componentRef.setInput('options', testOptions);
    fix.componentRef.setInput('label', 'City');
    fix.componentRef.setInput('required', true);
    fix.detectChanges();
    expect(queryInput(fix).getAttribute('aria-required')).toBe('true');
    expect(fix.debugElement.query(By.css('.au-autocomplete__required'))).toBeTruthy();
  });
});
