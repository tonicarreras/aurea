import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';

import { AU_MENU } from './au-menu.token';

/**
 * Action entry inside {@link AuMenu}.
 *
 * @remarks
 * - **Keyboard:** Arrow keys cycle between items (handled by parent menu).
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
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly disabled = input(false);
  readonly select = output<void>();

  constructor() {
    this.menu.registerMenuItem(this);
    this.destroyRef.onDestroy(() => this.menu.unregisterMenuItem(this));
  }

  private buttonEl(): HTMLButtonElement {
    return (this.host.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '.au-menu-item__btn',
    )!;
  }

  focus(): void {
    this.buttonEl().focus();
  }

  containsElement(el: Node): boolean {
    return this.buttonEl().contains(el);
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
