import {
  Directive,
  Renderer2,
  effect,
  afterRenderEffect,
  computed,
  inject,
  DestroyRef,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type { ValidationError } from '@angular/forms/signals';
import type { AuSize } from '../au-size';
import { displayErrorFromErrors, effectiveInvalidWithField } from '../form-field/form-field';
import { syncFormFieldControlState } from '../form-field/form-field';
import { AU_FORM_FIELD } from '../form-field/form-field';
import { createStandaloneAuFormFieldContext, injectAuFormField } from '../form-field/form-field';
import { bindHostDomEvent } from '../au-host-dom-event';
import { injectHostRef } from '../au-host-element';
import { tabFocusState } from '../au-tab-focus-state';

/**
 * Switch toggle on a native `<button role="switch">`.
 * Inline `label` on control; hint/error on {@link AuFormField}.
 */
@Directive({
  selector: 'button[auSwitch]',
  providers: [{ provide: AU_FORM_FIELD, useFactory: createStandaloneAuFormFieldContext }],
  host: {
    class: 'au-switch',
    '[attr.data-au-size]': 'size()',
    role: 'switch',
    '[attr.type]': '"button"',
    '[id]': 'controlId()',
    '[attr.name]': 'name() || null',
    '[attr.aria-checked]': 'checked() ? "true" : "false"',
    '[attr.aria-invalid]': 'effectiveInvalid() ? "true" : "false"',
    '[attr.aria-errormessage]': 'effectiveInvalid() ? formField.errorId() : null',
    '[attr.aria-describedby]': 'ariaDescribedBy() ?? null',
    '[attr.aria-required]': 'required() ? "true" : null',
    '[disabled]': 'disabled()',
    '[class.au-switch--from-tab]': 'fieldFocusByTab()',
    '[class.au-switch--invalid]': 'effectiveInvalid()',
    '(click)': 'onToggle($event)',
    '(focusin)': 'onControlRowFocusin()',
    '(focusout)': 'onControlRowFocusout($event)',
  },
})
/* v8 ignore start */
export class AuSwitch {
  /* v8 ignore stop */
  readonly checked = model(false);

  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });

  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

  readonly touched = input(false);
  readonly dirty = input(false);
  readonly submitting = input(false);

  readonly disabled = input(false);
  readonly required = input(false);
  readonly showRequired = input(true);

  readonly size = input<AuSize>('md');
  readonly name = input<string>('');

  readonly blur = output<void>();

  protected readonly formField = injectAuFormField();
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectHostRef<HTMLButtonElement>();
  private readonly renderer = inject(Renderer2);
  protected readonly fieldFocusByTab = signal(false);

  private fieldEl: HTMLElement | null = null;
  private labelHostEl: HTMLElement | null = null;
  private labelEl: HTMLLabelElement | null = null;

  readonly controlId = computed(() => this.formField.controlId());

  readonly displayError = displayErrorFromErrors(this.errors);
  readonly isInvalid = computed(() => this.displayError().length > 0);
  readonly effectiveInvalid = effectiveInvalidWithField(this.formField, {
    invalid: () => this.invalid(),
    isInvalid: () => this.isInvalid(),
    touched: () => this.touched(),
    dirty: () => this.dirty(),
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

  constructor() {
    bindHostDomEvent(this.host, this.destroyRef, 'blur', () => this.onBlurHost());
    effect(
      syncFormFieldControlState(this.formField, {
        displayError: () => this.displayError(),
        effectiveInvalid: () => this.effectiveInvalid(),
        required: () => this.required(),
      }),
    );

    afterRenderEffect(() => {
      this.ensureFieldShell();
      this.syncLabel();
    });
  }

  onToggle(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.checked.update((value) => !value);
  }

  onBlurHost(): void {
    this.blur.emit();
  }

  onControlRowFocusin(): void {
    tabFocusState.attach();
    this.fieldFocusByTab.set(tabFocusState.takeNextFocusIsFromTab());
  }

  onControlRowFocusout(event: FocusEvent): void {
    const to = event.relatedTarget;
    if (to != null && to instanceof Node && this.isInControlGroup(to)) {
      return;
    }
    this.fieldFocusByTab.set(false);
  }

  focus(): void {
    this.host.nativeElement.focus();
  }

  private isInControlGroup(node: Node): boolean {
    if (this.host.nativeElement.contains(node)) {
      return true;
    }
    if (this.labelEl?.contains(node)) {
      return true;
    }
    return false;
  }

  private ensureFieldShell(): void {
    const button = this.host.nativeElement;
    const parent = button.parentNode;
    if (!(parent instanceof HTMLElement) || this.fieldEl?.isConnected) {
      return;
    }

    const field = this.renderer.createElement('div') as HTMLDivElement;
    this.renderer.addClass(field, 'au-switch__field');
    this.renderer.insertBefore(parent, field, button);
    this.renderer.appendChild(field, button);
    this.fieldEl = field;
  }

  private syncLabel(): void {
    const button = this.host.nativeElement;
    const labelText = this.label().trim();
    const field = this.fieldEl ?? button.parentElement;

    if (!field) {
      return;
    }

    if (!labelText) {
      if (this.labelHostEl?.isConnected) {
        this.renderer.removeChild(field, this.labelHostEl);
        this.labelHostEl = null;
        this.labelEl = null;
      }
      return;
    }

    if (!this.labelHostEl) {
      this.labelHostEl = this.renderer.createElement('div') as HTMLDivElement;
      this.renderer.addClass(this.labelHostEl, 'au-switch__label-host');
      this.labelEl = this.renderer.createElement('label') as HTMLLabelElement;
      this.renderer.addClass(this.labelEl, 'au-switch__label');
      this.renderer.appendChild(this.labelHostEl, this.labelEl);
      this.renderer.insertBefore(field, this.labelHostEl, button);
    }

    this.renderer.setAttribute(this.labelEl!, 'for', this.controlId());
    this.labelEl!.textContent = '';
    this.renderer.appendChild(this.labelEl!, this.renderer.createText(labelText));

    if (this.required() && this.showRequired()) {
      const requiredMark = this.renderer.createElement('span') as HTMLSpanElement;
      this.renderer.addClass(requiredMark, 'au-switch__required');
      this.renderer.setAttribute(requiredMark, 'aria-hidden', 'true');
      this.renderer.setAttribute(requiredMark, 'title', 'Required');
      this.renderer.appendChild(requiredMark, this.renderer.createText('*'));
      this.renderer.appendChild(this.labelEl!, requiredMark);
      const sr = this.renderer.createElement('span') as HTMLSpanElement;
      this.renderer.addClass(sr, 'au-sr-only');
      this.renderer.appendChild(sr, this.renderer.createText('(required)'));
      this.renderer.appendChild(this.labelEl!, sr);
    }
  }
}
