export const DOCS_LOCALES = ['en', 'es'] as const;

export type DocsLocale = (typeof DOCS_LOCALES)[number];

export const DEFAULT_DOCS_LOCALE: DocsLocale = 'es';

/** Bilingual string; both locales required. */
export type LStr = Record<DocsLocale, string>;

export function L(en: string, es: string): LStr {
  return { en, es };
}

export function pickL(value: LStr, locale: DocsLocale): string {
  return value[locale];
}

export function isDocsLocale(value: string): value is DocsLocale {
  return (DOCS_LOCALES as readonly string[]).includes(value);
}

/** Canonical route segments (same slug in every locale). */
export const DOCS_ROUTES = {
  home: '',
  getStarted: 'get-started',
  themes: 'themes',
  components: 'components',
  guidesAdoption: 'guides/adoption',
  guidesSignalForms: 'guides/signal-forms',
  guidesPatterns: 'guides/patterns',
  guidesTroubleshooting: 'guides/troubleshooting',
  guidesBundle: 'guides/bundle',
} as const;

export function docsPath(locale: DocsLocale, ...segments: string[]): string[] {
  const parts = segments.flatMap((segment) => segment.split('/')).filter((part) => part.length > 0);
  return ['/', locale, ...parts];
}
