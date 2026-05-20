import type { DocsLocale } from '../core/docs-locale';

import { MESSAGES_EN } from './locales/en/messages';
import { MESSAGES_ES } from './locales/es/messages';

export type { DocsMessages } from './types/messages';
export type { ThemeTokenGroup } from './types/themes';
export type { ComponentDocExample } from './types/example';

export { COMPONENT_SUMMARIES } from './summaries';

export const DOCS_MESSAGES = {
  en: MESSAGES_EN,
  es: MESSAGES_ES,
} as const satisfies Record<DocsLocale, (typeof MESSAGES_EN)>;
