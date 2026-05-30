import { describe, expect, it, vi, afterEach } from 'vitest';

import {
  claimOpenMenu,
  releaseOpenMenu,
  resetOpenMenuForTests,
  type AuMenuOpenController,
} from './menu-open-registry';

function mockMenu(): AuMenuOpenController {
  return { close: vi.fn() };
}

describe('menu-open-registry', () => {
  afterEach(() => {
    resetOpenMenuForTests();
  });

  it('closes the previous menu when a new one opens', () => {
    const first = mockMenu();
    const second = mockMenu();
    claimOpenMenu(first);
    claimOpenMenu(second);
    expect(first.close).toHaveBeenCalledOnce();
    expect(second.close).not.toHaveBeenCalled();
  });

  it('releaseOpenMenu clears only the active menu', () => {
    const first = mockMenu();
    const second = mockMenu();
    claimOpenMenu(first);
    releaseOpenMenu(first);
    claimOpenMenu(second);
    expect(first.close).not.toHaveBeenCalled();
  });
});
