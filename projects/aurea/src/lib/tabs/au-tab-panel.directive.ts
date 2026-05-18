import { Directive, computed, inject, input } from '@angular/core';
import { Tabs } from './tabs';

/**
 * Tab panel inside `au-tabs`. Pair with a tab button using the same key.
 *
 * @example
 * ```html
 * <div auTabPanel="settings">…</div>
 * ```
 */
@Directive({
  selector: '[auTabPanel]',
  host: {
    class: 'au-tabs__panel',
    role: 'tabpanel',
    '[class.au-tabs__panel--active]': 'isActive()',
    '[attr.id]': 'panelId()',
    '[attr.aria-labelledby]': 'tabId()',
    '[attr.hidden]': 'isHidden() ? "" : null',
    '[attr.tabindex]': 'isActive() ? 0 : null',
  },
})
export class AuTabPanel {
  private readonly tabs = inject(Tabs);

  readonly auTabPanel = input.required<string>();

  readonly panelId = computed(() => this.tabs.panelIdFor(this.auTabPanel()));
  readonly tabId = computed(() => this.tabs.tabIdFor(this.auTabPanel()));
  readonly isActive = computed(() => this.tabs.value() === this.auTabPanel());
  readonly isHidden = computed(() => !this.isActive());
}
