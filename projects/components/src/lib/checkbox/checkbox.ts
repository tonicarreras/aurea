import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  computed,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type { FormCheckboxControl, ValidationError } from '@angular/forms/signals';
import type { AuSize } from '../au-size';
import { tabFocusState } from '../au-tab-focus-state';

/**
 * Aurea design system Checkbox component.
 *
 * @remarks
 * - **Signal forms:** implements {@link FormCheckboxControl}; bind `[formField]` so `errors` and `invalid`
 *   stay in sync with your `form()` schema (boolean field).
 * - **Classic:** use `[(checked)]` and set `errorMessage` and/or `invalid` from the parent.
 * - **Signals:** uses Angular signals (`input()`, `model()`).
 * - **Accessibility:** native `<input type="checkbox">` with programmatic label association.
 *   Indeterminate uses the native `indeterminate` property (not `aria-checked` on `<input type="checkbox">`).
 * - **Focus:** outer ring on Tab, inset ring on click (`tabFocusState` + `--from-tab` CSS).
 * - **Sizes:** sm (compact), md (default), lg (touch-friendly 44px).
 *
 * @example
 * ```html
 * <au-checkbox [(checked)]="agreed" label="I agree to the terms" />
 * <au-checkbox [checked]="true" [indeterminate]="true" label="Select all" />
 * ```
 */
@Component({
  selector: 'au-checkbox',
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-checkbox',
    '[attr.data-au-size]': 'size()',
  },
})
export class AuCheckbox implements FormCheckboxControl {
  /**
   * Current checked state — required by {@link FormCheckboxControl}.
   * Use `[(checked)]` or bind through `formField` (directive writes into the model).
   */
  readonly checked = model<boolean>(false);

  /** Visible label; rendered as `<label for="…">` linked to the input `id`. */
  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  /** Additional description text below the label. */
  readonly description = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  /** Manual error message (without signal forms, or in addition). */
  readonly errorMessage = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  /** Errors from signal forms via `formField` (directive populates this when bound). */
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  /** Explicit invalid flag from parent (e.g. `formField`). */
  readonly invalid = input(false);

  /** Disables interaction; inherits native `disabled` behavior. */
  readonly disabled = input(false);

  /** Sets the native `required` attribute and `aria-required` when true. */
  readonly required = input(false);

  /** When true with `required`, shows the visible asterisk and screen-reader “(required)”. */
  readonly showRequired = input(true);

  /** Partial selection; syncs the native `indeterminate` property on the input. */
  readonly indeterminate = input(false);

  /** Visual density: sets `data-au-size` on the host (`sm` | `md` | `lg`). */
  readonly size = input<AuSize>('md');

  /** Stable `id` for label association; auto-generated when left empty. */
  readonly id = input<string>('');

  /** Passed to the native `name` attribute for form submission. */
  readonly name = input<string>('');

  /** Emits when the native control fires `blur`. */
  readonly blur = output<void>();

  /** Emits the new boolean on each change event when not disabled. */
  readonly checkedChange = output<boolean>();

  private static idCounter = 0;

  /** Focus ring modality: outer ring on Tab, inset on click. */
  protected readonly focusByTab = signal(false);

  private readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');

  private readonly syncIndeterminate = afterRenderEffect(() => {
    this.inputEl().nativeElement.indeterminate = this.indeterminate();
  });

  readonly resolvedId = computed(() => {
    const v = this.id();
    if (v) {
      return v;
    }
    return `au-checkbox-${++AuCheckbox.idCounter}`;
  });

  readonly descriptionId = computed(() => `${this.resolvedId()}-desc`);
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

  readonly isChecked = computed(() => this.effectiveChecked());

  readonly ariaDescribedBy = computed((): string | null =>
    this.description().trim().length > 0 ? this.descriptionId() : null,
  );

  readonly effectiveChecked = computed(() => {
    if (this.indeterminate()) {
      return false;
    }
    return this.checked();
  });

  onInput(event: Event): void {
    if (this.disabled()) {
      return;
    }
    const target = event.target as HTMLInputElement;
    const newValue = target.checked;
    this.checked.set(newValue);
    this.checkedChange.emit(newValue);
  }

  /** Alias for template compatibility */
  onChange(event: Event): void {
    this.onInput(event);
  }

  onFocusHost(): void {
    // No-op: this is a template alias for legacy compat; actual focus is handled by onControlFocusin
  }

  /** Alias for template compatibility */
  onFocusin(): void {
    this.onControlFocusin();
  }

  onControlFocusin(): void {
    tabFocusState.attach();
    this.focusByTab.set(tabFocusState.takeNextFocusIsFromTab());
  }

  /** Alias for template compatibility */
  onFocusout(event: FocusEvent): void {
    this.onControlFocusout(event);
  }

  onControlFocusout(event: FocusEvent): void {
    if (!(event.currentTarget instanceof HTMLElement)) {
      return;
    }
    const to = event.relatedTarget;
    if (to != null && to instanceof Node && event.currentTarget.contains(to)) {
      return;
    }
    this.focusByTab.set(false);
  }

  /** Moves keyboard focus to the native `<input>`. */
  focus(): void {
    this.inputEl()?.nativeElement.focus();
  }
}