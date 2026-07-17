import {
  ChangeDetectionStrategy,
  Component,
  afterRenderEffect,
  computed,
  input,
  model,
  signal,
} from '@angular/core';
import {
  AccordionContent,
  AccordionGroup,
  AccordionPanel,
  AccordionTrigger,
} from '@angular/aria/accordion';

import { injectHostRef } from '../au-host-element';
import { sortRegistryByDomOrder } from '../overlay/projection-bridge';
import { AuAccordionItem } from './au-accordion-item.directive';
import { AuAccordionPanel } from './au-accordion-panel';

export type AuAccordionVariant = 'plain' | 'contained';

/**
 * Collapsible sections with WAI-ARIA accordion triggers and panels.
 *
 * @remarks
 * - **Value:** `[(value)]` lists expanded section keys.
 * - **Structure:** `button[auAccordionItem]` + `au-accordion-panel` with matching keys.
 * - **Variant:** `plain` (dividers only) or `contained` (raised surface, like a card shell).
 * - **Accessibility:** Behaviour delegated to `@angular/aria/accordion`.
 */
@Component({
  selector: 'au-accordion',
  templateUrl: './accordion.html',
  styleUrl: './accordion.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AccordionGroup, AccordionTrigger, AccordionPanel, AccordionContent],
  host: {
    class: 'au-accordion',
    '[attr.data-au-variant]': 'variant()',
    '[attr.data-au-size]': 'size()',
  },
})
export class AuAccordion {
  private static idCounter = 0;

  private readonly host = injectHostRef<HTMLElement>();
  private readonly itemRegistry = signal<readonly AuAccordionItem[]>([]);
  private readonly panelRegistry = signal<readonly AuAccordionPanel[]>([]);

  /** Expanded section keys. */
  readonly value = model<string[]>([]);
  /** When false, opening one section closes the others. */
  readonly multiple = input(true);
  readonly ariaLabel = input<string>('');
  readonly variant = input<AuAccordionVariant>('plain');
  readonly size = input<'sm' | 'md'>('md');
  readonly id = input<string>('');

  readonly resolvedId = computed(() => {
    const custom = this.id();
    return custom || `au-accordion-${++AuAccordion.idCounter}`;
  });

  readonly renderedItems = computed((): readonly AuAccordionItem[] =>
    sortRegistryByDomOrder(this.itemRegistry(), this.host.nativeElement),
  );

  constructor() {
    afterRenderEffect(() => {
      this.renderedItems();
      this.panelRegistry();
      this.value();
      for (const panel of this.panelRegistry()) {
        const destination = this.host.nativeElement.querySelector(
          `[data-au-panel-host="${panel.panel()}"]`,
        );
        const source = panel.element.nativeElement;
        /* v8 ignore start -- source is never rendered inside its generated destination */
        if (
          !(destination instanceof HTMLElement) ||
          destination === source ||
          destination.contains(source)
        ) {
          continue;
        }
        /* v8 ignore stop */
        while (source.firstChild) {
          destination.appendChild(source.firstChild);
        }
      }
    });
  }

  registerItem(item: AuAccordionItem): void {
    this.itemRegistry.update((list) => (list.includes(item) ? list : [...list, item]));
  }

  unregisterItem(item: AuAccordionItem): void {
    this.itemRegistry.update((list) => list.filter((entry) => entry !== item));
  }

  registerPanel(panel: AuAccordionPanel): void {
    this.panelRegistry.update((list) => (list.includes(panel) ? list : [...list, panel]));
  }

  unregisterPanel(panel: AuAccordionPanel): void {
    this.panelRegistry.update((list) => list.filter((entry) => entry !== panel));
  }

  isExpanded(key: string): boolean {
    return this.value().includes(key);
  }

  onItemExpandedChange(key: string, expanded: boolean): void {
    if (expanded) {
      if (this.multiple()) {
        if (!this.isExpanded(key)) {
          this.value.update((current) => [...current, key]);
        }
        return;
      }
      this.value.set([key]);
      return;
    }
    this.value.update((current) => current.filter((entry) => entry !== key));
  }

  triggerIdFor(key: string): string {
    return `${this.resolvedId()}-trigger-${key}`;
  }

  panelIdFor(key: string): string {
    return `${this.resolvedId()}-panel-${key}`;
  }
}
