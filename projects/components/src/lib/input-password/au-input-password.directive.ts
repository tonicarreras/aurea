import {
  ApplicationRef,
  Directive,
  ComponentRef,
  EnvironmentInjector,
  Renderer2,
  afterRenderEffect,
  computed,
  createComponent,
  inject,
  DestroyRef,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import type { AuSize } from '../au-size';
import { AU_FORM_FIELD } from '../form-field/form-field';
import { displayErrorFromErrors, effectiveInvalidWithField } from '../form-field/form-field';
import { syncFormFieldControlState } from '../form-field/form-field';
import { bindHostDomEvent } from '../au-host-dom-event';
import { injectHostRef } from '../au-host-element';
import { tabFocusState } from '../au-tab-focus-state';
import { AuIcon } from '../icon/icon';

/**
 * Password field with optional reveal toggle on a native `<input>`.
 * Project inside {@link AuFormField}.
 */
@Directive({
  selector: 'input[auInputPassword]',
  host: {
    class: 'au-input-password',
    '[class.au-input-password--from-tab]': 'fieldFocusByTab()',
    '[class.au-input-password--with-reveal]': 'hasRevealUi()',
    '[attr.data-au-size]': 'size()',
    '[attr.type]': 'inputType()',
    '[id]': 'controlId()',
    '[attr.name]': 'name() || null',
    '[attr.placeholder]': 'placeholder() || null',
    '[attr.autocomplete]': 'autocomplete() ?? null',
    '[attr.minlength]': 'minLength() ?? null',
    '[attr.maxlength]': 'maxLength() ?? null',
    '[attr.aria-invalid]': 'effectiveInvalid() ? "true" : "false"',
    '[attr.aria-errormessage]': 'effectiveInvalid() ? formField.errorId() : null',
    '[attr.aria-describedby]': 'ariaDescribedBy() ?? null',
    '[attr.aria-required]': 'required() ? "true" : null',
    '[disabled]': 'disabled()',
    '[readOnly]': 'readOnly()',
    '[attr.required]': 'required() ? true : null',
    '(input)': 'onInput($event)',
    '(focusin)': 'onControlRowFocusin()',
    '(focusout)': 'onControlRowFocusout($event)',
  },
})
export class AuInputPassword implements FormValueControl<string | null> {
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
  readonly size = input<AuSize>('md');
  readonly showRevealToggle = input(true);
  readonly revealLabelShow = input('Show password');
  readonly revealLabelHide = input('Hide password');

  readonly blur = output<void>();

  protected readonly formField = inject(AU_FORM_FIELD);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectHostRef<HTMLInputElement>();
  private readonly renderer = inject(Renderer2);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly appRef = inject(ApplicationRef);
  protected readonly revealed = signal(false);
  protected readonly fieldFocusByTab = signal(false);

  private revealBtn: HTMLButtonElement | null = null;
  private revealIconRef: ComponentRef<AuIcon> | null = null;

  readonly controlId = computed(() => this.formField.controlId());
  readonly displayError = displayErrorFromErrors(this.errors);
  readonly isInvalid = computed(() => this.displayError().length > 0);
  readonly effectiveInvalid = effectiveInvalidWithField(this.formField, {
    invalid: () => this.invalid(),
    isInvalid: () => this.isInvalid(),
  });

  readonly inputType = computed(() => (this.revealed() ? 'text' : 'password'));
  readonly hasRevealUi = computed(() => this.showRevealToggle());

  readonly revealAriaLabel = computed(() =>
    this.revealed() ? this.revealLabelHide() : this.revealLabelShow(),
  );

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

  readonly inputDisplay = computed(() => {
    const v = this.value();
    if (v === null || v === undefined) {
      return '';
    }
    return v;
  });

  constructor() {
    bindHostDomEvent(this.host, this.destroyRef, 'blur', () => this.onBlurHost());
    afterRenderEffect(
      syncFormFieldControlState(this.formField, {
        displayError: () => this.displayError(),
        effectiveInvalid: () => this.effectiveInvalid(),
        required: () => this.required(),
      }),
    );

    afterRenderEffect(() => {
      const el = this.host.nativeElement;
      const display = this.inputDisplay();
      if (el.value !== display) {
        el.value = display;
      }
    });

    afterRenderEffect(() => {
      this.syncRevealToggle();
    });
  }

  onInput(event: Event): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    const raw = (event.target as HTMLInputElement).value;
    if (raw === '') {
      this.value.set(null);
      return;
    }
    this.value.set(raw);
  }

  onBlurHost(): void {
    this.blur.emit();
  }

  onControlRowFocusin(): void {
    tabFocusState.attach();
    this.fieldFocusByTab.set(tabFocusState.takeNextFocusIsFromTab());
  }

  onControlRowFocusout(event: FocusEvent): void {
    if (this.isInControlGroup(event.relatedTarget)) {
      return;
    }
    this.fieldFocusByTab.set(false);
  }

  toggleReveal(): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    this.revealed.update((v) => !v);
  }

  focus(): void {
    this.host.nativeElement.focus();
  }

  private isInControlGroup(node: EventTarget | null): boolean {
    if (node == null || !(node instanceof Node)) {
      return false;
    }
    if (this.host.nativeElement.contains(node)) {
      return true;
    }
    if (this.revealBtn?.contains(node)) {
      return true;
    }
    return false;
  }

  private syncRevealToggle(): void {
    const input = this.host.nativeElement;
    const parent = input.parentNode;
    if (!(parent instanceof HTMLElement)) {
      return;
    }

    if (this.hasRevealUi()) {
      this.renderer.addClass(parent, 'au-input-password__anchor');
      if (!this.revealBtn?.isConnected) {
        this.mountRevealButton(parent, input);
      }
      this.renderer.setAttribute(this.revealBtn!, 'aria-pressed', this.revealed() ? 'true' : 'false');
      this.renderer.setAttribute(this.revealBtn!, 'aria-label', this.revealAriaLabel());
      if (this.disabled() || this.readOnly()) {
        this.renderer.setAttribute(this.revealBtn!, 'disabled', 'true');
      } else {
        this.renderer.removeAttribute(this.revealBtn!, 'disabled');
      }
      if (this.revealIconRef) {
        this.revealIconRef.setInput('name', this.revealed() ? 'eye-off' : 'eye');
        this.revealIconRef.changeDetectorRef.detectChanges();
      }
    } else if (this.revealBtn?.isConnected) {
      this.renderer.removeChild(parent, this.revealBtn);
      this.revealBtn = null;
      this.revealIconRef = null;
    }
  }

  private mountRevealButton(parent: HTMLElement, input: HTMLInputElement): void {
    const btn = this.renderer.createElement('button') as HTMLButtonElement;
    this.renderer.setAttribute(btn, 'type', 'button');
    this.renderer.addClass(btn, 'au-input-password__reveal');

    const iconHost = this.renderer.createElement('span') as HTMLSpanElement;
    this.revealIconRef = createComponent(AuIcon, {
      environmentInjector: this.environmentInjector,
      hostElement: iconHost,
    });
    this.revealIconRef.setInput('name', 'eye');
    this.revealIconRef.setInput('size', 'sm');
    this.appRef.attachView(this.revealIconRef.hostView);
    this.revealIconRef.changeDetectorRef.detectChanges();
    this.renderer.appendChild(btn, iconHost);
    this.renderer.insertBefore(parent, btn, input.nextSibling);
    this.renderer.listen(btn, 'click', () => this.toggleReveal());
    this.revealBtn = btn;
  }
}
