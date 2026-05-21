import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';

import {
  AU_FORM_FIELD,
  type AuFormFieldContext,
  type AuFormFieldControlState,
} from './au-form-field.context';

let nextFieldId = 0;

/**
 * Design-system **form field**: label, hint, and error chrome around a projected control.
 *
 * @remarks
 * - **Required:** wrap `au-input-text`, `au-textarea`, `au-select`, etc. Controls read ids and ARIA
 *   from {@link AU_FORM_FIELD}; validation UI is driven by the child's `errors` / `invalid` (signal forms).
 * - **Checkbox / switch:** keep the inline `label` on the control; use `au-form-field` for hint and error only.
 * - **Radio group:** `label` here becomes the `<legend>` text (via the group's injected context).
 *
 * @example
 * ```html
 * <au-form-field label="Email" hint="Work address" required>
 *   <au-input-text formField [field]="email" type="email" />
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
  private readonly autoId = `au-field-${++nextFieldId}`;

  private readonly controlState = signal<AuFormFieldControlState | null>(null);

  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly hint = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  /** Manual error when not using signal forms on the child. */
  readonly errorMessage = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
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
    () => this.invalid() || (this.controlState()?.effectiveInvalid ?? false) || this.displayError().length > 0,
  );

  updateControlState(state: AuFormFieldControlState): void {
    this.controlState.set(state);
  }
}

/** Lazy ref for `useExisting` so the component class can register as its own `AU_FORM_FIELD`. */
export function auFormFieldSelfRef(): typeof AuFormField {
  return AuFormField;
}
