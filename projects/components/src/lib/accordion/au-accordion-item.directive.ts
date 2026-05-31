import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

import { tabFocusState } from '../au-tab-focus-state';
import { AuAccordion } from './accordion';

/**
 * Accordion section trigger. Place on `<button type="button">`.
 *
 * @example
 * ```html
 * <button type="button" auAccordionItem="billing">Billing</button>
 * ```
 */
@Directive({
  selector: 'button[auAccordionItem]',
  host: {
    type: 'button',
    class: 'au-accordion__trigger',
    '[class.au-accordion__trigger--expanded]': 'isExpanded()',
    '[class.au-accordion__trigger--from-tab]': 'focusByTab()',
    '[attr.id]': 'triggerId()',
    '[attr.aria-expanded]': 'isExpanded() ? "true" : "false"',
    '[attr.aria-controls]': 'panelId()',
    '[attr.disabled]': 'auAccordionItemDisabled() ? true : null',
    '(click)': 'onClick($event)',
    '(focusin)': 'onFocusin()',
    '(focusout)': 'onFocusout()',
  },
})
export class AuAccordionItem {
  private readonly accordion = inject(AuAccordion);
  private readonly host = inject(ElementRef<HTMLButtonElement>);
  private readonly destroyRef = inject(DestroyRef);

  readonly auAccordionItem = input.required<string>();
  readonly auAccordionItemDisabled = input(false);

  protected readonly focusByTab = signal(false);

  readonly hostElement = computed(() => this.host.nativeElement as HTMLButtonElement);
  readonly triggerId = computed(() => this.accordion.triggerIdFor(this.auAccordionItem()));
  readonly panelId = computed(() => this.accordion.panelIdFor(this.auAccordionItem()));
  readonly isExpanded = computed(() => this.accordion.isExpanded(this.auAccordionItem()));

  private readonly registerWhenReady = afterNextRender(() => {
    this.accordion.registerItem(this);
  });

  private readonly unregisterOnDestroy = this.destroyRef.onDestroy(() => {
    this.accordion.unregisterItem(this);
  });

  focus(): void {
    this.hostElement().focus();
  }

  protected onClick(event: MouseEvent): void {
    if (this.auAccordionItemDisabled()) {
      event.preventDefault();
      return;
    }
    this.accordion.toggleItem(this.auAccordionItem());
  }

  protected onFocusin(): void {
    tabFocusState.attach();
    this.focusByTab.set(tabFocusState.takeNextFocusIsFromTab());
  }

  protected onFocusout(): void {
    this.focusByTab.set(false);
  }
}
