import type {
  ComponentDoc,
  ComponentDocApiSection,
  ResolvedComponentApi,
} from './component-docs.registry';
import type { DocsLocale } from './docs-locale';
import { COMPONENT_DOC_API_EN } from '../i18n/locales/en/api';
import { COMPONENT_DOC_API_ES } from '../i18n/locales/es/api';

export type { ResolvedComponentApi } from './component-docs.registry';

const API_FALLBACK_CACHE = new Map<string, ResolvedComponentApi>();

export function resolveComponentApi(doc: ComponentDoc, locale: DocsLocale): ResolvedComponentApi {
  const map = locale === 'en' ? COMPONENT_DOC_API_EN : COMPONENT_DOC_API_ES;
  const resolved = map[doc.slug];
  if (resolved) {
    return resolved;
  }

  const cacheKey = `${locale}:${doc.slug}`;
  let cached = API_FALLBACK_CACHE.get(cacheKey);
  if (!cached) {
    const sections: ComponentDocApiSection[] = doc.api?.length
      ? [{ title: doc.exportName, rows: doc.api }]
      : [];
    cached = {
      importNames: [doc.exportName],
      sections,
    };
    API_FALLBACK_CACHE.set(cacheKey, cached);
  }
  return cached;
}

export function importSnippetFor(doc: ComponentDoc, locale: DocsLocale): string {
  const { importNames } = resolveComponentApi(doc, locale);
  const names = importNames.join(', ');
  return `import { ${names} } from '@aurea-design-system/components';`;
}
