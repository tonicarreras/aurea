import type { DocsLocale } from './docs-locale';
import { THEME_TOKEN_GROUPS_EN } from '../i18n/locales/en/themes';
import { THEME_TOKEN_GROUPS_ES } from '../i18n/locales/es/themes';

export type { ThemeTokenGroup } from '../i18n/types/themes';

export function themeTokenGroups(locale: DocsLocale) {
  return locale === 'en' ? THEME_TOKEN_GROUPS_EN : THEME_TOKEN_GROUPS_ES;
}
