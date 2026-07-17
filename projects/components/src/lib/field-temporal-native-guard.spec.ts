import { Component, DestroyRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  AU_COARSE_POINTER_MQ,
  bindCoarsePointerPreference,
  prefersCoarsePointer,
  restoreTemporalPickerFocus,
} from './field-temporal-native-guard';

describe('field-temporal-native-guard', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('prefersCoarsePointer reads matchMedia', () => {
    const matchMedia = vi.fn().mockReturnValue({ matches: true });
    expect(prefersCoarsePointer({ matchMedia } as unknown as Window)).toBe(true);
    expect(matchMedia).toHaveBeenCalledWith(AU_COARSE_POINTER_MQ);
  });

  it('prefersCoarsePointer returns false without a browser window', () => {
    expect(prefersCoarsePointer(null)).toBe(false);
  });

  it('restoreTemporalPickerFocus focuses the icon on coarse pointers', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    const input = document.createElement('input');
    const icon = document.createElement('button');
    document.body.append(input, icon);
    const focusSpy = vi.spyOn(icon, 'focus');

    restoreTemporalPickerFocus(input, icon);

    expect(focusSpy).toHaveBeenCalledOnce();
    input.remove();
    icon.remove();
  });

  it('restoreTemporalPickerFocus focuses the input on fine pointers', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
    const input = document.createElement('input');
    document.body.append(input);
    const focusSpy = vi.spyOn(input, 'focus');

    restoreTemporalPickerFocus(input, null);

    expect(focusSpy).toHaveBeenCalledOnce();
    input.remove();
  });

  it('bindCoarsePointerPreference notifies and cleans up', () => {
    const removeListener = vi.fn();
    let mqListener: (() => void) | undefined;
    const mq = {
      matches: true,
      addEventListener: vi.fn((_event: string, cb: () => void) => {
        mqListener = cb;
      }),
      removeEventListener: removeListener,
    };
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(mq));

    @Component({ template: '' })
    class Host {}

    const onChange = vi.fn();
    const fix = TestBed.createComponent(Host);
    bindCoarsePointerPreference(window, onChange, fix.componentRef.injector.get(DestroyRef));
    expect(onChange).toHaveBeenCalledWith(true);

    mqListener?.();
    expect(onChange).toHaveBeenCalledTimes(2);

    fix.destroy();
    expect(removeListener).toHaveBeenCalledWith('change', mqListener);
  });

  it('bindCoarsePointerPreference reports a fine pointer when matchMedia is unavailable', () => {
    @Component({ template: '' })
    class Host {}

    const onChange = vi.fn();
    const fix = TestBed.createComponent(Host);

    bindCoarsePointerPreference(
      {} as Window,
      onChange,
      fix.componentRef.injector.get(DestroyRef),
    );

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(false);
    fix.destroy();
  });
});
