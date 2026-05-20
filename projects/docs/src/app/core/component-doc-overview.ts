import type { ComponentDoc } from './component-docs.registry';
import type { DocsLocale } from './docs-locale';
import { OVERVIEWS_EN } from '../i18n/locales/en/overview';
import { OVERVIEWS_ES } from '../i18n/locales/es/overview';

export interface ComponentDocOverviewSection {
  title: string;
  items: string[];
}

export interface ComponentDocOverview {
  intro: string[];
  whenToUse: ComponentDocOverviewSection;
  whenNotToUse?: ComponentDocOverviewSection;
  anatomy: { region: string; detail: string }[];
  accessibility: string[];
  keyboard?: string[];
  relatedExports?: string[];
}

export function resolveComponentOverview(
  doc: ComponentDoc,
  locale: DocsLocale,
): ComponentDocOverview | null {
  const map = locale === 'en' ? OVERVIEWS_EN : OVERVIEWS_ES;
  return map[doc.slug] ?? null;
}
