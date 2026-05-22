import { Routes } from '@angular/router';

import { DEFAULT_DOCS_LOCALE } from './core/docs-locale';
import { DocsShell } from './layout/docs-shell';

export const routes: Routes = [
  { path: '', redirectTo: DEFAULT_DOCS_LOCALE, pathMatch: 'full' },
  {
    path: ':lang',
    component: DocsShell,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/landing.page').then((m) => m.LandingPage),
        data: { layout: 'landing' },
      },
      {
        path: 'get-started',
        loadComponent: () => import('./pages/get-started.page').then((m) => m.GetStartedPage),
      },
      {
        path: 'guides/adoption',
        loadComponent: () =>
          import('./pages/guides-adoption.page').then((m) => m.GuidesAdoptionPage),
      },
      {
        path: 'guides/signal-forms',
        loadComponent: () =>
          import('./pages/guide-signal-forms.page').then((m) => m.GuideSignalFormsPage),
      },
      {
        path: 'guides/patterns',
        loadComponent: () => import('./pages/guide-patterns.page').then((m) => m.GuidePatternsPage),
      },
      {
        path: 'guides/troubleshooting',
        loadComponent: () =>
          import('./pages/guide-troubleshooting.page').then((m) => m.GuideTroubleshootingPage),
      },
      {
        path: 'guides/bundle',
        loadComponent: () => import('./pages/guide-bundle.page').then((m) => m.GuideBundlePage),
      },
      {
        path: 'themes',
        loadComponent: () => import('./pages/theming.page').then((m) => m.ThemingPage),
      },
      {
        path: 'components',
        loadComponent: () =>
          import('./pages/components-index.page').then((m) => m.ComponentsIndexPage),
      },
      {
        path: 'components/:slug',
        loadComponent: () => import('./pages/component-doc.page').then((m) => m.ComponentDocPage),
      },
    ],
  },
  {
    path: '**',
    redirectTo: DEFAULT_DOCS_LOCALE,
  },
];
