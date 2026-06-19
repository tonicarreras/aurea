import {
  ApplicationRef,
  Directive,
  ComponentRef,
  EnvironmentInjector,
  Renderer2,
  afterNextRender,
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
import type { ValidationError } from '@angular/forms/signals';
import type { AuSize } from '../au-size';
import { AU_FORM_FIELD } from '../form-field/form-field';
import { displayErrorFromErrors, effectiveInvalidWithField } from '../form-field/form-field';
import { syncFormFieldControlState } from '../form-field/form-field';
import {
  applyNativeTemporalMinMax,
  isWithinTemporalBounds,
  syncNativeTemporalValue,
} from '../field-temporal-bounds';
import { AuInternalTimePickerPanel } from '../field-time-picker-panel';
import { bindHostDomEvent } from '../au-host-dom-event';
import { injectHostRef } from '../au-host-element';
import {
  bindCoarsePointerPreference,
  restoreTemporalPickerFocus,
} from '../field-temporal-native-guard';
import { tabFocusState } from '../au-tab-focus-state';
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
    '[attr.data-au-time-picker]': '""',
    '[attr.type]': '"time"',
    '[id]': 'controlId()',
    '[attr.name]': 'name() || null',
    '[attr.placeholder]': 'placeholder() || null',
    '[attr.autocomplete]': 'autocomplete() ?? null',
    '[attr.aria-invalid]': 'effectiveInvalid() ? "true" : "false"',
    '[attr.aria-errormessage]': 'effectiveInvalid() ? formField.errorId() : null',
    '[attr.aria-describedby]': 'ariaDescribedBy() ?? null',
    '[attr.aria-required]': 'required() ? "true" : null',
    '[disabled]': 'disabled()',
    '[readOnly]': 'nativeInputReadOnly()',
    '[attr.required]': 'required() ? true : null',
    '(click)': 'onNativeInputClick($event)',
    '(input)': 'onInput($event)',
    '(change)': 'onChange($event)',
    '(focusin)': 'onControlRowFocusin()',
    '(focusout)': 'onControlRowFocusout($event)',
    '(keydown)': 'onNativeInputKeydown($event)',
  },
})
/* v8 ignore start */
export class AuInputTime {
  /* v8 ignore stop */
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
  readonly pickerTriggerLabel = input('Choose a time');

  readonly blur = output<void>();

  protected readonly formField = inject(AU_FORM_FIELD);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectHostRef<HTMLInputElement>();
  private readonly renderer = inject(Renderer2);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly appRef = inject(ApplicationRef);
  protected readonly fieldFocusByTab = signal(false);
  protected readonly pickerOpen = signal(false);
  protected readonly coarsePointer = signal(false);
  protected readonly nativeInputReadOnly = computed(
    () => this.readOnly() || (this.coarsePointer() && !this.disabled()),
  );

  private pickerIconEl: HTMLButtonElement | null = null;
  private iconRef: ComponentRef<AuIcon> | null = null;
  private pickerPanelRef: ComponentRef<AuInternalTimePickerPanel> | null = null;
  private anchorHost: HTMLElement | null = null;

  readonly controlId = computed(() => this.formField.controlId());
  readonly pickerPanelId = computed(() => `${this.controlId()}-picker`);
  readonly pickerTriggerId = computed(() => `${this.controlId()}-picker-trigger`);
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
    bindHostDomEvent(
      this.host,
      this.destroyRef,
      'touchstart',
      (event) => this.onNativeTouchStart(event),
      { passive: false },
    );
    afterNextRender(() => {
      bindCoarsePointerPreference(
        this.host.nativeElement.ownerDocument.defaultView,
        (coarse) => this.coarsePointer.set(coarse),
        this.destroyRef,
      );
    });
    afterRenderEffect(
      syncFormFieldControlState(this.formField, {
        displayError: () => this.displayError(),
        effectiveInvalid: () => this.effectiveInvalid(),
        required: () => this.required(),
      }),
    );

