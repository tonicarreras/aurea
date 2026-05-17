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

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

type AuSize = 'sm' | 'md' | 'lg';

/**
 * Design-system **select** field: label, control shell, optional hint, error region.
 *
 * @remarks
 * - **Signal forms:** implements {@link FormValueControl}; bind `[formField]` so `errors` and `invalid`
 *   are driven by your `form()` schema.
 * - **Classic:** use `[(value)]` and set `errorMessage` and/or `invalid` from the parent.
 * - **Accessibility:** uses native `<select>` for maximum accessibility (WCAG 4.1.2).
 * - **Focus:** Tab into the field applies an **outer outline** on the control row; pointer focus uses an
 *   **inset** ring so click users are not surprised by a large outline (`tabFocusState` + `--from-tab` CSS).
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
  },
})
export class Select implements FormValueControl<string> {
  /**
   * Current value — required by {@link FormValueControl}.
   * Use `[(value)]` or bind through `formField` (directive writes into the model).
   */
  readonly value = model<string>('');

  /** Optional visible label; rendered as `<label for="…">` linked to the select `id`. */
  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  /** Hint text; linked via `aria-describedby`. */
  readonly hint = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  /** Manual error message (without signal forms, or in addition). */
  readonly errorMessage = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  /** Errors from signal forms via `formField` (directive populates this when implemented). */
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  /** Explicit invalid flag from parent (e.g. `formField`). */
  readonly invalid = input(false);

  /** Array of select options. */
  readonly options = input<SelectOption[]>([]);
  /** When true, the select does not accept interaction. */
  readonly disabled = input(false);
  /** Sets the native `required` attribute and `aria-required` when true. */
  readonly required = input(false);
  /**
   * When `true` (default) and `required` is `true`, shows a visual `*` and screen-reader-only "(required)".
   * Set to `false` if your design hides the asterisk but keeps HTML validation.
   */
  readonly showRequired = input(true);

  /** Stable `id` for label association and ARIA ids; auto-generated when left empty. */
  readonly id = input<string>('');
  /** Passed to the native `name` attribute for form submission. */
  readonly name = input<string>('');
  /** Placeholder option value displayed when no value is selected. */
  readonly placeholder = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  /** Visual density: sets `data-au-size` on the host (`sm` | `md` | `lg`). */
  readonly size = input<AuSize>('md');

  /** Emits when the native control fires `blur`. */
  readonly blur = output<void>();
  /** Emits the new string on each `change` event when not `disabled`. */
  readonly valueChange = output<string>();

  private static idCounter = 0;

  /**
   * Outward focus ring only when focus enters the field via Tab (see `onControlRow*` + CSS `--from-tab`);
   * on click, `pointerdown` clears the signal before `focusin`.
   */
  protected readonly fieldFocusByTab = signal(false);

  readonly selectEl = viewChild.required<ElementRef<HTMLSelectElement>>('selectEl');

  readonly resolvedId = computed(() => {
    const v = this.id();
    if (v) {
      return v;
    }
    return `au-select-${++Select.idCounter}`;
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

  /** Hint only; errors use `aria-errormessage` (ARIA 1.3). */
  readonly ariaDescribedBy = computed((): string | null =>
    this.hint().trim().length > 0 ? this.hintId() : null,
  );

  readonly hasPlaceholder = computed(() => this.placeholder().trim().length > 0);

  onChange(event: Event): void {
    if (this.disabled()) {
      return;
    }
    const v = (event.target as HTMLSelectElement).value;
    this.value.set(v);
    this.valueChange.emit(v);
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

  /** Moves keyboard focus to the native `<select>`. */
  focus(): void {
    this.selectEl().nativeElement.focus();
  }
}