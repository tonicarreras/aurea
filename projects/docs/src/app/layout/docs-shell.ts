import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { DOCS_EXTERNAL_LINKS } from '../core/docs-external-links';
import { DOCS_NAV } from '../core/docs-nav';
import { AngularLogo } from '../shared/angular-logo';
import { GithubIcon, NpmIcon, StorybookIcon } from '../shared/brand-icons';

type ThemeMode = 'light' | 'dark' | 'system';

@Component({
  selector: 'docs-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AngularLogo,
    GithubIcon,
    NpmIcon,
    StorybookIcon,
  ],
  host: {
    class: 'docs-shell',
    '[attr.data-au-theme]': 'resolvedTheme()',
  },
  template: `
    <div class="docs-atmosphere" aria-hidden="true">
      <div class="docs-atmosphere__orb docs-atmosphere__orb--1"></div>
      <div class="docs-atmosphere__orb docs-atmosphere__orb--2"></div>
      <div class="docs-atmosphere__orb docs-atmosphere__orb--3"></div>
    </div>

    <a class="docs-skip" href="#docs-main">Saltar al contenido</a>

    <header class="docs-header">
      <div class="docs-header__brand">
        <a routerLink="/" class="docs-header__logo">
          <docs-angular-logo />
          <span class="docs-header__logo-text">
            <span class="docs-header__name">Aurea</span>
            <span class="docs-header__tag">Design system</span>
          </span>
        </a>
      </div>
      <div class="docs-header__actions">
        <label class="docs-theme-picker">
          <span class="docs-theme-picker__label">Tema</span>
          <select
            class="docs-theme-picker__select"
            [value]="theme()"
            (change)="onThemeChange($event)"
          >
            <option value="system">Sistema</option>
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
          </select>
        </label>
        <div class="docs-header__icon-links">
          <a
            class="docs-header__icon-link"
            [href]="links.github"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Repositorio en GitHub"
          >
            <docs-github-icon />
          </a>
          <a
            class="docs-header__icon-link docs-header__icon-link--npm"
            [href]="links.npm"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Paquete en npm"
          >
            <docs-npm-icon />
          </a>
          <a
            class="docs-header__icon-link docs-header__icon-link--storybook"
            [href]="links.storybook"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir Storybook"
          >
            <docs-storybook-icon />
          </a>
        </div>
      </div>
    </header>

    <div class="docs-layout">
      <nav class="docs-nav" aria-label="Documentación">
        @for (section of nav; track section.title) {
          <section class="docs-nav__section">
            <h2 class="docs-nav__heading">{{ section.title }}</h2>
            <ul class="docs-nav__list">
              @for (item of section.items; track item.path) {
                <li>
                  <a
                    class="docs-nav__link"
                    [routerLink]="item.path"
                    routerLinkActive="docs-nav__link--active"
                    [routerLinkActiveOptions]="{
                      exact: item.exact === true || item.path === '/',
                    }"
                  >
                    {{ item.label }}
                  </a>
                </li>
              }
            </ul>
          </section>
        }
      </nav>

      <main id="docs-main" class="docs-main">
        <router-outlet />
      </main>
    </div>
  `,
  styleUrl: './docs-shell.css',
})
export class DocsShell {
  readonly nav = DOCS_NAV;
  readonly links = DOCS_EXTERNAL_LINKS;
  readonly theme = signal<ThemeMode>('system');
  readonly resolvedTheme = signal<'light' | 'dark'>('light');

  constructor() {
    this.syncResolvedTheme();
    if (typeof matchMedia !== 'undefined') {
      const mq = matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', () => this.syncResolvedTheme());
    }
  }

  onThemeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as ThemeMode;
    this.theme.set(value);
    this.syncResolvedTheme();
  }

  private syncResolvedTheme(): void {
    const mode = this.theme();
    if (mode === 'light' || mode === 'dark') {
      this.resolvedTheme.set(mode);
      return;
    }
    const prefersDark =
      typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches;
    this.resolvedTheme.set(prefersDark ? 'dark' : 'light');
  }
}
