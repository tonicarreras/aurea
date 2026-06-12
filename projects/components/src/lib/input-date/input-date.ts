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
  viewChild,
} from '@angular/core';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import type { AuSize } from '../au-size';
import { AU_FORM_FIELD } from '../form-field/form-field';
import { displayErrorFromErrors, effectiveInvalidWithField } from '../form-field/form-field';
import { syncFormFieldControlState } from '../form-field/form-field';
import { queryFieldNative } from '../form-field/form-field';
import {
  applyNativeTemporalMinMax,
  isWithinTemporalBounds,
  syncNativeTemporalValue,
} from '../field-temporal-bounds';
import { AuInternalTemporalPickerPanel } from '../field-bounded-temporal-picker';
import {
  buildDatePickerOptions,
  hasTemporalBounds,
} from '../field-temporal-options';
import { tabFocusState } from '../au-tab-focus-state';
import { openNativePicker } from '../au-open-native-picker';
import { AuIcon } from '../icon/icon';

/** Date control; project inside {@link AuFormField}. */
@Component({
  selector: 'au-input-date',
  templateUrl: './input-date.html',
  styleUrl: './input-date.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuIcon, AuInternalTemporalPickerPanel],
  host: {
    class: 'au-input-date',
    '[attr.data-au-size]': 'size()',
    '[attr.data-au-bounded-picker]': 'useBoundedPicker() ? "" : null',
  },
})
export class AuInputDate implements FormValueControl<string | null> {
  readonly value = model<string | null>(null);
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
  readonly minDate = input<string | undefined>(undefined);
  readonly maxDate = input<string | undefined>(undefined);
  readonly size = input<AuSize>('md');

  readonly blur = output<void>();

  protected readonly formField = inject(AU_FORM_FIELD);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('inputEl');
  protected readonly controlRowRef = viewChild<ElementRef<HTMLElement>>('controlRow');
  protected readonly fieldFocusByTab = signal(false);
  protected readonly pickerOpen = signal(false);

  readonly useBoundedPicker = computed(() => hasTemporalBounds(this.minDate(), this.maxDate()));
  readonly pickerOptions = computed(() => buildDatePickerOptions(this.minDate(), this.maxDate()));

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

    afterRenderEffect(() => {
      const el = this.inputRef()?.nativeElement;
      if (!el) {
        return;
      }
      applyNativeTemporalMinMax(el, this.minDate(), this.maxDate());
    });

    afterRenderEffect(() => {
      const el = this.inputRef()?.nativeElement;
      if (!el) {
        return;
      }
      syncNativeTemporalValue(el, this.inputDisplay());
    });
  }

  onInput(event: Event): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    this.reconcileNativeValue(event.target as HTMLInputElement);
  }

  onChange(event: Event): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    this.reconcileNativeValue(event.target as HTMLInputElement);
  }

  private reconcileNativeValue(el: HTMLInputElement): void {
    const raw = el.value;
    if (raw === '') {
      this.value.set(null);
      return;
    }
    if (!isWithinTemporalBounds(raw, this.minDate(), this.maxDate())) {
      el.value = this.inputDisplay();
      return;
    }
    this.value.set(raw);
  }

  onBlurHost(): void {
    const el = this.inputRef()?.nativeElement;
    if (el && !this.disabled() && !this.readOnly()) {
      this.reconcileNativeValue(el);
    }
    this.blur.emit();
  }

  onPickerIconClick(event: MouseEvent): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (this.useBoundedPicker()) {
      this.togglePicker();
      return;
    }
    const el = queryFieldNative<HTMLInputElement>(this.host, '.au-input-date__input');
    applyNativeTemporalMinMax(el, this.minDate(), this.maxDate());
    openNativePicker(el);
  }

  onNativeInputClick(event: MouseEvent): void {
    if (!this.useBoundedPicker() || this.disabled() || this.readOnly()) {
      return;
    }
    event.preventDefault();
    this.togglePicker();
  }

  protected togglePicker(): void {
    this.pickerOpen.update((open) => !open);
  }

  protected closePicker(): void {
    this.pickerOpen.set(false);
  }

  protected onPickerPick(next: string): void {
    this.value.set(next);
    const el = this.inputRef()?.nativeElement;
    if (el) {
      el.value = next;
    }
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
    queryFieldNative<HTMLInputElement>(this.host, '.au-input-date__input').focus();
  }
}
