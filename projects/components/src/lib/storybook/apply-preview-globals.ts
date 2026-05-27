import {
  setStoryOverviewLocale,
  type StoryOverviewLocale,
} from '../story-docs/get-story-overview';

export type StorybookAppearance = 'light' | 'dark';
export type StorybookDensity = 'compact' | 'comfortable' | 'spacious';
export type StorybookStyleMode = 'default' | 'unstyled';

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

function readStyleMode(globals: Record<string, unknown>): StorybookStyleMode {
  return globals['auStyle'] === 'unstyled' ? 'unstyled' : 'default';
}

/** Applies Aurea document tokens from Storybook toolbar globals. */
export function applyPreviewGlobals(globals: Record<string, unknown>): void {
  const root = document.documentElement;
  const body = document.body;
  const styleMode = readStyleMode(globals);

  root.setAttribute(
    'data-au-theme',
    resolveStorybookTheme(readAppearance(globals), readHighContrast(globals)),
  );
  root.setAttribute('data-au-density', readDensity(globals));
  root.setAttribute('data-au-style', styleMode);
  if (body) {
    body.setAttribute('data-au-style', styleMode);
  }

  const rawLocale = globals['docsLocale'];
  const locale: StoryOverviewLocale = rawLocale === 'es' ? 'es' : 'en';
  setStoryOverviewLocale(locale);
}
