import { afterEach, describe, expect, it } from 'vitest';

import {
  isTopmostSnackbarStackEntry,
  measureSnackbarStackSurfaceHeight,
  registerSnackbarStackEntry,
  resetSnackbarStackForTests,
  setSnackbarStackSurface,
  unregisterSnackbarStackEntry,
} from './snackbar-stack';

describe('snackbar-stack', () => {
  beforeEach(() => {
    resetSnackbarStackForTests();
  });

  afterEach(() => {
    resetSnackbarStackForTests();
  });

  function hostWithSurface(height: number): { host: HTMLElement; surface: HTMLElement } {
    const host = document.createElement('au-snackbar');
    const surface = document.createElement('div');
    surface.className = 'au-snackbar__surface';
    surface.style.height = `${height}px`;
    Object.defineProperty(surface, 'offsetHeight', { value: height, configurable: true });
    host.append(surface);
    document.body.append(host);
    return { host, surface };
  }

  it('places the newest toast at offset 0 and stacks older ones above', () => {
    const first = hostWithSurface(48);
    const second = hostWithSurface(40);
    const id1 = registerSnackbarStackEntry(first.host, 'bottom-center');
    setSnackbarStackSurface(id1, first.surface);
    const id2 = registerSnackbarStackEntry(second.host, 'bottom-center');
    setSnackbarStackSurface(id2, second.surface);

    expect(second.host.style.getPropertyValue('--au-snackbar-stack-offset')).toBe('0px');
    expect(first.host.style.getPropertyValue('--au-snackbar-stack-offset')).toBe('48px');
    expect(second.host.style.getPropertyValue('--au-snackbar-stack-layer')).toBe('1');
    expect(first.host.style.getPropertyValue('--au-snackbar-stack-layer')).toBe('0');

    first.host.remove();
    second.host.remove();
  });

  it('relayouts when the top toast is removed', () => {
    const first = hostWithSurface(48);
    const second = hostWithSurface(40);
    const id1 = registerSnackbarStackEntry(first.host, 'bottom-end');
    setSnackbarStackSurface(id1, first.surface);
    const id2 = registerSnackbarStackEntry(second.host, 'bottom-end');
    setSnackbarStackSurface(id2, second.surface);

    unregisterSnackbarStackEntry(id2);
    expect(first.host.style.getPropertyValue('--au-snackbar-stack-offset')).toBe('0px');

    first.host.remove();
    second.host.remove();
  });

  it('tracks topmost entry per position', () => {
    const a = hostWithSurface(40);
    const b = hostWithSurface(40);
    const idA = registerSnackbarStackEntry(a.host, 'top-end');
    const idB = registerSnackbarStackEntry(b.host, 'top-end');

    expect(isTopmostSnackbarStackEntry(idA)).toBe(false);
    expect(isTopmostSnackbarStackEntry(idB)).toBe(true);

    a.host.remove();
    b.host.remove();
  });

  it('measureSnackbarStackSurfaceHeight falls back when missing or zero-sized', () => {
    expect(measureSnackbarStackSurfaceHeight(null)).toBe(56);
    const surface = document.createElement('div');
    vi.spyOn(surface, 'offsetHeight', 'get').mockReturnValue(0);
    expect(measureSnackbarStackSurfaceHeight(surface)).toBe(56);
    vi.spyOn(surface, 'offsetHeight', 'get').mockReturnValue(32);
    expect(measureSnackbarStackSurfaceHeight(surface)).toBe(32);
  });

  it('is noop for unknown stack ids', () => {
    expect(isTopmostSnackbarStackEntry(99_999)).toBe(false);
    expect(() => setSnackbarStackSurface(99_999, null)).not.toThrow();
    expect(() => unregisterSnackbarStackEntry(99_999)).not.toThrow();
  });
});
