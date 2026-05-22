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
    title: 'Aurea — Angular 21 design system focused on the task',
    description:
      'Open MIT UI system: less visual noise, accessible components, semantic tokens, and live previews. Documentation for install and implementation.',
  },
  getStarted: {
    title: 'Get started — Install Aurea on Angular 21',
    description:
      'Requirements, npm install for @aurea-design-system/components, global tokens, and your first au-button example.',
  },
  guidesAdoption: {
    title: 'Adoption guide — Aurea Design System',
    description:
      'Roadmap from install to signal forms, UI patterns, troubleshooting, bundle size, and themes.',
  },
  guidesSignalForms: {
    title: 'Signal forms with Aurea — Angular 21',
    description:
      'Bind au-form-field and controls with FormField, form(), validators, and submit guards.',
  },
  guidesPatterns: {
    title: 'UI patterns — Aurea Design System',
    description:
      'Validated forms, destructive confirm dialogs, and snackbar feedback composed from Aurea primitives.',
  },
  guidesTroubleshooting: {
    title: 'Troubleshooting Aurea — common fixes',
    description:
      'Unstyled components, missing listbox CSS, validation messages, theme attributes, and bundle imports.',
  },
  guidesBundle: {
    title: 'Bundle size & tree-shaking — Aurea',
    description:
      'Per-symbol imports, global CSS footprint, production stats-json, and lazy routes.',
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
