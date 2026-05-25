import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter, startWith } from 'rxjs';

import { SEO_EN } from '../i18n/locales/en/seo';
import { SEO_ES } from '../i18n/locales/es/seo';
import type { DocsPageSeo, DocsSeoMessages } from '../i18n/types/seo';
import { COMPONENT_DOCS_BY_SLUG, componentDocSummary } from './component-docs.registry';
import { DOCS_OG_IMAGE_URL, DOCS_SEO_BRAND, DOCS_SITE_ORIGIN } from './docs-seo.config';
import { DOCS_ROUTES, type DocsLocale, DEFAULT_DOCS_LOCALE, isDocsLocale } from './docs-locale';

const SEO_MESSAGES: Record<DocsLocale, DocsSeoMessages> = {
  en: SEO_EN,
  es: SEO_ES,
};

const JSON_LD_ID = 'docs-seo-jsonld';

@Injectable({ providedIn: 'root' })
export class DocsSeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        startWith(new NavigationEnd(0, this.router.url, this.router.url)),
      )
      .subscribe(() => this.applyForCurrentUrl());
  }

  applyForCurrentUrl(): void {
    const path = this.router.url.split('?')[0] ?? '/';
    const segments = path.split('/').filter(Boolean);
    const locale = this.parseLocale(segments);
    const rest = segments[0] && isDocsLocale(segments[0]) ? segments.slice(1) : segments;
    const seo = SEO_MESSAGES[locale];
    const canonicalPath = this.buildPath(locale, ...rest);
    const canonicalUrl = `${DOCS_SITE_ORIGIN}${canonicalPath}`;

    const page = this.resolvePageSeo(locale, rest, seo);
    this.setTitle(page.title);
    this.setDescription(page.description);
    this.setCanonical(canonicalUrl);
    this.setHreflang(locale, rest);
    this.setOpenGraph(page, canonicalUrl, locale);
    this.setTwitter(page);
    this.setJsonLd(locale, rest, page, canonicalUrl, seo);
    this.document.documentElement.lang = locale;
  }

  private parseLocale(segments: string[]): DocsLocale {
    const maybe = segments[0];
    return maybe && isDocsLocale(maybe) ? maybe : DEFAULT_DOCS_LOCALE;
  }

  private buildPath(locale: DocsLocale, ...segments: string[]): string {
    const parts = segments.filter((s) => s.length > 0);
    return parts.length ? `/${locale}/${parts.join('/')}` : `/${locale}`;
  }

  private resolvePageSeo(
    locale: DocsLocale,
    segments: string[],
    seo: DocsSeoMessages,
  ): DocsPageSeo {
    if (segments.length === 0) {
      return seo.home;
    }
    const [first, second] = segments;
    if (first === DOCS_ROUTES.getStarted) {
      return seo.getStarted;
    }
    if (first === 'guides') {
      if (second === 'adoption') return seo.guidesAdoption;
      if (second === 'signal-forms') return seo.guidesSignalForms;
      if (second === 'troubleshooting') return seo.guidesTroubleshooting;
      if (second === 'crud-demo') return seo.guidesCrudDemo;
    }
    if (first === DOCS_ROUTES.maturity) {
      return seo.maturity;
    }
    if (first === DOCS_ROUTES.designTokens) {
      return seo.designTokens;
    }
    if (first === DOCS_ROUTES.themes) {
      return seo.themes;
    }
    if (first === DOCS_ROUTES.components) {
      if (!second) {
        return seo.componentsIndex;
      }
      const doc = COMPONENT_DOCS_BY_SLUG[second];
      if (!doc) {
        return seo.notFound;
      }
      const summary = componentDocSummary(doc, locale);
      return {
        title: seo.componentTitle(doc.title, doc.exportName),
        description: seo.componentDescription(doc.title, summary),
      };
    }
    return seo.notFound;
  }

  private setTitle(value: string): void {
    this.title.setTitle(value);
    this.meta.updateTag({ property: 'og:title', content: value });
    this.meta.updateTag({ name: 'twitter:title', content: value });
  }

  private setDescription(value: string): void {
    this.meta.updateTag({ name: 'description', content: value });
    this.meta.updateTag({ property: 'og:description', content: value });
    this.meta.updateTag({ name: 'twitter:description', content: value });
  }

  private setCanonical(url: string): void {
    this.upsertLink('docs-seo-canonical', { rel: 'canonical', href: url });
  }

  private setHreflang(locale: DocsLocale, rest: string[]): void {
    for (const alt of ['en', 'es'] as const) {
      const href = `${DOCS_SITE_ORIGIN}${this.buildPath(alt, ...rest)}`;
      this.upsertLink(`docs-hreflang-${alt}`, {
        rel: 'alternate',
        hreflang: alt,
        href,
      });
    }
    const defaultHref = `${DOCS_SITE_ORIGIN}${this.buildPath(DEFAULT_DOCS_LOCALE, ...rest)}`;
    this.upsertLink('docs-hreflang-x-default', {
      rel: 'alternate',
      hreflang: 'x-default',
      href: defaultHref,
    });
    this.meta.updateTag({ property: 'og:locale', content: locale === 'es' ? 'es_ES' : 'en_US' });
    const altLocale = locale === 'es' ? 'en_US' : 'es_ES';
    this.meta.updateTag({ property: 'og:locale:alternate', content: altLocale });
  }

  private setOpenGraph(_page: DocsPageSeo, url: string, locale: DocsLocale): void {
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:site_name', content: DOCS_SEO_BRAND });
    this.meta.updateTag({ property: 'og:image', content: DOCS_OG_IMAGE_URL });
    this.meta.updateTag({ property: 'og:image:alt', content: `${DOCS_SEO_BRAND} — ${locale}` });
    this.meta.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large' });
  }

  private setTwitter(_page: DocsPageSeo): void {
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:image', content: DOCS_OG_IMAGE_URL });
  }

  private setJsonLd(
    locale: DocsLocale,
    segments: string[],
    page: DocsPageSeo,
    canonicalUrl: string,
    seo: DocsSeoMessages,
  ): void {
    const graph: Record<string, unknown>[] = [
      {
        '@type': 'WebSite',
        '@id': `${DOCS_SITE_ORIGIN}/#website`,
        url: DOCS_SITE_ORIGIN,
        name: seo.siteName,
        description: seo.defaultDescription,
        inLanguage: ['en', 'es'],
        publisher: { '@id': `${DOCS_SITE_ORIGIN}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${DOCS_SITE_ORIGIN}/#organization`,
        name: DOCS_SEO_BRAND,
        url: DOCS_SITE_ORIGIN,
        sameAs: [
          'https://github.com/tonicarreras/aurea',
          'https://www.npmjs.com/package/@aurea-design-system/components',
        ],
      },
      {
        '@type': 'SoftwareApplication',
        name: '@aurea-design-system/components',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: 'https://www.npmjs.com/package/@aurea-design-system/components',
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: page.title,
        description: page.description,
        isPartOf: { '@id': `${DOCS_SITE_ORIGIN}/#website` },
        inLanguage: locale,
      },
    ];

    const breadcrumbs = this.breadcrumbItems(locale, segments, seo);
    if (breadcrumbs.length > 1) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      });
    }

    const slug = segments[1];
    if (segments[0] === DOCS_ROUTES.components && slug && COMPONENT_DOCS_BY_SLUG[slug]) {
      graph.push({
        '@type': 'TechArticle',
        headline: page.title,
        description: page.description,
        url: canonicalUrl,
        inLanguage: locale,
        author: { '@type': 'Organization', name: DOCS_SEO_BRAND },
        publisher: { '@id': `${DOCS_SITE_ORIGIN}/#organization` },
      });
    }

    const payload = {
      '@context': 'https://schema.org',
      '@graph': graph,
    };

    let script = this.document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.id = JSON_LD_ID;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(payload);
  }

  private breadcrumbItems(
    locale: DocsLocale,
    segments: string[],
    seo: DocsSeoMessages,
  ): { name: string; url: string }[] {
    const items: { name: string; url: string }[] = [
      {
        name: seo.breadcrumbHome,
        url: `${DOCS_SITE_ORIGIN}${this.buildPath(locale)}`,
      },
    ];
    if (segments.length === 0) {
      return items;
    }
    const [first, second] = segments;
    if (first === DOCS_ROUTES.getStarted) {
      items.push({
        name: seo.breadcrumbGetStarted,
        url: `${DOCS_SITE_ORIGIN}${this.buildPath(locale, DOCS_ROUTES.getStarted)}`,
      });
      return items;
    }
    if (first === DOCS_ROUTES.themes) {
      items.push({
        name: seo.breadcrumbThemes,
        url: `${DOCS_SITE_ORIGIN}${this.buildPath(locale, DOCS_ROUTES.themes)}`,
      });
      return items;
    }
    if (first === 'guides' && second) {
      const guideSeo = this.resolvePageSeo(locale, segments, seo);
      items.push({
        name: guideSeo.title.split(' — ')[0] ?? guideSeo.title,
        url: `${DOCS_SITE_ORIGIN}${this.buildPath(locale, 'guides', second)}`,
      });
      return items;
    }
    if (first === DOCS_ROUTES.maturity) {
      items.push({
        name: seo.maturity.title.split(' — ')[0] ?? seo.maturity.title,
        url: `${DOCS_SITE_ORIGIN}${this.buildPath(locale, DOCS_ROUTES.maturity)}`,
      });
      return items;
    }
    if (first === DOCS_ROUTES.designTokens) {
      items.push({
        name: seo.designTokens.title.split(' — ')[0] ?? seo.designTokens.title,
        url: `${DOCS_SITE_ORIGIN}${this.buildPath(locale, DOCS_ROUTES.designTokens)}`,
      });
      return items;
    }
    if (first === DOCS_ROUTES.components) {
      items.push({
        name: seo.breadcrumbComponents,
        url: `${DOCS_SITE_ORIGIN}${this.buildPath(locale, DOCS_ROUTES.components)}`,
      });
      if (second) {
        const doc = COMPONENT_DOCS_BY_SLUG[second];
        if (doc) {
          items.push({
            name: doc.title,
            url: `${DOCS_SITE_ORIGIN}${this.buildPath(locale, DOCS_ROUTES.components, second)}`,
          });
        }
      }
    }
    return items;
  }

  private upsertLink(id: string, attrs: Record<string, string>): void {
    const head = this.document.head;
    let el = this.document.getElementById(id) as HTMLLinkElement | null;
    if (!el) {
      el = this.document.createElement('link');
      el.id = id;
      head.appendChild(el);
    }
    for (const [key, value] of Object.entries(attrs)) {
      el.setAttribute(key, value);
    }
  }
}
