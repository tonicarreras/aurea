import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
  signal,
  InjectionToken,
  type ElementRef,
  type Signal,
} from '@angular/core';
import type { ValidationError } from '@angular/forms/signals';
import { injectAuFieldId } from './au-field-id-generator';

/** Validation state reported by a projected field control. */
export interface AuFormFieldControlState {
  displayError: string;
  effectiveInvalid: boolean;
  required: boolean;
  /** When true, the group renders its own `<legend>`; suppress the wrapper label. */
  usesLegend?: boolean;
}

function formFieldControlStateEquals(
  prev: AuFormFieldControlState | null,
  next: AuFormFieldControlState,
): boolean {
  if (prev == null) {
    return false;
  }
  return (
    prev.displayError === next.displayError &&
    prev.effectiveInvalid === next.effectiveInvalid &&
    prev.required === next.required &&
    (prev.usesLegend ?? false) === (next.usesLegend ?? false)
  );
}

/** Context provided by {@link AuFormField} to projected controls. */
export interface AuFormFieldContext {
  readonly label: Signal<string>;
  readonly controlId: Signal<string>;
  readonly hintId: Signal<string>;
  readonly errorId: Signal<string>;
  readonly hint: Signal<string>;
  readonly errorMessage: Signal<string>;
  readonly invalid: Signal<boolean>;
  readonly showRequired: Signal<boolean>;
  readonly required: Signal<boolean>;
  readonly isInvalid: Signal<boolean>;
  updateControlState(state: AuFormFieldControlState): void;
}

export const AU_FORM_FIELD = new InjectionToken<AuFormFieldContext>('AU_FORM_FIELD');

/** First visible message from signal-form `errors` on a control. */
export function displayErrorFromErrors(
  errors: Signal<readonly ValidationError.WithOptionalFieldTree[]>,
): Signal<string> {
  return computed(() => {
    const list = errors();
    if (list.length === 0) {
      return '';
    }
    const first = list[0];
    return (first.message ?? first.kind) || '';
  });
}

/** Control invalid state including manual errors on the wrapping {@link AuFormField}. */
export function effectiveInvalidWithField(
  formField: AuFormFieldContext,
  state: { invalid: () => boolean; isInvalid: () => boolean },
): Signal<boolean> {
  return computed(
    () =>
      state.invalid() ||
      state.isInvalid() ||
      formField.invalid() ||
      formField.errorMessage().trim().length > 0,
  );
}

export interface FormFieldControlSyncState {
  displayError: () => string;
  effectiveInvalid: () => boolean;
  required: () => boolean;
  usesLegend?: () => boolean;
}

/** Callback for `effect()` in the control constructor (must run in injection context). */
export function syncFormFieldControlState(
  formField: AuFormFieldContext,
  state: FormFieldControlSyncState,
): () => void {
  return () => {
    const next: AuFormFieldControlState = {
      displayError: state.displayError(),
      effectiveInvalid: state.effectiveInvalid(),
      required: state.required(),
      usesLegend: state.usesLegend?.(),
    };
    formField.updateControlState(next);
  };
}

/** Primary native control inside a field component host (stable class selectors). */
export function queryFieldNative<T extends HTMLElement>(host: ElementRef, selector: string): T {
  const root = host.nativeElement as HTMLElement;
  const el = root.querySelector<T>(selector);
  if (!el) {
    throw new Error(`queryFieldNative: no element matches "${selector}"`);
  }
  return el;
}

