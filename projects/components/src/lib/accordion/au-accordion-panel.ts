import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { AuAccordion } from './accordion';

/**
 * Accordion panel paired with `button[auAccordionItem]` using the same key.
 *
 * @example
 * ```html
 * <au-accordion-panel panel="billing">…</au-accordion-panel>
 * ```
 */
@Component({
  selector: 'au-accordion-panel',
  template: '<div class="au-accordion__panel-inner"><ng-content /></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-accordion__panel',
    role: 'region',
    '[attr.id]': 'panelId()',
    '[attr.aria-labelledby]': 'triggerId()',
    '[class.au-accordion__panel--expanded]': 'isExpanded()',
    '[attr.aria-hidden]': 'isExpanded() ? null : "true"',
    '[attr.inert]': 'isExpanded() ? null : ""',
  },
})
export class AuAccordionPanel {
  private readonly accordion = inject(AuAccordion);

  /** Section key; must match the paired `auAccordionItem` value. */
  readonly panel = input.required<string>();

  readonly panelId = computed(() => this.accordion.panelIdFor(this.panel()));
  readonly triggerId = computed(() => this.accordion.triggerIdFor(this.panel()));
  readonly isExpanded = computed(() => this.accordion.isExpanded(this.panel()));
}
