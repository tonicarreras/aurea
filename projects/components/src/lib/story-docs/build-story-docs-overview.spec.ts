import { describe, expect, it } from 'vitest';

import { buildStoryDocsOverview } from './build-story-docs-overview';

const baseInput = {
  overview: 'Test component overview.',
  whenToUse: { use: ['Use case A'], avoid: ['Alternative B'] },
  anatomy: [{ region: 'Host', notes: 'Root element.' }],
  accessibility: [{ topic: 'Name', detail: 'Visible label required.' }],
};

describe('buildStoryDocsOverview', () => {
  it('builds core sections', () => {
    const md = buildStoryDocsOverview(baseInput);
    expect(md).toContain('## Overview');
    expect(md).toContain('Test component overview.');
    expect(md).toContain('## When to use');
    expect(md).toContain('Use case A');
    expect(md).toContain('Alternative B');
    expect(md).toContain('## Anatomy');
    expect(md).toContain('## Accessibility');
  });

  it('includes optional keyboard, tokens, and extra sections', () => {
    const md = buildStoryDocsOverview({
      ...baseInput,
      keyboard: [{ interaction: 'Tab', behavior: 'Moves focus.' }],
      tokens: [{ concern: 'Color', examples: '`--au-color-link`' }],
      extra: '## Custom\n\nMore notes.',
    });
    expect(md).toContain('## Keyboard and focus');
    expect(md).toContain('## Design tokens (reference)');
    expect(md).toContain('docs/DESIGN.md');
    expect(md).toContain('## Custom');
  });

  it('omits optional sections when not provided', () => {
    const md = buildStoryDocsOverview(baseInput);
    expect(md).not.toContain('## Keyboard and focus');
    expect(md).not.toContain('## Design tokens');
  });
});
