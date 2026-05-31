import { describe, expect, it, vi } from 'vitest';

import { openNativePicker } from './au-open-native-picker';

describe('openNativePicker', () => {
  it('calls showPicker when available', () => {
    const input = document.createElement('input');
    const showPicker = vi.fn();
    input.showPicker = showPicker;

    openNativePicker(input);

    expect(showPicker).toHaveBeenCalledOnce();
  });

  it('focuses the input when showPicker is unavailable', () => {
    const input = document.createElement('input');
    const focus = vi.spyOn(input, 'focus');

    openNativePicker(input);

    expect(focus).toHaveBeenCalledOnce();
  });

  it('focuses the input when showPicker throws', () => {
    const input = document.createElement('input');
    input.showPicker = vi.fn(() => {
      throw new Error('not allowed');
    });
    const focus = vi.spyOn(input, 'focus');

    openNativePicker(input);

    expect(focus).toHaveBeenCalledOnce();
  });
});
