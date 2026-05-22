import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuAutocomplete } from '../autocomplete/autocomplete';
import { AuCheckbox } from '../checkbox/checkbox';
import { AuInputDate } from '../input-date/input-date';
import { AuInputNumber } from '../input-number/input-number';
import { AuInputText } from '../input-text/input-text';
import { AuRadioGroup } from '../radio-group/radio-group';
import { AuSelect } from '../select/select';
import { AuSwitch } from '../switch/switch';
import { AuTextarea } from '../textarea/textarea';
import { AuFormField } from './form-field';

const nullToEmptyString = (v: string | null | undefined) => (v == null ? '' : String(v));

export interface FieldHarnessInputs {
  label?: string;
  hint?: string;
  errorMessage?: string;
  controlId?: string;
  required?: boolean;
  showRequired?: boolean;
  invalid?: boolean;
}

export function applyFieldHarnessInputs(
  fix: ComponentFixture<{ ffLabel?: unknown }>,
  field?: FieldHarnessInputs,
): void {
  if (field?.label !== undefined) {
    fix.componentRef.setInput('ffLabel', field.label);
  }
  if (field?.hint !== undefined) {
    fix.componentRef.setInput('ffHint', field.hint);
  }
  if (field?.errorMessage !== undefined) {
    fix.componentRef.setInput('ffErrorMessage', field.errorMessage);
  }
  if (field?.controlId !== undefined) {
    fix.componentRef.setInput('ffControlId', field.controlId);
  }
  if (field?.required !== undefined) {
    fix.componentRef.setInput('ffRequired', field.required);
  }
  if (field?.showRequired !== undefined) {
    fix.componentRef.setInput('ffShowRequired', field.showRequired);
  }
  if (field?.invalid !== undefined) {
    fix.componentRef.setInput('ffInvalid', field.invalid);
  }
}

const fieldHarnessBindings = `
  [label]="ffLabel()"
  [hint]="ffHint()"
  [errorMessage]="ffErrorMessage()"
  [controlIdInput]="ffControlId()"
  [required]="ffRequired()"
  [showRequired]="ffShowRequired()"
  [invalid]="ffInvalid()"
`;

@Component({
  selector: 'au-input-text-test-host',
  imports: [AuFormField, AuInputText],
  template: `
    <au-form-field ${fieldHarnessBindings}>
      <au-input-text
        [(value)]="value"
        [errors]="$any(errors)"
        [invalid]="invalid"
        [type]="type"
        [disabled]="disabled"
        [readOnly]="readOnly"
        [required]="required"
        [name]="name"
        [placeholder]="placeholder"
        [autocomplete]="autocomplete"
        [minLength]="minLength"
        [maxLength]="maxLength"
        [size]="size"
        [showPasswordToggle]="showPasswordToggle"
      />
    </au-form-field>
  `,
})
export class AuInputTextTestHost {
  readonly ffLabel = input('Field', { transform: nullToEmptyString });
  readonly ffHint = input('', { transform: nullToEmptyString });
  readonly ffErrorMessage = input('', { transform: nullToEmptyString });
  readonly ffControlId = input('', { transform: nullToEmptyString });
  readonly ffRequired = input(false);
  readonly ffShowRequired = input(true);
  readonly ffInvalid = input(false);
  value: string | null = null;
  errors: unknown[] = [];
  invalid = false;
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'search' | 'url' = 'text';
  disabled = false;
  readOnly = false;
  required = false;
  name = '';
  placeholder = '';
  autocomplete: string | undefined = undefined;
  minLength: number | undefined = undefined;
  maxLength: number | undefined = undefined;
  size: 'sm' | 'md' | 'lg' = 'md';
  showPasswordToggle = true;
}

@Component({
  selector: 'au-textarea-test-host',
  imports: [AuFormField, AuTextarea],
  template: `
    <au-form-field ${fieldHarnessBindings}>
      <au-textarea
        [(value)]="value"
        [errors]="$any(errors)"
        [invalid]="invalid"
        [disabled]="disabled"
        [readOnly]="readOnly"
        [required]="required"
        [name]="name"
        [placeholder]="placeholder"
        [rows]="rows"
        [cols]="cols"
        [resize]="resize"
        [wrap]="wrap"
        [spellcheck]="spellcheck"
        [size]="size"
      />
    </au-form-field>
  `,
})
export class AuTextareaTestHost {
  readonly ffLabel = input('Field', { transform: nullToEmptyString });
  readonly ffHint = input('', { transform: nullToEmptyString });
  readonly ffErrorMessage = input('', { transform: nullToEmptyString });
  readonly ffControlId = input('', { transform: nullToEmptyString });
  readonly ffRequired = input(false);
  readonly ffShowRequired = input(true);
  readonly ffInvalid = input(false);
  value: string | null = null;
  errors: unknown[] = [];
  invalid = false;
  disabled = false;
  readOnly = false;
  required = false;
  name = '';
  placeholder = '';
  rows = 4;
  cols: number | undefined = undefined;
  resize: 'none' | 'vertical' | 'both' = 'vertical';
  wrap: 'soft' | 'hard' = 'soft';
  spellcheck: boolean | undefined = undefined;
  size: 'sm' | 'md' | 'lg' = 'md';
}

