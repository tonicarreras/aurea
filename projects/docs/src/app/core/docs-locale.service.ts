import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import { DOCS_MESSAGES } from '../i18n';
import { getDocsNav } from './docs-nav';
import { DEFAULT_DOCS_LOCALE, type DocsLocale, docsPath, isDocsLocale } from './docs-locale';

@Injectable({ providedIn: 'root' })
export class DocsLocaleService {
  private readonly router = inject(Router);

  private readonly urlPath = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      startWith(null),
      map(() => this.router.url.split('?')[0]),
    ),
    { initialValue: this.router.url.split('?')[0] },
  );

  readonly locale = computed<DocsLocale>(() => {
    const segments = this.urlPath().split('/').filter(Boolean);
    const maybeLang = segments[0];
    return maybeLang && isDocsLocale(maybeLang) ? maybeLang : DEFAULT_DOCS_LOCALE;
  });

  readonly messages = computed(() => DOCS_MESSAGES[this.locale()]);

  readonly nav = computed(() => getDocsNav(this.locale()));

  /** Router link array with locale prefix, e.g. `['/', 'en', 'components', 'button']`. */
  link(...segments: string[]): string[] {
    return docsPath(this.locale(), ...segments);
  }

  switchLocale(target: DocsLocale): void {
    const segments = this.urlPath().split('/').filter(Boolean);
    const maybeLang = segments[0];
    const rest = maybeLang && isDocsLocale(maybeLang) ? segments.slice(1) : segments;
    void this.router.navigate(docsPath(target, ...rest));
  }
}
