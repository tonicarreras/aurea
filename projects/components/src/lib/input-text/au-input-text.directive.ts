import {
  Directive,
  effect,
  afterRenderEffect,
  computed,
  inject,
  DestroyRef,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type { ValidationError } from '@angular/forms/signals';
import type { AuSize } from '../au-size';
import { AU_FORM_FIELD } from '../form-field/form-field';
import { displayErrorFromErrors, effectiveInvalidWithField } from '../form-field/form-field';
import { syncFormFieldControlState } from '../form-field/form-field';
import { bindHostDomEvent } from '../au-host-dom-event';
import { injectHostRef } from '../au-host-element';
import { tabFocusState } from '../au-tab-focus-state';

type InputTextType = 'text' | 'email' | 'number' | 'tel' | 'search' | 'url';

/**
 * Design-system single-line text control on a native `<input>`.
 * Project inside {@link AuFormField}.
 *
 * @example
 * ```html
 * <au-form-field label="Email">
 *   <input auInputText type="email" [formField]="form.email" />
 * </au-form-field>
 * ```
 */
@Directive({
  selector: 'input[auInputText]',
  host: {
    class: 'au-input-text',
    '[class.au-input-text--from-tab]': 'fieldFocusByTab()',
    '[attr.data-au-size]': 'size()',
    '[id]': 'controlId()',
    '[attr.type]': 'type()',
    '[attr.name]': 'name() || null',
    '[attr.placeholder]': 'placeholder() || null',
    '[attr.autocomplete]': 'autocomplete() ?? null',
    '[readOnly]': 'readOnly()',
    '[attr.required]': 'required() ? true : null',
    '[attr.minlength]': 'minLength() ?? null',
    '[attr.maxlength]': 'maxLength() ?? null',
    '[attr.aria-invalid]': 'effectiveInvalid() ? "true" : "false"',
    '[attr.aria-errormessage]': 'effectiveInvalid() ? formField.errorId() : null',
    '[attr.aria-describedby]': 'ariaDescribedBy() ?? null',
    '[attr.aria-required]': 'required() ? "true" : null',
    '[disabled]': 'disabled()',
    '(input)': 'onInput($event)',
    '(focusin)': 'onControlRowFocusin()',
    '(focusout)': 'onControlRowFocusout($event)',
  },
})
/* v8 ignore start */
export class AuInputText {
  /* v8 ignore stop */
  readonly value = model<string | null>(null);

  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

  readonly touched = input(false);
  readonly dirty = input(false);
  readonly submitting = input(false);

  readonly type = input<InputTextType>('text');
  readonly disabled = input(false);
  readonly readOnly = input(false);
  readonly required = input(false);
  readonly name = input<string>('');
  readonly placeholder = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });
  readonly autocomplete = input<string | undefined>(undefined);
  readonly minLength = input<number | undefined>(undefined);
  readonly maxLength = input<number | undefined>(undefined);
  readonly size = input<AuSize>('md');

  readonly blur = output<void>();

  protected readonly formField = inject(AU_FORM_FIELD);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectHostRef<HTMLInputElement>();
  protected readonly fieldFocusByTab = signal(false);
  private syncingValue = false;

  readonly controlId = computed(() => this.formField.controlId());
  readonly displayError = displayErrorFromErrors(this.errors);
  readonly isInvalid = computed(() => this.displayError().length > 0);
  readonly effectiveInvalid = effectiveInvalidWithField(this.formField, {
    invalid: () => this.invalid(),
    isInvalid: () => this.isInvalid(),
    touched: () => this.touched(),
    dirty: () => this.dirty(),
  });

  readonly ariaDescribedBy = computed((): string | null => {
    const ids: string[] = [];
    if (this.formField.hint().trim().length > 0) {
      ids.push(this.formField.hintId());
    }
    if (this.effectiveInvalid()) {
      ids.push(this.formField.errorId());
    }
    return ids.length > 0 ? ids.join(' ') : null;
  });

  readonly inputDisplay = computed(() => {
    const v = this.value();
    if (v === null || v === undefined) {
      return '';
    }
    return v;
  });

  constructor() {
    bindHostDomEvent(this.host, this.destroyRef, 'blur', () => this.onBlurHost());
    effect(
      syncFormFieldControlState(this.formField, {
        displayError: () => this.displayError(),
        effectiveInvalid: () => this.effectiveInvalid(),
        required: () => this.required(),
      }),
    );

    afterRenderEffect(() => {
      const el = this.host.nativeElement;
      const display = this.inputDisplay();
      if (el.value === display) {
        return;
      }
      this.syncingValue = true;
      el.value = display;
      this.syncingValue = false;
    });
  }

  onInput(event: Event): void {
    if (this.syncingValue || this.disabled()) {
      return;
    }
    const input = event.target as HTMLInputElement;
    const raw = input.value;
    if (raw === '') {
      this.value.set(null);
      return;
    }
    this.value.set(raw);
  }

  onBlurHost(): void {
    this.blur.emit();
  }

  onControlRowFocusin(): void {
    tabFocusState.attach();
    this.fieldFocusByTab.set(tabFocusState.takeNextFocusIsFromTab());
  }

  onControlRowFocusout(event: FocusEvent): void {
    const to = event.relatedTarget;
    if (to != null && to instanceof Node && this.host.nativeElement.contains(to)) {
      return;
    }
    this.fieldFocusByTab.set(false);
  }

  focus(): void {
    this.host.nativeElement.focus();
  }
}
