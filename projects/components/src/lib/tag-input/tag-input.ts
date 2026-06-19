import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  afterRenderEffect,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { injectHostRef } from '../au-host-element';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import type { AuSize } from '../au-size';
import { AuIcon } from '../icon/icon';
import { AU_FORM_FIELD } from '../form-field/form-field';
import { displayErrorFromErrors, effectiveInvalidWithField } from '../form-field/form-field';
import { syncFormFieldControlState } from '../form-field/form-field';
import { queryFieldNative } from '../form-field/form-field';
import { tabFocusState } from '../au-tab-focus-state';

/** Multi-value text tags with removable chips. Project inside {@link AuFormField}. */
@Component({
  selector: 'au-tag-input',
  templateUrl: './tag-input.html',
  styleUrl: './tag-input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuIcon],
  host: {
    class: 'au-tag-input',
    '[attr.data-au-size]': 'size()',
  },
})
export class AuTagInput implements FormValueControl<string[]> {
  readonly value = model<string[]>([]);
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

  readonly disabled = input(false);
  readonly readOnly = input(false);
  readonly required = input(false);
  readonly name = input<string>('');
  readonly placeholder = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });
  readonly size = input<AuSize>('md');
  readonly allowDuplicates = input(false);
  readonly maxTags = input<number | undefined>(undefined);
  readonly removeTagLabel = input('Remove tag');

  readonly blur = output<void>();

  protected readonly formField = inject(AU_FORM_FIELD);
  private readonly host = injectHostRef<HTMLElement>();
  private readonly destroyRef = inject(DestroyRef);
  protected readonly draft = signal('');
  protected readonly fieldFocusByTab = signal(false);

  readonly controlId = computed(() => this.formField.controlId());
  readonly displayError = displayErrorFromErrors(this.errors);
  readonly isInvalid = computed(() => this.displayError().length > 0);
  readonly effectiveInvalid = effectiveInvalidWithField(this.formField, {
    invalid: () => this.invalid(),
    isInvalid: () => this.isInvalid(),
  });

  readonly ariaDescribedBy = computed((): string | null => {
    const ids: string[] = [];
    if (this.formField.hint().trim().length > 0) {
      ids.push(this.formField.hintId());
    }
    if (this.effectiveInvalid()) {
      ids.push(this.formField.errorId());
    }
    return ids.length > 0 ? ids.join(' ') : null;
  });

  readonly atMaxTags = computed(() => {
    const max = this.maxTags();
    return max != null && this.value().length >= max;
  });

  constructor() {
    effect(
      syncFormFieldControlState(this.formField, {
        displayError: () => this.displayError(),
        effectiveInvalid: () => this.effectiveInvalid(),
        required: () => this.required(),
      }),
    );
  }

  onDraftInput(event: Event): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    this.draft.set((event.target as HTMLInputElement).value);
  }

  onDraftKeydown(event: KeyboardEvent): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.commitDraft();
      return;
    }
    if (event.key === 'Backspace' && this.draft().length === 0 && this.value().length > 0) {
      event.preventDefault();
      this.removeTag(this.value().length - 1);
    }
  }

  commitDraft(): void {
    const raw = this.draft().trim().replace(/,$/, '');
    this.draft.set('');
    const input = queryFieldNative<HTMLInputElement>(this.host, '.au-tag-input__input');
    input.value = '';
    if (raw.length === 0 || this.atMaxTags()) {
      return;
    }
    const current = this.value();
    if (!this.allowDuplicates() && current.includes(raw)) {
      return;
    }
    const next = [...current, raw];
    this.value.set(next);
  }

  removeTag(index: number): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    const current = this.value();
    if (index < 0 || index >= current.length) {
      return;
    }
    const next = current.filter((_, i) => i !== index);
    this.value.set(next);
  }

  onBlurHost(): void {
    if (!this.disabled() && !this.readOnly() && this.draft().trim().length > 0) {
      this.commitDraft();
    }
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
    queryFieldNative<HTMLInputElement>(this.host, '.au-tag-input__input').focus();
  }
}
