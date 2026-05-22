import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { AuFormField, AuSelect, type AuSelectOption } from '@aurea-design-system/components';

import { DOCS_EXTERNAL_LINKS } from '../core/docs-external-links';
import { isDocsLocale } from '../core/docs-locale';
import { DocsLocaleService } from '../core/docs-locale.service';
import { GithubIcon, NpmIcon, StorybookIcon } from '../shared/brand-icons';
import { DocsMobileMenuStore } from './docs-mobile-menu.store';

export type DocsThemeMode = 'light' | 'dark' | 'system';

const MOBILE_TOOLBAR_MQ = '(max-width: 56rem)';

@Component({
  selector: 'docs-shell-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, AuFormField, AuSelect, GithubIcon, NpmIcon, StorybookIcon],
  host: {
    class: 'docs-shell-toolbar',
  },
  template: `
    @if (!compact()) {
      <div class="docs-toolbar docs-toolbar--desktop">
        <ng-container *ngTemplateOutlet="settingsFields" />
        <div class="docs-toolbar__icon-links">
          <ng-container *ngTemplateOutlet="externalIconLinks" />
        </div>
      </div>
    } @else {
      <button
        type="button"
        class="docs-toolbar__menu-trigger"
        [attr.aria-expanded]="menu.open()"
        aria-haspopup="dialog"
        aria-controls="docs-toolbar-menu"
        (click)="menu.toggle()"
      >
        {{ locale.messages().shell.menuLabel }}
      </button>
    }

    <ng-template #settingsFields>
      <au-form-field
        [label]="locale.messages().shell.lang"
        class="docs-toolbar__field"
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
        class="docs-toolbar__field"
      >
        <au-select
          size="sm"
          [options]="themeOptions()"
          [value]="theme()"
          (valueChange)="onThemeChange($event)"
        />
      </au-form-field>
    </ng-template>

    <ng-template #externalIconLinks>
      <a
        class="docs-toolbar__icon-link"
        [href]="links.github"
        target="_blank"
        rel="noopener noreferrer"
        [attr.aria-label]="locale.messages().shell.githubAria"
      >
        <docs-github-icon />
      </a>
      <a
        class="docs-toolbar__icon-link docs-toolbar__icon-link--npm"
        [href]="links.npm"
        target="_blank"
        rel="noopener noreferrer"
        [attr.aria-label]="locale.messages().shell.npmAria"
      >
        <docs-npm-icon />
      </a>
      <a
        class="docs-toolbar__icon-link docs-toolbar__icon-link--storybook"
        [href]="links.storybook"
        target="_blank"
        rel="noopener noreferrer"
        [attr.aria-label]="locale.messages().shell.storybookAria"
      >
        <docs-storybook-icon />
      </a>
    </ng-template>
  `,
  styleUrl: './docs-shell-toolbar.css',
})
export class DocsShellToolbar {
  private readonly destroyRef = inject(DestroyRef);

  readonly menu = inject(DocsMobileMenuStore);
  readonly locale = inject(DocsLocaleService);
  readonly links = DOCS_EXTERNAL_LINKS;

  readonly theme = input<DocsThemeMode>('system');
  readonly themeChange = output<DocsThemeMode>();
  readonly compact = signal(false);

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
    if (typeof matchMedia === 'undefined') {
      return;
    }
    const mq = matchMedia(MOBILE_TOOLBAR_MQ);
    const sync = (): void => {
      const next = mq.matches;
      this.compact.set(next);
      if (!next) {
        this.menu.close();
      }
    };
    sync();
    mq.addEventListener('change', sync);
    this.destroyRef.onDestroy(() => mq.removeEventListener('change', sync));
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
}
