import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import type { AuSize } from '../au-size';
import { AuTab } from './au-tab.directive';
import { createChildRegistry, type ChildRegistry } from '../shared/child-registry';

export type AuTabsVariant = 'line' | 'contained';
export type AuTabsOrientation = 'horizontal' | 'vertical';
export type AuTabsSize = AuSize;

/**
 * Design-system **tabs**: WAI-ARIA tablist with projected tab buttons and panels.
 *
 * @remarks
 * - **Value:** `[(value)]` matches `auTab` / `auTabPanel` string keys.
 * - **Structure:** `button[auTab]` inside the tablist; `[auTabPanel]` for each panel.
 * - **Keyboard:** Arrow keys move focus/selection; Home/End jump to ends (horizontal: Left/Right).
 * - **Accessibility:** `role="tablist"`, `tab`, `tabpanel`; only the active tab is in the tab order (`tabindex="0"`).
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
  host: {
    class: 'au-tabs',
    '[attr.data-au-variant]': 'variant()',
    '[attr.data-au-size]': 'size()',
    '[attr.data-au-orientation]': 'orientation()',
  },
})
export class AuTabs {
  private static idCounter = 0;

  /** Active tab key (matches `auTab` / `auTabPanel`). */
  readonly value = model<string>('');
  /** Accessible name for the tablist when no visible label wraps the control. */
  readonly ariaLabel = input<string>('');
  /** Visual style: underline (line) or segmented control (contained). */
  readonly variant = input<AuTabsVariant>('line');
  readonly orientation = input<AuTabsOrientation>('horizontal');
  readonly size = input<AuTabsSize>('md');
  /** Optional id prefix for tab/panel elements. */
  readonly id = input<string>('');

  readonly valueChange = output<string>();

  private readonly tabKey = (tab: AuTab): string => tab.auTab();
  private readonly tabDisabled = (tab: AuTab): boolean => tab.auTabDisabled();
  private readonly focusTab = (tab: AuTab): void => tab.focus();

  /**
   * Shared child registry managing tab registration, selection,
   * and keyboard navigation (respects orientation).
   */
  private readonly registry: ChildRegistry<AuTab> = createChildRegistry<AuTab>({
    value: this.value,
    onValueChange: (v) => this.applyValue(v),
    itemKey: this.tabKey,
    itemDisabled: this.tabDisabled,
    orientation: this.orientation,
    focusItem: this.focusTab,
  });

  readonly resolvedId = computed(() => {
    const custom = this.id();
    return custom || `au-tabs-${++AuTabs.idCounter}`;
  });

  registerTab(tab: AuTab): void {
    this.registry.register(tab);
  }

  unregisterTab(tab: AuTab): void {
    this.registry.unregister(tab);
  }

  getEnabledTabs(): readonly AuTab[] {
    return this.registry.enabledItems();
  }

  selectTab(next: string): void {
    this.registry.select(next);
  }

  /** Updates model + emits `valueChange` when the key actually changes. */
  private applyValue(next: string): void {
    if (this.value() === next) {
      return;
    }
    this.value.set(next);
    this.valueChange.emit(next);
  }

  tabIdFor(value: string): string {
    return `${this.resolvedId()}-tab-${value}`;
  }

  panelIdFor(value: string): string {
    return `${this.resolvedId()}-panel-${value}`;
  }

  onListKeydown(event: KeyboardEvent): void {
    this.registry.onKeydown(event);
  }
}
