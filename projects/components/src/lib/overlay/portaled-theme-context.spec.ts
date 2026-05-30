import { afterEach, describe, expect, it, vi } from 'vitest';

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

  it('removes copied attrs when themed ancestors are missing or empty', () => {
    const anchor = document.createElement('span');
    const target = document.createElement('div');
    target.setAttribute('data-au-theme', 'dark');
    document.body.append(anchor, target);

    syncPortaledThemeContext(target, anchor);
    expect(target.hasAttribute('data-au-theme')).toBe(false);

    document.body.replaceChildren();
    const shell = document.createElement('div');
    shell.setAttribute('data-au-theme', '');
    const emptyAnchor = document.createElement('span');
    const emptyTarget = document.createElement('div');
    shell.append(emptyAnchor);
    document.body.append(shell, emptyTarget);
    syncPortaledThemeContext(emptyTarget, emptyAnchor);
    expect(emptyTarget.hasAttribute('data-au-theme')).toBe(false);
  });

  it('bindPortaledThemeContextObserver returns noop without MutationObserver', () => {
    const anchor = document.createElement('span');
    const target = document.createElement('div');
    document.body.append(anchor, target);
    const observer = globalThis.MutationObserver;
    vi.stubGlobal('MutationObserver', undefined);

    const unbind = bindPortaledThemeContextObserver(target, anchor);
    expect(() => unbind()).not.toThrow();

    vi.stubGlobal('MutationObserver', observer);
  });

  it('bindPortaledThemeContextObserver returns noop without theme sources', () => {
    const anchor = document.createElement('span');
    const target = document.createElement('div');
    document.body.append(anchor, target);

    const unbind = bindPortaledThemeContextObserver(target, anchor);
    expect(() => unbind()).not.toThrow();
  });
});
