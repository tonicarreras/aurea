import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import type { AuSize } from '../au-size';
import { AuFormControlBase } from '../shared/form-control-base';

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
  host: {
    class: 'au-input-text',
    '[attr.data-au-size]': 'size()',
  },
})
export class AuInputText extends AuFormControlBase<string> implements FormValueControl<string | null> {
  readonly value = model<string | null>(null);
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);
  readonly disabled = input(false);
  readonly required = input(false);

  readonly type = input<InputTextType>('text');
  readonly readOnly = input(false);
  readonly name = input<string>('');
  readonly placeholder = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });
  readonly autocomplete = input<string | undefined>(undefined);
  readonly minLength = input<number | undefined>(undefined);
  readonly maxLength = input<number | undefined>(undefined);
  readonly size = input<AuSize>('md');
  readonly showPasswordToggle = input(true);

  readonly valueChange = output<string | null>();
  readonly blur = output<void>();

  readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');

  protected readonly passwordRevealed = signal(false);

  readonly effectiveInputType = computed((): string => {
    const t = this.type();
    if (t === 'password') {
      return this.passwordRevealed() ? 'text' : 'password';
    }
    return t;
  });

  readonly hasPasswordUi = computed(() => this.type() === 'password' && this.showPasswordToggle());

  constructor() {
    super();
    this.initBase({
      errors: this.errors,
      invalid: this.invalid,
      required: this.required,
      value: this.value,
    });
  }

  override onBlurHost(): void {
    this.blur.emit();
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

  togglePasswordVisibility(): void {
    this.passwordRevealed.update((v) => !v);
  }

  focus(): void {
    this.inputEl().nativeElement.focus();
  }
}
