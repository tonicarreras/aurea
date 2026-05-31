import { Directive, computed, inject, input } from '@angular/core';

import { AuAccordion } from './accordion';

/**
 * Accordion panel paired with `button[auAccordionItem]` using the same key.
 *
 * @example
 * ```html
 * <div auAccordionPanel="billing">…</div>
 * ```
 */
@Directive({
  selector: '[auAccordionPanel]',
  host: {
    class: 'au-accordion__panel',
    role: 'region',
    '[attr.id]': 'panelId()',
    '[attr.aria-labelledby]': 'triggerId()',
    '[class.au-accordion__panel--expanded]': 'isExpanded()',
    '[attr.hidden]': 'isHidden() ? "" : null',
  },
})
export class AuAccordionPanel {
  private readonly accordion = inject(AuAccordion);

  readonly auAccordionPanel = input.required<string>();

  readonly panelId = computed(() => this.accordion.panelIdFor(this.auAccordionPanel()));
  readonly triggerId = computed(() => this.accordion.triggerIdFor(this.auAccordionPanel()));
  readonly isExpanded = computed(() => this.accordion.isExpanded(this.auAccordionPanel()));
  readonly isHidden = computed(() => !this.isExpanded());
}
