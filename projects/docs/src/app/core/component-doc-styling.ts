import {
  DEFAULT_COMPONENT_STYLING,
  type ComponentDoc,
  type ComponentStylingToken,
} from './component-docs.registry';
import type { DocsLocale } from './docs-locale';
import { COMPONENT_DOC_STYLING_EN } from '../i18n/locales/en/styling';
import { COMPONENT_DOC_STYLING_ES } from '../i18n/locales/es/styling';

export function resolveComponentStyling(
  doc: ComponentDoc,
  locale: DocsLocale,
): ComponentStylingToken[] {
  if (doc.styling?.length) {
    return doc.styling;
  }
  const map = locale === 'en' ? COMPONENT_DOC_STYLING_EN : COMPONENT_DOC_STYLING_ES;
  return map[doc.slug] ?? DEFAULT_COMPONENT_STYLING;
}
