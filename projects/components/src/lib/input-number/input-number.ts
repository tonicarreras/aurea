import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import type { AuSize } from '../au-size';
import { AuFormControlBase } from '../shared/form-control-base';

/** Numeric control; project inside {@link AuFormField}. */
@Component({
  selector: 'au-input-number',
  templateUrl: './input-number.html',
  styleUrl: './input-number.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-input-number',
    '[attr.data-au-size]': 'size()',
  },
})
export class AuInputNumber extends AuFormControlBase<number> implements FormValueControl<number | null> {
  readonly value = model<number | null>(null);
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
  readonly min = input<number | undefined>(undefined);
  readonly max = input<number | undefined>(undefined);
  readonly step = input<number | 'any'>(1);
  readonly size = input<AuSize>('md');

  readonly valueChange = output<number | null>();
  readonly blur = output<void>();

  readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');

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
    if (this.disabled() || this.readOnly()) {
      return;
    }
    const raw = (event.target as HTMLInputElement).value;
    if (raw === '') {
      this.value.set(null);
      this.valueChange.emit(null);
      return;
    }
    const n = Number(raw);
    if (Number.isFinite(n)) {
      this.value.set(n);
      this.valueChange.emit(n);
    }
  }

  focus(): void {
    this.inputEl().nativeElement.focus();
  }
}
