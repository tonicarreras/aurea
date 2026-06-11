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
import type { FormCheckboxControl, ValidationError } from '@angular/forms/signals';
import type { AuSize } from '../au-size';
import { displayErrorFromErrors, effectiveInvalidWithField } from '../form-field/form-field';
import { syncFormFieldControlState } from '../form-field/form-field';
import { AU_FORM_FIELD } from '../form-field/form-field';
import { createStandaloneAuFormFieldContext, injectAuFormField } from '../form-field/form-field';
import { queryFieldNative } from '../form-field/form-field';
import { tabFocusState } from '../au-tab-focus-state';

/** Checkbox; inline `label` on control; hint/error on {@link AuFormField}. */
@Component({
  selector: 'au-checkbox',
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-checkbox',
    '[attr.data-au-size]': 'size()',
  },
  providers: [{ provide: AU_FORM_FIELD, useFactory: createStandaloneAuFormFieldContext }],
})
export class AuCheckbox implements FormCheckboxControl {
  readonly checked = model(false);

  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly description = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });

  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

  readonly disabled = input(false);
  readonly required = input(false);
  readonly showRequired = input(true);
  readonly indeterminate = input(false);
  /** Visually hide label/description while keeping them available to assistive tech. */
  readonly hideLabel = input(false);

  readonly size = input<AuSize>('md');
  readonly name = input<string>('');

  readonly blur = output<void>();

  protected readonly formField = injectAuFormField();
  private readonly host = inject(ElementRef<HTMLElement>);
  protected readonly focusByTab = signal(false);

  private readonly syncIndeterminate = afterRenderEffect(() => {
    queryFieldNative<HTMLInputElement>(this.host, '.au-checkbox__element').indeterminate =
      this.indeterminate();
  });

  readonly controlId = computed(() => this.formField.controlId());
  readonly descriptionId = computed(() => `${this.controlId()}-desc`);

  readonly displayError = displayErrorFromErrors(this.errors);
  readonly isInvalid = computed(() => this.displayError().length > 0);
  readonly effectiveInvalid = effectiveInvalidWithField(this.formField, {
    invalid: () => this.invalid(),
    isInvalid: () => this.isInvalid(),
  });
  readonly isChecked = computed(() => this.effectiveChecked());

  readonly ariaDescribedBy = computed((): string | null => {
    const ids: string[] = [];
    if (this.description().trim().length > 0) {
      ids.push(this.descriptionId());
    }
    if (this.formField.hint().trim().length > 0) {
      ids.push(this.formField.hintId());
    }
    if (this.effectiveInvalid()) {
      ids.push(this.formField.errorId());
    }
    return ids.length > 0 ? ids.join(' ') : null;
  });

  readonly effectiveChecked = computed(() => {
    if (this.indeterminate()) {
      return false;
    }
    return this.checked();
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

  onInput(event: Event): void {
    if (this.disabled()) {
      return;
    }
    const target = event.target as HTMLInputElement;
    const newValue = target.checked;
    this.checked.set(newValue);
  }

  onChange(event: Event): void {
    this.onInput(event);
  }

  onControlFocusin(): void {
    tabFocusState.attach();
    this.focusByTab.set(tabFocusState.takeNextFocusIsFromTab());
  }

  onControlFocusout(event: FocusEvent): void {
    if (!(event.currentTarget instanceof HTMLElement)) {
      return;
    }
    const to = event.relatedTarget;
    if (to != null && to instanceof Node && event.currentTarget.contains(to)) {
      return;
    }
    this.focusByTab.set(false);
    this.blur.emit();
  }

  focus(): void {
    queryFieldNative<HTMLInputElement>(this.host, '.au-checkbox__element').focus();
  }
}
