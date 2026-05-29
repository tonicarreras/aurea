import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';

import { applyPreviewGlobals } from '../src/lib/storybook/apply-preview-globals';

setCompodocJson(docJson);

/**
 * a11y (addon 10): use `parameters.a11y` only.
 * @see https://storybook.js.org/docs/writing-tests/accessibility-testing
 */
const preview: Preview = {
  globalTypes: {
    auTheme: {
      description: 'Apariencia base (`light` / `dark`); combinable con alto contraste.',
      defaultValue: 'light',
      toolbar: {
        title: 'Tema',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Claro', icon: 'sun' },
          { value: 'dark', title: 'Oscuro', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
    auHighContrast: {
      description:
        'Paleta experimental WCAG: claro → `high-contrast`, oscuro → `high-contrast-dark`.',
      defaultValue: 'off',
      toolbar: {
        title: 'Contraste',
        icon: 'accessibility',
        items: [
          { value: 'off', title: 'Normal' },
          { value: 'on', title: 'Alto contraste' },
        ],
        dynamicTitle: true,
      },
    },
    auDensity: {
      description: 'Escala de densidad en `document.documentElement` (`data-au-density`).',
      defaultValue: 'comfortable',
      toolbar: {
        title: 'Espacio',
        icon: 'grow',
        items: [
          { value: 'compact', title: 'Compacto' },
          { value: 'comfortable', title: 'Cómodo' },
          { value: 'spacious', title: 'Espacioso' },
        ],
        dynamicTitle: true,
      },
    },
    auColor: {
      description: 'Paleta de color para la escala action (data-au-color).',
      defaultValue: 'monochrome',
      toolbar: {
        title: 'Color',
        icon: 'paintbrush',
        items: [
          { value: 'monochrome', title: 'Monocromo', icon: 'circlehollow' },
          { value: 'blue', title: 'Azul', icon: 'circle' },
        ],
        dynamicTitle: true,
      },
    },
    docsLocale: {
      description: 'Idioma de Autodocs (overview desde la documentación)',
      defaultValue: 'en',
      toolbar: {
        title: 'Docs',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'es', title: 'Español' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    auTheme: 'light',
    auHighContrast: 'off',
    auDensity: 'comfortable',
    auColor: 'monochrome',
    docsLocale: 'en',
  },
  loaders: [
    async ({ globals }) => {
      applyPreviewGlobals(globals);
    },
  ],
  decorators: [
    (storyFn, context) => {
      applyPreviewGlobals(context.globals);
      return storyFn();
    },
  ],
  parameters: {
    /* Canvas: top-left + padding. Do not override with `centered` in stories. */
    layout: 'padded',
    docs: {
      toc: true,
      /* Static/Netlify build minifies class names — Compodoc lookup via component.name breaks. */
      extractArgTypes: () => ({}),
      extractComponentDescription: () => null,
    },
    a11y: {
      /* Fail test-runner / CI when axe finds violations (full report in logs). */
      test: 'error',
      /* Avoid re-running axe on every keystroke/arg: the a11y panel runs when you click Run. */
      manual: true,
      config: {
        rules: [],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
