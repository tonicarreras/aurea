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
    title: 'Aurea Design System — Angular 21 Components & Tokens',
    description:
      'Production-ready Angular 21 UI kit with WCAG 2.2 patterns, semantic tokens, signal forms, Storybook, and npm install guides.',
  },
  getStarted: {
    title: 'Get started — Install Aurea on Angular 21',
    description:
      'Requirements, npm install for @aurea-design-system/components, global tokens, and your first au-button example.',
  },
  themes: {
    title: 'Themes & design tokens — Aurea Design System',
    description:
      'Semantic CSS variables, light/dark themes with auTheme, and token reference for surfaces, text, borders, and forms.',
  },
  componentsIndex: {
    title: 'Angular UI components — Aurea catalog',
    description:
      'Browse every Aurea component: buttons, inputs, dialogs, chips, steps, accessibility notes, API tables, and live demos.',
  },
  componentTitle: (name, exportName) => `${name} (${exportName}) — Aurea docs`,
  componentDescription: (name, summary) =>
    `${name} for Angular 21: ${summary} API reference, styling tokens, and interactive examples.`,
  notFound: {
    title: 'Page not found — Aurea Design System',
    description: 'The requested component or page does not exist in the Aurea documentation.',
  },
};
