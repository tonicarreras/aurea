import type { ComponentDoc } from './component-docs.registry';
import type { DocsLocale } from './docs-locale';
import { DOCS_MESSAGES } from '../i18n';
import { COMPONENT_DOC_EXAMPLES_EN } from '../i18n/locales/en/examples/index';
import { COMPONENT_DOC_EXAMPLES_ES } from '../i18n/locales/es/examples/index';
import type { ComponentDocExample } from '../i18n/types/example';

export type { ComponentDocExample } from '../i18n/types/example';

const EXAMPLE_FALLBACK_CACHE = new Map<string, ComponentDocExample[]>();

export function resolveComponentExamples(
  doc: ComponentDoc,
  locale: DocsLocale,
): ComponentDocExample[] {
  const map = locale === 'en' ? COMPONENT_DOC_EXAMPLES_EN : COMPONENT_DOC_EXAMPLES_ES;
  const examples = map[doc.slug];
  if (examples?.length) {
    return examples;
  }

  const cacheKey = `${locale}:${doc.slug}`;
  let cached = EXAMPLE_FALLBACK_CACHE.get(cacheKey);
  if (!cached) {
    const fallbackTitle = DOCS_MESSAGES[locale].componentDoc.exampleFallbackTitle;
    cached = [
      {
        title: fallbackTitle,
        demoComponent: doc.demoComponent,
        code: doc.snippet,
        language: 'typescript',
      },
    ];
    EXAMPLE_FALLBACK_CACHE.set(cacheKey, cached);
  }
  return cached;
}
