import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';

import { AU_MENU } from './au-menu.token';

/**
 * Action entry inside {@link AuMenu}.
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

  readonly disabled = input(false);
  readonly select = output<void>();

  protected onClick(event: MouseEvent): void {
    event.stopPropagation();
    if (this.disabled()) {
      return;
    }
    this.select.emit();
    this.menu.close();
  }
}
