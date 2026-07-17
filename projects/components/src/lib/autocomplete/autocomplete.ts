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
import {
  installComboboxDisplaySync,
  installFieldComboboxListboxSync,
  installFieldComboboxOverlayDetach,
  isFieldComboboxInteractive,
} from '../overlay/field-combobox-sync';
import { FieldListboxOverlay, focusLeftFieldControl } from '../overlay/field-listbox-overlay';
import { AuIcon } from '../icon/icon';
import { AuSpinner } from '../spinner/spinner';

export type AuAutocompleteOption = AuFieldOption;

/**
 * Design-system **autocomplete** field: combobox (`input` + `listbox`) with filter-as-you-type.
 *
 * @remarks
 * - **Signal forms:** implements {@link FormValueControl}; bind `[formField]` on `string | null` (option `value`).
 * - **Classic:** use `[(value)]` (empty field ↔ `null`, not `''`).
 * - **Filtering:** options match when `label` contains the query (case-insensitive by default).
 * - **Accessibility:** WAI-ARIA combobox via `@angular/aria/combobox` + `listbox`.
 *
 * @see {@link FormValueControl}
 */
@Component({
  selector: 'au-autocomplete',
  templateUrl: './autocomplete.html',
  styleUrl: './autocomplete.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuIcon, AuSpinner, Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option],
  host: {
    class: 'au-autocomplete',
    '[attr.data-au-size]': 'size()',
    '[attr.data-au-listbox-open]': 'listboxVisible() ? "" : null',
    '[attr.data-au-loading]': 'loading() ? "" : null',
    '[attr.data-au-empty]': 'showNoResults() ? "" : null',
  },
})
export class AuAutocomplete implements FormValueControl<string | null> {
  readonly value = model<string | null>(null);

  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

  readonly touched = input(false);
  readonly dirty = input(false);
  readonly submitting = input(false);

  readonly options = input<AuAutocompleteOption[]>([]);
  readonly loading = input(false);
  readonly disabled = input(false);
  readonly readOnly = input(false);
  readonly required = input(false);

  readonly name = input<string>('');
  readonly placeholder = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });
  readonly autocomplete = input<string | undefined>('off');
  readonly size = input<AuSize>('md');

  readonly minFilterLength = input(0);
  readonly caseSensitive = input(false);
  readonly strictSelection = input(true);
  readonly noResultsText = input<string, string>('No results', {
    transform: (v) => (v == null ? '' : String(v)),
  });

  readonly blur = output<void>();

  protected readonly formField = inject(AU_FORM_FIELD);
  private readonly host = injectHostRef<HTMLElement>();
  private readonly destroyRef = inject(DestroyRef);
  protected readonly fieldFocusByTab = signal(false);
  readonly panelOpen = model(false);
  readonly comboboxValue = model('');
  readonly listboxValue = model<string[]>([]);

  private readonly document = inject(DOCUMENT);

  private readonly listboxOverlay = new FieldListboxOverlay(
    this.document,
    inject(Renderer2),
    inject(PLATFORM_ID),
    this.destroyRef,
  );

  private readonly syncListboxOverlay = afterRenderEffect(() => {
    const input = this.inputNativeElement();
    const anchor = input.closest('.au-autocomplete__control-row');
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

  readonly interactive = computed(() =>
    isFieldComboboxInteractive(this.disabled(), this.readOnly()),
  );

  readonly selectedOption = computed(() => {
    const v = this.value();
    if (v === null || v === undefined) {
      return null;
    }
    return this.options().find((o) => o.value === v) ?? null;
  });

  readonly filteredOptions = computed(() => {
    const q = (this.comboboxValue() ?? '').trim();
    const min = this.minFilterLength();
    if (q.length < min) {
      return [];
    }
    const opts = this.options();
    if (q.length === 0) {
      return opts;
    }
    const needle = this.caseSensitive() ? q : q.toLowerCase();
    return opts.filter((opt) => {
      const hay = this.caseSensitive() ? opt.label : opt.label.toLowerCase();
      return hay.includes(needle);
    });
  });

  readonly meetsMinFilterLength = computed(
    () => (this.comboboxValue() ?? '').trim().length >= this.minFilterLength(),
  );

  readonly listboxVisible = computed(
    () =>
      this.panelOpen() &&
      this.interactive() &&
      this.meetsMinFilterLength() &&
      !this.loading() &&
      this.filteredOptions().length > 0,
  );

  readonly showNoResults = computed(
    () =>
      this.panelOpen() &&
      this.interactive() &&
      this.meetsMinFilterLength() &&
      !this.loading() &&
      this.filteredOptions().length === 0,
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
      hasPlaceholder: () => false,
      applyValue: (next) => {
        const option = this.options().find((entry) => entry.value === next);
        if (option) {
          this.comboboxValue.set(option.label);
        }
        this.setValue(next);
      },
      onReselectSameOption: () => {
        this.closePanel();
        this.inputNativeElement().focus();
      },
      onSelectionComplete: () => {
        this.closePanel();
        this.inputNativeElement().focus();
      },
    });

    installComboboxDisplaySync({
      value: () => this.value(),
      options: () => this.options(),
      panelOpen: () => this.panelOpen(),
      comboboxValue: this.comboboxValue,
    });

    effect(() => {
      const query = this.comboboxValue();
      untracked(() => {
        if (query === '') {
          this.setValue(null);
        }
        if (!this.meetsMinFilterLength()) {
          this.closePanel();
        }
      });
    });

    installFieldComboboxOverlayDetach(
      () => this.panelOpen(),
      () => this.listboxOverlay.detach(),
    );
  }

  optionId(index: number): string {
    return `${this.controlId()}-option-${index}`;
  }

  onInputFocus(): void {
    if (!this.interactive()) {
      return;
    }
    if (!this.panelOpen()) {
      const opt = this.selectedOption();
      if (opt) {
        this.comboboxValue.set(opt.label);
      }
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
    if (!focusLeftFieldControl(event, this.listboxNative())) {
      return;
    }
    this.fieldFocusByTab.set(false);
    this.commitQueryOnClose();
    this.closePanel();
  }

  focus(): void {
    this.inputNativeElement().focus();
  }

  private inputNativeElement(): HTMLInputElement {
    return queryFieldNative<HTMLInputElement>(this.host, '.au-autocomplete__input');
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

  private commitQueryOnClose(): void {
    const q = (this.comboboxValue() ?? '').trim();
    if (q === '') {
      this.setValue(null);
      this.comboboxValue.set('');
      return;
    }
    if (!this.strictSelection()) {
      return;
    }
    const match = this.findOptionByLabel(q) ?? this.findOptionByValue(q);
    if (match) {
      this.comboboxValue.set(match.label);
      this.setValue(match.value);
      return;
    }
    this.setValue(null);
    this.comboboxValue.set('');
  }

  private setValue(next: string | null): void {
    if (this.value() === next) {
      return;
    }
    this.value.set(next);
  }

  private findOptionByLabel(label: string): AuAutocompleteOption | undefined {
    const needle = this.caseSensitive() ? label : label.toLowerCase();
    return this.options().find((o) => {
      const hay = this.caseSensitive() ? o.label : o.label.toLowerCase();
      return hay === needle;
    });
  }

  private findOptionByValue(val: string): AuAutocompleteOption | undefined {
    return this.options().find((o) => o.value === val);
  }
}