@Component({
  selector: 'au-input-number-test-host',
  imports: [AuFormField, AuInputNumber],
  template: `
    <au-form-field ${fieldHarnessBindings}>
      <au-input-number
        [(value)]="value"
        [errors]="$any(errors)"
        [invalid]="invalid"
        [disabled]="disabled"
        [readOnly]="readOnly"
        [required]="required"
        [name]="name"
        [placeholder]="placeholder"
        [min]="min"
        [max]="max"
        [step]="step"
        [size]="size"
      />
    </au-form-field>
  `,
})
export class AuInputNumberTestHost {
  readonly ffLabel = input('Field', { transform: nullToEmptyString });
  readonly ffHint = input('', { transform: nullToEmptyString });
  readonly ffErrorMessage = input('', { transform: nullToEmptyString });
  readonly ffControlId = input('', { transform: nullToEmptyString });
  readonly ffRequired = input(false);
  readonly ffShowRequired = input(true);
  readonly ffInvalid = input(false);
  value: number | null = null;
  errors: unknown[] = [];
  invalid = false;
  disabled = false;
  readOnly = false;
  required = false;
  name = '';
  placeholder = '';
  min: number | undefined = undefined;
  max: number | undefined = undefined;
  step: number | 'any' = 1;
  size: 'sm' | 'md' | 'lg' = 'md';
}

@Component({
  selector: 'au-input-date-test-host',
  imports: [AuFormField, AuInputDate],
  template: `
    <au-form-field ${fieldHarnessBindings}>
      <au-input-date
        [(value)]="value"
        [errors]="$any(errors)"
        [invalid]="invalid"
        [disabled]="disabled"
        [readOnly]="readOnly"
        [required]="required"
        [name]="name"
        [placeholder]="placeholder"
        [autocomplete]="autocomplete"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [size]="size"
      />
    </au-form-field>
  `,
})
export class AuInputDateTestHost {
  readonly ffLabel = input('Field', { transform: nullToEmptyString });
  readonly ffHint = input('', { transform: nullToEmptyString });
  readonly ffErrorMessage = input('', { transform: nullToEmptyString });
  readonly ffControlId = input('', { transform: nullToEmptyString });
  readonly ffRequired = input(false);
  readonly ffShowRequired = input(true);
  readonly ffInvalid = input(false);
  value: string | null = null;
  errors: unknown[] = [];
  invalid = false;
  disabled = false;
  readOnly = false;
  required = false;
  name = '';
  placeholder = '';
  autocomplete: string | undefined = undefined;
  minDate: string | undefined = undefined;
  maxDate: string | undefined = undefined;
  size: 'sm' | 'md' | 'lg' = 'md';
}

@Component({
  selector: 'au-switch-test-host',
  imports: [AuFormField, AuSwitch],
  template: `
    <au-form-field ${fieldHarnessBindings}>
      <au-switch
        [(checked)]="checked"
        [label]="label"
        [errors]="$any(errors)"
        [invalid]="invalid"
        [disabled]="disabled"
        [required]="required"
        [showRequired]="showRequired"
        [name]="name"
        [size]="size"
      />
    </au-form-field>
  `,
})
export class AuSwitchTestHost {
  readonly ffLabel = input('', { transform: nullToEmptyString });
  readonly ffHint = input('', { transform: nullToEmptyString });
  readonly ffErrorMessage = input('', { transform: nullToEmptyString });
  readonly ffControlId = input('', { transform: nullToEmptyString });
  readonly ffRequired = input(false);
  readonly ffShowRequired = input(true);
  readonly ffInvalid = input(false);
  label = 'Switch';
  checked = false;
  errors: unknown[] = [];
  invalid = false;
  disabled = false;
  required = false;
  showRequired = true;
  name = '';
  size: 'sm' | 'md' | 'lg' = 'md';
}

@Component({
  selector: 'au-checkbox-test-host',
  imports: [AuFormField, AuCheckbox],
  template: `
    <au-form-field ${fieldHarnessBindings}>
      <au-checkbox
        [(checked)]="checked"
        [label]="label"
        [description]="description"
        [errors]="$any(errors)"
        [invalid]="invalid"
        [disabled]="disabled"
        [required]="required"
        [showRequired]="showRequired"
        [indeterminate]="indeterminate"
        [name]="name"
        [size]="size"
      />
    </au-form-field>
  `,
})
export class AuCheckboxTestHost {
  readonly ffLabel = input('', { transform: nullToEmptyString });
  readonly ffHint = input('', { transform: nullToEmptyString });
  readonly ffErrorMessage = input('', { transform: nullToEmptyString });
  readonly ffControlId = input('', { transform: nullToEmptyString });
  readonly ffRequired = input(false);
  readonly ffShowRequired = input(true);
  readonly ffInvalid = input(false);
  label = 'Checkbox';
  description = '';
  checked = false;
  errors: unknown[] = [];
  invalid = false;
  disabled = false;
  required = false;
  showRequired = true;
  indeterminate = false;
  name = '';
  size: 'sm' | 'md' | 'lg' = 'md';
}

