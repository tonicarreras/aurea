import type { WritableSignal } from '@angular/core';

/**
 * Defers opening an overlay until after the host is mounted (first `@if` render).
 * Useful when dialogs/drawers are created lazily to avoid first-open focus glitches.
 */
export function openOverlayLazy(
  ready: WritableSignal<boolean>,
  open: WritableSignal<boolean>,
): void {
  if (!ready()) {
    ready.set(true);
    queueMicrotask(() => open.set(true));
    return;
  }
  open.set(true);
}
