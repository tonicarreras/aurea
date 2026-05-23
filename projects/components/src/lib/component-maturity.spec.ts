import {
  COMPONENT_MATURITY,
  COMPONENT_MATURITY_LEVELS,
  getComponentMaturity,
} from './component-maturity';

describe('component-maturity', () => {
  it('exposes maturity levels', () => {
    expect(COMPONENT_MATURITY_LEVELS).toContain('stable');
    expect(COMPONENT_MATURITY_LEVELS).toContain('beta');
    expect(COMPONENT_MATURITY_LEVELS).toContain('experimental');
  });

  it('returns catalog entry for known slugs', () => {
    expect(getComponentMaturity('button')).toEqual(COMPONENT_MATURITY['button']);
    expect(getComponentMaturity('menu').level).toBe('stable');
  });

  it('returns experimental fallback for unknown slugs', () => {
    const meta = getComponentMaturity('not-in-catalog');
    expect(meta.level).toBe('experimental');
    expect(meta.since).toBe('0.0.0');
    expect(meta.note).toBeTruthy();
  });
});
