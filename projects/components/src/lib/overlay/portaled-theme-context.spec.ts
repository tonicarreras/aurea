import { afterEach, describe, expect, it } from 'vitest';

import {
  bindPortaledThemeContextObserver,
  clearPortaledThemeContext,
  syncPortaledThemeContext,
} from './portaled-theme-context';

describe('portaled-theme-context', () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it('syncPortaledThemeContext copies theme and density from ancestors', () => {
    const shell = document.createElement('div');
    shell.setAttribute('data-au-theme', 'dark');
    shell.setAttribute('data-au-density', 'compact');
    const anchor = document.createElement('span');
    const target = document.createElement('div');
    shell.append(anchor);
    document.body.append(shell, target);

    syncPortaledThemeContext(target, anchor);
    expect(target.getAttribute('data-au-theme')).toBe('dark');
    expect(target.getAttribute('data-au-density')).toBe('compact');
  });

  it('bindPortaledThemeContextObserver updates target when source attrs change', async () => {
    const shell = document.createElement('div');
    shell.setAttribute('data-au-theme', 'light');
    const anchor = document.createElement('span');
    const target = document.createElement('div');
    shell.append(anchor);
    document.body.append(shell, target);

    syncPortaledThemeContext(target, anchor);
    const unbind = bindPortaledThemeContextObserver(target, anchor);

    shell.setAttribute('data-au-theme', 'dark');
    await new Promise<void>((resolve) => {
      queueMicrotask(resolve);
    });
    expect(target.getAttribute('data-au-theme')).toBe('dark');

    unbind();
    clearPortaledThemeContext(target);
  });
});
