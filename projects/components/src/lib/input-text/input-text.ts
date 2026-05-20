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
import type { AuSize } from '../au-size';
import { tabFocusState } from '../au-tab-focus-state';

type InputTextType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'search' | 'url';

/**
 * Design-system **single-line** text field: label, control shell, optional hint, error region,
 * and optional **password visibility** toggle.
 *
 * @remarks
 * - **Signal forms:** implements {@link FormValueControl}; bind `[formField]` so `errors` and `invalid`
 *   are driven by your `form()` schema.
 * - **Classic:** use `[(value)]` (empty field ↔ `null`, not `''`).
 * - **Parsing:** empty string sets `null`.
 * - **Focus:** Tab into the field applies an **outer outline** on the control row; pointer focus uses an
 *   **inset** ring so click users are not surprised by a large outline (`tabFocusState` + `--from-tab` CSS).
 * - **Accessibility:** `aria-invalid`, `aria-errormessage`, `aria-describedby`, `aria-required` are kept
 *   in sync with visible state; errors use `role="alert"`.
 *
 * @see {@link FormValueControl} — repository **DESIGN.md** for tokens and field anatomy.
 */
@Component({
  selector: 'au-input-text',
  templateUrl: './input-text.html',
  styleUrl: './input-text.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-input-text',
    '[attr.data-au-size]': 'size()',
  },
})
export class AuInputText implements FormValueControl<string | null> {
  /**
   * Current value — required by {@link FormValueControl}.
   * Use `[(value)]` or bind through `formField` (directive writes into the model).
   */
  readonly value = model<string | null>(null);

  /** Optional visible label; rendered as `<label for="…">` linked to the input `id`. */
  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  /** Hint text; linked via `aria-describedby`. */
  readonly hint = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  /** Manual error message (without signal forms, or in addition). */
  readonly errorMessage = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  /** Errors from signal forms via `formField` (directive populates this when implemented). */
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  /** Explicit invalid flag from parent (e.g. `formField`). */
  readonly invalid = input(false);

  /** Native `type` (`text`, `password`, `email`, etc.). `password` enables the visibility toggle when `showPasswordToggle` is true. */
  readonly type = input<InputTextType>('text');
  /** When true, the input does not accept edits and `valueChange` does not fire for typing. */
  readonly disabled = input(false);
  /**
   * Read-only. Signal-forms controls expose `readonly` on the control; the HTML input uses the
   * `readOnly` property (not the TS `readonly` modifier on this field name).
   */
  readonly readOnly = input(false);
  /** Sets the native `required` attribute and `aria-required` when true. */
  readonly required = input(false);
  /**
   * When `true` (default) and `required` is `true`, shows a visual `*` and screen-reader-only “(required)”.
   * Set to `false` if your design hides the asterisk but keeps HTML validation.
   */
  readonly showRequired = input(true);

  /** Stable `id` for label association and ARIA ids; auto-generated when left empty. */
  readonly id = input<string>('');
  /** Passed to the native `name` attribute for form submission. */
  readonly name = input<string>('');
  /** Native placeholder string. */
  readonly placeholder = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  /** Native `autocomplete` attribute (e.g. `email`, `new-password`). */
  readonly autocomplete = input<string | undefined>(undefined);
  /** Native `minlength` validation hint. */
  readonly minLength = input<number | undefined>(undefined);
  /** Native `maxlength` validation hint. */
  readonly maxLength = input<number | undefined>(undefined);
  /** Visual density: sets `data-au-size` on the host (`sm` | `md` | `lg`). */
  readonly size = input<AuSize>('md');
  /** Renders **Show** / **Hide** when `type === 'password'`; ignored for other types. */
  readonly showPasswordToggle = input(true);

  /** Emits when the native control fires `blur`. */
  readonly blur = output<void>();
  /** Emits the new string on each `input` event when not `disabled`. */
  readonly valueChange = output<string | null>();

  private static idCounter = 0;

  protected readonly passwordRevealed = signal(false);
  /**
   * Outward focus ring only when focus enters the field via Tab (see `onControlRow*` + CSS `--from-tab`);
   * on click, `pointerdown` clears the signal before `focusin`.
   */
  protected readonly fieldFocusByTab = signal(false);

  readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');

  readonly resolvedId = computed(() => {
    const v = this.id();
    if (v) {
      return v;
    }
    return `au-input-text-${++AuInputText.idCounter}`;
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

  /** Field `invalid` or visible UI error. */
  readonly effectiveInvalid = computed(() => this.invalid() || this.isInvalid());

  readonly effectiveInputType = computed((): string => {
    const t = this.type();
    if (t === 'password') {
      return this.passwordRevealed() ? 'text' : 'password';
    }
    return t;
  });

  readonly hasPasswordUi = computed(() => this.type() === 'password' && this.showPasswordToggle());

  /** Hint only; errors use `aria-errormessage` (ARIA 1.3). */
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
    const raw = (event.target as HTMLInputElement).value;
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

  /** Toggles between obscured and plain text when `type` is `password`. */
  togglePasswordVisibility(): void {
    this.passwordRevealed.update((v) => !v);
  }

  /** Moves keyboard focus to the native `<input>`. */
  focus(): void {
    this.inputEl().nativeElement.focus();
  }
}
