import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { DOCS_EXTERNAL_LINKS } from '../core/docs-external-links';
import { DocsLocaleService } from '../core/docs-locale.service';
import type { DocsLocale } from '../core/docs-locale';
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
    '[attr.lang]': 'locale.locale()',
  },
  template: `
    <div class="docs-atmosphere" aria-hidden="true">
      <div class="docs-atmosphere__orb docs-atmosphere__orb--1"></div>
      <div class="docs-atmosphere__orb docs-atmosphere__orb--2"></div>
      <div class="docs-atmosphere__orb docs-atmosphere__orb--3"></div>
    </div>

    <a class="docs-skip" href="#docs-main">{{ locale.messages().shell.skipToContent }}</a>

    <header class="docs-header">
      <div class="docs-header__brand">
        <a [routerLink]="locale.link()" class="docs-header__logo">
          <docs-angular-logo />
          <span class="docs-header__logo-text">
            <span class="docs-header__name">Aurea</span>
            <span class="docs-header__tag">Design system</span>
          </span>
        </a>
      </div>
      <div class="docs-header__actions">
        <label class="docs-lang-picker">
          <span class="docs-lang-picker__label">{{ locale.messages().shell.lang }}</span>
          <select
            class="docs-lang-picker__select"
            [value]="locale.locale()"
            (change)="onLangChange($event)"
          >
            <option value="en">{{ locale.messages().shell.langEn }}</option>
            <option value="es">{{ locale.messages().shell.langEs }}</option>
          </select>
        </label>
        <button
          type="button"
          class="docs-theme-toggle"
          (click)="cycleTheme()"
          [attr.aria-label]="themeToggleAria()"
        >
          <span class="docs-theme-toggle__emoji" aria-hidden="true">{{ themeEmoji() }}</span>
        </button>
        <div class="docs-header__icon-links">
          <a
            class="docs-header__icon-link"
            [href]="links.github"
            target="_blank"
            rel="noopener noreferrer"
            [attr.aria-label]="locale.messages().shell.githubAria"
          >
            <docs-github-icon />
          </a>
          <a
            class="docs-header__icon-link docs-header__icon-link--npm"
            [href]="links.npm"
            target="_blank"
            rel="noopener noreferrer"
            [attr.aria-label]="locale.messages().shell.npmAria"
          >
            <docs-npm-icon />
          </a>
          <a
            class="docs-header__icon-link docs-header__icon-link--storybook"
            [href]="links.storybook"
            target="_blank"
            rel="noopener noreferrer"
            [attr.aria-label]="locale.messages().shell.storybookAria"
          >
            <docs-storybook-icon />
          </a>
        </div>
      </div>
    </header>

    <div class="docs-layout">
      <nav class="docs-nav" [attr.aria-label]="locale.messages().shell.navAria">
        @for (section of locale.nav(); track section.title) {
          <section class="docs-nav__section">
            <h2 class="docs-nav__heading">{{ section.title }}</h2>
            <ul class="docs-nav__list">
              @for (item of section.items; track item.path) {
                <li>
                  <a
                    class="docs-nav__link"
                    [routerLink]="locale.link(item.path)"
                    routerLinkActive="docs-nav__link--active"
                    [routerLinkActiveOptions]="{
                      exact: item.exact === true || item.path === '',
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
  readonly locale = inject(DocsLocaleService);
  readonly links = DOCS_EXTERNAL_LINKS;
  readonly theme = signal<ThemeMode>('system');
  readonly resolvedTheme = signal<'light' | 'dark'>('light');

  constructor() {
    this.syncResolvedTheme();
    effect(() => {
      const theme = this.resolvedTheme();
      if (typeof document === 'undefined') {
        return;
      }
      document.documentElement.setAttribute('data-au-theme', theme);
    });
    if (typeof matchMedia !== 'undefined') {
      const mq = matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', () => this.syncResolvedTheme());
    }
  }

  onLangChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as DocsLocale;
    this.locale.switchLocale(value);
  }

  readonly themeEmoji = computed(() => {
    const mode = this.theme();
    if (mode === 'light') {
      return '☀️';
    }
    if (mode === 'dark') {
      return '🌙';
    }
    return '🖥️';
  });

  themeToggleAria(): string {
    return this.locale.messages().shell.themeToggleAria(this.theme());
  }

  cycleTheme(): void {
    const order: ThemeMode[] = ['light', 'dark', 'system'];
    const index = order.indexOf(this.theme());
    this.theme.set(order[(index + 1) % order.length]!);
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
