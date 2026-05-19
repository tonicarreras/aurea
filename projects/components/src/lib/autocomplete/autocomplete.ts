import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
  afterRenderEffect,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import { tabFocusState } from '../au-tab-focus-state';
import { FieldListboxOverlay, focusLeftFieldControl } from '../theme/field-listbox-overlay';

type AuSize = 'sm' | 'md' | 'lg';

export interface AutocompleteOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Design-system **autocomplete** field: combobox (`input` + `listbox`) with filter-as-you-type.
 *
 * @remarks
 * - **Signal forms:** implements {@link FormValueControl}; bind `[formField]` on `string | null` (option `value`).
 * - **Classic:** use `[(value)]` (empty field ↔ `null`, not `''`).
 * - **Filtering:** options match when `label` contains the query (case-insensitive by default).
 * - **Accessibility:** WAI-ARIA combobox pattern (`role="combobox"` + `listbox` / `option`).
 * - **Focus:** Tab into the field applies an **outer outline** on the control row; pointer focus uses an
 *   **inset** ring (`tabFocusState` + `--from-tab` CSS).
 *
 * @see {@link FormValueControl}
 */
@Component({
  selector: 'au-autocomplete',
  templateUrl: './autocomplete.html',
  styleUrl: './autocomplete.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-autocomplete',
    '[attr.data-au-size]': 'size()',
    '[attr.data-au-listbox-open]': 'listboxVisible() ? "" : null',
  },
})
export class AuAutocomplete implements FormValueControl<string | null> {
  readonly value = model<string | null>(null);

  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly hint = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly errorMessage = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

  readonly options = input<AutocompleteOption[]>([]);
  readonly disabled = input(false);
  readonly readOnly = input(false);
  readonly required = input(false);
  readonly showRequired = input(true);

  readonly id = input<string>('');
  readonly name = input<string>('');
  readonly placeholder = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  /** Native `autocomplete` on the text input (defaults to `off` to avoid clashing with the listbox). */
  readonly autocomplete = input<string | undefined>('off');
  readonly size = input<AuSize>('md');

  /** Minimum query length before filtering (0 = filter immediately, including empty query). */
  readonly minFilterLength = input(0);
  readonly caseSensitive = input(false);
  /** When true, blur clears the value unless the query matches an option label exactly. */
  readonly strictSelection = input(true);
  readonly noResultsText = input<string, string>('No results', {
    transform: (v) => (v == null ? '' : String(v)),
  });

  readonly blur = output<void>();
  readonly valueChange = output<string | null>();

  private static idCounter = 0;

  protected readonly fieldFocusByTab = signal(false);
  protected readonly panelOpen = signal(false);
  protected readonly query = signal('');
  protected readonly highlightedIndex = signal(-1);

  @ViewChild('listboxEl', { read: ElementRef })
  private listboxRef?: ElementRef<HTMLUListElement>;

  @ViewChild('inputEl', { read: ElementRef })
  private inputRef?: ElementRef<HTMLInputElement>;

  private readonly listboxOverlay = new FieldListboxOverlay(
    inject(DOCUMENT),
    inject(Renderer2),
    inject(PLATFORM_ID),
    inject(DestroyRef),
  );

  readonly resolvedId = computed(() => {
    const v = this.id();
    if (v) {
      return v;
    }
    return `au-autocomplete-${++AuAutocomplete.idCounter}`;
  });

  readonly hintId = computed(() => `${this.resolvedId()}-hint`);
  readonly errorId = computed(() => `${this.resolvedId()}-error`);
  readonly listboxId = computed(() => `${this.resolvedId()}-listbox`);

  readonly displayError = computed(() => {
    const manual = this.errorMessage().trim();
    if (manual.length > 0) {
      return manual;
    }
    const list = this.errors();
    if (list.length === 0) {
      return '';
    }
    const first = list[0]!;
    return (first.message ?? first.kind) || '';
  });

