import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  inject,
  input,
  OnDestroy,
} from '@angular/core';

import { injectHostRef } from '../au-host-element';
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
@Component({
  selector: 'au-accordion-panel',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    hidden: '',
    'aria-hidden': 'true',
  },
})
export class AuAccordionPanel implements OnDestroy {
  readonly element = injectHostRef<HTMLElement>();
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
