import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  model,
  output,
  type Signal,
  viewChild,
} from '@angular/core';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import type { AuSize } from '../au-size';
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
export class AuInputDate extends AuFormControlBase<string | null> implements FormValueControl<string | null> {
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

  /** Merged errors: upstream signal-form errors + inline date range validation. */
  private readonly mergedErrors: Signal<readonly ValidationError.WithOptionalFieldTree[]> = computed(() => {
    const base = this.errors();
    const val = this.value();
    if (!val) {
      return base;
    }
    const min = this.minDate();
    const max = this.maxDate();
    let rangeMsg = '';
    if (min && val < min) {
      rangeMsg = `Date must be on or after ${min}`;
    } else if (max && val > max) {
      rangeMsg = `Date must be on or before ${max}`;
    }
    if (!rangeMsg) {
      return base;
    }
    return [{ message: rangeMsg, kind: 'date-range' } as ValidationError.WithOptionalFieldTree, ...base];
  });

  constructor() {
    super();
    this.initBase({
      errors: this.mergedErrors,
      invalid: this.invalid,
      required: this.required,
      value: this.value,
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
