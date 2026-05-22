#!/usr/bin/env node
/**
 * Generates projects/docs/public/sitemap.xml from the component registry and static routes.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const registryPath = join(root, 'projects/docs/src/app/core/component-docs.registry.ts');
const outPath = join(root, 'projects/docs/public/sitemap.xml');

const SITE = 'https://aurea-ds.netlify.app';
const LOCALES = ['en', 'es'];
const STATIC_SEGMENTS = ['', 'get-started', 'themes', 'components'];

const registry = readFileSync(registryPath, 'utf8');
const slugs = [...registry.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);

const today = new Date().toISOString().slice(0, 10);

function loc(locale, ...segments) {
  const parts = segments.filter(Boolean);
  return parts.length ? `${SITE}/${locale}/${parts.join('/')}` : `${SITE}/${locale}`;
}

const urls = [];

for (const locale of LOCALES) {
  for (const segment of STATIC_SEGMENTS) {
    urls.push({
      loc: loc(locale, segment),
      priority: segment === '' ? '1.0' : segment === 'components' ? '0.9' : '0.8',
    });
  }
  for (const slug of slugs) {
    urls.push({
      loc: loc(locale, 'components', slug),
      priority: '0.7',
    });
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map((entry) => {
    const [, locale, ...rest] = entry.loc.replace(SITE + '/', '').split('/');
    const altLinks = LOCALES.map(
      (alt) => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${loc(alt, ...rest)}"/>`,
    ).join('\n');
    const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc('es', ...rest)}"/>`;
    return `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${entry.priority}</priority>
${altLinks}
${xDefault}
  </url>`;
  })
  .join('\n')}
</urlset>
`;

writeFileSync(outPath, xml, 'utf8');
console.log(`Wrote ${urls.length} URLs to ${outPath}`);
