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

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Design-system **select** field: combobox (`button` + `listbox`) with the same dropdown chrome as `au-autocomplete`.
 *
 * @remarks
 * - **Signal forms:** implements {@link FormValueControl}; bind `[formField]` on `string | null`.
 * - **Classic:** use `[(value)]` (empty field ↔ `null`, not `''`).
 * - **Accessibility:** WAI-ARIA combobox pattern; hidden `name` input for native form posts.
 *
 * @see {@link FormValueControl}
 */
@Component({
  selector: 'au-select',
  templateUrl: './select.html',
  styleUrl: './select.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-select',
    '[attr.data-au-size]': 'size()',
    '[attr.data-au-listbox-open]': 'listboxVisible() ? "" : null',
  },
})
export class AuSelect implements FormValueControl<string | null> {
  readonly value = model<string | null>(null);

  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly hint = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly errorMessage = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

  readonly options = input<SelectOption[]>([]);
  readonly disabled = input(false);
  readonly readOnly = input(false);
  readonly required = input(false);
  readonly showRequired = input(true);

  readonly id = input<string>('');
  readonly name = input<string>('');
  readonly placeholder = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly autocomplete = input<string | undefined>(undefined);
  readonly size = input<AuSize>('md');

  readonly blur = output<void>();
  readonly valueChange = output<string | null>();

  private static idCounter = 0;

  protected readonly fieldFocusByTab = signal(false);
  protected readonly panelOpen = signal(false);
  protected readonly highlightedIndex = signal(-1);

  @ViewChild('listboxEl', { read: ElementRef })
  private listboxRef?: ElementRef<HTMLUListElement>;

  @ViewChild('triggerEl', { read: ElementRef })
  private triggerRef?: ElementRef<HTMLButtonElement>;

  private readonly listboxOverlay = new FieldListboxOverlay(
    inject(DOCUMENT),
    inject(Renderer2),
    inject(PLATFORM_ID),
    inject(DestroyRef),
  );

  constructor() {
    afterRenderEffect(() => {
      const trigger = this.triggerNativeElement();
      const anchor = trigger.closest('.au-select__control-row')! as HTMLElement;
      this.listboxOverlay.sync(this.listboxRef?.nativeElement, anchor, this.listboxVisible());
    });
  }

