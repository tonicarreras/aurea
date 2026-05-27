import { type Signal } from '@angular/core';

export interface ChildRegistryConfig<T> {
  /** Current selection key (model signal). */
  value: Signal<string>;
  /** Called when selection should change (user action or auto-pick). */
  onValueChange: (value: string) => void;
  itemKey: (item: T) => string;
  itemDisabled: (item: T) => boolean;
  /** Arrow-key orientation for tablists (tabs); steps always use horizontal. */
  orientation?: Signal<'horizontal' | 'vertical'>;
  focusItem?: (item: T) => void;
}

export interface ChildRegistry<T> {
  register(item: T): void;
  unregister(item: T): void;
  enabledItems(): readonly T[];
  select(key: string): void;
  onKeydown(event: KeyboardEvent): void;
}

const ARROW_KEYS_BY_ORIENTATION: Record<
  'horizontal' | 'vertical',
  { prev: string; next: string }
> = {
  horizontal: { prev: 'ArrowLeft', next: 'ArrowRight' },
  vertical: { prev: 'ArrowUp', next: 'ArrowDown' },
};

/**
 * Registry for projected tab/step triggers: registration, auto-selection,
 * keyboard navigation. Selection truth is always `config.value()`.
 */
export function createChildRegistry<T>(config: ChildRegistryConfig<T>): ChildRegistry<T> {
  const items: T[] = [];
  let ensureScheduled = false;

  function indexOf(key: string): number {
    return items.findIndex((item) => config.itemKey(item) === key);
  }

  function isEnabledKey(key: string): boolean {
    const i = indexOf(key);
    return i !== -1 && !config.itemDisabled(items[i]);
  }

  /**
   * Picks the first enabled item when the current value is empty or invalid.
   */
  function ensureSelection(): void {
    const current = config.value();
    if (current && isEnabledKey(current)) {
      return;
    }
    const enabled = enabledItems();
    if (enabled.length === 0) {
      return;
    }
    const firstKey = config.itemKey(enabled[0]);
    if (config.value() !== firstKey) {
      config.onValueChange(firstKey);
    }
  }

  function scheduleEnsureSelection(): void {
    if (ensureScheduled) {
      return;
    }
    ensureScheduled = true;
    queueMicrotask(() => {
      ensureScheduled = false;
      ensureSelection();
    });
  }

  function register(item: T): void {
    const key = config.itemKey(item);
    if (indexOf(key) !== -1) {
      return;
    }
    items.push(item);
    scheduleEnsureSelection();
  }

  function unregister(item: T): void {
    const key = config.itemKey(item);
    const i = indexOf(key);
    if (i === -1) {
      return;
    }
    items.splice(i, 1);
    scheduleEnsureSelection();
  }

  function enabledItems(): readonly T[] {
    return items.filter((item) => !config.itemDisabled(item));
  }

  function select(key: string): void {
    if (!isEnabledKey(key)) {
      return;
    }
    if (config.value() === key) {
      return;
    }
    config.onValueChange(key);
  }

  function onKeydown(event: KeyboardEvent): void {
    const orientation = config.orientation?.() ?? 'horizontal';
    const keys = ARROW_KEYS_BY_ORIENTATION[orientation];
    const enabled = enabledItems();
    if (enabled.length === 0) {
      return;
    }

    const currentIndex = enabled.findIndex(
      (item) => config.itemKey(item) === config.value(),
    );
    const startIndex = currentIndex >= 0 ? currentIndex : 0;

    let nextIndex: number | undefined;

    switch (event.key) {
      case keys.prev: {
        event.preventDefault();
        nextIndex = startIndex > 0 ? startIndex - 1 : enabled.length - 1;
        break;
      }
      case keys.next: {
        event.preventDefault();
        nextIndex = startIndex < enabled.length - 1 ? startIndex + 1 : 0;
        break;
      }
      case 'Home': {
        event.preventDefault();
        nextIndex = 0;
        break;
      }
      case 'End': {
        event.preventDefault();
        nextIndex = enabled.length - 1;
        break;
      }
      default:
        return;
    }

    if (nextIndex !== undefined && nextIndex >= 0 && nextIndex < enabled.length) {
      const nextItem = enabled[nextIndex];
      const nextKey = config.itemKey(nextItem);
      if (config.value() !== nextKey) {
        config.onValueChange(nextKey);
      }
      config.focusItem?.(nextItem);
    }
  }

  return { register, unregister, enabledItems, select, onKeydown };
}
