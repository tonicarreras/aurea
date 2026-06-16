import { describe, expect, it } from 'vitest';

import { shouldSkipRepositionOnScroll } from './overlay-reposition';

describe('shouldSkipRepositionOnScroll', () => {
  it('returns false when the event is missing or not a scroll', () => {
    const container = document.createElement('div');
    expect(shouldSkipRepositionOnScroll(undefined, container)).toBe(false);
    expect(shouldSkipRepositionOnScroll(new Event('resize'), container)).toBe(false);
  });

  it('returns false when the container is null or the target is outside', () => {
    const inner = document.createElement('div');
    const event = new Event('scroll', { bubbles: true });
    Object.defineProperty(event, 'target', { value: inner, configurable: true });
    expect(shouldSkipRepositionOnScroll(event, null)).toBe(false);

    const container = document.createElement('div');
    expect(shouldSkipRepositionOnScroll(event, container)).toBe(false);
  });

  it('returns true when scroll originates inside the container', () => {
    const container = document.createElement('div');
    const inner = document.createElement('div');
    container.append(inner);
    const event = new Event('scroll', { bubbles: true });
    Object.defineProperty(event, 'target', { value: inner, configurable: true });
    expect(shouldSkipRepositionOnScroll(event, container)).toBe(true);
  });
});
