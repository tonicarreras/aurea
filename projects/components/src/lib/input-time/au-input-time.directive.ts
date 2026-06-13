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
import { openNativePicker } from '../au-open-native-picker';
import { AuIcon } from '../icon/icon';

/**
 * Time control on a native `<input type="time">`. Value format: `HH:mm` (24h).
 * Project inside {@link AuFormField}.
 */
@Directive({
  selector: 'input[auInputTime]',
  host: {
    class: 'au-input-time',
    '[class.au-input-time--from-tab]': 'fieldFocusByTab()',
    '[attr.data-au-size]': 'size()',
    '[attr.type]': '"time"',
    '[id]': 'controlId()',
    '[attr.name]': 'name() || null',
    '[attr.min]': 'minTime() ?? null',
    '[attr.max]': 'maxTime() ?? null',
    '[attr.placeholder]': 'placeholder() || null',
    '[attr.autocomplete]': 'autocomplete() ?? null',
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
export class AuInputTime implements FormValueControl<string | null> {
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
  readonly minTime = input<string | undefined>(undefined);
  readonly maxTime = input<string | undefined>(undefined);
  readonly size = input<AuSize>('md');

  readonly blur = output<void>();

  protected readonly formField = inject(AU_FORM_FIELD);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectHostRef<HTMLInputElement>();
  private readonly renderer = inject(Renderer2);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly appRef = inject(ApplicationRef);
  protected readonly fieldFocusByTab = signal(false);

  private pickerIconEl: HTMLButtonElement | null = null;
  private iconRef: ComponentRef<AuIcon> | null = null;

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
      this.ensurePickerIcon();
    });
  }

  onInput(event: Event): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    const input = event.target as HTMLInputElement;
    const raw = input.value;
    if (raw === '') {
      this.value.set(null);
      return;
    }
    if (!this.isWithinTimeBounds(raw)) {
      input.value = this.inputDisplay();
      return;
    }
    this.value.set(raw);
  }

  /** `HH:mm` (24h) compares lexicographically when bounds use the same format. */
  private isWithinTimeBounds(time: string): boolean {
    const min = this.minTime();
    const max = this.maxTime();
    if (min && time < min) {
      return false;
    }
    if (max && time > max) {
      return false;
    }
    return true;
  }

  onBlurHost(): void {
    this.blur.emit();
  }

  onPickerIconClick(event: MouseEvent): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    openNativePicker(this.host.nativeElement);
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
    if (this.pickerIconEl?.contains(node)) {
      return true;
    }
    return false;
  }

  private ensurePickerIcon(): void {
    const input = this.host.nativeElement;
    const parent = input.parentNode;
    if (!(parent instanceof HTMLElement) || this.pickerIconEl?.isConnected) {
      return;
    }

    this.renderer.addClass(parent, 'au-input-time__anchor');

    const btn = this.renderer.createElement('button') as HTMLButtonElement;
    this.renderer.setAttribute(btn, 'type', 'button');
    this.renderer.addClass(btn, 'au-input-time__icon');
    this.renderer.setAttribute(btn, 'aria-hidden', 'true');
    this.renderer.setAttribute(btn, 'tabindex', '-1');

    const iconHost = this.renderer.createElement('span') as HTMLSpanElement;
    this.iconRef = createComponent(AuIcon, {
      environmentInjector: this.environmentInjector,
      hostElement: iconHost,
    });
    this.iconRef.setInput('name', 'clock');
    this.appRef.attachView(this.iconRef.hostView);
    this.iconRef.changeDetectorRef.detectChanges();
    this.renderer.appendChild(btn, iconHost);
    this.renderer.insertBefore(parent, btn, input.nextSibling);
    this.renderer.listen(btn, 'click', (event: MouseEvent) => this.onPickerIconClick(event));
    this.pickerIconEl = btn;
  }
}
