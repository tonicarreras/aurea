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
  { slug: 'badge', label: 'Badge' },
  { slug: 'breadcrumb', label: 'Breadcrumb' },
  { slug: 'button', label: 'Button' },
  { slug: 'form-field', label: 'Form field' },
  { slug: 'input-text', label: 'Input text' },
  { slug: 'textarea', label: 'Textarea' },
  { slug: 'checkbox', label: 'Checkbox' },
  { slug: 'switch', label: 'Switch' },
  { slug: 'table', label: 'Table' },
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
  { slug: 'link', label: 'Link' },
  { slug: 'list', label: 'List' },
  { slug: 'menu', label: 'Menu' },
  { slug: 'pagination', label: 'Pagination' },
  { slug: 'popover', label: 'Popover' },
  { slug: 'progress', label: 'Progress' },
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
            { path: '', label: 'Design overview', exact: true },
            { path: DOCS_ROUTES.getStarted, label: 'Get started' },
            { path: DOCS_ROUTES.guidesAdoption, label: 'Adoption guide' },
            { path: DOCS_ROUTES.guidesSignalForms, label: 'Signal forms' },
            { path: DOCS_ROUTES.guidesPatterns, label: 'UI patterns' },
            { path: DOCS_ROUTES.guidesTroubleshooting, label: 'Troubleshooting' },
            { path: DOCS_ROUTES.guidesBundle, label: 'Bundle size' },
            { path: DOCS_ROUTES.guidesMigrateMaterial, label: 'Migrate from Material' },
            { path: DOCS_ROUTES.guidesMigrateCdk, label: 'Migrate from CDK' },
            { path: DOCS_ROUTES.guidesCrudDemo, label: 'CRUD demo' },
            { path: DOCS_ROUTES.themes, label: 'Themes & tokens' },
          ],
        }
      : {
          title: 'Introducción',
          items: [
            { path: '', label: 'Visión de diseño', exact: true },
            { path: DOCS_ROUTES.getStarted, label: 'Empezar' },
            { path: DOCS_ROUTES.guidesAdoption, label: 'Guía de adopción' },
            { path: DOCS_ROUTES.guidesSignalForms, label: 'Signal forms' },
            { path: DOCS_ROUTES.guidesPatterns, label: 'Patrones de UI' },
            { path: DOCS_ROUTES.guidesTroubleshooting, label: 'Problemas frecuentes' },
            { path: DOCS_ROUTES.guidesBundle, label: 'Tamaño del bundle' },
            { path: DOCS_ROUTES.guidesMigrateMaterial, label: 'Migrar desde Material' },
            { path: DOCS_ROUTES.guidesMigrateCdk, label: 'Migrar desde CDK' },
            { path: DOCS_ROUTES.guidesCrudDemo, label: 'Demo CRUD' },
            { path: DOCS_ROUTES.themes, label: 'Temas y tokens' },
          ],
        };

  const ecosystem =
    locale === 'en'
      ? {
          title: 'Ecosystem',
          items: [
            { path: DOCS_ROUTES.roadmap, label: 'Roadmap' },
            { path: DOCS_ROUTES.maturity, label: 'Maturity matrix' },
            { path: DOCS_ROUTES.designTokens, label: 'Figma tokens' },
          ],
        }
      : {
          title: 'Ecosistema',
          items: [
            { path: DOCS_ROUTES.roadmap, label: 'Roadmap' },
            { path: DOCS_ROUTES.maturity, label: 'Matriz de madurez' },
            { path: DOCS_ROUTES.designTokens, label: 'Tokens Figma' },
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

  return [intro, ecosystem, components];
}

const DOCS_NAV_BY_LOCALE: Record<DocsLocale, DocsNavSection[]> = {
  en: buildDocsNav('en'),
  es: buildDocsNav('es'),
};

export function getDocsNav(locale: DocsLocale): DocsNavSection[] {
  return DOCS_NAV_BY_LOCALE[locale];
}
