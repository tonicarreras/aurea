import { Injector, runInInjectionContext } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { describe, expect, it, vi } from 'vitest';
import { AuDialog } from '../dialog/dialog';
import { AuFormField } from '../form-field/form-field';
import { AuInputDate } from './au-input-date.directive';
import {
  AuInputDateTestHost,
  applyFieldHarnessInputs,
  createFieldFixture,
  queryControl,
} from '../form-field/form-field.spec-hosts';

@Component({
  selector: 'au-input-date-dialog-test-host',
  imports: [AuDialog, AuFormField, AuInputDate],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-dialog
      [(open)]="open"
      title="Edit"
    >
      <au-form-field label="Joined">
        <input
          auInputDate
          [(value)]="value"
        />
      </au-form-field>
    </au-dialog>
  `,
})
class AuInputDateDialogTestHost {
  open = true;
  value = '1843-10-01';
}

describe('AuInputDate', () => {
  function CONTROL(fixture: ComponentFixture<AuInputDateTestHost>) {
    return queryControl(fixture, AuInputDate);
  }

  function queryInput(fixture: ComponentFixture<AuInputDateTestHost>): HTMLInputElement {
    return fixture.debugElement.query(By.css('input.au-input-date'))!
      .nativeElement as HTMLInputElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuInputDateTestHost],
    }).compileComponents();
  });

  it('coerces numeric placeholder through transform', () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.placeholder = 42 as unknown as string;
    });
    expect(CONTROL(fix).placeholder()).toBe('42');
  });

  it('normalizes placeholder input', () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.placeholder = null as unknown as string;
    });
    expect(CONTROL(fix).placeholder()).toBe('');
  });

  it('preserves non-empty placeholder string', () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.placeholder = 'Pick a date';
    });
    expect(CONTROL(fix).placeholder()).toBe('Pick a date');
  });

  it('sets value on input', async () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'Start' });
    await fix.whenStable();
    const el = queryInput(fix);
    el.value = '2026-01-15';
    el.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBe('2026-01-15');
  });

  it('sets null when cleared', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'Start' }, (f) => {
      f.componentInstance.value = '2026-01-01';
    });
    const el = queryInput(fix);
    el.value = '';
    el.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBeNull();
  });

  it('inputDisplay is empty when value is undefined', () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.value = undefined as unknown as string | null;
    });
    expect(CONTROL(fix).inputDisplay()).toBe('');
  });

  it('inputDisplay is empty when value is null', async () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    await fix.whenStable();
    expect(CONTROL(fix).inputDisplay()).toBe('');
  });

  it('emits valueChange', async () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    const comp = CONTROL(fix);
    const inj = TestBed.inject(Injector);
    await fix.whenStable();
    const p = firstValueFrom(
      runInInjectionContext(inj, () => outputToObservable(comp.value).pipe(take(1))),
    );
    const el = queryInput(fix);
    el.value = '2026-02-01';
    el.dispatchEvent(new Event('input'));
    expect(await p).toBe('2026-02-01');
  });

  it('does not emit when disabled', async () => {
    const fix = createFieldFixture(AuInputDateTestHost);
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
    el.value = '2026-03-01';
    el.dispatchEvent(new Event('input'));
    sub.unsubscribe();
    expect(n).toBe(0);
  });

  it('does not update model when readOnly', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.value = '2026-01-01';
      f.componentInstance.readOnly = true;
    });
    const el = queryInput(fix);
    el.value = '2026-12-31';
    el.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBe('2026-01-01');
  });

  it('sets min max attributes', async () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    fix.componentInstance.minDate = '2026-01-01';
    fix.componentInstance.maxDate = '2026-12-31';
    await fix.whenStable();
    const el = queryInput(fix);
    expect(el.getAttribute('min')).toBe('2026-01-01');
    expect(el.getAttribute('max')).toBe('2026-12-31');
    expect(el.min).toBe('2026-01-01');
    expect(el.max).toBe('2026-12-31');
  });

  it('rejects input outside minDate and maxDate', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.minDate = '2026-01-01';
      f.componentInstance.maxDate = '2026-12-31';
      f.componentInstance.value = '2026-06-15';
    });
    await fix.whenStable();
    const el = queryInput(fix);
    el.value = '2025-12-31';
    el.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBe('2026-06-15');
    expect(el.value).toBe('2026-06-15');

    el.value = '2027-01-01';
    el.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBe('2026-06-15');
    expect(el.value).toBe('2026-06-15');
  });

  it('accepts input within minDate and maxDate', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.minDate = '2026-01-01';
      f.componentInstance.maxDate = '2026-12-31';
    });
    await fix.whenStable();
    const el = queryInput(fix);
    el.value = '2026-03-20';
    el.dispatchEvent(new Event('input'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBe('2026-03-20');
  });

  it('shows error and aria-invalid', async () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    applyFieldHarnessInputs(fix, { controlId: 'd1' });
    applyFieldHarnessInputs(fix, { errorMessage: 'Bad' });
    await fix.whenStable();
    const el = queryInput(fix);
    expect(el.getAttribute('aria-invalid')).toBe('true');
    expect(el.getAttribute('aria-errormessage')).toBe('d1-error');
  });

  it('focus() focuses input', async () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    await fix.whenStable();
    const el = queryInput(fix);
    const spy = vi.spyOn(el, 'focus');
    CONTROL(fix).focus();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('onControlRowFocusout early exit', async () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    await fix.whenStable();
    CONTROL(fix).onControlRowFocusout({ currentTarget: {} } as FocusEvent);
  });

  it('onControlRowFocusout when focus stays in row', async () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    await fix.whenStable();
    const input = queryInput(fix);
    const ev = new FocusEvent('focusout', { relatedTarget: input });
    Object.defineProperty(ev, 'currentTarget', { value: input, configurable: true });
    CONTROL(fix).onControlRowFocusout(ev);
  });

  it('clears from-tab after leaving row', async () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    await fix.whenStable();
    const input = queryInput(fix);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fix.debugElement
      .query(By.css('input.au-input-date'))!
      .triggerEventHandler('focusin', new FocusEvent('focusin'));
    await fix.whenStable();
    expect(input.classList.contains('au-input-date--from-tab')).toBe(true);
    const out = new FocusEvent('focusout', { relatedTarget: document.body });
    Object.defineProperty(out, 'currentTarget', { value: input, configurable: true });
    CONTROL(fix).onControlRowFocusout(out);
    await fix.whenStable();
    expect(input.classList.contains('au-input-date--from-tab')).toBe(false);
  });

  it('sets hint and aria-describedby', async () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    applyFieldHarnessInputs(fix, { hint: 'ISO format' });
    await fix.whenStable();
    const hint = fix.debugElement.query(By.css('.au-form-field__hint'))!.nativeElement;
    expect(queryInput(fix).getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('shows error from errors input', async () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    fix.componentInstance.errors = [{ kind: 'required', message: 'Pick a date' }];
    await fix.whenStable();
    expect(CONTROL(fix).displayError()).toBe('Pick a date');
  });

  it('displayError uses kind when message missing', async () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    fix.componentInstance.errors = [{ kind: 'pattern' }] as any;
    await fix.whenStable();
    expect(CONTROL(fix).displayError()).toBe('pattern');
  });

  it('displayError empty when first error has no usable text', async () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    fix.componentInstance.errors = [{ message: '', kind: '' }] as any;
    await fix.whenStable();
    expect(CONTROL(fix).displayError()).toBe('');
  });

  it('uses explicit id for resolvedId', async () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    applyFieldHarnessInputs(fix, { controlId: 'my-date' });
    await fix.whenStable();
    expect(queryInput(fix).id).toBe('my-date');
  });

  it('onControlRowFocusin runs', () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' });
    CONTROL(fix).onControlRowFocusin();
  });

  it('reconciles value on native change event', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' });
    await fix.whenStable();
    const el = queryInput(fix);
    el.value = '2026-02-02';
    el.dispatchEvent(new Event('change'));
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBe('2026-02-02');
  });

  it('ignores change when disabled', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.disabled = true;
      f.componentInstance.value = '2026-01-01';
    });
    await fix.whenStable();
    const el = queryInput(fix);
    el.value = '2026-02-02';
    el.dispatchEvent(new Event('change'));
    expect(CONTROL(fix).value()).toBe('2026-01-01');
  });

  it('opens calendar via calendar icon button click', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.minDate = '2026-01-01';
      f.componentInstance.maxDate = '2026-12-31';
    });
    await fix.whenStable();
    fix.debugElement.query(By.css('.au-input-date__icon'))!.nativeElement.click();
    await fix.whenStable();
    expect(document.body.querySelector('.au-date-calendar')).toBeTruthy();
  });

  it('emits blur from native blur event', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' });
    let n = 0;
    CONTROL(fix).blur.subscribe(() => n++);
    await fix.whenStable();
    queryInput(fix).dispatchEvent(new FocusEvent('blur'));
    expect(n).toBe(1);
  });

  it('emits blur from onBlurHost', async () => {
    const fix = createFieldFixture(AuInputDateTestHost);
    applyFieldHarnessInputs(fix, { label: 'D' });
    let n = 0;
    CONTROL(fix).blur.subscribe(() => n++);
    await fix.whenStable();
    CONTROL(fix).onBlurHost();
    expect(n).toBe(1);
  });

  it('effectiveInvalid from invalid input without message', () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.invalid = true;
    });
    expect(queryInput(fix).getAttribute('aria-invalid')).toBe('true');
  });

  it('onPickerIconClick opens calendar panel', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' });
    await fix.whenStable();
    CONTROL(fix).onPickerIconClick(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await fix.whenStable();
    expect(document.body.querySelector('.au-date-calendar')).toBeTruthy();
    const trigger = fix.debugElement.query(By.css('.au-input-date__icon'))!
      .nativeElement as HTMLButtonElement;
    expect(queryInput(fix).getAttribute('role')).toBeNull();
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(trigger.getAttribute('aria-controls')).toBe(`${queryInput(fix).id}-picker`);
  });

  it('opens calendar on Enter in the input', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' });
    await fix.whenStable();
    queryInput(fix).dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
    );
    await fix.whenStable();
    expect(document.body.querySelector('.au-date-calendar')).toBeTruthy();
  });

  it('ignores unrelated keys on the input', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' });
    await fix.whenStable();
    CONTROL(fix).onNativeInputKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(document.body.querySelector('.au-date-calendar')).toBeFalsy();
  });

  it('ignores Enter when readOnly', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.readOnly = true;
    });
    await fix.whenStable();
    CONTROL(fix).onNativeInputKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(document.body.querySelector('.au-date-calendar')).toBeFalsy();
  });

  it('keeps the picker trigger in the tab order', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' });
    await fix.whenStable();
    CONTROL(fix).onPickerIconClick(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await fix.whenStable();
    const trigger = fix.debugElement.query(By.css('.au-input-date__icon'))!
      .nativeElement as HTMLButtonElement;
    expect(trigger.getAttribute('tabindex')).toBeNull();
    expect(trigger.disabled).toBe(false);
  });

  it('onPickerIconClick opens calendar instead of native picker when min/max set', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.minDate = '2026-01-01';
      f.componentInstance.maxDate = '2026-12-31';
    });
    await fix.whenStable();
    const input = queryInput(fix);
    const showPicker = vi.fn();
    input.showPicker = showPicker;
    CONTROL(fix).onPickerIconClick(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await fix.whenStable();
    expect(showPicker).not.toHaveBeenCalled();
    expect(document.body.querySelector('.au-date-calendar')).toBeTruthy();
  });

  it('onPickerIconClick is no-op when disabled or readOnly', async () => {
    for (const flag of ['disabled', 'readOnly'] as const) {
      const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
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

  it('opens calendar when clicking the native input', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.minDate = '2026-01-01';
      f.componentInstance.maxDate = '2026-12-31';
    });
    await fix.whenStable();
    queryInput(fix).click();
    await fix.whenStable();
    expect(document.body.querySelector('.au-date-calendar')).toBeTruthy();
  });

  it('toggles calendar closed on second native input click', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.minDate = '2026-01-01';
      f.componentInstance.maxDate = '2026-12-31';
    });
    await fix.whenStable();
    const input = queryInput(fix);
    input.click();
    await fix.whenStable();
    input.click();
    await fix.whenStable();
    expect(document.body.querySelector('.au-date-calendar')).toBeFalsy();
  });

  it('updates value when picking from calendar panel', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.minDate = '2026-06-01';
      f.componentInstance.maxDate = '2026-06-30';
    });
    await fix.whenStable();
    CONTROL(fix).onPickerIconClick(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await fix.whenStable();
    await fix.whenStable();
    const day = document.body.querySelector(
      '.au-date-calendar__day:not([disabled])',
    ) as HTMLButtonElement;
    day.click();
    await fix.whenStable();
    expect(CONTROL(fix).value()).toBe('2026-06-01');
  });

  it('keeps from-tab when focus moves to picker icon', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.minDate = '2026-01-01';
      f.componentInstance.maxDate = '2026-12-31';
    });
    await fix.whenStable();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    queryInput(fix).dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await fix.whenStable();
    const icon = fix.debugElement.query(By.css('.au-input-date__icon'))!
      .nativeElement as HTMLElement;
    const ev = new FocusEvent('focusout', { relatedTarget: icon });
    CONTROL(fix).onControlRowFocusout(ev);
    expect(queryInput(fix).classList.contains('au-input-date--from-tab')).toBe(true);
  });

  it('opens calendar when clicking input without min/max', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' });
    await fix.whenStable();
    queryInput(fix).click();
    await fix.whenStable();
    expect(document.body.querySelector('.au-date-calendar')).toBeTruthy();
  });

  it('ignores native click when readOnly', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.minDate = '2026-01-01';
      f.componentInstance.maxDate = '2026-12-31';
      f.componentInstance.readOnly = true;
    });
    await fix.whenStable();
    queryInput(fix).click();
    expect(document.body.querySelector('.au-date-calendar')).toBeFalsy();
  });

  it('skips reconcile on blur when disabled', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.disabled = true;
      f.componentInstance.value = '2026-01-01';
    });
    await fix.whenStable();
    const el = queryInput(fix);
    el.value = '2026-02-02';
    CONTROL(fix).onBlurHost();
    expect(CONTROL(fix).value()).toBe('2026-01-01');
  });

  it('ensurePickerChrome returns when parent is not an HTMLElement', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' }, (f) => {
      f.componentInstance.minDate = '2026-01-01';
    });
    await fix.whenStable();
    const dir = CONTROL(fix) as unknown as { ensurePickerChrome(): void };
    const input = queryInput(fix);
    document.createDocumentFragment().appendChild(input);
    expect(() => dir.ensurePickerChrome()).not.toThrow();
  });

  it('syncPickerPanel no-ops when panel ref is missing', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' });
    await fix.whenStable();
    const dir = CONTROL(fix) as unknown as {
      syncPickerPanel(): void;
      pickerPanelRef: null;
    };
    dir.pickerPanelRef = null;
    expect(() => dir.syncPickerPanel()).not.toThrow();
  });

  it('syncPickerPanel falls back to the input host when anchorHost is unset', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' });
    await fix.whenStable();
    const input = queryInput(fix);
    const dir = CONTROL(fix) as unknown as {
      syncPickerPanel(): void;
      anchorHost: HTMLElement | null;
      pickerPanelRef: { setInput: (name: string, value: unknown) => void };
    };
    CONTROL(fix).onPickerIconClick(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await fix.whenStable();
    dir.anchorHost = null;
    const setInput = vi.spyOn(dir.pickerPanelRef, 'setInput');
    dir.syncPickerPanel();
    expect(setInput).toHaveBeenCalledWith('anchor', input);
  });

  it('syncPickerPanel skips trigger a11y when icon button is missing', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' });
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

  it('returns focus to the input when the calendar dismisses', async () => {
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' });
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
    const fix = createFieldFixture(AuInputDateTestHost, { label: 'D' });
    await fix.whenStable();
    const input = queryInput(fix);
    const focusSpy = vi.spyOn(input, 'focus');
    document.createDocumentFragment().appendChild(input);
    (CONTROL(fix) as unknown as { closePicker(): void }).closePicker();
    await fix.whenStable();
    expect(focusSpy).not.toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  it('portals calendar into modal dialog when opened inside au-dialog', async () => {
    await TestBed.configureTestingModule({
      imports: [AuInputDateDialogTestHost],
    }).compileComponents();
    const fix = TestBed.createComponent(AuInputDateDialogTestHost);
    fix.detectChanges();
    await fix.whenStable();
    await fix.whenStable();
    const input = fix.debugElement.query(By.css('input.au-input-date'))!
      .nativeElement as HTMLInputElement;
    input.click();
    await fix.whenStable();
    await fix.whenStable();
    const calendar = document.body.querySelector('.au-date-calendar') as HTMLElement | null;
    expect(calendar).toBeTruthy();
    const dialog = fix.debugElement.query(By.css('.au-dialog__native'))!
      .nativeElement as HTMLDialogElement;
    expect(dialog.contains(calendar)).toBe(true);
    fix.destroy();
    document.body.querySelectorAll('.au-date-calendar').forEach((el) => el.remove());
  });

  it('keeps au-dialog open when picking a date from the calendar', async () => {
    await TestBed.configureTestingModule({
      imports: [AuInputDateDialogTestHost],
    }).compileComponents();
    const fix = TestBed.createComponent(AuInputDateDialogTestHost);
    fix.detectChanges();
    await fix.whenStable();
    const input = fix.debugElement.query(By.css('input.au-input-date'))!
      .nativeElement as HTMLInputElement;
    input.click();
    await fix.whenStable();
    await fix.whenStable();
    const day = document.body.querySelector(
      '.au-date-calendar__day:not([disabled])',
    ) as HTMLButtonElement;
    day.click();
    await fix.whenStable();
    expect(fix.componentInstance.value).toBe(day.getAttribute('data-iso'));
    expect(fix.componentInstance.open).toBe(true);
    fix.destroy();
    document.body.querySelectorAll('.au-date-calendar').forEach((el) => el.remove());
  });
});
