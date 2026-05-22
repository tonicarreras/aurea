import { DOCS_EXTERNAL_LINKS } from './docs-external-links';

/** Canonical origin for docs (Netlify production). */
export const DOCS_SITE_ORIGIN = DOCS_EXTERNAL_LINKS.docs.replace(/\/$/, '');

export const DOCS_SEO_BRAND = 'Aurea Design System';

export const DOCS_OG_IMAGE_PATH = '/og.svg';

export const DOCS_OG_IMAGE_URL = `${DOCS_SITE_ORIGIN}${DOCS_OG_IMAGE_PATH}`;
