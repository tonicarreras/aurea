import {
  ApplicationRef,
  ComponentRef,
  Directive,
  DestroyRef,
  EnvironmentInjector,
  Renderer2,
  afterRenderEffect,
  computed,
  createComponent,
  inject,
  input,
  signal,
} from '@angular/core';
import type { AuSize } from '../au-size';
import { AuSpinner } from '../spinner/spinner';
import { bindHostDomEvent } from '../au-host-dom-event';
import { injectHostRef } from '../au-host-element';
import { tabFocusState } from '../au-tab-focus-state';

export type AuButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type AuButtonSize = AuSize;
export type AuButtonType = 'button' | 'submit' | 'reset';

/**
 * Aurea button styles and behavior on a native `<button>`.
 */
@Directive({
  selector: 'button[auButton]',
  host: {
    class: 'au-button',
    '[class.au-button--loading]': 'loading()',
    '[class.au-button--from-tab]': 'focusByTab()',
    '[attr.data-au-variant]': 'variant()',
    '[attr.data-au-size]': 'size()',
    '[attr.type]': 'type()',
    '[attr.name]': 'name() || null',
    '[attr.disabled]': 'disabled() ? true : null',
    '[attr.aria-busy]': 'loading() ? "true" : null',
    '[attr.aria-disabled]': 'disabled() || loading() ? "true" : null',
    '[attr.aria-label]': 'effectiveAriaLabel()',
    '(focusin)': 'onFocusin()',
    '(focusout)': 'onFocusout()',
  },
})
export class AuButton {
  readonly variant = input<AuButtonVariant>('primary');
  readonly size = input<AuButtonSize>('md');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly type = input<AuButtonType>('button');
  readonly name = input<string>('');
  readonly label = input<string>('');

  private readonly host = injectHostRef<HTMLButtonElement>();
  private readonly destroyRef = inject(DestroyRef);
  private readonly renderer = inject(Renderer2);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly appRef = inject(ApplicationRef);

  protected readonly focusByTab = signal(false);
  protected readonly spinnerSize = computed((): AuSize => (this.size() === 'lg' ? 'md' : 'sm'));
  private readonly projectedLabel = signal<string | null>(null);

  private contentWrapper: HTMLSpanElement | null = null;
  private spinnerHost: HTMLSpanElement | null = null;
  private spinnerRef: ComponentRef<AuSpinner> | null = null;

  protected readonly effectiveAriaLabel = computed((): string | null => {
    const explicit = this.label().trim();
    if (explicit) {
      return explicit;
    }
    if (this.loading()) {
      return this.projectedLabel();
    }
    return null;
  });

  constructor() {
    bindHostDomEvent(
      this.host,
      this.destroyRef,
      'click',
      (event) => this.onHostClick(event as MouseEvent),
      { capture: true },
    );

    afterRenderEffect(() => {
      this.ensureContentWrapper();
      this.syncLoadingChrome();
      this.syncProjectedLabel();
    });
  }

  focus(): void {
    (this.host.nativeElement as HTMLElement).focus();
  }

  protected onFocusin(): void {
    tabFocusState.attach();
    this.focusByTab.set(tabFocusState.takeNextFocusIsFromTab());
  }

  protected onFocusout(): void {
    this.focusByTab.set(false);
  }

  private onHostClick(event: MouseEvent): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  private syncProjectedLabel(): void {
    if (!this.loading() || this.label().trim()) {
      if (this.projectedLabel() !== null) {
        this.projectedLabel.set(null);
      }
      return;
    }
    const text = this.contentWrapper?.textContent?.trim();
    const next = text ? text : null;
    /* v8 ignore else -- projectedLabel already matches trimmed content */
    if (this.projectedLabel() !== next) {
      this.projectedLabel.set(next);
    }
  }

  private ensureContentWrapper(): void {
    if (this.contentWrapper) {
      return;
    }
    const el = this.host.nativeElement;
    const existing = el.querySelector(':scope > .au-button__content');
    if (existing instanceof HTMLSpanElement) {
      this.contentWrapper = existing;
      return;
    }
    const wrapper = this.renderer.createElement('span') as HTMLSpanElement;
    this.renderer.addClass(wrapper, 'au-button__content');
    const childNodes = Array.from(el.childNodes);
    for (const node of childNodes) {
      this.renderer.appendChild(wrapper, node);
    }
    this.renderer.appendChild(el, wrapper);
    this.contentWrapper = wrapper;
  }

  private syncLoadingChrome(): void {
    const el = this.host.nativeElement;
    const loading = this.loading();
    const wrapper = this.contentWrapper;
    if (!wrapper) {
      return;
    }

    if (loading) {
      if (!this.spinnerHost) {
        const spinnerHost = this.renderer.createElement('span') as HTMLSpanElement;
        this.renderer.addClass(spinnerHost, 'au-button__spinner');
        this.renderer.setAttribute(spinnerHost, 'aria-hidden', 'true');
        this.spinnerRef = createComponent(AuSpinner, {
          environmentInjector: this.environmentInjector,
        });
        this.spinnerRef.setInput('decorative', true);
        this.appRef.attachView(this.spinnerRef.hostView);
        this.renderer.appendChild(spinnerHost, this.spinnerRef.location.nativeElement);
        this.renderer.insertBefore(el, spinnerHost, el.firstChild);
        this.spinnerHost = spinnerHost;
      }
      this.spinnerRef?.setInput('size', this.spinnerSize());
      this.spinnerRef?.changeDetectorRef.detectChanges();
      this.renderer.addClass(wrapper, 'au-button__content--hidden');
      this.renderer.setAttribute(wrapper, 'aria-hidden', 'true');
      return;
    }

    if (this.spinnerHost) {
      this.appRef.detachView(this.spinnerRef!.hostView);
      this.spinnerRef?.destroy();
      this.spinnerRef = null;
      this.renderer.removeChild(el, this.spinnerHost);
      this.spinnerHost = null;
    }
    this.renderer.removeClass(wrapper, 'au-button__content--hidden');
    this.renderer.removeAttribute(wrapper, 'aria-hidden');
  }
}
