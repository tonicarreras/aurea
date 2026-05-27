import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import type { AuSize } from '../au-size';
import { displayErrorFromErrors } from '../form-field/form-field';
import { AuFormControlBase } from '../shared/form-control-base';

/** Date control; project inside {@link AuFormField}. */
@Component({
  selector: 'au-input-date',
  templateUrl: './input-date.html',
  styleUrl: './input-date.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-input-date',
    '[attr.data-au-size]': 'size()',
  },
})
export class AuInputDate extends AuFormControlBase<string> implements FormValueControl<string | null> {
  readonly value = model<string | null>(null);
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);
  readonly disabled = input(false);
  readonly required = input(false);

  readonly readOnly = input(false);
  readonly name = input<string>('');
  readonly placeholder = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });
  readonly autocomplete = input<string | undefined>(undefined);
  readonly minDate = input<string | undefined>(undefined);
  readonly maxDate = input<string | undefined>(undefined);
  readonly size = input<AuSize>('md');

  readonly valueChange = output<string | null>();
  readonly blur = output<void>();

  readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');

  /** Error message when the current value is outside minDate / maxDate range. */
  private readonly dateRangeError = computed((): string => {
    const val = this.value();
    if (!val) {
      return '';
    }
    const min = this.minDate();
    const max = this.maxDate();
    if (min && val < min) {
      return `Date must be on or after ${min}`;
    }
    if (max && val > max) {
      return `Date must be on or before ${max}`;
    }
    return '';
  });

  constructor() {
    super();
    this.initBase({
      errors: this.errors,
      invalid: this.invalid,
      required: this.required,
      value: this.value,
    });
    // Override displayError from initBase to include date range validation.
    // This works because isInvalid/effectiveInvalid read this.displayError()
    // lazily — they pick up the reassigned signal at evaluation time.
    this.displayError = computed(() => {
      const range = this.dateRangeError();
      if (range) {
        return range;
      }
      return displayErrorFromErrors(this.errors)();
    });
  }

  override onBlurHost(): void {
    this.blur.emit();
  }

  onInput(event: Event): void {
    if (this.disabled() || this.readOnly()) {
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

  focus(): void {
    this.inputEl().nativeElement.focus();
  }
}
