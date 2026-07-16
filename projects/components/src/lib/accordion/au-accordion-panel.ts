import { Directive, ElementRef, afterNextRender, inject, input, OnDestroy } from '@angular/core';

import { AuAccordion } from './accordion';

/**
 * Accordion panel paired with `button[auAccordionItem]` using the same key.
 *
 * Projected content is moved into an internal `ngAccordionPanel` host rendered by `au-accordion`.
 *
 * @example
 * ```html
 * <au-accordion-panel panel="billing">…</au-accordion-panel>
 * ```
 */
@Directive({
  selector: 'au-accordion-panel',
  host: {
    hidden: '',
    'aria-hidden': 'true',
  },
})
export class AuAccordionPanel implements OnDestroy {
  readonly element = inject(ElementRef<HTMLElement>);
  private readonly accordion = inject(AuAccordion);

  /** Section key; must match the paired `auAccordionItem` value. */
  readonly panel = input.required<string>();

  private readonly registerWhenReady = afterNextRender(() => {
    this.accordion.registerPanel(this);
  });

  ngOnDestroy(): void {
    this.accordion.unregisterPanel(this);
  }
}
