import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import {
  AuButton,
  AuDivider,
  AuDrawer,
  AuFormField,
  AuSelect,
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
  imports: [AuDrawer, AuFormField, AuSelect, AuButton, AuDivider],
  template: `
    <au-drawer
      id="docs-toolbar-menu"
      position="end"
      size="sm"
      [open]="menu.open()"
      [title]="locale.messages().shell.settingsMenuAria"
      (openChange)="onOpenChange($event)"
    >
      <div class="docs-mobile-menu__content">
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
    </au-drawer>
  `,
  styleUrl: './docs-shell-mobile-menu.css',
})
export class DocsShellMobileMenu {
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

  onOpenChange(open: boolean): void {
    this.menu.open.set(open);
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
