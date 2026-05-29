import {
  setStoryOverviewLocale,
  type StoryOverviewLocale,
} from '../story-docs/get-story-overview';

export type StorybookAppearance = 'light' | 'dark';
export type StorybookDensity = 'compact' | 'comfortable' | 'spacious';

/** Maps appearance + high-contrast toggle to `data-au-theme` (same rules as docs site). */
export function resolveStorybookTheme(
  appearance: StorybookAppearance,
  highContrast: boolean,
): string {
  if (!highContrast) {
    return appearance;
  }
  return appearance === 'dark' ? 'high-contrast-dark' : 'high-contrast';
}

function readAppearance(globals: Record<string, unknown>): StorybookAppearance {
  return globals['auTheme'] === 'dark' ? 'dark' : 'light';
}

function readHighContrast(globals: Record<string, unknown>): boolean {
  return globals['auHighContrast'] === 'on';
}

function readDensity(globals: Record<string, unknown>): StorybookDensity {
  const raw = globals['auDensity'];
  if (raw === 'compact' || raw === 'spacious') {
    return raw;
  }
  return 'comfortable';
}

/** Applies Aurea document tokens from Storybook toolbar globals. */
export function applyPreviewGlobals(globals: Record<string, unknown>): void {
  const root = document.documentElement;

  root.setAttribute(
    'data-au-theme',
    resolveStorybookTheme(readAppearance(globals), readHighContrast(globals)),
  );
  root.setAttribute('data-au-density', readDensity(globals));

  const color = globals['auColor'] === 'blue' ? 'blue' : 'monochrome';
  root.setAttribute('data-au-color', color);

  const rawLocale = globals['docsLocale'];
  const locale: StoryOverviewLocale = rawLocale === 'es' ? 'es' : 'en';
  setStoryOverviewLocale(locale);
}
