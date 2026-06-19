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

/**
 * Numeric control on a native `<input type="number">`.
 * Project inside {@link AuFormField}.
 */
@Directive({
  selector: 'input[auInputNumber]',
  host: {
    class: 'au-input-number',
    '[class.au-input-number--from-tab]': 'fieldFocusByTab()',
    '[attr.data-au-size]': 'size()',
    '[attr.type]': '"number"',
    '[id]': 'controlId()',
    '[attr.name]': 'name() || null',
    '[attr.placeholder]': 'placeholder() || null',
    '[attr.autocomplete]': 'autocomplete() ?? null',
    '[readOnly]': 'readOnly()',
    '[attr.min]': 'min() ?? null',
    '[attr.max]': 'max() ?? null',
    '[attr.step]': 'step() === "any" ? "any" : step()',
    '[attr.aria-invalid]': 'effectiveInvalid() ? "true" : "false"',
    '[attr.aria-errormessage]': 'effectiveInvalid() ? formField.errorId() : null',
    '[attr.aria-describedby]': 'ariaDescribedBy() ?? null',
    '[attr.aria-required]': 'required() ? "true" : null',
    '[disabled]': 'disabled()',
    '[attr.required]': 'required() ? true : null',
    '(input)': 'onInput($event)',
    '(focusin)': 'onControlRowFocusin()',
    '(focusout)': 'onControlRowFocusout($event)',
  },
})
/* v8 ignore start */
export class AuInputNumber {
  /* v8 ignore stop */
  readonly value = model<number | null>(null);
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

  readonly disabled = input(false);
  readonly readOnly = input(false);
  readonly required = input(false);
  readonly name = input<string>('');
  readonly placeholder = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });
  readonly autocomplete = input<string | undefined>(undefined);
  readonly min = input<number | undefined>(undefined);
  readonly max = input<number | undefined>(undefined);
  readonly step = input<number | 'any'>(1);
  readonly size = input<AuSize>('md');

  readonly blur = output<void>();

  protected readonly formField = inject(AU_FORM_FIELD);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectHostRef<HTMLInputElement>();
  protected readonly fieldFocusByTab = signal(false);

  readonly controlId = computed(() => this.formField.controlId());
  readonly displayError = displayErrorFromErrors(this.errors);
  readonly isInvalid = computed(() => this.displayError().length > 0);
  readonly effectiveInvalid = effectiveInvalidWithField(this.formField, {
    invalid: () => this.invalid(),
    isInvalid: () => this.isInvalid(),
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
    return String(v);
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
      if (el.value !== display) {
        el.value = display;
      }
    });
  }

  onInput(event: Event): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    const raw = (event.target as HTMLInputElement).value;
    if (raw === '') {
      this.value.set(null);
      return;
    }
    const n = Number(raw);
    if (Number.isFinite(n)) {
      this.value.set(n);
    }
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