  readonly resolvedId = computed(() => {
    const v = this.id();
    if (v) {
      return v;
    }
    return `au-select-${++AuSelect.idCounter}`;
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

  readonly listboxVisible = computed(() => this.panelOpen());

  readonly listLength = computed(() => this.options().length + (this.hasPlaceholder() ? 1 : 0));

  readonly activeDescendantId = computed((): string | null => {
    const i = this.highlightedIndex();
    if (!this.listboxVisible() || i < 0) {
      return null;
    }
    if (this.hasPlaceholder() && i === 0) {
      return this.placeholderOptionId();
    }
    const optIndex = this.hasPlaceholder() ? i - 1 : i;
    if (optIndex < 0 || optIndex >= this.options().length) {
      return null;
    }
    return this.optionId(optIndex);
  });

  placeholderOptionIndex(): number {
    return this.hasPlaceholder() ? 0 : -1;
  }

  placeholderOptionId(): string {
    return `${this.resolvedId()}-option-placeholder`;
  }

  optionListIndex(optionIndex: number): number {
    return this.hasPlaceholder() ? optionIndex + 1 : optionIndex;
  }

  optionId(index: number): string {
    return `${this.resolvedId()}-option-${index}`;
  }

  onTriggerClick(): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    if (this.panelOpen()) {
      this.closePanel();
      return;
    }
    this.openPanel();
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    const len = this.listLength();
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        if (!this.panelOpen()) {
          this.openPanel();
          this.highlightedIndex.set(this.firstHighlightableIndex());
          return;
        }
        this.highlightedIndex.update((i) => this.nextHighlightableIndex(i, len, 1));
        return;
      }
      case 'ArrowUp': {
        event.preventDefault();
        if (!this.panelOpen()) {
          this.openPanel();
          this.highlightedIndex.set(this.lastHighlightableIndex(len));
          return;
        }
        this.highlightedIndex.update((i) => this.nextHighlightableIndex(i, len, -1));
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
        this.highlightedIndex.set(this.lastHighlightableIndex(len));
        return;
      }
      case 'Enter':
      case ' ': {
        if (!this.panelOpen()) {
          this.openPanel();
          return;
        }
        event.preventDefault();
        this.activateHighlighted();
        return;
      }
      case 'Escape': {
        if (!this.panelOpen()) {
          return;
        }
        event.preventDefault();
        this.closePanel();
        return;
      }
      default:
        return;
    }
  }

  onOptionPointerEnter(index: number, option?: SelectOption): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    if (option?.disabled) {
      return;
    }
    this.highlightedIndex.set(index);
  }

  onOptionPointerDown(event: Event, option: SelectOption): void {
    event.preventDefault();
    if (option.disabled || this.disabled() || this.readOnly()) {
      return;
    }
    this.selectOption(option);
  }

  onPlaceholderPointerDown(event: Event): void {
    event.preventDefault();
    if (this.disabled() || this.readOnly()) {
      return;
    }
    this.setValue(null);
    this.closePanel();
    this.triggerNativeElement().focus();
  }

  selectOption(option: SelectOption): void {
    if (option.disabled || this.disabled() || this.readOnly()) {
      return;
    }
    this.setValue(option.value);
    this.closePanel();
    this.triggerNativeElement().focus();
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
    this.closePanel();
  }

  focus(): void {
    this.triggerNativeElement().focus();
  }

  private triggerNativeElement(): HTMLButtonElement {
    return this.triggerRef!.nativeElement;
  }

  private openPanel(): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    this.panelOpen.set(true);
    if (this.highlightedIndex() < 0) {
      const current = this.value();
      if (current != null) {
        const idx = this.options().findIndex((o) => o.value === current && !o.disabled);
        if (idx >= 0) {
          this.highlightedIndex.set(this.optionListIndex(idx));
          return;
        }
      }
      this.highlightedIndex.set(this.firstHighlightableIndex());
    }
  }

  private closePanel(): void {
    this.listboxOverlay.detach();
    this.panelOpen.set(false);
    this.highlightedIndex.set(-1);
  }

  private activateHighlighted(): void {
    const i = this.highlightedIndex();
    if (i < 0) {
      return;
    }
    if (this.hasPlaceholder() && i === 0) {
      this.setValue(null);
      this.closePanel();
      return;
    }
    const optIndex = this.hasPlaceholder() ? i - 1 : i;
    const opt = this.options()[optIndex];
    if (opt && !opt.disabled) {
      this.selectOption(opt);
    }
  }

  private setValue(next: string | null): void {
    if (this.value() === next) {
      return;
    }
    this.value.set(next);
    this.valueChange.emit(next);
  }

  private firstHighlightableIndex(): number {
    if (this.hasPlaceholder()) {
      return 0;
    }
    const opts = this.options();
    for (let i = 0; i < opts.length; i++) {
      if (!opts[i]!.disabled) {
        return this.optionListIndex(i);
      }
    }
    return -1;
  }

  private lastHighlightableIndex(len: number): number {
    for (let i = len - 1; i >= 0; i--) {
      if (this.isIndexEnabled(i)) {
        return i;
      }
    }
    return -1;
  }

  private nextHighlightableIndex(current: number, len: number, delta: 1 | -1): number {
    if (len === 0) {
      return -1;
    }
    let i = current < 0 ? (delta > 0 ? -1 : len) : current;
    for (let step = 0; step < len; step++) {
      i += delta;
      if (i < 0) {
        i = len - 1;
      }
      if (i >= len) {
        i = 0;
      }
      if (this.isIndexEnabled(i)) {
        return i;
      }
    }
    return current;
  }

  private isIndexEnabled(listIndex: number): boolean {
    if (this.hasPlaceholder() && listIndex === 0) {
      return true;
    }
    const optIndex = this.hasPlaceholder() ? listIndex - 1 : listIndex;
    const opt = this.options()[optIndex];
    return opt != null && !opt.disabled;
  }
}
