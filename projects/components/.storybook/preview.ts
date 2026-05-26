import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';

import {
  setStoryOverviewLocale,
  type StoryOverviewLocale,
} from '../src/lib/story-docs/get-story-overview';

setCompodocJson(docJson);

function applyAuThemeFromGlobals(globals: Record<string, unknown>): void {
  const raw = globals['auTheme'];
  const theme = raw === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-au-theme', theme);
}

function applyDocsLocaleFromGlobals(globals: Record<string, unknown>): void {
  const raw = globals['docsLocale'];
  const locale: StoryOverviewLocale = raw === 'es' ? 'es' : 'en';
  setStoryOverviewLocale(locale);
}

/**
 * a11y (addon 10): use `parameters.a11y` only.
 * @see https://storybook.js.org/docs/writing-tests/accessibility-testing
 */
const preview: Preview = {
  globalTypes: {
    auTheme: {
      description: 'Tema semántico Aurea (`data-au-theme` en el documento)',
      defaultValue: 'light',
      toolbar: {
        title: 'Tema',
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Claro', icon: 'sun' },
          { value: 'dark', title: 'Oscuro', icon: 'moon' },
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
    docsLocale: 'en',
  },
  decorators: [
    (storyFn, context) => {
      const globals = context.globals as Record<string, unknown>;
      applyAuThemeFromGlobals(globals);
      applyDocsLocaleFromGlobals(globals);
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
