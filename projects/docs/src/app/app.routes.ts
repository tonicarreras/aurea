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
