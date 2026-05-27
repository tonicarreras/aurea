import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';

import { SharedOverlay } from '../overlay/shared-overlay';
import { AU_MENU } from './au-menu.token';

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
 * - **Dismiss:** outside click, Escape, and window scroll.
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
  },
})
export class AuMenu extends SharedOverlay {
  protected override readonly overlayPanelClass = 'au-menu__panel';
}
