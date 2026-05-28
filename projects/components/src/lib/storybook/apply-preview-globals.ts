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

function syncThemeStylesheets(styleMode: StorybookStyleMode): void {
  const themeSkin = document.getElementById('au-theme-skin') as HTMLLinkElement | null;
  const primitivesChrome = document.getElementById('au-primitives-chrome') as HTMLLinkElement | null;

  if (themeSkin) {
    themeSkin.disabled = styleMode === 'unstyled';
  }
  if (primitivesChrome) {
    primitivesChrome.disabled = styleMode !== 'unstyled';
  }
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

  if (styleMode === 'unstyled') {
    root.setAttribute('data-au-style', 'unstyled');
    body?.setAttribute('data-au-style', 'unstyled');
  } else {
    root.removeAttribute('data-au-style');
    body?.removeAttribute('data-au-style');
  }

  syncThemeStylesheets(styleMode);

  const rawLocale = globals['docsLocale'];
  const locale: StoryOverviewLocale = rawLocale === 'es' ? 'es' : 'en';
  setStoryOverviewLocale(locale);
}
