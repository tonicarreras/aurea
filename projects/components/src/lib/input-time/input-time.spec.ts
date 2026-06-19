import { Injector, runInInjectionContext } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { describe, expect, it, vi } from 'vitest';
import { AuInputTime } from './au-input-time.directive';
import { AU_COARSE_POINTER_MQ } from '../field-temporal-native-guard';
import {
  AuInputTimeTestHost,
  applyFieldHarnessInputs,
  createFieldFixture,
  queryControl,
} from '../form-field/form-field.spec-hosts';

describe('AuInputTime', () => {
  function stubPointerPreference(coarse: boolean): void {
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        matches: query === AU_COARSE_POINTER_MQ ? coarse : false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
  }

  function CONTROL(fixture: ComponentFixture<AuInputTimeTestHost>) {
    return queryControl(fixture, AuInputTime);
  }

  function queryInput(fixture: ComponentFixture<AuInputTimeTestHost>): HTMLInputElement {
    return fixture.debugElement.query(By.css('input.au-input-time'))!
      .nativeElement as HTMLInputElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuInputTimeTestHost],
    }).compileComponents();
  });

  it('coerces numeric placeholder through transform', () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' }, (f) => {
      f.componentInstance.placeholder = 42 as unknown as string;
    });
    expect(CONTROL(fix).placeholder()).toBe('42');
  });

  it('normalizes placeholder input', () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' }, (f) => {
      f.componentInstance.placeholder = null as unknown as string;
    });
    expect(CONTROL(fix).placeholder()).toBe('');
  });

  it('preserves non-empty placeholder string', () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' }, (f) => {
      f.componentInstance.placeholder = 'Pick a time';
    });
    expect(CONTROL(fix).placeholder()).toBe('Pick a time');
  });

  it('sets value on input', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost);
    applyFieldHarnessInputs(fix, { label: 'Start' });
    await fix.whenStable();
    const el = queryInput(fix);
    el.value = '14:30';
    el.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBe('14:30');
  });

  it('sets null when cleared', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'Start' }, (f) => {
      f.componentInstance.value = '09:00';
    });
    const el = queryInput(fix);
    el.value = '';
    el.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('inputDisplay is empty when value is undefined', () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' }, (f) => {
      f.componentInstance.value = undefined as unknown as string | null;
    });
    expect(CONTROL(fix).inputDisplay()).toBe('');
  });

  it('inputDisplay is empty when value is null', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    await fix.whenStable();
    expect(CONTROL(fix).inputDisplay()).toBe('');
  });

  it('emits valueChange', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    await fix.whenStable();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.value).pipe(take(1))),
    );
    const el = queryInput(fix);
    el.value = '16:45';
    el.dispatchEvent(new Event('input'));
    expect(await p).toBe('16:45');
  });

  it('does not emit when disabled', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    fix.componentInstance.disabled = true;
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    let n = 0;
    const sub = runInInjectionContext(inj, () =>
      outputToObservable(comp.value).subscribe(() => n++),
    );
    await fix.whenStable();
    const el = queryInput(fix);
    el.value = '08:15';
    el.dispatchEvent(new Event('input'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('does not uptime model when readOnly', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' }, (f) => {
      f.componentInstance.value = '09:00';
      f.componentInstance.readOnly = true;
    });
    const el = queryInput(fix);
    el.value = '18:00';
    el.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBe('09:00');
  });

  it('sets min max attributes', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    fix.componentInstance.minTime = '08:00';
    fix.componentInstance.maxTime = '20:00';
    await fix.whenStable();
    const el = queryInput(fix);
    expect(el.getAttribute('min')).toBe('08:00');
    expect(el.getAttribute('max')).toBe('20:00');
  });

  it('rejects input outside minTime and maxTime', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' }, (f) => {
      f.componentInstance.minTime = '08:00';
      f.componentInstance.maxTime = '20:00';
      f.componentInstance.value = '12:00';
    });
    await fix.whenStable();
    const el = queryInput(fix);
    el.value = '07:30';
    el.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBe('12:00');
    expect(el.value).toBe('12:00');

    el.value = '21:00';
    el.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBe('12:00');
    expect(el.value).toBe('12:00');
  });

  it('accepts input within minTime and maxTime', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' }, (f) => {
      f.componentInstance.minTime = '08:00';
      f.componentInstance.maxTime = '20:00';
    });
    await fix.whenStable();
    const el = queryInput(fix);
    el.value = '14:30';
    el.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBe('14:30');
  });

  it('shows error and aria-invalid', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    applyFieldHarnessInputs(fix, { controlId: 'd1' });
    applyFieldHarnessInputs(fix, { errorMessage: 'Bad' });
    await fix.whenStable();
    const el = queryInput(fix);
    expect(el.getAttribute('aria-invalid')).toBe('true');
    expect(el.getAttribute('aria-errormessage')).toBe('d1-error');
  });

  it('focus() focuses input', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    await fix.whenStable();
    const el = queryInput(fix);
    const spy = vi.spyOn(el, 'focus');
    CONTROL(fix).focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('onControlRowFocusout early exit', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost);
    await fix.whenStable();
    CONTROL(fix).onControlRowFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onControlRowFocusout when focus stays in row', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    await fix.whenStable();
    const input = queryInput(fix);
    const ev = new FocusEvent('focusout', { relatedTarget: input });
    Object.defineProperty(ev, 'currentTarget', { value: input, configurable: true });
    CONTROL(fix).onControlRowFocusout(ev);
  });

  it('clears from-tab after leaving row', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    await fix.whenStable();
    const input = queryInput(fix);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fix.debugElement
      .query(By.css('input.au-input-time'))!
      .triggerEventHandler('focusin', new FocusEvent('focusin'));
    await fix.whenStable();
    expect(input.classList.contains('au-input-time--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: input, configurable: true });
    CONTROL(fix).onControlRowFocusout(out);
    await fix.whenStable();
    expect(input.classList.contains('au-input-time--from-tab')).toBe(false);
  });

  it('sets hint and aria-describedby', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    applyFieldHarnessInputs(fix, { hint: 'ISO format' });
    await fix.whenStable();
    const hint = fix.debugElement.query(By.css('.au-form-field__hint'))!.nativeElement;
    expect(queryInput(fix).getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('shows error from errors input', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    fix.componentInstance.errors = [{ kind: 'required', message: 'Pick a time' }];
    await fix.whenStable();
    expect(CONTROL(fix).displayError()).toBe('Pick a time');
  });

  it('displayError uses kind when message missing', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    fix.componentInstance.errors = [{ kind: 'pattern' }] as any;
    await fix.whenStable();
    expect(CONTROL(fix).displayError()).toBe('pattern');
  });

  it('displayError empty when first error has no usable text', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    fix.componentInstance.errors = [{ message: '', kind: '' }] as any;
    await fix.whenStable();
    expect(CONTROL(fix).displayError()).toBe('');
  });

  it('uses explicit id for resolvedId', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    applyFieldHarnessInputs(fix, { controlId: 'my-time' });
    await fix.whenStable();
    expect(queryInput(fix).id).toBe('my-time');
  });

  it('onControlRowFocusin runs', () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    CONTROL(fix).onControlRowFocusin();
  });

  it('emits blur from onBlurHost', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    let n = 0;
    CONTROL(fix).blur.subscribe(() => n++);
    await fix.whenStable();
    CONTROL(fix).onBlurHost();
    expect(n).toBe(1);
  });

  it('skips reconcile on blur when disabled or readOnly', async () => {
    for (const flag of ['disabled', 'readOnly'] as const) {
      const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' }, (f) => {
        f.componentInstance[flag] = true;
        f.componentInstance.value = '09:00';
      });
      await fix.whenStable();
      const el = queryInput(fix);
      el.value = '10:00';
      CONTROL(fix).onBlurHost();
      expect(CONTROL(fix).value()).toBe('09:00');
    }
  });

  it('emits blur from native blur event', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    let n = 0;
    CONTROL(fix).blur.subscribe(() => n++);
    await fix.whenStable();
    await fix.whenStable();
    queryInput(fix).dispatchEvent(new FocusEvent('blur'));
    expect(n).toBe(1);
  });

  it('reconciles value on native change event', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    const el = queryInput(fix);
    el.value = '16:20';
    el.dispatchEvent(new Event('change'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBe('16:20');
  });

  it('ignores change when disabled', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' }, (f) => {
      f.componentInstance.disabled = true;
      f.componentInstance.value = '09:00';
    });
    await fix.whenStable();
    const el = queryInput(fix);
    el.value = '10:00';
    el.dispatchEvent(new Event('change'));
    expect(CONTROL(fix).value()).toBe('09:00');
  });

  it('toggles picker closed on second native input click', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    const input = queryInput(fix);
    input.click();
    await fix.whenStable();
    input.click();
    await fix.whenStable();
    expect(document.body.querySelector('.au-time-picker')).toBeFalsy();
  });

  it('opens time picker via calendar icon button click', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' }, (f) => {
      f.componentInstance.minTime = '08:00';
      f.componentInstance.maxTime = '20:00';
    });
    await fix.whenStable();
    fix.debugElement.query(By.css('.au-input-time__icon'))!.nativeElement.click();
    await fix.whenStable();
    expect(document.body.querySelector('.au-time-picker')).toBeTruthy();
  });

  it('skips ensurePickerChrome when icon is already mounted', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    const dir = CONTROL(fix) as unknown as { ensurePickerChrome(): void };
    dir.ensurePickerChrome();
    dir.ensurePickerChrome();
    expect(fix.debugElement.queryAll(By.css('.au-input-time__icon')).length).toBe(1);
  });

  it('effectiveInvalid from invalid input without message', () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' }, (f) => {
      f.componentInstance.invalid = true;
    });
    expect(queryInput(fix).getAttribute('aria-invalid')).toBe('true');
  });

  it('onPickerIconClick opens time picker panel', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    const input = queryInput(fix);
    const showPicker = vi.fn();
    input.showPicker = showPicker;
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefault = vi.spyOn(event, 'preventDefault');
    const stopPropagation = vi.spyOn(event, 'stopPropagation');
    CONTROL(fix).onPickerIconClick(event);
    await fix.whenStable();
    expect(preventDefault).toHaveBeenCalled();
    expect(stopPropagation).toHaveBeenCalled();
    expect(showPicker).not.toHaveBeenCalled();
    expect(document.body.querySelector('.au-time-picker')).toBeTruthy();
    const trigger = fix.debugElement.query(By.css('.au-input-time__icon'))!
      .nativeElement as HTMLButtonElement;
    expect(queryInput(fix).getAttribute('role')).toBeNull();
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(trigger.getAttribute('aria-controls')).toBe(`${queryInput(fix).id}-picker`);
  });

  it('onPickerIconClick is no-op when disabled or readOnly', async () => {
    for (const flag of ['disabled', 'readOnly'] as const) {
      const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' }, (f) => {
        f.componentInstance[flag] = true;
      });
      await fix.whenStable();
      const input = queryInput(fix);
      const showPicker = vi.fn();
      input.showPicker = showPicker;
      CONTROL(fix).onPickerIconClick(new MouseEvent('click'));
      expect(showPicker).not.toHaveBeenCalled();
    }
  });

  it('keeps from-tab when focus moves to picker icon', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    queryInput(fix).dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await fix.whenStable();
    const icon = fix.debugElement.query(By.css('.au-input-time__icon'))!
      .nativeElement as HTMLElement;
    CONTROL(fix).onControlRowFocusout(new FocusEvent('focusout', { relatedTarget: icon }));
    expect(queryInput(fix).classList.contains('au-input-time--from-tab')).toBe(true);
  });

  it('ignores native click when disabled', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' }, (f) => {
      f.componentInstance.disabled = true;
    });
    await fix.whenStable();
    queryInput(fix).click();
    expect(document.body.querySelector('.au-time-picker')).toBeFalsy();
  });

  it('ignores native click when readOnly', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' }, (f) => {
      f.componentInstance.readOnly = true;
    });
    await fix.whenStable();
    queryInput(fix).click();
    expect(document.body.querySelector('.au-time-picker')).toBeFalsy();
  });

  it('opens picker when pressing Enter on the input', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    const input = queryInput(fix);
    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
    );
    await fix.whenStable();
    expect(document.body.querySelector('.au-time-picker')).toBeTruthy();
  });

  it('ignores unrelated keys on the input', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    CONTROL(fix).onNativeInputKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(document.body.querySelector('.au-time-picker')).toBeFalsy();
  });

  it('ignores Enter when readOnly', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' }, (f) => {
      f.componentInstance.readOnly = true;
    });
    await fix.whenStable();
    CONTROL(fix).onNativeInputKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(document.body.querySelector('.au-time-picker')).toBeFalsy();
  });

  it('keeps the picker trigger in the tab order', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    CONTROL(fix).onPickerIconClick(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await fix.whenStable();
    const trigger = fix.debugElement.query(By.css('.au-input-time__icon'))!
      .nativeElement as HTMLButtonElement;
    expect(trigger.getAttribute('tabindex')).toBeNull();
    expect(trigger.disabled).toBe(false);
  });

  it('opens picker when clicking the native input', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    queryInput(fix).click();
    await fix.whenStable();
    expect(document.body.querySelector('.au-time-picker')).toBeTruthy();
  });

  it('updates value when picking from time panel', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' }, (f) => {
      f.componentInstance.minTime = '08:00';
      f.componentInstance.maxTime = '20:00';
    });
    await fix.whenStable();
    CONTROL(fix).onPickerIconClick(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await fix.whenStable();
    await fix.whenStable();
    const minute = document.body.querySelector(
      '.au-time-picker__column:last-of-type .au-time-picker__option:not([disabled])',
    ) as HTMLButtonElement;
    minute.click();
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBeTruthy();
  });

  it('returns focus to the input when the picker dismisses', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    const input = queryInput(fix);
    const focusSpy = vi.spyOn(input, 'focus');
    CONTROL(fix).onPickerIconClick(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await fix.whenStable();
    (CONTROL(fix) as unknown as { closePicker(): void }).closePicker();
    await fix.whenStable();
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  it('closePicker skips focus when input is disconnected', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    const input = queryInput(fix);
    const focusSpy = vi.spyOn(input, 'focus');
    document.createDocumentFragment().appendChild(input);
    (CONTROL(fix) as unknown as { closePicker(): void }).closePicker();
    await fix.whenStable();
    expect(focusSpy).not.toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  it('syncPickerPanel no-ops when panel ref is missing', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    const dir = CONTROL(fix) as unknown as {
      syncPickerPanel(): void;
      pickerPanelRef: null;
    };
    dir.pickerPanelRef = null;
    expect(() => dir.syncPickerPanel()).not.toThrow();
  });

  it('anchors the time picker panel to the picker icon button', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    const inputEl = queryInput(fix);
    const dir = CONTROL(fix) as unknown as {
      syncPickerPanel(): void;
      pickerPanelRef: { setInput: (name: string, value: unknown) => void };
      pickerIconEl: HTMLButtonElement | null;
    };
    CONTROL(fix).onPickerIconClick(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await fix.whenStable();
    const setInput = vi.spyOn(dir.pickerPanelRef, 'setInput');
    dir.syncPickerPanel();
    expect(setInput).toHaveBeenCalledWith('anchor', dir.pickerIconEl);
    expect(setInput).toHaveBeenCalledWith('controlRoot', inputEl.parentElement);
  });

  it('syncPickerPanel falls back to the input host when the picker icon is unset', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    const inputEl = queryInput(fix);
    const dir = CONTROL(fix) as unknown as {
      syncPickerPanel(): void;
      anchorHost: HTMLElement | null;
      pickerIconEl: HTMLButtonElement | null;
      pickerPanelRef: { setInput: (name: string, value: unknown) => void };
    };
    CONTROL(fix).onPickerIconClick(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await fix.whenStable();
    dir.anchorHost = null;
    dir.pickerIconEl = null;
    const setInput = vi.spyOn(dir.pickerPanelRef, 'setInput');
    dir.syncPickerPanel();
    expect(setInput).toHaveBeenCalledWith('anchor', inputEl);
  });

  it('syncPickerPanel skips trigger a11y when icon button is missing', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    const dir = CONTROL(fix) as unknown as {
      syncPickerPanel(): void;
      pickerIconEl: HTMLButtonElement | null;
      pickerPanelRef: {
        setInput: (name: string, value: unknown) => void;
        changeDetectorRef: { detectChanges: () => void };
      };
    };
    CONTROL(fix).onPickerIconClick(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await fix.whenStable();
    dir.pickerIconEl = null;
    const setInput = vi.spyOn(dir.pickerPanelRef, 'setInput');
    expect(() => dir.syncPickerPanel()).not.toThrow();
    expect(setInput).toHaveBeenCalledWith('open', true);
  });

  it('ensurePickerChrome returns when parent is not an HTMLElement', async () => {
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    const dir = CONTROL(fix) as unknown as { ensurePickerChrome(): void };
    const input = queryInput(fix);
    document.createDocumentFragment().appendChild(input);
    expect(() => dir.ensurePickerChrome()).not.toThrow();
  });

  it('marks the native input read-only on coarse pointers', async () => {
    stubPointerPreference(true);
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    await fix.whenStable();
    expect(queryInput(fix).readOnly).toBe(true);
  });

  it('opens the time picker on touchstart without toggling closed on coarse pointers', async () => {
    stubPointerPreference(true);
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    await fix.whenStable();
    const dir = CONTROL(fix);
    dir.onNativeTouchStart(new Event('touchstart', { cancelable: true }));
    await fix.whenStable();
    expect(document.body.querySelector('.au-time-picker')).toBeTruthy();
    dir.onNativeTouchStart(new Event('touchstart', { cancelable: true }));
    await fix.whenStable();
    expect(document.body.querySelector('.au-time-picker')).toBeTruthy();
  });

  it('returns focus to the picker icon when the time picker dismisses on coarse pointers', async () => {
    stubPointerPreference(true);
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    await fix.whenStable();
    CONTROL(fix).onPickerIconClick(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await fix.whenStable();
    const icon = fix.debugElement.query(By.css('.au-input-time__icon'))!
      .nativeElement as HTMLButtonElement;
    const focusSpy = vi.spyOn(icon, 'focus');
    (CONTROL(fix) as unknown as { closePicker(): void }).closePicker();
    await fix.whenStable();
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  it('opens the time picker from the bound touchstart listener on coarse pointers', async () => {
    stubPointerPreference(true);
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    await fix.whenStable();
    queryInput(fix).dispatchEvent(new Event('touchstart', { bubbles: true, cancelable: true }));
    await fix.whenStable();
    expect(document.body.querySelector('.au-time-picker')).toBeTruthy();
  });

  it('ignores bound touchstart on fine pointers', async () => {
    stubPointerPreference(false);
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    await fix.whenStable();
    queryInput(fix).dispatchEvent(new Event('touchstart', { bubbles: true, cancelable: true }));
    await fix.whenStable();
    expect(document.body.querySelector('.au-time-picker')).toBeFalsy();
  });

  it('ignores bound touchstart when disabled or readOnly on coarse pointers', async () => {
    stubPointerPreference(true);
    for (const flag of ['disabled', 'readOnly'] as const) {
      const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' }, (f) => {
        f.componentInstance[flag] = true;
      });
      await fix.whenStable();
      await fix.whenStable();
      queryInput(fix).dispatchEvent(new Event('touchstart', { bubbles: true, cancelable: true }));
      await fix.whenStable();
      expect(document.body.querySelector('.au-time-picker')).toBeFalsy();
    }
  });

  it('focus() targets the picker icon on coarse pointers', async () => {
    stubPointerPreference(true);
    const fix = createFieldFixture(AuInputTimeTestHost, { label: 'D' });
    await fix.whenStable();
    await fix.whenStable();
    const icon = fix.debugElement.query(By.css('.au-input-time__icon'))!
      .nativeElement as HTMLButtonElement;
    const focusSpy = vi.spyOn(icon, 'focus');
    CONTROL(fix).focus();
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });
});
