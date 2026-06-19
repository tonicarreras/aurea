import {
  ChangeDetectionStrategy,
  Component,
  effect,
  afterRenderEffect,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { injectHostRef } from '../au-host-element';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';

import type { AuSize } from '../au-size';
import { AuButton } from '../button/au-button.directive';
import { AuIcon } from '../icon/icon';
import {
  AU_FORM_FIELD,
  createStandaloneAuFormFieldContext,
  displayErrorFromErrors,
  effectiveInvalidWithField,
  injectAuFormField,
  queryFieldNative,
  syncFormFieldControlState,
} from '../form-field/form-field';

/** File picker with drag-and-drop and removable file list. Project inside {@link AuFormField}. */
@Component({
  selector: 'au-file-upload',
  imports: [AuButton, AuIcon],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-file-upload',
    '[attr.data-au-size]': 'size()',
    '[class.au-file-upload--dragover]': 'dragOver()',
  },
  providers: [{ provide: AU_FORM_FIELD, useFactory: createStandaloneAuFormFieldContext }],
})
export class AuFileUpload implements FormValueControl<File[]> {
  readonly value = model<File[]>([]);

  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

  readonly accept = input<string>('');
  readonly multiple = input(true);
  readonly disabled = input(false);
  readonly required = input(false);
  readonly name = input<string>('');
  readonly size = input<AuSize>('md');
  readonly browseLabel = input('Browse files');
  readonly dropLabel = input('Drag files here or browse');
  readonly removeFileLabel = input('Remove file');

  readonly blur = output<void>();

  protected readonly formField = injectAuFormField();
  private readonly host = injectHostRef<HTMLElement>();

  protected readonly dragOver = signal(false);

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

  readonly hasFiles = computed(() => this.value().length > 0);
  readonly resolvedAccept = computed(() => this.accept().trim() || null);

  constructor() {
    effect(
      syncFormFieldControlState(this.formField, {
        displayError: () => this.displayError(),
        effectiveInvalid: () => this.effectiveInvalid(),
        required: () => this.required(),
      }),
    );
  }

  protected onBrowseClick(): void {
    if (this.disabled()) {
      return;
    }
    const input = queryFieldNative<HTMLInputElement>(this.host, '.au-file-upload__input');
    input.click();
  }

  protected onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.addFiles(input.files ? [...input.files] : []);
    input.value = '';
  }

  protected onDragOver(event: DragEvent): void {
    if (this.disabled()) {
      return;
    }
    event.preventDefault();
    this.dragOver.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragOver.set(false);
  }

  protected onDrop(event: DragEvent): void {
    if (this.disabled()) {
      return;
    }
    event.preventDefault();
    this.dragOver.set(false);
    this.addFiles(event.dataTransfer?.files ? [...event.dataTransfer.files] : []);
  }

  protected removeFile(index: number): void {
    if (this.disabled()) {
      return;
    }
    const next = this.value().filter((_, i) => i !== index);
    this.setFiles(next);
  }

  protected formatSize(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private addFiles(incoming: File[]): void {
    if (incoming.length === 0) {
      return;
    }
    const next = this.multiple() ? [...this.value(), ...incoming] : incoming.slice(0, 1);
    this.setFiles(next);
  }

  private setFiles(next: File[]): void {
    this.value.set(next);
  }
}
