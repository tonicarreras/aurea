import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuButton } from '@aurea-ds/aurea';

import { DOCS_NAV } from '../core/docs-nav';

type ThemeMode = 'light' | 'dark' | 'system';

@Component({
  selector: 'docs-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AuButton],
  host: {
    class: 'docs-shell',
    '[attr.data-au-theme]': 'resolvedTheme()',
  },
  template: `
    <a class="docs-skip" href="#docs-main">Saltar al contenido</a>

    <header class="docs-header">
      <div class="docs-header__brand">
        <a routerLink="/" class="docs-header__logo">Aurea</a>
        <span class="docs-header__tag">Documentación</span>
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
        <au-button
          variant="outline"
          size="sm"
          type="button"
          (click)="openStorybook()"
        >
          Storybook
        </au-button>
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
                    [routerLinkActiveOptions]="{ exact: item.path === '/' }"
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

  openStorybook(): void {
    window.open('http://127.0.0.1:6006', '_blank', 'noopener,noreferrer');
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
