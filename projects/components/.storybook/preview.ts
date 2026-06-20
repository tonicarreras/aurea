import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';

import {
  setStoryOverviewLocale,
  type StoryOverviewLocale,
} from '../src/lib/story-docs/get-story-overview';

setCompodocJson(docJson);

type AuAppearanceTheme = 'light' | 'dark';
type AuResolvedTheme = AuAppearanceTheme | 'high-contrast' | 'high-contrast-dark';

function resolveAuPreviewTheme(
  appearance: AuAppearanceTheme,
  highContrast: boolean,
): AuResolvedTheme {
  if (!highContrast) {
    return appearance;
  }
  return appearance === 'dark' ? 'high-contrast-dark' : 'high-contrast';
}

function applyAuThemeFromGlobals(globals: Record<string, unknown>): void {
  const appearance: AuAppearanceTheme = globals['auTheme'] === 'dark' ? 'dark' : 'light';
  const highContrast = globals['auHighContrast'] === 'on';
  document.documentElement.setAttribute(
    'data-au-theme',
    resolveAuPreviewTheme(appearance, highContrast),
  );
}

function applyAuDensityFromGlobals(globals: Record<string, unknown>): void {
  const raw = globals['auDensity'];
  const density: 'compact' | 'comfortable' | 'spacious' =
    raw === 'compact' ? 'compact' : raw === 'spacious' ? 'spacious' : 'comfortable';
  document.documentElement.setAttribute('data-au-density', density);
}

function applyDocsLocaleFromGlobals(globals: Record<string, unknown>): void {
  const raw = globals['docsLocale'];
  const locale: StoryOverviewLocale = raw === 'es' ? 'es' : 'en';
  setStoryOverviewLocale(locale);
}

/**
 * a11y (addon 10): use `parameters.a11y` only.
 * Zoneless: `experimentalZoneless: true` in angular.json — Storybook adds
 * `provideZonelessChangeDetection()` at bootstrap (no zone.js).
 * @see https://storybook.js.org/docs/get-started/frameworks/angular
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
    auDensity: {
      description: 'Densidad visual (`data-au-density` en el documento)',
      defaultValue: 'comfortable',
      toolbar: {
        title: 'Densidad',
        icon: 'grow',
        items: [
          { value: 'compact', title: 'Compacta', icon: 'circlehollow' },
          { value: 'comfortable', title: 'Cómoda', icon: 'circle' },
          { value: 'spacious', title: 'Espaciosa', icon: 'grid' },
        ],
        dynamicTitle: true,
      },
    },
    auHighContrast: {
      description:
        'WCAG AAA (`high-contrast` / `high-contrast-dark` según apariencia clara u oscura)',
      defaultValue: 'off',
      toolbar: {
        title: 'Alto contraste',
        icon: 'accessibility',
        items: [
          { value: 'off', title: 'Normal', icon: 'circlehollow' },
          { value: 'on', title: 'WCAG AAA', icon: 'accessibility' },
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
    auDensity: 'comfortable',
    auHighContrast: 'off',
    docsLocale: 'en',
  },
  decorators: [
    (storyFn, context) => {
      const globals = context.globals as Record<string, unknown>;
      applyAuThemeFromGlobals(globals);
      applyAuDensityFromGlobals(globals);
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
