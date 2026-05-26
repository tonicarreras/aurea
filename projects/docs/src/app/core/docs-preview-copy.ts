import { computed, inject, type Signal } from '@angular/core';

import type { PreviewMessages } from '../i18n/types/previews';
import { DocsLocaleService } from './docs-locale.service';

/** Locale-aware copy for landing carousel preview components. */
export function docsPreviewCopy<K extends keyof PreviewMessages>(
  slug: K,
): Signal<PreviewMessages[K]> {
  const i18n = inject(DocsLocaleService);
  return computed(() => i18n.messages().previews[slug]);
}
