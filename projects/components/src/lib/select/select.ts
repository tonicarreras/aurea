import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  Renderer2,
  afterRenderEffect,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';
import { Combobox, ComboboxPopup, ComboboxWidget } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { injectHostRef } from '../au-host-element';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import type { AuSize } from '../au-size';
import { AU_FORM_FIELD } from '../form-field/form-field';
import { displayErrorFromErrors, effectiveInvalidWithField } from '../form-field/form-field';
import { syncFormFieldControlState } from '../form-field/form-field';
import { queryFieldNative } from '../form-field/form-field';
import { tabFocusState } from '../au-tab-focus-state';
import type { AuFieldOption } from '../field-option';
import { AU_LISTBOX_PLACEHOLDER } from '../overlay/au-listbox-value';
import {
  installFieldComboboxListboxSync,
  installFieldComboboxOverlayDetach,
  isFieldComboboxInteractive,
} from '../overlay/field-combobox-sync';
import { FieldListboxOverlay, focusLeftFieldControl } from '../overlay/field-listbox-overlay';
import { AuIcon } from '../icon/icon';
import { AuSpinner } from '../spinner/spinner';

export type AuSelectOption = AuFieldOption;

/**
 * Design-system **select** field: combobox (`button` + `listbox`) with the same dropdown chrome as `au-autocomplete`.
 *
 * @remarks
 * - **Signal forms:** implements {@link FormValueControl}; bind `[formField]` on `string | null`.
 * - **Classic:** use `[(value)]` (empty field ↔ `null`, not `''`).
 * - **Accessibility:** WAI-ARIA combobox via `@angular/aria/combobox` + `listbox`.
 *
 * @see {@link FormValueControl}
 */
@Component({
  selector: 'au-select',
  templateUrl: './select.html',
  styleUrl: './select.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuIcon, AuSpinner, Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option],
  host: {
    class: 'au-select',
    '[attr.data-au-size]': 'size()',
    '[attr.data-au-listbox-open]': 'listboxVisible() ? "" : null',
    '[attr.data-au-loading]': 'loading() ? "" : null',
    '[attr.data-au-empty]': 'showEmpty() ? "" : null',
  },
})
export class AuSelect implements FormValueControl<string | null> {
  readonly value = model<string | null>(null);

  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

  readonly touched = input(false);
  readonly dirty = input(false);
  readonly submitting = input(false);

  readonly options = input<AuSelectOption[]>([]);
  readonly loading = input(false);
  readonly emptyMessage = input('No options');
  readonly disabled = input(false);
  readonly readOnly = input(false);
  readonly required = input(false);

  readonly name = input<string>('');
  readonly placeholder = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });
  readonly autocomplete = input<string | undefined>(undefined);
  readonly size = input<AuSize>('md');

  readonly blur = output<void>();

  protected readonly formField = inject(AU_FORM_FIELD);
  private readonly host = injectHostRef<HTMLElement>();
  private readonly destroyRef = inject(DestroyRef);
  protected readonly fieldFocusByTab = signal(false);
  readonly panelOpen = model(false);
  readonly listboxValue = model<string[]>([]);

  protected readonly placeholderOptionValue = AU_LISTBOX_PLACEHOLDER;

  private readonly document = inject(DOCUMENT);

  private readonly listboxOverlay = new FieldListboxOverlay(
    this.document,
    inject(Renderer2),
    inject(PLATFORM_ID),
    this.destroyRef,
  );

  private readonly syncListboxOverlay = afterRenderEffect(() => {
    const trigger = this.triggerNativeElement();
    const anchor = trigger.closest('.au-select__control-row');
    if (!(anchor instanceof HTMLElement)) {
      return;
    }
    this.listboxOverlay.sync(this.listboxNative(), anchor, this.listboxVisible());
  });

  readonly controlId = computed(() => this.formField.controlId());
  readonly listboxId = computed(() => `${this.controlId()}-listbox`);

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
    return ids.length > 0 ? ids.join(' ') : null;
  });

  readonly hasPlaceholder = computed(() => this.placeholder().trim().length > 0);

  readonly inputDisplay = computed(() => {
    const v = this.value();
    if (v === null || v === undefined) {
      return '';
    }
    return v;
  });

  readonly triggerLabel = computed(() => {
    const v = this.value();
    if (v === null || v === undefined) {
      return this.placeholder();
    }
    return this.options().find((o) => o.value === v)?.label ?? '';
  });

  readonly showingPlaceholder = computed(
    () => (this.value() === null || this.value() === undefined) && this.hasPlaceholder(),
  );

  readonly interactive = computed(() => isFieldComboboxInteractive(this.disabled(), this.readOnly()));

  readonly showEmpty = computed(
    () =>
      this.panelOpen() &&
      this.interactive() &&
      this.options().length === 0 &&
      !this.hasPlaceholder() &&
      !this.loading(),
  );

  readonly listboxVisible = computed(
    () => this.panelOpen() && this.interactive() && !this.loading() && !this.showEmpty(),
  );

  constructor() {
    // softDisabled=false on ngCombobox: Aurea owns disabled/readOnly; Aria keeps keyboard/pointer for programmatic focus.
    effect(
      syncFormFieldControlState(this.formField, {
        displayError: () => this.displayError(),
        effectiveInvalid: () => this.effectiveInvalid(),
        required: () => this.required(),
      }),
    );

    installFieldComboboxListboxSync({
      value: this.value,
      listboxValue: this.listboxValue,
      hasPlaceholder: () => this.hasPlaceholder(),
      applyValue: (next) => this.setValue(next),
      onReselectSameOption: () => {
        this.closePanel();
        this.triggerNativeElement().focus();
      },
      onSelectionComplete: () => {
        this.closePanel();
        this.triggerNativeElement().focus();
      },
    });

    installFieldComboboxOverlayDetach(
      () => this.panelOpen(),
      () => this.listboxOverlay.detach(),
    );
  }

  placeholderOptionId(): string {
    return `${this.controlId()}-option-placeholder`;
  }

  optionId(index: number): string {
    return `${this.controlId()}-option-${index}`;
  }

  onBlurHost(): void {
    this.blur.emit();
  }

  onControlRowFocusin(): void {
    tabFocusState.attach();
    this.fieldFocusByTab.set(tabFocusState.takeNextFocusIsFromTab());
  }

  onControlRowFocusout(event: FocusEvent): void {
    if (!focusLeftFieldControl(event, this.listboxNative())) {
      return;
    }
    this.fieldFocusByTab.set(false);
    this.closePanel();
  }

  focus(): void {
    this.triggerNativeElement().focus();
  }

  private triggerNativeElement(): HTMLButtonElement {
    return queryFieldNative<HTMLButtonElement>(this.host, '.au-select__trigger');
  }

  private listboxNative(): HTMLUListElement | undefined {
    if (!this.listboxVisible()) {
      return undefined;
    }
    return (this.document.getElementById(this.listboxId()) as HTMLUListElement | null) ?? undefined;
  }

  private closePanel(): void {
    this.listboxOverlay.detach();
    this.panelOpen.set(false);
  }

  private setValue(next: string | null): void {
    if (this.value() === next) {
      return;
    }
    this.value.set(next);
  }
}
