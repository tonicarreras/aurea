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
import { queryFieldNative } from '../form-field/form-field';
import { tabFocusState } from '../au-tab-focus-state';
import { AuIcon } from '../icon/icon';

type InputTextType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'search' | 'url';

/**
 * Design-system **single-line** text control. Must be projected inside {@link AuFormField}.
 *
 * @remarks
 * - **Signal forms:** `formField` + `errors` / `invalid` from the schema; label, hint, and error UI live on `au-form-field`.
 * - **Classic:** `[(value)]` inside `au-form-field` (empty field ↔ `null`).
 */
@Component({
  selector: 'au-input-text',
  templateUrl: './input-text.html',
  styleUrl: './input-text.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuIcon],
  host: {
    class: 'au-input-text',
    '[attr.data-au-size]': 'size()',
  },
})
export class AuInputText implements FormValueControl<string | null> {
  readonly value = model<string | null>(null);

  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

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
  readonly showPasswordToggle = input(true);

  readonly blur = output<void>();
  readonly valueChange = output<string | null>();

  protected readonly formField = inject(AU_FORM_FIELD);
  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly passwordRevealed = signal(false);
  protected readonly fieldFocusByTab = signal(false);

  readonly controlId = computed(() => this.formField.controlId());
  readonly displayError = displayErrorFromErrors(this.errors);
  readonly isInvalid = computed(() => this.displayError().length > 0);
  readonly effectiveInvalid = effectiveInvalidWithField(this.formField, {
    invalid: () => this.invalid(),
    isInvalid: () => this.isInvalid(),
  });

  readonly effectiveInputType = computed((): string => {
    const t = this.type();
    if (t === 'password') {
      return this.passwordRevealed() ? 'text' : 'password';
    }
    return t;
  });

  readonly hasPasswordUi = computed(() => this.type() === 'password' && this.showPasswordToggle());

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
    const raw = (event.target as HTMLInputElement).value;
    if (raw === '') {
      this.value.set(null);
      this.valueChange.emit(null);
      return;
    }
    this.value.set(raw);
    this.valueChange.emit(raw);
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

  togglePasswordVisibility(): void {
    this.passwordRevealed.update((v) => !v);
  }

  focus(): void {
    queryFieldNative<HTMLInputElement>(this.host, '.au-input-text__input').focus();
  }
}
