import { Directive, ElementRef, afterNextRender, inject, input, OnDestroy } from '@angular/core';
import { AuTabs } from './tabs';

/**
 * Tab panel inside `au-tabs`. Pair with a tab button using the same key.
 *
 * Projected content is moved into an internal `ngTabPanel` host rendered by `au-tabs`.
 *
 * @example
 * ```html
 * <div auTabPanel="settings">…</div>
 * ```
 */
@Directive({
  selector: '[auTabPanel]',
  host: {
    hidden: '',
    'aria-hidden': 'true',
  },
})
export class AuTabPanel implements OnDestroy {
  readonly element = inject(ElementRef<HTMLElement>);
  private readonly tabs = inject(AuTabs);

  readonly auTabPanel = input.required<string>();

  private readonly registerWhenReady = afterNextRender(() => {
    this.tabs.registerPanel(this);
  });

  ngOnDestroy(): void {
    this.tabs.unregisterPanel(this);
  }
}