/** Minimal {@link AuFormFieldContext} when checkbox/switch are not wrapped in `au-form-field`. */
export function createStandaloneAuFormFieldContext(): AuFormFieldContext {
  const autoId = injectAuFieldId();
  const controlState = signal<AuFormFieldControlState | null>(null);

  const label = signal('');
  const hint = signal('');
  const errorMessage = signal('');
  const invalid = signal(false);
  const required = signal(false);
  const showRequired = signal(true);

  const controlId = computed(() => autoId);
  const hintId = computed(() => `${autoId}-hint`);
  const errorId = computed(() => `${autoId}-error`);

  const displayError = computed(() => {
    const manual = errorMessage().trim();
    if (manual.length > 0) {
      return manual;
    }
    return controlState()?.displayError ?? '';
  });

  const isInvalid = computed(
    () => invalid() || (controlState()?.effectiveInvalid ?? false) || displayError().length > 0,
  );

  return {
    label,
    controlId,
    hintId,
    errorId,
    hint,
    errorMessage,
    invalid,
    showRequired,
    required,
    isInvalid,
    updateControlState(state: AuFormFieldControlState): void {
      if (formFieldControlStateEquals(controlState(), state)) {
        return;
      }
      controlState.set(state);
    },
  };
}

/** Prefer parent `au-form-field`; otherwise use the host's standalone provider. */
export function injectAuFormField(): AuFormFieldContext {
  const ancestor = inject(AU_FORM_FIELD, { optional: true, skipSelf: true });
  if (ancestor) {
    return ancestor;
  }
  return inject(AU_FORM_FIELD);
}

/**
 * Design-system **form field**: label, hint, and error chrome around a projected control.
 *
 * @remarks
 * - **Required:** wrap `input[auInputText]`, `textarea[auTextarea]`, `au-select`, etc. Controls read ids and ARIA
 *   from {@link AU_FORM_FIELD}; validation UI is driven by the child's `errors` / `invalid` (signal forms).
 * - **Checkbox / switch:** keep the inline `label` on the control; use `au-form-field` for hint and error only.
 * - **Radio group:** `label` here becomes the `<legend>` text (via the group's injected context).
 *
 * @example
 * ```html
 * <au-form-field label="Email" hint="Work address" required>
 *   <input auInputText formField [field]="email" type="email" />
 * </au-form-field>
 * ```
 */
@Component({
  selector: 'au-form-field',
  templateUrl: './form-field.html',
  styleUrl: './form-field.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-form-field',
  },
  providers: [{ provide: AU_FORM_FIELD, useExisting: forwardRef(auFormFieldSelfRef) }],
})
export class AuFormField implements AuFormFieldContext {
  private readonly autoId = injectAuFieldId();

  private readonly controlState = signal<AuFormFieldControlState | null>(null);

  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly hint = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  /** Manual error when not using signal forms on the child. */
  readonly errorMessage = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });
  readonly invalid = input(false);
  readonly required = input(false);
  readonly showRequired = input(true);

  /** Optional stable id; auto-generated when empty. Projected control uses the same value via context. */
  readonly controlIdInput = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });

  readonly controlId = computed(() => {
    const custom = this.controlIdInput().trim();
    return custom.length > 0 ? custom : this.autoId;
  });

  readonly hintId = computed(() => `${this.controlId()}-hint`);
  readonly errorId = computed(() => `${this.controlId()}-error`);

  readonly hasLabel = computed(() => this.label().trim().length > 0);
  /** Visible wrapper label (hidden when the control owns a `<legend>`, e.g. radio group). */
  readonly showsLabel = computed(
    () => this.hasLabel() && !(this.controlState()?.usesLegend ?? false),
  );
  readonly hasHint = computed(() => this.hint().trim().length > 0);

  readonly effectiveRequired = computed(
    () => this.required() || (this.controlState()?.required ?? false),
  );

  readonly displayError = computed(() => {
    const manual = this.errorMessage().trim();
    if (manual.length > 0) {
      return manual;
    }
    return this.controlState()?.displayError ?? '';
  });

  readonly isInvalid = computed(
    () =>
      this.invalid() ||
      (this.controlState()?.effectiveInvalid ?? false) ||
      this.displayError().length > 0,
  );

  updateControlState(state: AuFormFieldControlState): void {
    if (formFieldControlStateEquals(this.controlState(), state)) {
      return;
    }
    this.controlState.set(state);
  }
}

/** Lazy ref for `useExisting` so the component class can register as its own `AU_FORM_FIELD`. */
export function auFormFieldSelfRef(): typeof AuFormField {
  return AuFormField;
}
