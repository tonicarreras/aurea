/**
 * Blocks background pointer interaction while a portaled floating panel is open.
 * Complements {@link installPageScrollPrevention} (wheel/touch) for date/time pickers and similar overlays.
 */

import { canConsumeWheelDelta, type ScrollAllowPredicate } from './prevent-page-scroll';

export type InteractionAllowPredicate = (target: EventTarget | null) => boolean;

export type { ScrollAllowPredicate };

/** Returns true when the event target is inside the field host, panel, or anchor. */
export function createFloatingPanelAllowPredicate(
  host: HTMLElement,
  getPanel: () => HTMLElement | null | undefined,
  getAnchor: () => HTMLElement | null,
): InteractionAllowPredicate {
  return (target) => {
    if (!(target instanceof Node)) {
      return false;
    }
    const panel = getPanel();
    const anchor = getAnchor();
    return host.contains(target) || !!panel?.contains(target) || !!anchor?.contains(target);
  };
}

/**
 * Allows wheel/touch scroll only inside {@link scrollAreaSelector} regions of an open panel.
 * Blocks scroll chaining from panel chrome (preview, padding) and from the field host/anchor.
 */
export function createFloatingPanelScrollAllowPredicate(
  host: HTMLElement,
  getPanel: () => HTMLElement | null | undefined,
  getAnchor: () => HTMLElement | null,
  scrollAreaSelector: string,
): ScrollAllowPredicate {
  const allowInteraction = createFloatingPanelAllowPredicate(host, getPanel, getAnchor);

  return (target, event) => {
    if (!allowInteraction(target)) {
      return false;
    }
    if (!(target instanceof Element)) {
      return false;
    }

    const panel = getPanel();
    if (!panel?.contains(target)) {
      return false;
    }

    const scrollArea = target.closest(scrollAreaSelector);
    if (!scrollArea || !panel.contains(scrollArea)) {
      return false;
    }

    if (event instanceof WheelEvent) {
      return canConsumeWheelDelta(scrollArea, event.deltaY, event.deltaX);
    }

    return true;
  };
}

/**
 * Prevents pointer activation outside the allowed subtree (links, buttons, etc.).
 * Calls `onBlocked` once per outside `pointerdown` (typically dismiss the panel).
 */
export function installOutsideInteractionBlock(
  document: Document,
  isInteractionAllowed: InteractionAllowPredicate,
  onBlocked?: () => void,
): () => void {
  const onPointerDown = (event: PointerEvent): void => {
    if (isInteractionAllowed(event.target)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    onBlocked?.();
  };

  document.addEventListener('pointerdown', onPointerDown, { capture: true });
  return () => {
    document.removeEventListener('pointerdown', onPointerDown, { capture: true });
  };
}
