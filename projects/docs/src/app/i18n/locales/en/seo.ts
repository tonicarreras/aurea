import type { DocsSeoMessages } from '../../types/seo';

export const SEO_EN: DocsSeoMessages = {
  siteName: 'Aurea Design System',
  defaultDescription:
    'Official docs for Aurea: accessible Angular 21 components, semantic design tokens, and signal-based forms. npm package @aurea-design-system/components.',
  breadcrumbHome: 'Home',
  breadcrumbGetStarted: 'Get started',
  breadcrumbThemes: 'Themes & tokens',
  breadcrumbComponents: 'Components',
  home: {
    title: 'Aurea — Angular 21 design system',
    description:
      'MIT npm library: semantic tokens, accessible components, signal forms, and live previews. Install and API reference.',
  },
  getStarted: {
    title: 'Get started — Install Aurea on Angular 21',
    description:
      'Requirements, npm install for @aurea-design-system/components, global tokens, and your first au-button example.',
  },
  guidesAdoption: {
    title: 'Adoption guide — Aurea Design System',
    description:
      'Guides for install, signal forms, and themes.',
  },
  guidesSignalForms: {
    title: 'Signal forms with Aurea — Angular 21',
    description:
      'Bind au-form-field and controls with FormField, form(), validators, and submit guards.',
  },
  guidesCrudDemo: {
    title: 'CRUD reference demo — Aurea',
    description:
      'Live list screen with table, pagination, filters, row menu, dialogs, and signal-form editor.',
  },
  maturity: {
    title: 'Component maturity matrix — Aurea',
    description: 'Stable, beta, and experimental levels for every catalog component.',
  },
  designTokens: {
    title: 'Design tokens for Figma — Aurea',
    description: 'JSON token files aligned with au-tokens.css for design-tool import.',
  },
  themes: {
    title: 'Themes & design tokens — Aurea Design System',
    description:
      'Semantic CSS variables, light/dark themes with auTheme, and token reference for surfaces, text, borders, and forms.',
  },
  componentsIndex: {
    title: 'Angular UI components — Aurea catalog',
    description:
      'Catalog of Aurea components with API tables, styling tokens, and live demos.',
  },
  componentTitle: (name, exportName) => `${name} (${exportName}) — Aurea docs`,
  componentDescription: (name, summary) =>
    `${name} for Angular 21: ${summary} API reference, styling tokens, and interactive examples.`,
  notFound: {
    title: 'Page not found — Aurea Design System',
    description: 'The requested component or page does not exist in the Aurea documentation.',
  },
};
