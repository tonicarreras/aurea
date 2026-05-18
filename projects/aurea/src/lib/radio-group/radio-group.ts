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

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Design-system **radio group**: native radios in a `<fieldset>`, single `value` model.
 *
 * @remarks
 * - **Signal forms:** implements {@link FormValueControl}; bind `[formField]` on a string field.
 * - **Classic:** use `[(value)]` with `options` and optional `errorMessage` / `invalid`.
 * - **Parsing:** empty string sets `null`.
 * - **Accessibility:** `<fieldset>` + `<legend>`; each radio has a stable `id` / `label for`.
 * - **Focus:** group shell uses the same Tab vs pointer ring pattern as `au-select`.
 *
 * @see {@link FormValueControl}
 */
@Component({
  selector: 'au-radio-group',
  templateUrl: './radio-group.html',
  styleUrl: './radio-group.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-radio-group',
    '[attr.data-au-size]': 'size()',
  },
})
export class RadioGroup implements FormValueControl<string | null> {
  readonly value = model<string | null>(null);

  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly hint = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly errorMessage = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

  readonly options = input<RadioOption[]>([]);
  readonly disabled = input(false);
  readonly readOnly = input(false);
  readonly required = input(false);
  readonly showRequired = input(true);

  readonly id = input<string>('');
  readonly name = input<string>('');
  readonly size = input<AuSize>('md');

  readonly blur = output<void>();
  readonly valueChange = output<string | null>();

  private static idCounter = 0;

  protected readonly fieldFocusByTab = signal(false);
  readonly fieldEl = viewChild.required<ElementRef<HTMLElement>>('fieldEl');

  readonly resolvedId = computed(() => {
    const v = this.id();
    if (v) {
      return v;
    }
    return `au-radio-group-${++RadioGroup.idCounter}`;
  });

  readonly legendId = computed(() => `${this.resolvedId()}-legend`);
  readonly hintId = computed(() => `${this.resolvedId()}-hint`);
  readonly errorId = computed(() => `${this.resolvedId()}-error`);

  readonly groupName = computed(() => {
    const n = this.name().trim();
    if (n) {
      return n;
    }
    return this.resolvedId();
  });

  readonly legendFallback = computed(() => {
    const n = this.name().trim();
    return n || 'Options';
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

  optionInputId(optionValue: string): string {
    const safe = optionValue.replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '') || 'opt';
    return `${this.resolvedId()}-${safe}`;
  }

  onRadioChange(event: Event): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    const el = event.target as HTMLInputElement;
    if (el.checked) {
      this.value.set(el.value);
      this.valueChange.emit(el.value);
    }
  }

  onShellFocusin(): void {
    tabFocusState.attach();
    this.fieldFocusByTab.set(tabFocusState.takeNextFocusIsFromTab());
  }

  onShellFocusout(event: FocusEvent): void {
    if (!(event.currentTarget instanceof HTMLElement)) {
      return;
    }
    const to = event.relatedTarget;
    if (to != null && to instanceof Node && event.currentTarget.contains(to)) {
      return;
    }
    this.fieldFocusByTab.set(false);
    this.blur.emit();
  }

  focus(): void {
    const first = this.fieldEl().nativeElement.querySelector<HTMLInputElement>(
      'input[type="radio"]:not(:disabled)',
    );
    first?.focus();
  }
}
