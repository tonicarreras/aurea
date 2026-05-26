import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { AuTabs } from './tabs';

/**
 * Tab panel inside `au-tabs`. Pair with a tab button using the same key.
 *
 * Declared as `Component` (not `Directive`) to support scoped styles via `styleUrl`.
 *
 * @example
 * ```html
 * <div auTabPanel="settings">…</div>
 * ```
 */
@Component({
  selector: '[auTabPanel]',
  template: '<ng-content />',
  styleUrl: './au-tab-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-tabs__panel',
    role: 'tabpanel',
    '[class.au-tabs__panel--active]': 'isActive()',
    '[attr.id]': 'panelId()',
    '[attr.aria-labelledby]': 'tabId()',
    '[attr.hidden]': 'isHidden() ? "" : null',
    '[attr.tabindex]': 'isActive() ? 0 : null',
    '[attr.data-au-variant]': 'tabs.variant()',
    '[attr.data-au-size]': 'tabs.size()',
    '[attr.data-au-orientation]': 'tabs.orientation()',
  },
})
export class AuTabPanel {
  protected readonly tabs = inject(AuTabs);

  readonly auTabPanel = input.required<string>();

  readonly panelId = computed(() => this.tabs.panelIdFor(this.auTabPanel()));
  readonly tabId = computed(() => this.tabs.tabIdFor(this.auTabPanel()));
  readonly isActive = computed(() => this.tabs.value() === this.auTabPanel());
  readonly isHidden = computed(() => !this.isActive());
}