    afterRenderEffect(() => {
      this.ensurePickerChrome();
      applyNativeTemporalMinMax(this.host.nativeElement, this.minTime(), this.maxTime());
      syncNativeTemporalValue(this.host.nativeElement, this.inputDisplay());
      this.syncPickerPanel();
    });
  }

  onInput(event: Event): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    this.reconcileNativeValue(event.target as HTMLInputElement);
  }

  onChange(event: Event): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    this.reconcileNativeValue(event.target as HTMLInputElement);
  }

  private reconcileNativeValue(el: HTMLInputElement): void {
    const raw = el.value;
    if (raw === '') {
      this.value.set(null);
      return;
    }
    if (!isWithinTemporalBounds(raw, this.minTime(), this.maxTime())) {
      el.value = this.inputDisplay();
      return;
    }
    this.value.set(raw);
  }

  onBlurHost(): void {
    const el = this.host.nativeElement;
    if (!this.disabled() && !this.readOnly()) {
      this.reconcileNativeValue(el);
    }
    this.blur.emit();
  }

  onPickerIconClick(event: MouseEvent): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.ensurePickerChrome();
    this.pickerOpen.set(true);
    this.syncPickerPanel();
  }

  onNativeInputClick(event: MouseEvent): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    event.preventDefault();
    this.openPickerFromField(true);
  }

  onNativeTouchStart(event: Event): void {
    if (this.disabled() || this.readOnly() || !this.coarsePointer()) {
      return;
    }
    event.preventDefault();
    this.openPickerFromField(false);
  }

  onNativeInputKeydown(event: KeyboardEvent): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    event.preventDefault();
    this.openPickerFromField(true);
  }

  private openPickerFromField(toggleIfOpen: boolean): void {
    this.ensurePickerChrome();
    if (toggleIfOpen && !this.coarsePointer()) {
      this.togglePicker();
    } else {
      this.pickerOpen.set(true);
    }
    this.syncPickerPanel();
  }

  protected togglePicker(): void {
    this.pickerOpen.update((open) => !open);
  }

  protected closePicker(): void {
    this.pickerOpen.set(false);
    queueMicrotask(() => {
      restoreTemporalPickerFocus(this.host.nativeElement, this.pickerIconEl);
    });
  }

  protected onPickerPick(next: string): void {
    this.value.set(next);
    this.host.nativeElement.value = next;
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
    if (this.coarsePointer() && this.pickerIconEl?.isConnected) {
      this.pickerIconEl.focus();
      return;
    }
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

  private ensurePickerChrome(): void {
    const input = this.host.nativeElement;
    const parent = input.parentNode;
    if (!(parent instanceof HTMLElement)) {
      return;
    }

    if (!this.anchorHost?.isConnected) {
      this.anchorHost = parent;
      this.renderer.addClass(parent, 'au-input-time__anchor');
    }

    if (!this.pickerIconEl?.isConnected) {
      const btn = this.renderer.createElement('button') as HTMLButtonElement;
      this.renderer.setAttribute(btn, 'type', 'button');
      this.renderer.addClass(btn, 'au-input-time__icon');

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

    if (!this.pickerPanelRef) {
      this.pickerPanelRef = createComponent(AuInternalTimePickerPanel, {
        environmentInjector: this.environmentInjector,
      });
      this.pickerPanelRef.setInput('ariaLabel', 'Choose a time');
      this.pickerPanelRef.instance.pick.subscribe((next) => this.onPickerPick(next));
      this.pickerPanelRef.instance.dismiss.subscribe(() => this.closePicker());
      this.appRef.attachView(this.pickerPanelRef.hostView);
      this.renderer.appendChild(parent, this.pickerPanelRef.location.nativeElement);
    }
  }

  private syncPickerPanel(): void {
    if (!this.pickerPanelRef) {
      return;
    }
    this.syncPickerTriggerA11y();
    this.pickerPanelRef.setInput('open', this.pickerOpen());
    this.pickerPanelRef.setInput('panelId', this.pickerPanelId());
    this.pickerPanelRef.setInput('selected', this.value());
    this.pickerPanelRef.setInput('minTime', this.minTime());
    this.pickerPanelRef.setInput('maxTime', this.maxTime());
    this.pickerPanelRef.setInput('anchor', this.pickerAnchor());
    this.pickerPanelRef.setInput('controlRoot', this.anchorHost ?? this.host.nativeElement);
    this.pickerPanelRef.changeDetectorRef.detectChanges();
  }

  private pickerAnchor(): HTMLElement {
    return this.pickerIconEl ?? this.anchorHost ?? this.host.nativeElement;
  }

  private syncPickerTriggerA11y(): void {
    const btn = this.pickerIconEl;
    if (!btn) {
      return;
    }
    this.renderer.setAttribute(btn, 'id', this.pickerTriggerId());
    this.renderer.setAttribute(btn, 'aria-label', this.pickerTriggerLabel());
    this.renderer.setAttribute(btn, 'aria-haspopup', 'dialog');
    this.renderer.setAttribute(btn, 'aria-expanded', this.pickerOpen() ? 'true' : 'false');
    this.renderer.setAttribute(btn, 'aria-controls', this.pickerPanelId());
    if (this.disabled() || this.readOnly()) {
      this.renderer.setAttribute(btn, 'disabled', 'true');
    } else {
      this.renderer.removeAttribute(btn, 'disabled');
    }
  }
}
