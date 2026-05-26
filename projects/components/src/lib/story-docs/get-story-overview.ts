import {
  buildStoryDocsOverview,
  type StoryDocsA11yRow,
  type StoryDocsKeyboardRow,
} from './build-story-docs-overview';
import { STORY_OVERVIEW_SOURCE, type StoryOverviewLocale } from './story-overview-source';
import type { StoryOverviewSource } from './story-overview-types';
import { STORY_OVERVIEW_TOKENS } from './story-overview-tokens';

export type { StoryOverviewLocale } from './story-overview-source';
export type StoryOverviewSlug = keyof (typeof STORY_OVERVIEW_SOURCE)['en'];

const cache = new Map<string, string>();

let activeLocale: StoryOverviewLocale = 'en';

/** Set by Storybook preview loader from `docsLocale` global. */
export function setStoryOverviewLocale(locale: StoryOverviewLocale): void {
  activeLocale = locale;
  cache.clear();
}

export function getStoryOverviewLocale(): StoryOverviewLocale {
  return activeLocale;
}

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

/** Autodocs markdown for a component slug (aligned with docs site overview). */
export function getStoryOverview(
  slug: StoryOverviewSlug,
  locale: StoryOverviewLocale = activeLocale,
): string {
  const cacheKey = `${locale}:${slug}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const src = STORY_OVERVIEW_SOURCE[locale][slug] as StoryOverviewSource | undefined;
  if (!src) {
    return '';
  }

  const md = buildStoryDocsOverview(
    {
      overview: src.intro.join(' '),
      whenToUse: { use: src.whenToUse, avoid: src.whenNotToUse },
      anatomy: src.anatomy.map((a) => ({ region: a.region, notes: a.detail })),
      accessibility: src.accessibility.map(parseA11y),
      keyboard: src.keyboard?.map(parseKeyboard),
      tokens: STORY_OVERVIEW_TOKENS[slug],
      extra: src.extra,
    },
    locale,
  );

  cache.set(cacheKey, md);
  return md;
}
