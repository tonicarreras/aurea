import { computed, inject, type Signal } from '@angular/core';

import type { ExampleLiveMessages } from '../i18n/types/example-live';
import { DocsLocaleService } from './docs-locale.service';

/** Locale-aware copy for live component doc example demos. */
export function docsExampleLive<K extends keyof ExampleLiveMessages>(
  slug: K,
): Signal<ExampleLiveMessages[K]> {
  const i18n = inject(DocsLocaleService);
  return computed(() => i18n.messages().exampleLive[slug]);
}