  readonly isInvalid = computed(() => this.displayError().length > 0);
  readonly effectiveInvalid = computed(() => this.invalid() || this.isInvalid());

  readonly ariaDescribedBy = computed((): string | null =>
    this.hint().trim().length > 0 ? this.hintId() : null,
  );

  readonly selectedOption = computed(() => {
    const v = this.value();
    if (v === null || v === undefined) {
      return null;
    }
    return this.options().find((o) => o.value === v) ?? null;
  });

  /** Input text: query while filtering; selected label when closed (no post-render flash). */
  readonly inputValue = computed(() => {
    if (this.panelOpen()) {
      return this.query();
    }
    const opt = this.selectedOption();
    if (opt) {
      return opt.label;
    }
    const v = this.value();
    if (v == null) {
      return '';
    }
    return String(v);
  });

  readonly filteredOptions = computed(() => {
    const q = this.query().trim();
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
    () => this.query().trim().length >= this.minFilterLength(),
  );

  /** Listbox is shown only when the panel is open and the query meets `minFilterLength`. */
  readonly listboxVisible = computed(() => this.panelOpen() && this.meetsMinFilterLength());

  readonly showNoResults = computed(
    () => this.listboxVisible() && this.filteredOptions().length === 0,
  );

  readonly activeDescendantId = computed((): string | null => {
    const i = this.highlightedIndex();
    if (!this.listboxVisible() || i < 0) {
      return null;
    }
    const opts = this.filteredOptions();
    if (i >= opts.length) {
      return null;
    }
    return this.optionId(i);
  });

  constructor() {
    afterRenderEffect(() => {
      const input = this.inputNativeElement();
      const anchor = input.closest('.au-autocomplete__control-row')! as HTMLElement;
      this.listboxOverlay.sync(this.listboxRef?.nativeElement, anchor, this.listboxVisible());
    });
  }

  optionId(index: number): string {
    return `${this.resolvedId()}-option-${index}`;
  }

  onInput(event: Event): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    const raw = (event.target as HTMLInputElement).value;
    this.query.set(raw);
    if (raw === '') {
      this.setValue(null);
    }
    if (!this.meetsMinFilterLength()) {
      this.closePanel(false);
      return;
    }
    this.openPanel();
    this.highlightedIndex.set(this.firstHighlightableIndex());
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    const opts = this.filteredOptions();
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        if (!this.panelOpen()) {
          this.openPanel();
          this.highlightedIndex.set(this.firstHighlightableIndex());
          return;
        }
        this.highlightedIndex.update((i) => this.nextHighlightableIndex(i, opts, 1));
        return;
      }
      case 'ArrowUp': {
        event.preventDefault();
        if (!this.panelOpen()) {
          this.openPanel();
          this.highlightedIndex.set(this.lastHighlightableIndex(opts));
          return;
        }
        this.highlightedIndex.update((i) => this.nextHighlightableIndex(i, opts, -1));
        return;
      }
      case 'Home': {
        if (!this.panelOpen()) {
          return;
        }
        event.preventDefault();
        this.highlightedIndex.set(this.firstHighlightableIndex());
        return;
      }
      case 'End': {
        if (!this.panelOpen()) {
          return;
        }
        event.preventDefault();
        this.highlightedIndex.set(this.lastHighlightableIndex(opts));
        return;
      }
      case 'Enter': {
        if (!this.panelOpen()) {
          return;
        }
        event.preventDefault();
        const i = this.highlightedIndex();
        if (i >= 0 && i < opts.length) {
          this.selectOption(opts[i]!);
        }
        return;
      }
      case 'Escape': {
        if (!this.panelOpen()) {
          return;
        }
        event.preventDefault();
        this.closePanel(true);
        return;
      }
      default:
        return;
    }
  }

  onOptionPointerEnter(index: number, option: AutocompleteOption): void {
    if (option.disabled || this.disabled() || this.readOnly()) {
      return;
    }
    this.highlightedIndex.set(index);
  }

  onOptionPointerDown(event: Event, option: AutocompleteOption): void {
    event.preventDefault();
    if (option.disabled || this.disabled() || this.readOnly()) {
      return;
    }
    this.selectOption(option);
  }

  selectOption(option: AutocompleteOption): void {
    if (option.disabled || this.disabled() || this.readOnly()) {
      return;
    }
    this.query.set(option.label);
    this.setValue(option.value);
    this.closePanel(false);
    this.inputNativeElement().focus();
  }

  onInputFocus(): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    if (!this.panelOpen()) {
      const opt = this.selectedOption();
      this.query.set(opt?.label ?? this.query());
    }
    if (!this.meetsMinFilterLength()) {
      return;
    }
    this.openPanel();
    if (this.highlightedIndex() < 0) {
      this.highlightedIndex.set(this.firstHighlightableIndex());
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
    if (!focusLeftFieldControl(event, this.listboxRef?.nativeElement)) {
      return;
    }
    this.fieldFocusByTab.set(false);
    this.commitQueryOnClose();
    this.closePanel(false);
  }

  focus(): void {
    this.inputNativeElement().focus();
  }

  private inputNativeElement(): HTMLInputElement {
    return this.inputRef!.nativeElement;
  }

  private openPanel(): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    if (!this.meetsMinFilterLength()) {
      return;
    }
    this.panelOpen.set(true);
    if (this.highlightedIndex() < 0) {
      this.highlightedIndex.set(this.firstHighlightableIndex());
    }
  }

  private closePanel(resetQuery: boolean): void {
    this.listboxOverlay.detach();
    this.panelOpen.set(false);
    this.highlightedIndex.set(-1);
    if (resetQuery) {
      const opt = this.selectedOption();
      this.query.set(opt?.label ?? '');
    }
  }

  private commitQueryOnClose(): void {
    const q = this.query().trim();
    if (q === '') {
      this.setValue(null);
      this.query.set('');
      return;
    }
    if (!this.strictSelection()) {
      return;
    }
    const match = this.findOptionByLabel(q) ?? this.findOptionByValue(q);
    if (match) {
      this.query.set(match.label);
      this.setValue(match.value);
      return;
    }
    this.setValue(null);
    this.query.set('');
  }

  private setValue(next: string | null): void {
    if (this.value() === next) {
      return;
    }
    this.value.set(next);
    this.valueChange.emit(next);
  }

  private findOptionByLabel(label: string): AutocompleteOption | undefined {
    const needle = this.caseSensitive() ? label : label.toLowerCase();
    return this.options().find((o) => {
      const hay = this.caseSensitive() ? o.label : o.label.toLowerCase();
      return hay === needle;
    });
  }

  private findOptionByValue(val: string): AutocompleteOption | undefined {
    return this.options().find((o) => o.value === val);
  }

  private firstHighlightableIndex(): number {
    const opts = this.filteredOptions();
    return opts.findIndex((o) => !o.disabled);
  }

  private lastHighlightableIndex(opts: AutocompleteOption[]): number {
    for (let i = opts.length - 1; i >= 0; i--) {
      if (!opts[i]!.disabled) {
        return i;
      }
    }
    return -1;
  }

  private nextHighlightableIndex(
    current: number,
    opts: AutocompleteOption[],
    delta: 1 | -1,
  ): number {
    if (opts.length === 0) {
      return -1;
    }
    let i = current < 0 ? (delta > 0 ? -1 : opts.length) : current;
    for (let step = 0; step < opts.length; step++) {
      i += delta;
      if (i < 0) {
        i = opts.length - 1;
      }
      if (i >= opts.length) {
        i = 0;
      }
      if (!opts[i]!.disabled) {
        return i;
      }
    }
    return current;
  }
}
