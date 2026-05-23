import {
  buildStoryDocsOverview,
  type StoryDocsA11yRow,
  type StoryDocsKeyboardRow,
} from './build-story-docs-overview';
import { STORY_OVERVIEW_SOURCE } from './story-overview-source';
import type { StoryOverviewSource } from './story-overview-types';
import { STORY_OVERVIEW_TOKENS } from './story-overview-tokens';

export type StoryOverviewSlug = keyof typeof STORY_OVERVIEW_SOURCE;

const cache = new Map<string, string>();

function parseA11y(line: string): StoryDocsA11yRow {
  const tick = line.match(/^(`[^`]+`)\s+(.+)$/);
  if (tick?.[1] && tick[2]) {
    return { topic: tick[1], detail: tick[2] };
  }
  const colon = line.indexOf(': ');
  if (colon > 0 && colon < 60) {
    return { topic: line.slice(0, colon), detail: line.slice(colon + 2) };
  }
  return { topic: 'Note', detail: line };
}

function parseKeyboard(line: string): StoryDocsKeyboardRow {
  const semi = line.indexOf('; ');
  if (semi > 0) {
    return { interaction: line.slice(0, semi), behavior: line.slice(semi + 2) };
  }
  const dot = line.indexOf('. ');
  if (dot > 0 && dot < 80) {
    return { interaction: line.slice(0, dot), behavior: line.slice(dot + 2) };
  }
  return { interaction: line, behavior: '' };
}

/** @internal For unit tests. */
export const storyOverviewParsers = { parseA11y, parseKeyboard };

/** Standard Autodocs markdown for a component slug (aligned with docs site overview). */
export function getStoryOverview(slug: StoryOverviewSlug): string {
  const cached = cache.get(slug);
  if (cached) {
    return cached;
  }

  const src = STORY_OVERVIEW_SOURCE[slug] as StoryOverviewSource;
  const md = buildStoryDocsOverview({
    overview: src.intro.join(' '),
    whenToUse: { use: src.whenToUse, avoid: src.whenNotToUse },
    anatomy: src.anatomy.map((a) => ({ region: a.region, notes: a.detail })),
    accessibility: src.accessibility.map(parseA11y),
    keyboard: src.keyboard?.map(parseKeyboard),
    tokens: STORY_OVERVIEW_TOKENS[slug],
    extra: src.extra,
  });

  cache.set(slug, md);
  return md;
}
