import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { injectHostRef } from '../au-host-element';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';

import type { AuSize } from '../au-size';
import { tabFocusState } from '../au-tab-focus-state';
import {
  createStandaloneAuFormFieldContext,
  displayErrorFromErrors,
  effectiveInvalidWithField,
  injectAuFormField,
  queryFieldNative,
  syncFormFieldControlState,
  AU_FORM_FIELD,
} from '../form-field/form-field';

/** Range slider; project inside {@link AuFormField}. */
@Component({
  selector: 'au-slider',
  templateUrl: './slider.html',
  styleUrl: './slider.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-slider',
    '[attr.data-au-size]': 'size()',
  },
  providers: [{ provide: AU_FORM_FIELD, useFactory: createStandaloneAuFormFieldContext }],
})
export class AuSlider implements FormValueControl<number> {
  readonly value = model(0);

  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

  readonly touched = input(false);
  readonly dirty = input(false);
  readonly submitting = input(false);

  readonly disabled = input(false);
  readonly readOnly = input(false);
  readonly required = input(false);
  readonly name = input<string>('');
  readonly min = input<number | undefined>(undefined);
  readonly max = input<number | undefined>(undefined);
  readonly step = input(1);
  readonly size = input<AuSize>('md');
  readonly showValue = input(false);

  readonly effectiveMin = computed(() => this.min() ?? 0);
  readonly effectiveMax = computed(() => this.max() ?? 100);

  readonly blur = output<void>();

  protected readonly formField = injectAuFormField();
  private readonly host = injectHostRef<HTMLElement>();
  private readonly destroyRef = inject(DestroyRef);
  protected readonly fieldFocusByTab = signal(false);

  readonly controlId = computed(() => this.formField.controlId());
  readonly displayError = displayErrorFromErrors(this.errors);
  readonly isInvalid = computed(() => this.displayError().length > 0);
  readonly effectiveInvalid = effectiveInvalidWithField(this.formField, {
    invalid: () => this.invalid(),
    isInvalid: () => this.isInvalid(),
    touched: () => this.touched(),
    dirty: () => this.dirty(),
  });

  readonly ariaDescribedBy = computed((): string | null => {
    const ids: string[] = [];
    if (this.formField.hint().trim().length > 0) {
      ids.push(this.formField.hintId());
    }
    if (this.effectiveInvalid()) {
      ids.push(this.formField.errorId());
    }
    if (this.showValue()) {
      ids.push(`${this.controlId()}-value`);
    }
    return ids.length > 0 ? ids.join(' ') : null;
  });

  readonly percent = computed(() => {
    const span = Math.max(1, this.effectiveMax() - this.effectiveMin());
    const clamped = Math.min(Math.max(this.value(), this.effectiveMin()), this.effectiveMax());
    return ((clamped - this.effectiveMin()) / span) * 100;
  });

  constructor() {
    effect(
      syncFormFieldControlState(this.formField, {
        displayError: () => this.displayError(),
        effectiveInvalid: () => this.effectiveInvalid(),
        required: () => this.required(),
      }),
    );
  }

  onInput(event: Event): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    const next = Number((event.target as HTMLInputElement).value);
    if (Number.isFinite(next)) {
      this.value.set(next);
    }
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
    queryFieldNative<HTMLInputElement>(this.host, '.au-slider__input').focus();
  }
}
