import type { DocsLocale } from './docs-locale';
import { DOCS_ROUTES } from './docs-locale';

export interface DocsNavLink {
  /** Route segment(s) without locale prefix; empty string = home. */
  path: string;
  label: string;
  /** When true, active only on exact URL (e.g. index vs. /components/:slug). */
  exact?: boolean;
}

export interface DocsNavSection {
  title: string;
  items: DocsNavLink[];
}

const COMPONENT_SLUGS: { slug: string; label: string }[] = [
  { slug: 'button', label: 'Button' },
  { slug: 'form-field', label: 'Form field' },
  { slug: 'input-text', label: 'Input text' },
  { slug: 'textarea', label: 'Textarea' },
  { slug: 'checkbox', label: 'Checkbox' },
  { slug: 'switch', label: 'Switch' },
  { slug: 'select', label: 'Select' },
  { slug: 'autocomplete', label: 'Autocomplete' },
  { slug: 'radio-group', label: 'Radio group' },
  { slug: 'input-number', label: 'Input number' },
  { slug: 'input-date', label: 'Input date' },
  { slug: 'dialog', label: 'Dialog' },
  { slug: 'card', label: 'Card' },
  { slug: 'tabs', label: 'Tabs' },
  { slug: 'chip', label: 'Chip' },
  { slug: 'chip-group', label: 'Chip group' },
  { slug: 'list', label: 'List' },
  { slug: 'snackbar', label: 'Snackbar' },
  { slug: 'message', label: 'Message' },
  { slug: 'icon', label: 'Icon' },
  { slug: 'skeleton', label: 'Skeleton' },
  { slug: 'steps', label: 'Steps' },
  { slug: 'divider', label: 'Divider' },
  { slug: 'tooltip', label: 'Tooltip' },
];

function buildDocsNav(locale: DocsLocale): DocsNavSection[] {
  const intro =
    locale === 'en'
      ? {
          title: 'Introduction',
          items: [
            { path: '', label: 'Home', exact: true },
            { path: DOCS_ROUTES.getStarted, label: 'Get started' },
            { path: DOCS_ROUTES.themes, label: 'Themes & tokens' },
          ],
        }
      : {
          title: 'Introducción',
          items: [
            { path: '', label: 'Inicio', exact: true },
            { path: DOCS_ROUTES.getStarted, label: 'Empezar' },
            { path: DOCS_ROUTES.themes, label: 'Temas y tokens' },
          ],
        };

  const components =
    locale === 'en'
      ? {
          title: 'Components',
          items: [
            { path: DOCS_ROUTES.components, label: 'Index', exact: true },
            ...COMPONENT_SLUGS.map(({ slug, label }) => ({
              path: `${DOCS_ROUTES.components}/${slug}`,
              label,
            })),
          ],
        }
      : {
          title: 'Componentes',
          items: [
            { path: DOCS_ROUTES.components, label: 'Índice', exact: true },
            ...COMPONENT_SLUGS.map(({ slug, label }) => ({
              path: `${DOCS_ROUTES.components}/${slug}`,
              label,
            })),
          ],
        };

  return [intro, components];
}

const DOCS_NAV_BY_LOCALE: Record<DocsLocale, DocsNavSection[]> = {
  en: buildDocsNav('en'),
  es: buildDocsNav('es'),
};

export function getDocsNav(locale: DocsLocale): DocsNavSection[] {
  return DOCS_NAV_BY_LOCALE[locale];
}