@Component({
  selector: 'au-select-test-host',
  imports: [AuFormField, AuSelect],
  template: `
    <au-form-field ${fieldHarnessBindings}>
      <au-select
        [(value)]="value"
        [errors]="$any(errors)"
        [invalid]="invalid"
        [options]="options"
        [disabled]="disabled"
        [readOnly]="readOnly"
        [required]="required"
        [name]="name"
        [placeholder]="placeholder"
        [autocomplete]="autocomplete"
        [size]="size"
      />
    </au-form-field>
  `,
})
export class AuSelectTestHost {
  readonly ffLabel = input('Field', { transform: nullToEmptyString });
  readonly ffHint = input('', { transform: nullToEmptyString });
  readonly ffErrorMessage = input('', { transform: nullToEmptyString });
  readonly ffControlId = input('', { transform: nullToEmptyString });
  readonly ffRequired = input(false);
  readonly ffShowRequired = input(true);
  readonly ffInvalid = input(false);
  value: string | null = null;
  errors: unknown[] = [];
  invalid = false;
  options: { value: string; label: string }[] = [];
  disabled = false;
  readOnly = false;
  required = false;
  name = '';
  placeholder = '';
  autocomplete: string | undefined = undefined;
  size: 'sm' | 'md' | 'lg' = 'md';
}

@Component({
  selector: 'au-autocomplete-test-host',
  imports: [AuFormField, AuAutocomplete],
  template: `
    <au-form-field ${fieldHarnessBindings}>
      <au-autocomplete
        [(value)]="value"
        [errors]="$any(errors)"
        [invalid]="invalid"
        [options]="options"
        [disabled]="disabled"
        [readOnly]="readOnly"
        [required]="required"
        [name]="name"
        [placeholder]="placeholder"
        [autocomplete]="autocomplete"
        [size]="size"
        [minFilterLength]="minFilterLength"
        [caseSensitive]="caseSensitive"
        [strictSelection]="strictSelection"
        [noResultsText]="noResultsText"
      />
    </au-form-field>
  `,
})
export class AuAutocompleteTestHost {
  readonly ffLabel = input('Field', { transform: nullToEmptyString });
  readonly ffHint = input('', { transform: nullToEmptyString });
  readonly ffErrorMessage = input('', { transform: nullToEmptyString });
  readonly ffControlId = input('', { transform: nullToEmptyString });
  readonly ffRequired = input(false);
  readonly ffShowRequired = input(true);
  readonly ffInvalid = input(false);
  value: string | null = null;
  errors: unknown[] = [];
  invalid = false;
  options: { value: string; label: string }[] = [];
  disabled = false;
  readOnly = false;
  required = false;
  name = '';
  placeholder = '';
  autocomplete: string | undefined = 'off';
  size: 'sm' | 'md' | 'lg' = 'md';
  minFilterLength = 0;
  caseSensitive = false;
  strictSelection = true;
  noResultsText = 'No results';
}

@Component({
  selector: 'au-radio-group-test-host',
  imports: [AuFormField, AuRadioGroup],
  template: `
    <au-form-field ${fieldHarnessBindings}>
      <au-radio-group
        [(value)]="value"
        [errors]="$any(errors)"
        [invalid]="invalid"
        [options]="options"
        [disabled]="disabled"
        [readOnly]="readOnly"
        [required]="required"
        [name]="name"
        [size]="size"
      />
    </au-form-field>
  `,
})
export class AuRadioGroupTestHost {
  readonly ffLabel = input('Field', { transform: nullToEmptyString });
  readonly ffHint = input('', { transform: nullToEmptyString });
  readonly ffErrorMessage = input('', { transform: nullToEmptyString });
  readonly ffControlId = input('', { transform: nullToEmptyString });
  readonly ffRequired = input(false);
  readonly ffShowRequired = input(true);
  readonly ffInvalid = input(false);
  value: string | null = null;
  errors: unknown[] = [];
  invalid = false;
  options: { value: string; label: string }[] = [];
  disabled = false;
  readOnly = false;
  required = false;
  name = '';
  size: 'sm' | 'md' | 'lg' = 'md';
}

export function createFieldFixture<T>(
  host: new (...args: unknown[]) => T,
  field?: FieldHarnessInputs,
  init?: (fixture: ComponentFixture<T>) => void,
): ComponentFixture<T> {
  const fix = TestBed.createComponent(host);
  applyFieldHarnessInputs(fix as ComponentFixture<{ ffLabel: () => string }>, field);
  init?.(fix);
  fix.detectChanges();
  return fix;
}

export function queryControl<C>(fixture: ComponentFixture<unknown>, directive: new (...args: unknown[]) => C): C {
  return fixture.debugElement.query(By.directive(directive))!.componentInstance as C;
}
