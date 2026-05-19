import { Routes } from '@angular/router';

import { DocsShell } from './layout/docs-shell';

export const routes: Routes = [
  {
    path: '',
    component: DocsShell,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home.page').then((m) => m.HomePage),
      },
      {
        path: 'empezar',
        loadComponent: () => import('./pages/get-started.page').then((m) => m.GetStartedPage),
      },
      {
        path: 'temas',
        loadComponent: () => import('./pages/theming.page').then((m) => m.ThemingPage),
      },
      {
        path: 'componentes',
        loadComponent: () =>
          import('./pages/components-index.page').then((m) => m.ComponentsIndexPage),
      },
      {
        path: 'componentes/:slug',
        loadComponent: () => import('./pages/component-doc.page').then((m) => m.ComponentDocPage),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
