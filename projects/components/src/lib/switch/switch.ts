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
import type { FormCheckboxControl, ValidationError } from '@angular/forms/signals';
import type { AuSize } from '../au-size';
import { tabFocusState } from '../au-tab-focus-state';

/**
 * Design-system **switch** (boolean toggle): same field chrome as other controls, native checkbox
 * with `role="switch"` for assistive tech.
 *
 * @remarks
 * - **Signal forms:** implements {@link FormCheckboxControl}; bind `[formField]` on a boolean field.
 * - **Classic:** use `[(checked)]` and optional `errorMessage` / `invalid`.
 * - **Focus:** Tab vs pointer rings via `tabFocusState`, aligned with `au-input-text` / `au-select`.
 *
 * @see {@link FormCheckboxControl}
 */
@Component({
  selector: 'au-switch',
  templateUrl: './switch.html',
  styleUrl: './switch.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-switch',
    '[attr.data-au-size]': 'size()',
  },
})
export class AuSwitch implements FormCheckboxControl {
  readonly checked = model<boolean>(false);

  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly hint = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly errorMessage = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

  readonly disabled = input(false);
  readonly required = input(false);
  readonly showRequired = input(true);

  readonly size = input<AuSize>('md');
  readonly id = input<string>('');
  readonly name = input<string>('');

  readonly blur = output<void>();
  readonly checkedChange = output<boolean>();

  private static idCounter = 0;

  protected readonly fieldFocusByTab = signal(false);
  readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');

  readonly resolvedId = computed(() => {
    const v = this.id();
    if (v) {
      return v;
    }
    return `au-switch-${++AuSwitch.idCounter}`;
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

  onChange(event: Event): void {
    if (this.disabled()) {
      return;
    }
    const target = event.target as HTMLInputElement;
    const next = target.checked;
    this.checked.set(next);
    this.checkedChange.emit(next);
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
