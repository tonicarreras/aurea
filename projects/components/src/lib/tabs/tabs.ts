import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import { AuTab } from './au-tab.directive';

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

  private readonly tabRegistry = signal<readonly AuTab[]>([]);

  /** Active tab key (matches `auTab` / `auTabPanel`). */
  readonly value = model('');
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

  registerTab(tab: AuTab): void {
    this.tabRegistry.update((list) => (list.includes(tab) ? list : [...list, tab]));
    this.scheduleEnsureValidSelection();
  }

  unregisterTab(tab: AuTab): void {
    this.tabRegistry.update((list) => list.filter((t) => t !== tab));
    this.scheduleEnsureValidSelection();
  }

  private scheduleEnsureValidSelection(): void {
    queueMicrotask(() => this.ensureValidSelection());
  }

  getEnabledTabs(): readonly AuTab[] {
    return this.tabRegistry().filter((t) => !t.auTabDisabled());
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

  onListKeydown(event: KeyboardEvent): void {
    const enabled = this.getEnabledTabs();
    if (enabled.length === 0) {
      return;
    }

    const horizontal = this.orientation() === 'horizontal';
    const prevKey = horizontal ? 'ArrowLeft' : 'ArrowUp';
    const nextKey = horizontal ? 'ArrowRight' : 'ArrowDown';
    const relevant = new Set([prevKey, nextKey, 'Home', 'End']);
    if (!relevant.has(event.key)) {
      return;
    }

    event.preventDefault();

    const currentIndex = enabled.findIndex((t) => t.auTab() === this.value());
    const start = Math.max(0, currentIndex);
    let targetIndex = start;

    switch (event.key) {
      case nextKey:
        targetIndex = (start + 1) % enabled.length;
        break;
      case prevKey:
        targetIndex = (start - 1 + enabled.length) % enabled.length;
        break;
      case 'Home':
        targetIndex = 0;
        break;
      case 'End':
        targetIndex = enabled.length - 1;
        break;
    }

    const target = enabled[targetIndex];
    this.selectTab(target.auTab());
    target.focus();
  }

  private ensureValidSelection(): void {
    const enabled = this.getEnabledTabs();
    if (enabled.length === 0) {
      return;
    }
    const current = this.value();
    if (current && enabled.some((t) => t.auTab() === current)) {
      return;
    }
    this.selectTab(enabled[0].auTab());
  }
}
