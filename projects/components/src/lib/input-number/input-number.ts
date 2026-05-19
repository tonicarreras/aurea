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
 * Design-system **numeric** field backed by `<input type="number">`, with `null` for empty input.
 *
 * @remarks
 * - **Signal forms:** implements {@link FormValueControl}; bind `[formField]` on `number | null`.
 * - **Classic:** use `[(value)]` (empty field ↔ `null`).
 * - **Parsing:** updates the model when `Number(raw)` is finite; empty string sets `null`.
 * - **Focus:** same Tab vs pointer ring pattern as `au-input-text`.
 *
 * @see {@link FormValueControl}
 */
@Component({
  selector: 'au-input-number',
  templateUrl: './input-number.html',
  styleUrl: './input-number.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-input-number',
    '[attr.data-au-size]': 'size()',
  },
})
export class AuInputNumber implements FormValueControl<number | null> {
  readonly value = model<number | null>(null);

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
  readonly min = input<number | undefined>(undefined);
  readonly max = input<number | undefined>(undefined);
  readonly step = input<number | 'any'>(1);
  readonly size = input<AuSize>('md');

  readonly blur = output<void>();
  readonly valueChange = output<number | null>();

  private static idCounter = 0;

  protected readonly fieldFocusByTab = signal(false);
  readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');

  readonly resolvedId = computed(() => {
    const v = this.id();
    if (v) {
      return v;
    }
    return `au-input-number-${++AuInputNumber.idCounter}`;
  });

  readonly hintId = computed(() => `${this.resolvedId()}-hint`);
  readonly errorId = computed(() => `${this.resolvedId()}-error`);

  readonly inputDisplay = computed(() => {
    const v = this.value();
    if (v === null || v === undefined) {
      return '';
    }
    return String(v);
  });

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
    const n = Number(raw);
    if (Number.isFinite(n)) {
      this.value.set(n);
      this.valueChange.emit(n);
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
    this.inputEl().nativeElement.focus();
  }
}
