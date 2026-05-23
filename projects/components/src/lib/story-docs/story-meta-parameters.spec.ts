import { describe, expect, it } from 'vitest';

import { storyMetaParameters } from './story-meta-parameters';

describe('storyMetaParameters', () => {
  it('returns docs parameters with component description and empty arg types', () => {
    const params = storyMetaParameters('# Table docs');
    expect(params.docs.description.component).toBe('# Table docs');
    expect(params.docs.extractArgTypes()).toEqual({});
  });
});
