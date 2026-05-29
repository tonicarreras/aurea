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
import { AuFormControlBase } from '../shared/form-control-base';
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
export class AuRadioGroup extends AuFormControlBase<string | null> implements FormValueControl<string | null> {
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

  readonly fieldEl = viewChild.required<ElementRef<HTMLDivElement>>('fieldEl');

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

  constructor() {
    super();
    this.initBase({
      errors: this.errors,
      invalid: this.invalid,
      required: this.required,
      value: this.value,
      usesLegend: computed(() => true),
    });
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

  override onControlRowFocusout(event: FocusEvent): void {
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
    const first = this.fieldEl().nativeElement.querySelector<HTMLInputElement>(
      'input[type="radio"]:not(:disabled)',
    );
    first?.focus();
  }
}
