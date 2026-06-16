import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  output,
} from '@angular/core';
import { injectHostRef } from '../au-host-element';

import { AU_MENU } from './au-menu.token';

/**
 * Action entry inside {@link AuMenu}.
 *
 * @remarks
 * - **Keyboard:** Arrow keys cycle between items (handled by parent menu); roving `tabindex`.
 * - **Focus:** receives focus via parent navigation; button click or Enter/Space activates.
 */
@Component({
  selector: 'au-menu-item',
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-menu-item',
  },
})
export class AuMenuItem {
  private readonly menu = inject(AU_MENU);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectHostRef<HTMLElement>();

  readonly disabled = input(false);
  readonly select = output<void>();

  protected readonly tabIndexAttr = computed(() => (this.menu.isActiveMenuItem(this) ? 0 : -1));

  constructor() {
    this.menu.registerMenuItem(this);
    this.destroyRef.onDestroy(() => this.menu.unregisterMenuItem(this));
  }

  private buttonEl(): HTMLButtonElement {
    return this.host.nativeElement.querySelector<HTMLButtonElement>('.au-menu-item__btn')!;
  }

  focus(): void {
    this.menu.setActiveMenuItem(this);
    this.buttonEl().focus();
  }

  /** Visible label text for menu typeahead (first character match). */
  labelText(): string {
    return (this.buttonEl().textContent ?? '').trim();
  }

  containsElement(el: Node): boolean {
    return this.buttonEl().contains(el);
  }

  protected onFocus(): void {
    this.menu.setActiveMenuItem(this);
  }

  protected onClick(event: MouseEvent): void {
    event.stopPropagation();
    if (this.disabled()) {
      return;
    }
    this.select.emit();
    this.menu.close();
  }
}
