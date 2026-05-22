import type { AuSnackbarPosition } from './snackbar';

/** Gap between stacked toasts (matches `--au-space-2`). */
const STACK_GAP_PX = 8;

/** Fallback height before the surface is measured. */
const STACK_FALLBACK_HEIGHT_PX = 56;

type StackEntry = {
  id: number;
  host: HTMLElement;
  position: AuSnackbarPosition;
  surface: HTMLElement | null;
};

let nextId = 0;
const entries = new Map<number, StackEntry>();

function groupFor(position: AuSnackbarPosition): StackEntry[] {
  return [...entries.values()]
    .filter((entry) => entry.position === position)
    .sort((a, b) => a.id - b.id);
}

/** @internal Used by layout; exported for unit tests. */
export function measureSnackbarStackSurfaceHeight(surface: HTMLElement | null): number {
  if (!surface) {
    return STACK_FALLBACK_HEIGHT_PX;
  }
  const height = surface.offsetHeight;
  return height > 0 ? height : STACK_FALLBACK_HEIGHT_PX;
}

function layout(position: AuSnackbarPosition): void {
  const group = groupFor(position);
  let offsetPx = 0;

  for (let index = group.length - 1; index >= 0; index--) {
    const entry = group[index]!;
    entry.host.style.setProperty('--au-snackbar-stack-offset', `${offsetPx}px`);
    entry.host.style.setProperty('--au-snackbar-stack-layer', String(index));
    if (index > 0) {
      offsetPx += measureSnackbarStackSurfaceHeight(entry.surface) + STACK_GAP_PX;
    }
  }
}

function clearStackStyles(entry: StackEntry): void {
  entry.host.style.removeProperty('--au-snackbar-stack-offset');
  entry.host.style.removeProperty('--au-snackbar-stack-layer');
}

/** Registers an open snackbar; returns a stable stack id. */
export function registerSnackbarStackEntry(
  host: HTMLElement,
  position: AuSnackbarPosition,
): number {
  const id = ++nextId;
  entries.set(id, { id, host, position, surface: null });
  layout(position);
  return id;
}

/** Updates measured surface height and recomputes offsets for the position group. */
export function setSnackbarStackSurface(id: number, surface: HTMLElement | null): void {
  const entry = entries.get(id);
  if (!entry) {
    return;
  }
  entry.surface = surface;
  layout(entry.position);
}

/** Removes a snackbar from the stack and relayouts remaining toasts. */
export function unregisterSnackbarStackEntry(id: number): void {
  const entry = entries.get(id);
  if (!entry) {
    return;
  }
  const { position } = entry;
  clearStackStyles(entry);
  entries.delete(id);
  layout(position);
}

/** Whether this snackbar is the newest in its position group (receives Escape). */
export function isTopmostSnackbarStackEntry(id: number): boolean {
  const entry = entries.get(id);
  if (!entry) {
    return false;
  }
  const group = groupFor(entry.position);
  return group.length > 0 && group[group.length - 1]!.id === id;
}

/** @internal Resets registry between tests. */
export function resetSnackbarStackForTests(): void {
  for (const entry of entries.values()) {
    clearStackStyles(entry);
  }
  entries.clear();
  nextId = 0;
}
