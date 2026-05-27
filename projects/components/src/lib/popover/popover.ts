import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';

import { SharedOverlay } from '../overlay/shared-overlay';
import { AU_POPOVER } from './au-popover.token';

/** Used by `forwardRef` in component providers (testable factory). */
export function auPopoverSelfRef(): typeof AuPopover {
  return AuPopover;
}

/**
 * Lightweight panel anchored to a trigger (filters, help, compact forms).
 *
 * @remarks
 * - Same overlay model as {@link AuMenu}: portaled panel, `[(open)]`, outside click, Escape.
 * - **Trigger:** `auPopoverTrigger`; `aria-haspopup="dialog"` on the trigger.
 *
 * @example
 * ```html
 * <au-popover [(open)]="filtersOpen">
 *   <au-button auPopoverTrigger>Filters</au-button>
 *   <p>Filter content</p>
 * </au-popover>
 * ```
 */
@Component({
  selector: 'au-popover',
  templateUrl: './popover.html',
  styleUrl: './popover.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: AU_POPOVER, useExisting: forwardRef(auPopoverSelfRef) }],
  host: {
    class: 'au-popover',
  },
})
export class AuPopover extends SharedOverlay {
  protected override readonly overlayPanelClass = 'au-popover__panel';
}
