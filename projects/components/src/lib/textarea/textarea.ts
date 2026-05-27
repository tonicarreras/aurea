import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import type { AuSize } from '../au-size';
import { AuFormControlBase } from '../shared/form-control-base';

type TextareaResize = 'none' | 'vertical' | 'both';

/** Multiline control; project inside {@link AuFormField}. */
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
export class AuTextarea extends AuFormControlBase<string | null> implements FormValueControl<string | null> {
  readonly value = model<string | null>(null);
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

  readonly disabled = input(false);
  readonly readOnly = input(false);
  readonly required = input(false);
  readonly name = input<string>('');
  readonly placeholder = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });
  readonly autocomplete = input<string | undefined>(undefined);
  readonly minLength = input<number | undefined>(undefined);
  readonly maxLength = input<number | undefined>(undefined);
  readonly rows = input(4);
  readonly cols = input<number | undefined>(undefined);
  readonly resize = input<TextareaResize>('vertical');
  readonly spellcheck = input<boolean | undefined>(undefined);
  readonly wrap = input<'soft' | 'hard'>('soft');
  readonly size = input<AuSize>('md');

  readonly blur = output<void>();
  readonly valueChange = output<string | null>();

  readonly textareaEl = viewChild.required<ElementRef<HTMLTextAreaElement>>('textareaEl');

  constructor() {
    super();
    this.initBase({
      errors: this.errors,
      invalid: this.invalid,
      required: this.required,
      value: this.value,
    });
  }

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

  override onBlurHost(): void {
    this.blur.emit();
  }

  focus(): void {
    this.textareaEl().nativeElement.focus();
  }
}
