import type { DocsLocale } from './docs-locale';
import { THEME_TOKEN_GROUPS_EN } from '../i18n/locales/en/themes';
import { THEME_TOKEN_GROUPS_ES } from '../i18n/locales/es/themes';
import { THEME_HOST_OVERRIDES_EN } from '../i18n/locales/en/theme-host-overrides';
import { THEME_HOST_OVERRIDES_ES } from '../i18n/locales/es/theme-host-overrides';

export type { ThemeTokenGroup, ThemeHostOverride } from '../i18n/types/themes';

export function themeTokenGroups(locale: DocsLocale) {
  return locale === 'en' ? THEME_TOKEN_GROUPS_EN : THEME_TOKEN_GROUPS_ES;
}

export function themeHostOverrides(locale: DocsLocale) {
  return locale === 'en' ? THEME_HOST_OVERRIDES_EN : THEME_HOST_OVERRIDES_ES;
}
