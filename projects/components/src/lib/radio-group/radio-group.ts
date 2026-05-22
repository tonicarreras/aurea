import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import type { AuSize } from '../au-size';
import { AU_FORM_FIELD } from '../form-field/form-field';
import { displayErrorFromErrors, effectiveInvalidWithField } from '../form-field/form-field';
import { syncFormFieldControlState } from '../form-field/form-field';
import { tabFocusState } from '../au-tab-focus-state';
import type { AuFieldOption } from '../field-option';

export type AuRadioOption = AuFieldOption;

/** Radio group; project inside {@link AuFormField} (legend from form-field `label`). */
@Component({
  selector: 'au-radio-group',
  templateUrl: './radio-group.html',
  styleUrl: './radio-group.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-radio-group',
    '[attr.data-au-size]': 'size()',
  },
})
export class AuRadioGroup implements FormValueControl<string | null> {
  readonly value = model<string | null>(null);

  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

  readonly options = input<AuRadioOption[]>([]);
  readonly disabled = input(false);
  readonly readOnly = input(false);
  readonly required = input(false);

  readonly name = input<string>('');
  readonly size = input<AuSize>('md');

  readonly blur = output<void>();
  readonly valueChange = output<string | null>();

  protected readonly formField = inject(AU_FORM_FIELD);
  private readonly host = inject(ElementRef<HTMLElement>);
  protected readonly fieldFocusByTab = signal(false);

  readonly controlId = computed(() => this.formField.controlId());
  readonly legendId = computed(() => `${this.controlId()}-legend`);

  readonly groupName = computed(() => {
    const n = this.name().trim();
    if (n) {
      return n;
    }
    return this.controlId();
  });

  readonly legendText = computed(() => {
    const fromField = this.formField.label().trim();
    if (fromField.length > 0) {
      return fromField;
    }
    const n = this.name().trim();
    return n || 'Options';
  });

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

  constructor() {
    afterRenderEffect(
      syncFormFieldControlState(this.formField, {
        displayError: () => this.displayError(),
        effectiveInvalid: () => this.effectiveInvalid(),
        required: () => this.required(),
      }),
    );
  }

  optionInputId(optionValue: string): string {
    const safe = optionValue.replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '') || 'opt';
    return `${this.controlId()}-${safe}`;
  }

  onRadioChange(event: Event): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    const el = event.target as HTMLInputElement;
    if (el.checked) {
      this.value.set(el.value);
      this.valueChange.emit(el.value);
    }
  }

  onShellFocusin(): void {
    tabFocusState.attach();
    this.fieldFocusByTab.set(tabFocusState.takeNextFocusIsFromTab());
  }

  onShellFocusout(event: FocusEvent): void {
    if (!(event.currentTarget instanceof HTMLElement)) {
      return;
    }
    const to = event.relatedTarget;
    if (to != null && to instanceof Node && event.currentTarget.contains(to)) {
      return;
    }
    this.fieldFocusByTab.set(false);
    this.blur.emit();
  }

  focus(): void {
    const first = this.host.nativeElement.querySelector(
      'input[type="radio"]:not(:disabled)',
    ) as HTMLInputElement | null;
    first?.focus();
  }
}
