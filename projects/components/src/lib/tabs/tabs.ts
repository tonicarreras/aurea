import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  computed,
  effect,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { Tab, TabList, TabPanel, Tabs as NgTabs } from '@angular/aria/tabs';
import { sortRegistryByDomOrder } from '../overlay/projection-bridge';
import { AuTab } from './au-tab.directive';
import { AuTabPanel } from './au-tab-panel.directive';

export type AuTabsVariant = 'line' | 'contained';
export type AuTabsOrientation = 'horizontal' | 'vertical';
export type AuTabsSize = 'sm' | 'md' | 'lg';

/**
 * Design-system **tabs**: WAI-ARIA tablist with projected tab buttons and panels.
 *
 * @remarks
 * - **Value:** `[(value)]` matches `auTab` / `auTabPanel` string keys.
 * - **Structure:** `button[auTab]` inside the tablist; `[auTabPanel]` for each panel.
 * - **Keyboard:** Arrow keys move focus/selection; Home/End jump to ends (horizontal: Left/Right).
 * - **Accessibility:** Behaviour delegated to `@angular/aria/tabs` (tablist, tab, tabpanel).
 *
 * @example
 * ```html
 * <au-tabs [(value)]="active" ariaLabel="Account sections">
 *   <button type="button" auTab="profile">Profile</button>
 *   <button type="button" auTab="billing">Billing</button>
 *   <div auTabPanel="profile">…</div>
 *   <div auTabPanel="billing">…</div>
 * </au-tabs>
 * ```
 */
@Component({
  selector: 'au-tabs',
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTabs, TabList, Tab, TabPanel],
  host: {
    class: 'au-tabs',
    '[attr.data-au-variant]': 'variant()',
    '[attr.data-au-size]': 'size()',
    '[attr.data-au-orientation]': 'orientation()',
  },
})
export class AuTabs {
  private static idCounter = 0;

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly tabRegistry = signal<readonly AuTab[]>([]);
  private readonly panelRegistry = signal<readonly AuTabPanel[]>([]);

  /** Active tab key (matches `auTab` / `auTabPanel`). */
  readonly value = model<string | undefined>(undefined);
  /** Accessible name for the tablist when no visible label wraps the control. */
  readonly ariaLabel = input<string>('');
  /** Visual style: underline (line) or segmented control (contained). */
  readonly variant = input<AuTabsVariant>('line');
  readonly orientation = input<AuTabsOrientation>('horizontal');
  readonly size = input<AuTabsSize>('md');
  /** Optional id prefix for tab/panel elements. */
  readonly id = input<string>('');

  readonly resolvedId = computed(() => {
    const custom = this.id();
    return custom || `au-tabs-${++AuTabs.idCounter}`;
  });

  readonly renderedTabs = computed((): readonly AuTab[] =>
    sortRegistryByDomOrder(this.tabRegistry(), this.host.nativeElement),
  );

  readonly enabledTabs = computed(() =>
    this.tabRegistry().filter((tab) => !tab.auTabDisabled()),
  );

  readonly renderedPanels = computed(() => this.panelRegistry());

  constructor() {
    effect(() => {
      const enabled = this.enabledTabs();
      const current = this.value();
      if (enabled.length === 0) {
        return;
      }
      if (current && enabled.some((tab) => tab.auTab() === current)) {
        return;
      }
      this.value.set(enabled[0].auTab());
    });

    afterRenderEffect(() => {
      for (const panel of this.panelRegistry()) {
        const destination = this.host.nativeElement.querySelector(
          `[data-au-panel-host="${panel.auTabPanel()}"]`,
        ) as HTMLElement | null;
        const source = panel.element.nativeElement;
        if (!destination || destination === source || destination.contains(source)) {
          continue;
        }
        while (source.firstChild) {
          destination.appendChild(source.firstChild);
        }
      }
    });
  }

  registerTab(tab: AuTab): void {
    this.tabRegistry.update((list) => (list.includes(tab) ? list : [...list, tab]));
  }

  unregisterTab(tab: AuTab): void {
    this.tabRegistry.update((list) => list.filter((entry) => entry !== tab));
  }

  registerPanel(panel: AuTabPanel): void {
    this.panelRegistry.update((list) => (list.includes(panel) ? list : [...list, panel]));
  }

  unregisterPanel(panel: AuTabPanel): void {
    this.panelRegistry.update((list) => list.filter((entry) => entry !== panel));
  }

  selectTab(next: string): void {
    if (this.value() === next) {
      return;
    }
    this.value.set(next);
  }

  tabIdFor(value: string): string {
    return `${this.resolvedId()}-tab-${value}`;
  }

  panelIdFor(value: string): string {
    return `${this.resolvedId()}-panel-${value}`;
  }
}
