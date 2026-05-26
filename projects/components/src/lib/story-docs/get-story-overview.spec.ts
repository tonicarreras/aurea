import { describe, expect, it } from 'vitest';

import { STORY_OVERVIEW_SOURCE } from './story-overview-source';
import {
  getStoryOverview,
  setStoryOverviewLocale,
  storyOverviewParsers,
  type StoryOverviewSlug,
} from './get-story-overview';

const slugs = Object.keys(STORY_OVERVIEW_SOURCE.en) as StoryOverviewSlug[];

describe('getStoryOverview', () => {
  it('builds markdown for every catalog slug', () => {
    for (const slug of slugs) {
      const md = getStoryOverview(slug);
      expect(md).toContain('## Overview');
      expect(md).toContain('## When to use');
      expect(md).toContain('## Anatomy');
      expect(md).toContain('## Accessibility');
      expect(md.length).toBeGreaterThan(100);
    }
  });

  it('includes signal-forms extra for input-text', () => {
    expect(getStoryOverview('input-text')).toContain('Signal forms vs manual');
  });

  it('serves Spanish overview when locale is es', () => {
    setStoryOverviewLocale('es');
    expect(getStoryOverview('button')).toContain('## Resumen');
    setStoryOverviewLocale('en');
  });

  it('includes form-field note for popover', () => {
    expect(getStoryOverview('popover')).toContain('au-form-field');
  });

  it('parses keyboard lines with semicolon and dot separators', () => {
    expect(getStoryOverview('select')).toContain('## Keyboard and focus');
    expect(getStoryOverview('button')).toMatch(/Enter and Space/);
  });

  it('parses accessibility lines with colon separators', () => {
    expect(getStoryOverview('switch')).toContain('## Accessibility');
  });

  it('returns empty string for an unknown slug', () => {
    expect(getStoryOverview('__missing__' as StoryOverviewSlug)).toBe('');
  });

  it('returns cached markdown on repeated calls', () => {
    const first = getStoryOverview('button');
    const second = getStoryOverview('button');
    expect(second).toBe(first);
  });

  it('covers parser edge cases', () => {
    const { parseA11y, parseKeyboard } = storyOverviewParsers;
    expect(parseKeyboard('Open menu; Escape closes')).toEqual({
      interaction: 'Open menu',
      behavior: 'Escape closes',
    });
    expect(parseKeyboard('First action. Second action')).toEqual({
      interaction: 'First action',
      behavior: 'Second action',
    });
    expect(parseKeyboard('Only interaction')).toEqual({
      interaction: 'Only interaction',
      behavior: '',
    });
    expect(parseA11y('`aria-busy` blocks click')).toEqual({
      topic: '`aria-busy`',
      detail: 'blocks click',
    });
    expect(parseA11y('Plain note without colon')).toEqual({
      topic: 'Note',
      detail: 'Plain note without colon',
    });
  });
});
