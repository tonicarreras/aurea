import { describe, expect, it } from 'vitest';

import { storyMetaParameters } from './story-meta-parameters';

describe('storyMetaParameters', () => {
  it('returns docs parameters with lazy overview and empty arg types', () => {
    const params = storyMetaParameters('table');
    expect(params.docs.description.component).toContain('## Overview');
    expect(params.docs.description.component).toContain('au-table');
    expect(params.docs.extractArgTypes()).toEqual({});
  });
});
