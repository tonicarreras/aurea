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

/** Switch toggle; inline `label` on control; hint/error on {@link AuFormField}. */
@Component({
  selector: 'au-switch',
  templateUrl: './switch.html',
  styleUrl: './switch.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-switch',
    '[attr.data-au-size]': 'size()',
  },
  providers: [{ provide: AU_FORM_FIELD, useFactory: createStandaloneAuFormFieldContext }],
})
export class AuSwitch implements FormCheckboxControl {
  readonly checked = model<boolean>(false);

  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

  readonly disabled = input(false);
  readonly required = input(false);
  readonly showRequired = input(true);

  readonly size = input<AuSize>('md');
  readonly name = input<string>('');

  readonly blur = output<void>();
  readonly checkedChange = output<boolean>();

  protected readonly formField = injectAuFormField();
  private readonly host = inject(ElementRef<HTMLElement>);
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

  constructor() {
    afterRenderEffect(
      syncFormFieldControlState(this.formField, {
        displayError: () => this.displayError(),
        effectiveInvalid: () => this.effectiveInvalid(),
        required: () => this.required(),
      }),
    );
  }

  onChange(event: Event): void {
    if (this.disabled()) {
      return;
    }
    const target = event.target as HTMLInputElement;
    const next = target.checked;
    this.checked.set(next);
    this.checkedChange.emit(next);
  }

  onBlurHost(): void {
    this.blur.emit();
  }

  onControlRowFocusin(): void {
    tabFocusState.attach();
    this.fieldFocusByTab.set(tabFocusState.takeNextFocusIsFromTab());
  }

  onControlRowFocusout(event: FocusEvent): void {
    if (!(event.currentTarget instanceof HTMLElement)) {
      return;
    }
    const to = event.relatedTarget;
    if (to != null && to instanceof Node && event.currentTarget.contains(to)) {
      return;
    }
    this.fieldFocusByTab.set(false);
  }

  focus(): void {
    queryFieldNative<HTMLInputElement>(this.host, '.au-switch__element').focus();
  }
}
