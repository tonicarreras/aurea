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

/**
 * Design-system **date** field: native `<input type="date">` with the same chrome as other fields.
 *
 * @remarks
 * - **Signal forms:** implements {@link FormValueControl}; bind `[formField]` on `string | null`.
 * - **Classic:** use `[(value)]` (empty field ↔ `null`, not `''`).
 * - **Parsing:** uses native date input; empty string sets `null`. Use `[minDate]` /
 *   `[maxDate]` for native `min`/`max` (ISO strings); do not confuse with numeric `min`/`max` from {@link FormUiControl}.
 * - **Accessibility:** native date picker + `aria-invalid` / `aria-errormessage` when invalid.
 *
 * @see {@link FormValueControl}
 */
@Component({
  selector: 'au-input-date',
  templateUrl: './input-date.html',
  styleUrl: './input-date.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-input-date',
    '[attr.data-au-size]': 'size()',
  },
})
export class InputDate implements FormValueControl<string | null> {
  readonly value = model<string | null>(null);

  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly hint = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly errorMessage = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

  readonly disabled = input(false);
  readonly readOnly = input(false);
  readonly required = input(false);
  readonly showRequired = input(true);

  readonly id = input<string>('');
  readonly name = input<string>('');
  readonly placeholder = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly autocomplete = input<string | undefined>(undefined);
  /** Native `min` attribute (ISO `YYYY-MM-DD`). Named `minDate` to avoid clashing with {@link FormUiControl} `min`. */
  readonly minDate = input<string | undefined>(undefined);
  /** Native `max` attribute (ISO `YYYY-MM-DD`). */
  readonly maxDate = input<string | undefined>(undefined);
  readonly size = input<AuSize>('md');

  readonly blur = output<void>();
  readonly valueChange = output<string | null>();

  private static idCounter = 0;

  protected readonly fieldFocusByTab = signal(false);
  readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');

  readonly resolvedId = computed(() => {
    const v = this.id();
    if (v) {
      return v;
    }
    return `au-input-date-${++InputDate.idCounter}`;
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
    if (this.disabled() || this.readOnly()) {
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

  focus(): void {
    this.inputEl().nativeElement.focus();
  }
}
