import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import { tabFocusState } from '../au-tab-focus-state';

type AuSize = 'sm' | 'md' | 'lg';

type TextareaResize = 'none' | 'vertical' | 'both';

/**
 * Design-system **multiline** field: same chrome as **au-input-text** (label, shell, hint, error)
 * but backed by a native `<textarea>`.
 *
 * @remarks
 * - **Resize:** default `vertical` so users can grow height without breaking horizontal layouts.
 * - **Signal forms:** implements {@link FormValueControl}; use `[formField]` like other controls.
 * - **Classic:** use `[(value)]` (empty field ↔ `null`, not `''`).
 * - **Parsing:** empty string sets `null`.
 * - **Accessibility:** `aria-invalid`, `aria-errormessage`, `aria-describedby`; error uses `role="alert"`.
 *   The element is implicitly multiline; **do not** set `aria-multiline` redundantly.
 * - **Focus:** same Tab vs pointer ring behavior as `au-input-text` via `tabFocusState`.
 *
 * @see {@link FormValueControl} — **DESIGN.md** for tokens.
 */
@Component({
  selector: 'au-textarea',
  templateUrl: './textarea.html',
  styleUrl: './textarea.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-textarea',
    '[attr.data-au-size]': 'size()',
  },
})
export class Textarea implements FormValueControl<string | null> {
  /** Bound value (`ModelSignal<string | null>`). */
  readonly value = model<string | null>(null);

  /** Optional `<label>` text; associated by `for` / `id`. */
  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  /** Helper paragraph; `aria-describedby` when non-empty. */
  readonly hint = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  /** Manual error string; wins over `errors` for the visible message. */
  readonly errorMessage = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  /** Validation errors from `formField` / signal forms. */
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  /** Parent-driven invalid flag. */
  readonly invalid = input(false);

  /** Disables editing and suppresses `valueChange` from typing. */
  readonly disabled = input(false);
  /** Read-only textarea (content selectable, not editable). */
  readonly readOnly = input(false);
  /** Native `required` + `aria-required`. */
  readonly required = input(false);
  /** Show `*` and SR “(required)” when combined with `required`. */
  readonly showRequired = input(true);

  /** Stable id for label + ARIA; auto-generated when empty. */
  readonly id = input<string>('');
  /** Native `name` for forms. */
  readonly name = input<string>('');
  /** Native placeholder. */
  readonly placeholder = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly autocomplete = input<string | undefined>(undefined);
  readonly minLength = input<number | undefined>(undefined);
  readonly maxLength = input<number | undefined>(undefined);
  /** Logical row count (HTML attribute). */
  readonly rows = input(4);
  /** Columns (optional); rarely used with fluid layouts. */
  readonly cols = input<number | undefined>(undefined);
  /**
   * Resize mode: default `vertical` lets users expand height without aggressively affecting
   * horizontal page layout.
   */
  readonly resize = input<TextareaResize>('vertical');
  /** `true` / `false`, or omit for browser default. */
  readonly spellcheck = input<boolean | undefined>(undefined);
  /** Line wrapping for submission. */
  readonly wrap = input<'soft' | 'hard'>('soft');
  readonly size = input<AuSize>('md');

  /** Emits on `blur`. */
  readonly blur = output<void>();
  /** Emits on `input` when not disabled. */
  readonly valueChange = output<string | null>();

  private static idCounter = 0;

  protected readonly fieldFocusByTab = signal(false);
  readonly textareaEl = viewChild.required<ElementRef<HTMLTextAreaElement>>('textareaEl');

  readonly resolvedId = computed(() => {
    const v = this.id();
    if (v) {
      return v;
    }
    return `au-textarea-${++Textarea.idCounter}`;
  });

  readonly hintId = computed(() => `${this.resolvedId()}-hint`);
  readonly errorId = computed(() => `${this.resolvedId()}-error`);

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
  /** `true` when `invalid` input is true or there is a visible error message. */
  readonly effectiveInvalid = computed(() => this.invalid() || this.isInvalid());

  readonly ariaDescribedBy = computed((): string | null =>
    this.hint().trim().length > 0 ? this.hintId() : null,
  );

  readonly inputDisplay = computed(() => {
    const v = this.value();
    if (v === null || v === undefined) {
      return '';
    }
    return v;
  });

  onInput(event: Event): void {
    if (this.disabled()) {
      return;
    }
    const raw = (event.target as HTMLTextAreaElement).value;
    if (raw === '') {
      this.value.set(null);
      this.valueChange.emit(null);
      return;
    }
    this.value.set(raw);
    this.valueChange.emit(raw);
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

  /** Focuses the native `<textarea>`. */
  focus(): void {
    this.textareaEl().nativeElement.focus();
  }
}
