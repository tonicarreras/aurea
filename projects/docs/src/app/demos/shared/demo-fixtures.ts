import type {
  AuAutocompleteOption,
  AuRadioOption,
  AuSelectOption,
} from '@aurea-design-system/components';

import type { DocsLocale } from '../../core/docs-locale';
import { DOCS_MESSAGES } from '../../i18n';

/** Shared option lists for overview and example demos (locale-aware). */
export function getSelectOptions(locale: DocsLocale): AuSelectOption[] {
  return DOCS_MESSAGES[locale].fixtures.select;
}

export function getAutocompleteOptions(locale: DocsLocale): AuAutocompleteOption[] {
  return DOCS_MESSAGES[locale].fixtures.autocomplete;
}

export function getRadioOptions(locale: DocsLocale): AuRadioOption[] {
  return DOCS_MESSAGES[locale].fixtures.radio;
}

/** @deprecated Use getSelectOptions(locale) */
export const selectOptions = getSelectOptions('es');

/** @deprecated Use getAutocompleteOptions(locale) */
export const autocompleteOptions = getAutocompleteOptions('es');

/** @deprecated Use getRadioOptions(locale) */
export const radioOptions = getRadioOptions('es');
