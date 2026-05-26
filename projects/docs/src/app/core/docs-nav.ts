import type { DocsLocale } from './docs-locale';
import { DOCS_ROUTES } from './docs-locale';
import { NAV_EN } from '../i18n/locales/en/nav';
import { NAV_ES } from '../i18n/locales/es/nav';
import type { DocsNavMessages } from '../i18n/types/nav';

export interface DocsNavLink {
  path: string;
  label: string;
  exact?: boolean;
}

export interface DocsNavSection {
  title: string;
  items: DocsNavLink[];
}

const NAV_BY_LOCALE: Record<DocsLocale, DocsNavMessages> = {
  en: NAV_EN,
  es: NAV_ES,
};

const COMPONENT_SLUGS = Object.keys(NAV_EN.components.labels);

function buildDocsNav(locale: DocsLocale): DocsNavSection[] {
  const n = NAV_BY_LOCALE[locale];

  return [
    {
      title: n.intro.title,
      items: [
        { path: '', label: n.intro.home, exact: true },
        { path: DOCS_ROUTES.getStarted, label: n.intro.getStarted },
        { path: DOCS_ROUTES.guidesAdoption, label: n.intro.adoption },
        { path: DOCS_ROUTES.guidesSignalForms, label: n.intro.signalForms },
        { path: DOCS_ROUTES.guidesCrudDemo, label: n.intro.crudDemo },
        { path: DOCS_ROUTES.themes, label: n.intro.themes },
      ],
    },
    {
      title: n.ecosystem.title,
      items: [
        { path: DOCS_ROUTES.maturity, label: n.ecosystem.maturity },
        { path: DOCS_ROUTES.designTokens, label: n.ecosystem.designTokens },
      ],
    },
    {
      title: n.components.title,
      items: [
        { path: DOCS_ROUTES.components, label: n.components.index, exact: true },
        ...COMPONENT_SLUGS.map((slug) => ({
          path: `${DOCS_ROUTES.components}/${slug}`,
          label: n.components.labels[slug] ?? slug,
        })),
      ],
    },
  ];
}

const DOCS_NAV_BY_LOCALE: Record<DocsLocale, DocsNavSection[]> = {
  en: buildDocsNav('en'),
  es: buildDocsNav('es'),
};

export function getDocsNav(locale: DocsLocale): DocsNavSection[] {
  return DOCS_NAV_BY_LOCALE[locale];
}
