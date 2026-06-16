import {
  Directive,
  Renderer2,
  afterRenderEffect,
  computed,
  inject,
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
import { tabFocusState } from '../au-tab-focus-state';
import { injectHostRef } from '../au-host-element';

/**
 * Checkbox on a native `<input type="checkbox">`.
 * Inline `label` on control; hint/error on {@link AuFormField}.
 */
@Directive({
  selector: 'input[type=checkbox][auCheckbox]',
  providers: [{ provide: AU_FORM_FIELD, useFactory: createStandaloneAuFormFieldContext }],
  host: {
    class: 'au-checkbox__element',
    '[attr.data-au-size]': 'size()',
    '[id]': 'controlId()',
    '[attr.name]': 'name() || null',
    '[checked]': 'isChecked()',
    '[attr.aria-describedby]': 'ariaDescribedBy() ?? null',
    '[attr.aria-invalid]': 'effectiveInvalid() ? "true" : "false"',
    '[attr.aria-errormessage]': 'effectiveInvalid() ? formField.errorId() : null',
    '[attr.aria-required]': 'required() ? "true" : null',
    '[disabled]': 'disabled()',
    '[attr.required]': 'required() ? true : null',
    '(change)': 'onChange($event)',
  },
})
export class AuCheckbox {
  readonly checked = model(false);

  readonly label = input<string, string>('', { transform: (v) => (v == null ? '' : String(v)) });
  readonly description = input<string, string>('', {
    transform: (v) => (v == null ? '' : String(v)),
  });

  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly invalid = input(false);

  readonly disabled = input(false);
  readonly required = input(false);
  readonly showRequired = input(true);
  readonly indeterminate = input(false);
  readonly hideLabel = input(false);

  readonly size = input<AuSize>('md');
  readonly name = input<string>('');

  readonly blur = output<void>();

  protected readonly formField = injectAuFormField();
  private readonly host = injectHostRef<HTMLInputElement>();
  private readonly renderer = inject(Renderer2);
  protected readonly focusByTab = signal(false);

  private wrapperEl: HTMLElement | null = null;
  private contentEl: HTMLElement | null = null;
  private labelEl: HTMLLabelElement | null = null;
  private descriptionEl: HTMLParagraphElement | null = null;
  private focusInUnlisten: (() => void) | null = null;
  private focusOutUnlisten: (() => void) | null = null;

  private readonly syncIndeterminate = afterRenderEffect(() => {
    this.host.nativeElement.indeterminate = this.indeterminate();
  });

  readonly controlId = computed(() => this.formField.controlId());
  readonly descriptionId = computed(() => `${this.controlId()}-desc`);

  readonly displayError = displayErrorFromErrors(this.errors);
  readonly isInvalid = computed(() => this.displayError().length > 0);
  readonly effectiveInvalid = effectiveInvalidWithField(this.formField, {
    invalid: () => this.invalid(),
    isInvalid: () => this.isInvalid(),
  });
  readonly isChecked = computed(() => this.effectiveChecked());

  readonly ariaDescribedBy = computed((): string | null => {
    const ids: string[] = [];
    if (this.description().trim().length > 0) {
      ids.push(this.descriptionId());
    }
    if (this.formField.hint().trim().length > 0) {
      ids.push(this.formField.hintId());
    }
    if (this.effectiveInvalid()) {
      ids.push(this.formField.errorId());
    }
    return ids.length > 0 ? ids.join(' ') : null;
  });

  readonly effectiveChecked = computed(() => {
    if (this.indeterminate()) {
      return false;
    }
    return this.checked();
  });

  constructor() {
    afterRenderEffect(
      syncFormFieldControlState(this.formField, {
        displayError: () => this.displayError(),
        effectiveInvalid: () => this.effectiveInvalid(),
        required: () => this.required(),
      }),
    );

    afterRenderEffect(() => {
      this.ensureShell();
      this.syncLabelContent();
      this.syncWrapperState();
    });
  }

  onInput(event: Event): void {
    if (this.disabled()) {
      return;
    }
    const target = event.target as HTMLInputElement;
    this.checked.set(target.checked);
  }

  onChange(event: Event): void {
    this.onInput(event);
  }

  onControlFocusin(): void {
    tabFocusState.attach();
    this.focusByTab.set(tabFocusState.takeNextFocusIsFromTab());
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
    this.blur.emit();
  }

  focus(): void {
    this.host.nativeElement.focus();
  }

  private ensureShell(): void {
    const input = this.host.nativeElement;
    const parent = input.parentNode;
    if (!(parent instanceof HTMLElement)) {
      return;
    }

    if (this.wrapperEl?.isConnected) {
      return;
    }

    const wrapper = this.renderer.createElement('div') as HTMLDivElement;
    this.renderer.addClass(wrapper, 'au-checkbox__wrapper');
    this.renderer.insertBefore(parent, wrapper, input);
    this.renderer.appendChild(wrapper, input);

    const content = this.renderer.createElement('div') as HTMLDivElement;
    this.renderer.addClass(content, 'au-checkbox__content');
    this.renderer.appendChild(wrapper, content);

    this.wrapperEl = wrapper;
    this.contentEl = content;

    this.focusInUnlisten = this.renderer.listen(wrapper, 'focusin', () => this.onControlFocusin());
    this.focusOutUnlisten = this.renderer.listen(wrapper, 'focusout', (event: Event) =>
      this.onControlFocusout(event as FocusEvent),
    );
  }

  private syncWrapperState(): void {
    if (!this.wrapperEl) {
      return;
    }
    if (this.focusByTab()) {
      this.renderer.addClass(this.wrapperEl, 'au-checkbox__wrapper--from-tab');
    } else {
      this.renderer.removeClass(this.wrapperEl, 'au-checkbox__wrapper--from-tab');
    }
    if (this.effectiveInvalid()) {
      this.renderer.addClass(this.wrapperEl, 'au-checkbox__wrapper--invalid');
    } else {
      this.renderer.removeClass(this.wrapperEl, 'au-checkbox__wrapper--invalid');
    }
  }

  private syncLabelContent(): void {
    if (!this.contentEl) {
      return;
    }

    const labelText = this.label();
    const descriptionText = this.description().trim();
    const showContent = labelText.length > 0 || descriptionText.length > 0;

    if (!showContent) {
      this.renderer.setStyle(this.contentEl, 'display', 'none');
      return;
    }
    this.renderer.removeStyle(this.contentEl, 'display');

    if (this.hideLabel()) {
      this.renderer.addClass(this.contentEl, 'au-sr-only');
    } else {
      this.renderer.removeClass(this.contentEl, 'au-sr-only');
    }

    if (labelText) {
      let labelEl = this.labelEl;
      if (!labelEl) {
        labelEl = this.renderer.createElement('label') as HTMLLabelElement;
        this.renderer.addClass(labelEl, 'au-checkbox__label');
        this.renderer.insertBefore(this.contentEl, labelEl, this.contentEl.firstChild);
        this.labelEl = labelEl;
      }
      this.renderer.setAttribute(labelEl, 'for', this.controlId());
      labelEl.textContent = '';
      this.renderer.appendChild(labelEl, this.renderer.createText(labelText));
      if (this.required() && this.showRequired()) {
        const requiredMark = this.renderer.createElement('span') as HTMLSpanElement;
        this.renderer.addClass(requiredMark, 'au-checkbox__required');
        this.renderer.setAttribute(requiredMark, 'aria-hidden', 'true');
        this.renderer.setAttribute(requiredMark, 'title', 'Required');
        this.renderer.appendChild(requiredMark, this.renderer.createText('*'));
        this.renderer.appendChild(labelEl, requiredMark);
        const sr = this.renderer.createElement('span') as HTMLSpanElement;
        this.renderer.addClass(sr, 'au-sr-only');
        this.renderer.appendChild(sr, this.renderer.createText('(required)'));
        this.renderer.appendChild(labelEl, sr);
      }
    } else if (this.labelEl?.isConnected) {
      this.renderer.removeChild(this.contentEl, this.labelEl);
      this.labelEl = null;
    }

    if (descriptionText) {
      let descriptionEl = this.descriptionEl;
      if (!descriptionEl) {
        descriptionEl = this.renderer.createElement('p') as HTMLParagraphElement;
        this.renderer.addClass(descriptionEl, 'au-checkbox__description');
        this.renderer.appendChild(this.contentEl, descriptionEl);
        this.descriptionEl = descriptionEl;
      }
      this.renderer.setAttribute(descriptionEl, 'id', this.descriptionId());
      descriptionEl.textContent = descriptionText;
    } else if (this.descriptionEl?.isConnected) {
      this.renderer.removeChild(this.contentEl, this.descriptionEl);
      this.descriptionEl = null;
    }
  }
}
