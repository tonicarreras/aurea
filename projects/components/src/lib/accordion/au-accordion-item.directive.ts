import {
  Directive,
  afterNextRender,
  afterRenderEffect,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';

import { tabFocusState } from '../au-tab-focus-state';
import { injectHostRef } from '../au-host-element';
import { AuAccordion } from './accordion';

/**
 * Accordion section trigger marker. Place on `<button type="button">`.
 *
 * Projected buttons register their label with `au-accordion`; an internal
 * `ngAccordionTrigger` button handles WAI-ARIA behaviour via `@angular/aria`.
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
    hidden: '',
    'aria-hidden': 'true',
    tabindex: '-1',
  },
})
export class AuAccordionItem implements OnDestroy {
  private readonly accordion = inject(AuAccordion);
  readonly element = injectHostRef<HTMLButtonElement>();

  readonly auAccordionItem = input.required<string>();
  readonly auAccordionItemDisabled = input(false);

  readonly focusByTab = signal(false);

  private readonly labelState = signal('');
  readonly label = this.labelState.asReadonly();

  private readonly syncLabel = afterRenderEffect(() => {
    const next = this.element.nativeElement.textContent.trim();
    if (this.labelState() !== next) {
      this.labelState.set(next);
    }
  });

  private readonly registerWhenReady = afterNextRender(() => {
    this.accordion.registerItem(this);
  });

  ngOnDestroy(): void {
    this.accordion.unregisterItem(this);
  }

  onFocusin(): void {
    tabFocusState.attach();
    this.focusByTab.set(tabFocusState.takeNextFocusIsFromTab());
  }

  onFocusout(): void {
    this.focusByTab.set(false);
  }
}
