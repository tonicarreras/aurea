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
import { tabFocusState } from '../au-tab-focus-state';

type CheckboxSize = 'sm' | 'md' | 'lg';

/**
 * Aurea design system Checkbox component.
 *
 * @remarks
 * - **Signals:** uses Angular signals (`input()`, `model()`).
 * - **Accessibility:** native `<input type="checkbox">` with programmatic label association.
 *   Uses `aria-checked` for state, supports indeterminate via `aria-pressed`.
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
export class Checkbox {
  /** Current checked state (`ModelSignal<boolean>`). Use `[(checked)]` or bind directly. */
  readonly checked = model<boolean>(false);

  /** Visible label; rendered as `<label for="…">` linked to the input `id`. */
  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  /** Additional description text below the label. */
  readonly description = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  /** Disables interaction; inherits native `disabled` behavior. */
  readonly disabled = input(false);

  /** Sets the native `required` attribute and `aria-required` when true. */
  readonly required = input(false);

  /** Shows indeterminate/indeterminate-like visual state (visual only, not aria-checked). */
  readonly indeterminate = input(false);

  /** Visual density: sets `data-au-size` on the host (`sm` | `md` | `lg`). */
  readonly size = input<CheckboxSize>('md');

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

  readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');

  readonly resolvedId = computed(() => {
    const v = this.id();
    if (v) {
      return v;
    }
    return `au-checkbox-${++Checkbox.idCounter}`;
  });

  readonly descriptionId = computed(() => `${this.resolvedId()}-desc`);

  readonly isChecked = computed(() => this.effectiveChecked());

  readonly effectiveAriaChecked = computed((): 'true' | 'false' | 'mixed' => {
    if (this.indeterminate()) {
      return 'mixed';
    }
    return this.checked() ? 'true' : 'false';
  });

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
    this.blur.emit();
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
    this.inputEl().nativeElement.focus();
  }
}