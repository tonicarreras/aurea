import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { DocsLocaleService } from '../core/docs-locale.service';
import { DocsSeoService } from '../core/docs-seo.service';
import { AngularLogo } from '../shared/angular-logo';
import { DocsShellMobileMenu } from './docs-shell-mobile-menu';
import {
  DocsShellToolbar,
  type DocsThemeMode,
} from './docs-shell-toolbar';

@Component({
  selector: 'docs-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AngularLogo,
    DocsShellToolbar,
    DocsShellMobileMenu,
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
      <docs-shell-toolbar
        [theme]="theme()"
        (themeChange)="onThemeChange($event)"
      />
    </header>

    <docs-shell-mobile-menu
      [theme]="theme()"
      (themeChange)="onThemeChange($event)"
    />

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
  /** Activates per-route title, meta, canonical, hreflang, and JSON-LD. */
  private readonly _seo = inject(DocsSeoService);
  readonly theme = signal<DocsThemeMode>('system');
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

  onThemeChange(mode: DocsThemeMode): void {
    this.theme.set(mode);
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
