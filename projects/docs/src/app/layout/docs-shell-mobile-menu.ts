import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import {
  AuButton,
  AuDivider,
  AuFormField,
  AuIcon,
  AuSelect,
  lockPageScroll,
  unlockPageScroll,
  type AuSelectOption,
} from '@aurea-design-system/components';

import { DOCS_EXTERNAL_LINKS } from '../core/docs-external-links';
import { isDocsLocale } from '../core/docs-locale';
import { DocsLocaleService } from '../core/docs-locale.service';
import { DocsMobileMenuStore } from './docs-mobile-menu.store';
import type { DocsThemeMode } from './docs-shell-toolbar';

@Component({
  selector: 'docs-shell-mobile-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSelect, AuButton, AuIcon, AuDivider],
  template: `
    @if (menu.open()) {
      <button
        type="button"
        class="docs-mobile-menu__backdrop"
        [attr.aria-label]="locale.messages().shell.menuCloseAria"
        (click)="menu.close()"
      ></button>
      <div
        id="docs-toolbar-menu"
        class="docs-mobile-menu__panel"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="locale.messages().shell.settingsMenuAria"
      >
        <header class="docs-mobile-menu__header">
          <h2 class="docs-mobile-menu__title">{{ locale.messages().shell.settingsMenuAria }}</h2>
          <button
            auButton
            variant="ghost"
            size="sm"
            type="button"
            [attr.aria-label]="locale.messages().shell.menuCloseAria"
            (click)="menu.close()"
          >
            <au-icon
              name="close"
              size="sm"
            />
          </button>
        </header>

        <div class="docs-mobile-menu__body">
          <au-form-field
            [label]="locale.messages().shell.lang"
            class="docs-mobile-menu__field"
          >
            <au-select
              size="sm"
              [options]="localeOptions()"
              [value]="locale.locale()"
              (valueChange)="onLocaleChange($event)"
            />
          </au-form-field>

          <au-form-field
            [label]="locale.messages().shell.theme"
            class="docs-mobile-menu__field"
          >
            <au-select
              size="sm"
              [options]="themeOptions()"
              [value]="theme()"
              (valueChange)="onThemeChange($event)"
            />
          </au-form-field>

          <au-divider />

          <div class="docs-mobile-menu__links">
            <button
              auButton
              variant="outline"
              size="sm"
              type="button"
              (click)="openExternal(links.github)"
            >
              {{ locale.messages().shell.githubLabel }}
            </button>
            <button
              auButton
              variant="outline"
              size="sm"
              type="button"
              (click)="openExternal(links.npm)"
            >
              {{ locale.messages().shell.npmLabel }}
            </button>
            <button
              auButton
              variant="outline"
              size="sm"
              type="button"
              (click)="openExternal(links.storybook)"
            >
              {{ locale.messages().shell.storybookLabel }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './docs-shell-mobile-menu.css',
})
export class DocsShellMobileMenu {
  private readonly destroyRef = inject(DestroyRef);

  readonly menu = inject(DocsMobileMenuStore);
  readonly locale = inject(DocsLocaleService);
  readonly links = DOCS_EXTERNAL_LINKS;

  readonly theme = input<DocsThemeMode>('system');
  readonly themeChange = output<DocsThemeMode>();

  readonly localeOptions = computed((): AuSelectOption[] => {
    const m = this.locale.messages().shell;
    return [
      { value: 'en', label: m.langEn },
      { value: 'es', label: m.langEs },
    ];
  });

  readonly themeOptions = computed((): AuSelectOption[] => {
    const m = this.locale.messages().shell;
    return [
      { value: 'light', label: m.themeLight },
      { value: 'dark', label: m.themeDark },
      { value: 'system', label: m.themeSystem },
    ];
  });

  constructor() {
    effect((onCleanup) => {
      if (typeof document === 'undefined') {
        return;
      }
      if (this.menu.open()) {
        lockPageScroll();
        onCleanup(() => unlockPageScroll());
      }
    });

    effect((onCleanup) => {
      if (typeof document === 'undefined' || !this.menu.open()) {
        return;
      }

      const onScroll = (event: Event): void => {
        const panel = document.getElementById('docs-toolbar-menu');
        const target = event.target;
        if (panel && target instanceof Node && panel.contains(target)) {
          return;
        }
        this.menu.close();
      };

      document.addEventListener('scroll', onScroll, { capture: true, passive: true });
      onCleanup(() => document.removeEventListener('scroll', onScroll, { capture: true }));
    });

    this.destroyRef.onDestroy(() => {
      if (typeof document !== 'undefined' && this.menu.open()) {
        unlockPageScroll();
      }
    });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menu.open()) {
      this.menu.close();
    }
  }

  onLocaleChange(value: string | null): void {
    if (value && isDocsLocale(value)) {
      this.locale.switchLocale(value);
    }
  }

  onThemeChange(value: string | null): void {
    if (value === 'light' || value === 'dark' || value === 'system') {
      this.themeChange.emit(value);
    }
  }

  openExternal(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
    this.menu.close();
  }
}
