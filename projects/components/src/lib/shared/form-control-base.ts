import {
  afterRenderEffect,
  computed,
  signal,
  type Signal,
} from '@angular/core';
import type { ValidationError } from '@angular/forms/signals';
import { displayErrorFromErrors, effectiveInvalidWithField, injectAuFormField, type AuFormFieldContext } from '../form-field/form-field';
import { syncFormFieldControlState } from '../form-field/form-field';
import { tabFocusState } from '../au-tab-focus-state';

export interface AuFormControlParams<T> {
  errors: Signal<readonly ValidationError.WithOptionalFieldTree[]>;
  invalid: Signal<boolean>;
  required: Signal<boolean>;
  value: Signal<T | null>;
  /** When true, the group renders its own `<legend>`; suppress the wrapper label. */
  usesLegend?: Signal<boolean>;
}

/**
 * Shared base for Aurea form controls that project inside {@link AuFormField}.
 *
 * Subclasses must call {@link initBase} in their constructor (after `super()`)
 * to wire up all common computed signals and the `afterRenderEffect`.
 */
export abstract class AuFormControlBase<T> {
  /* ---- Injections (available before initBase) ---- */
  protected readonly formField: AuFormFieldContext = injectAuFormField();
  protected readonly fieldFocusByTab = signal(false);

  /* ---- Set by initBase() — call it in subclass constructor ---- */
  /** @internal Set by {@link initBase}. */
  controlId!: Signal<string>;
  /** @internal Set by {@link initBase}. */
  displayError!: Signal<string>;
  /** @internal Set by {@link initBase}. */
  isInvalid!: Signal<boolean>;
  /** @internal Set by {@link initBase}. */
  effectiveInvalid!: Signal<boolean>;
  /** @internal Set by {@link initBase}. */
  ariaDescribedBy!: Signal<string | null>;
  /** @internal Set by {@link initBase}. */
  inputDisplay!: Signal<string>;

  /**
   * Wire up common computed signals and the `afterRenderEffect` sync.
   * Must be called from the subclass constructor **after** `super()`.
   */
  protected initBase(params: AuFormControlParams<T>): void {
    this.controlId = computed(() => this.formField.controlId());

    this.displayError = displayErrorFromErrors(params.errors);

    this.isInvalid = computed(() => this.displayError().length > 0);

    this.effectiveInvalid = effectiveInvalidWithField(this.formField, {
      invalid: () => params.invalid(),
      isInvalid: () => this.isInvalid(),
    });

    this.ariaDescribedBy = computed((): string | null => {
      const ids: string[] = [];
      if (this.formField.hint().trim().length > 0) {
        ids.push(this.formField.hintId());
      }
      if (this.effectiveInvalid()) {
        ids.push(this.formField.errorId());
      }
      return ids.length > 0 ? ids.join(' ') : null;
    });

    this.inputDisplay = computed(() => {
      const v = params.value();
      if (v === null || v === undefined) {
        return '';
      }
      return String(v);
    });

    afterRenderEffect(
      syncFormFieldControlState(this.formField, {
        displayError: () => this.displayError(),
        effectiveInvalid: () => this.effectiveInvalid(),
        required: () => params.required(),
        usesLegend: params.usesLegend as (() => boolean) | undefined,
      }),
    );
  }

  /* ---- Focus / blur infrastructure ---- */

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

  onBlurHost(): void {
    // Subclass defines `blur` output and emits it here — override if needed.
  }

  abstract focus(): void;
}
