import { isPlatformBrowser } from '@angular/common';
import type { DestroyRef } from '@angular/core';
import { Renderer2 } from '@angular/core';

import { canConsumeWheelDelta, installPageScrollPrevention } from './prevent-page-scroll';
import { TooltipOverlay } from './tooltip-overlay';

/**
 * Portals a field listbox with `position: fixed`, matching the trigger width.
 *
 * Uses {@link TooltipOverlay} so gap, arrow, and placement match menu/popover/date pickers.
 */
export class FieldListboxOverlay {
  private readonly tooltipOverlay: TooltipOverlay;
  private activeListbox: HTMLElement | null = null;
  private uninstallScrollPrevention: (() => void) | null = null;

  constructor(
    private readonly document: Document,
    private readonly renderer: Renderer2,
    private readonly platformId: object,
    destroyRef: DestroyRef,
  ) {
    this.tooltipOverlay = new TooltipOverlay(document, renderer, platformId, destroyRef);
    destroyRef.onDestroy(() => this.detach());
  }

  sync(listbox: HTMLElement | undefined, anchor: HTMLElement, open: boolean): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (!open || !listbox) {
      this.detach();
      return;
    }
    this.renderer.addClass(listbox, 'au-field-listbox--overlay');
    this.renderer.addClass(listbox, 'au-floating-panel');
    this.activeListbox = listbox;
    this.installScrollPrevention(listbox, anchor);
    this.tooltipOverlay.sync(listbox, anchor, 'bottom', { matchAnchorWidth: true });
  }

  detach(): void {
    this.teardownScrollPrevention();
    const listbox = this.activeListbox;
    if (listbox) {
      this.renderer.removeClass(listbox, 'au-field-listbox--overlay');
      this.renderer.removeClass(listbox, 'au-floating-panel');
    }
    this.tooltipOverlay.detach();
    this.activeListbox = null;
  }

  private installScrollPrevention(listbox: HTMLElement, anchor: HTMLElement): void {
    this.teardownScrollPrevention();
    this.uninstallScrollPrevention = installPageScrollPrevention(this.document, (target, event) =>
      this.isListboxScrollAllowed(target, event, listbox, anchor),
    );
  }

  private teardownScrollPrevention(): void {
    this.uninstallScrollPrevention?.();
    this.uninstallScrollPrevention = null;
  }

  private isListboxScrollAllowed(
    target: EventTarget | null,
    event: WheelEvent | TouchEvent | undefined,
    listbox: HTMLElement,
    anchor: HTMLElement,
  ): boolean {
    if (!(target instanceof Node)) {
      return false;
    }
    if (anchor.contains(target)) {
      return true;
    }
    if (!listbox.contains(target)) {
      return false;
    }
    if (event instanceof WheelEvent) {
      return canConsumeWheelDelta(listbox, event.deltaY, event.deltaX);
    }
    return true;
  }
}

/** Portal target for field listboxes — modal dialogs require top-layer placement. */
export function resolveFieldListboxPortalRoot(
  anchor: HTMLElement,
  document: Document,
): HTMLElement {
  const dialog = anchor.closest('dialog');
  if (dialog instanceof HTMLDialogElement && isModalDialogOpen(dialog)) {
    return dialog;
  }
  return document.body;
}

function isModalDialogOpen(dialog: HTMLDialogElement): boolean {
  return dialog.open || dialog.hasAttribute('open');
}

/** True when focus left the control row and did not move into the (possibly portaled) listbox. */
export function focusLeftFieldControl(event: FocusEvent, listbox?: HTMLElement | null): boolean {
  if (!(event.currentTarget instanceof HTMLElement)) {
    return true;
  }
  const to = event.relatedTarget;
  if (to == null || !(to instanceof Node)) {
    return true;
  }
  if (event.currentTarget.contains(to)) {
    return false;
  }
  if (listbox?.contains(to)) {
    return false;
  }
  return true;
}
