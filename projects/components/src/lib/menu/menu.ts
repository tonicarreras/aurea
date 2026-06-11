import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  forwardRef,
  PLATFORM_ID,
  Renderer2,
  afterRenderEffect,
  computed,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';

import { TooltipOverlay } from '../overlay/tooltip-overlay';
import type { AuTooltipPlacement } from '../overlay/tooltip-position';
import { AU_MENU } from './au-menu.token';
import { claimOpenMenu, releaseOpenMenu } from './menu-open-registry';
import type { AuMenuItem } from './menu-item';

/** Used by `forwardRef` in component providers (testable factory). */
export function auMenuSelfRef(): typeof AuMenu {
  return AuMenu;
}

/**
 * Dropdown menu anchored to a trigger. Panel is portaled to `document.body`.
 *
 * @remarks
 * - **Open state:** `[(open)]` with `openChange` output.
 * - **Trigger:** `auMenuTrigger` on the control that toggles the panel.
 * - **Items:** `au-menu-item` emits `select` and closes the menu.
 * - **Dismiss:** outside click and Escape.
 * - **Exclusive open:** opening one menu closes any other open menu on the page.
 * - **Keyboard:** Arrow keys cycle items; Home/End jump to ends; typeahead by first character; Enter/Space activates; Escape closes.
 * - **Focus:** moves to the first item on open, returns to the trigger on close.
 *
 * @example
 * ```html
 * <au-menu [(open)]="open">
 *   <au-button auMenuTrigger>Actions</au-button>
 *   <au-menu-item (select)="onEdit()">Edit</au-menu-item>
 * </au-menu>
 * ```
 */
@Component({
  selector: 'au-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: AU_MENU, useExisting: forwardRef(auMenuSelfRef) }],
  host: {
    class: 'au-menu',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown)': 'onDocumentKeydown($event)',
  },
})
export class AuMenu {
  readonly open = model(false);
  readonly placement = input<AuTooltipPlacement>('bottom');
  readonly disabled = input(false);

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);

  private readonly overlay = new TooltipOverlay(
    this.document,
    this.renderer,
    inject(PLATFORM_ID),
    this.destroyRef,
  );

  protected readonly panelRef = viewChild<ElementRef<HTMLElement>>('panel');
  protected readonly triggerHost = signal<HTMLElement | null>(null);

  /** Registered menu items for keyboard navigation. */
  private readonly menuItems = signal<AuMenuItem[]>([]);
  private readonly activeMenuItem = signal<AuMenuItem | null>(null);
  private savedTrigger: HTMLElement | null = null;

  private readonly releaseMenuOnDestroy = this.destroyRef.onDestroy(() => releaseOpenMenu(this));

  protected readonly enabledMenuItems = computed(() =>
    this.menuItems().filter((item) => !item.disabled()),
  );

  registerTrigger(el: HTMLElement): void {
    this.triggerHost.set(el);
  }

  registerMenuItem(item: AuMenuItem): void {
    this.menuItems.update((list) => (list.includes(item) ? list : [...list, item]));
  }

  unregisterMenuItem(item: AuMenuItem): void {
    this.menuItems.update((list) => list.filter((i) => i !== item));
    if (this.activeMenuItem() === item) {
      this.activeMenuItem.set(null);
    }
  }

  isActiveMenuItem(item: AuMenuItem): boolean {
    return this.activeMenuItem() === item;
  }

  setActiveMenuItem(item: AuMenuItem): void {
    this.activeMenuItem.set(item);
  }

  toggle(): void {
    if (this.disabled()) {
      return;
    }
    this.setOpen(!this.open());
  }

  close(): void {
    if (!this.open()) {
      return;
    }
    this.setOpen(false);
  }

  private setOpen(value: boolean): void {
    if (value) {
      claimOpenMenu(this);
    } else {
      releaseOpenMenu(this);
      this.activeMenuItem.set(null);
    }
    this.open.set(value);
  }

  private readonly syncPanelOverlay = afterRenderEffect(() => {
    const panel = this.panelRef()?.nativeElement;
    const trigger = this.triggerHost();
    const isOpen = this.open();

    if (!isOpen || !panel || !trigger) {
      if (!isOpen && this.savedTrigger && this.savedTrigger.isConnected) {
        this.savedTrigger.focus();
        this.savedTrigger = null;
      }
      this.overlay.detach();
      return;
    }

    this.renderer.addClass(panel, 'au-floating-panel');
    this.renderer.addClass(panel, 'au-menu__panel');
    this.overlay.sync(panel, trigger, this.placement());

    // Focus first enabled item on open
    const items = this.enabledMenuItems();
    if (items.length > 0 && !panel.contains(document.activeElement)) {
      this.savedTrigger = trigger;
      this.focusMenuItem(items[0]);
    }
  });

  private readonly dismissOnScroll = afterRenderEffect((onCleanup) => {
    if (!this.open()) {
      return;
    }

    const onScroll = (event: Event): void => {
      const panel = this.panelRef()?.nativeElement;
      const target = event.target;
      if (panel && target instanceof Node && panel.contains(target)) {
        return;
      }
      this.close();
    };

    this.document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    onCleanup(() => {
      this.document.removeEventListener('scroll', onScroll, { capture: true });
    });
  });

  protected onPanelKeydown(event: KeyboardEvent): void {
    if (!this.open()) {
      return;
    }

    const items = this.enabledMenuItems();
    if (items.length === 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const cur = this.findFocusedItemIndex(items);
        const next = cur < 0 ? 0 : (cur + 1) % items.length;
        this.focusMenuItem(items[next]);
        return;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const cur = this.findFocusedItemIndex(items);
        const prev = cur < 0 ? items.length - 1 : (cur - 1 + items.length) % items.length;
        this.focusMenuItem(items[prev]);
        return;
      }
      case 'Home': {
        event.preventDefault();
        this.focusMenuItem(items[0]);
        return;
      }
      case 'End': {
        event.preventDefault();
        this.focusMenuItem(items[items.length - 1]);
        return;
      }
      default: {
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          this.handleTypeahead(event.key);
        }
        return;
      }
    }
  }

  private focusMenuItem(item: AuMenuItem): void {
    this.activeMenuItem.set(item);
    item.focus();
  }

  private handleTypeahead(key: string): void {
    const items = this.enabledMenuItems();
    if (items.length === 0) {
      return;
    }
    const char = key.toLowerCase();
    if (!/[\p{L}\p{N}]/u.test(char)) {
      return;
    }
    const cur = this.findFocusedItemIndex(items);
    const start = cur < 0 ? 0 : cur + 1;
    for (let offset = 0; offset < items.length; offset++) {
      const item = items[(start + offset) % items.length];
      if (!item) {
        continue;
      }
      if (item.labelText().toLowerCase().startsWith(char)) {
        this.focusMenuItem(item);
        return;
      }
    }
  }

  private findFocusedItemIndex(items: AuMenuItem[]): number {
    const active = this.document.activeElement;
    if (!active) {
      return -1;
    }
    return items.findIndex((item) => item.containsElement(active));
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.open()) {
      return;
    }
    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }
    const host = this.host.nativeElement as HTMLElement;
    const panel = this.panelRef()?.nativeElement;
    if (host.contains(target) || panel?.contains(target)) {
      return;
    }
    this.close();
  }

  protected onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.open()) {
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      return;
    }
  }
}
