import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';

import { AuAccordionItem } from './au-accordion-item.directive';

export type AuAccordionVariant = 'plain' | 'contained';

/**
 * Collapsible sections with WAI-ARIA accordion triggers and panels.
 *
 * @remarks
 * - **Value:** `[(value)]` lists expanded section keys.
 * - **Structure:** `button[auAccordionItem]` + `au-accordion-panel` with matching keys.
 * - **Variant:** `plain` (dividers only) or `contained` (raised surface, like a card shell).
 * - **Keyboard:** Arrow Up/Down move focus; Home/End jump; Enter/Space toggle.
 */
@Component({
  selector: 'au-accordion',
  templateUrl: './accordion.html',
  styleUrl: './accordion.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-accordion',
    '[attr.data-au-variant]': 'variant()',
    '[attr.data-au-size]': 'size()',
  },
})
export class AuAccordion {
  private static idCounter = 0;

  private readonly itemRegistry = signal<readonly AuAccordionItem[]>([]);

  /** Expanded section keys. */
  readonly value = model<string[]>([]);
  /** When false, opening one section closes the others. */
  readonly multiple = input(true);
  readonly ariaLabel = input<string>('');
  /** `plain` embeds in the page; `contained` adds raised surface and outer border. */
  readonly variant = input<AuAccordionVariant>('plain');
  readonly size = input<'sm' | 'md'>('md');
  readonly id = input<string>('');

  readonly resolvedId = computed(() => {
    const custom = this.id();
    return custom || `au-accordion-${++AuAccordion.idCounter}`;
  });

  registerItem(item: AuAccordionItem): void {
    this.itemRegistry.update((list) => (list.includes(item) ? list : [...list, item]));
  }

  unregisterItem(item: AuAccordionItem): void {
    this.itemRegistry.update((list) => list.filter((entry) => entry !== item));
  }

  getEnabledItems(): readonly AuAccordionItem[] {
    return this.itemRegistry().filter((item) => !item.auAccordionItemDisabled());
  }

  isExpanded(key: string): boolean {
    return this.value().includes(key);
  }

  toggleItem(key: string): void {
    if (this.isExpanded(key)) {
      this.setValue(this.value().filter((entry) => entry !== key));
      return;
    }
    if (this.multiple()) {
      this.setValue([...this.value(), key]);
      return;
    }
    this.setValue([key]);
  }

  triggerIdFor(key: string): string {
    return `${this.resolvedId()}-trigger-${key}`;
  }

  panelIdFor(key: string): string {
    return `${this.resolvedId()}-panel-${key}`;
  }

  onRootKeydown(event: KeyboardEvent): void {
    const enabled = this.getEnabledItems();
    if (enabled.length === 0) {
      return;
    }

    const relevant = new Set(['ArrowDown', 'ArrowUp', 'Home', 'End']);
    if (!relevant.has(event.key)) {
      return;
    }

    event.preventDefault();

    const active = document.activeElement;
    const currentIndex = enabled.findIndex((item) => item.hostElement() === active);
    const start = currentIndex >= 0 ? currentIndex : 0;
    let targetIndex = start;

    switch (event.key) {
      case 'ArrowDown':
        targetIndex = (start + 1) % enabled.length;
        break;
      case 'ArrowUp':
        targetIndex = (start - 1 + enabled.length) % enabled.length;
        break;
      case 'Home':
        targetIndex = 0;
        break;
      case 'End':
        targetIndex = enabled.length - 1;
        break;
    }

    enabled[targetIndex]?.focus();
  }

  private setValue(next: string[]): void {
    this.value.set(next);
  }
}
