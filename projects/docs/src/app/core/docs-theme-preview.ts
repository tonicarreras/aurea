export type DocsAppearanceTheme = 'light' | 'dark';
export type DocsResolvedTheme = DocsAppearanceTheme | 'high-contrast' | 'high-contrast-dark';

/** Maps appearance + a11y toggle to the `data-au-theme` value for `[auTheme]`. */
export function resolveDocsPreviewTheme(
  appearance: DocsAppearanceTheme,
  highContrast: boolean,
): DocsResolvedTheme {
  if (!highContrast) {
    return appearance;
  }
  return appearance === 'dark' ? 'high-contrast-dark' : 'high-contrast';
}
