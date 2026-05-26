import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { AuButton } from '@aurea-design-system/components';

import { DocsLocaleService } from '../core/docs-locale.service';
import { type CodeLanguage, highlightCode } from './code-highlight';

@Component({
  selector: 'docs-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `
    <section
      class="docs-code-panel"
      [class.docs-code-panel--open]="expanded()"
    >
      <div class="docs-code-panel__bar">
        <div class="docs-code-panel__bar-start">
          <au-button
            variant="ghost"
            size="sm"
            type="button"
            class="docs-code-panel__toggle"
            [attr.aria-expanded]="expanded()"
            (click)="toggle()"
          >
            <span
              class="docs-code-panel__chevron"
              aria-hidden="true"
            ></span>
            <span>{{ expanded() ? collapseLabelText() : expandLabelText() }}</span>
            @if (showLanguage() && language() !== 'text') {
              <span class="docs-code-panel__lang">{{ languageLabel() }}</span>
            }
          </au-button>
        </div>

        @if (expanded()) {
          <au-button
            variant="outline"
            size="sm"
            type="button"
            class="docs-code-panel__copy"
            [class.docs-code-panel__copy--done]="copied()"
            (click)="copy($event)"
            [attr.aria-label]="copied() ? copyDoneAriaLabel() : copyAriaLabel()"
          >
            {{ copied() ? copyDoneButtonLabel() : copyButtonLabel() }}
          </au-button>
        }
      </div>

      <div
        class="docs-code-panel__body"
        [class.docs-code-panel__body--open]="expanded()"
        [attr.aria-hidden]="!expanded()"
      >
        <pre
          class="docs-code language-{{ prismLanguage() }}"
          tabindex="0"
          [attr.aria-label]="snippetAriaLabel()"
        ><code [innerHTML]="highlightedHtml()"></code></pre>
      </div>
    </section>
  `,
  styles: `
    .docs-code-panel {
      border: 1px solid var(--docs-border-fine);
      border-radius: var(--au-radius-lg);
      background: var(--au-color-surface-raised);
      overflow: hidden;
      transition: border-color var(--au-duration-short) var(--au-ease-in-out);
    }

    :host-context([data-au-theme='dark']) .docs-code-panel {
      background: var(--au-color-surface-raised);
    }

    .docs-code-panel--open {
      border-color: color-mix(in srgb, var(--au-color-accent) 28%, transparent);
    }

    :host-context([data-au-theme='dark']) .docs-code-panel--open {
      border-color: color-mix(in srgb, var(--au-color-border-subtle) 55%, transparent);
    }

    .docs-code-panel__bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--au-space-3);
      padding: var(--au-space-2) var(--au-space-3);
      background: color-mix(in srgb, var(--au-color-surface-subtle) 70%, transparent);
      border-bottom: 1px solid transparent;
      transition: border-color var(--au-duration-short) var(--au-ease-in-out);
    }

    :host-context([data-au-theme='dark']) .docs-code-panel__copy {
      border-color: color-mix(in srgb, var(--au-color-border-subtle) 45%, transparent);
    }

    .docs-code-panel--open .docs-code-panel__bar {
      border-bottom-color: var(--docs-border-fine);
    }

    .docs-code-panel__toggle ::ng-deep .au-button__content {
      display: inline-flex;
      align-items: center;
      gap: var(--au-space-2);
      font-size: var(--au-text-sm);
      font-weight: var(--au-weight-medium);
    }

    .docs-code-panel__chevron {
      width: 0.5rem;
      height: 0.5rem;
      border-right: 2px solid currentColor;
      border-bottom: 2px solid currentColor;
      transform: rotate(-45deg);
      transition: transform var(--au-duration-default) var(--au-ease-emph);
    }

    .docs-code-panel--open .docs-code-panel__chevron {
      transform: rotate(45deg);
    }

    .docs-code-panel__lang {
      padding: 0.1rem 0.45rem;
      border-radius: var(--au-radius-pill);
      background: var(--au-color-accent-subtle);
      color: var(--au-color-accent);
      font-size: var(--au-text-2xs);
      font-weight: var(--au-weight-semibold);
      letter-spacing: var(--au-tracking-caps);
      text-transform: uppercase;
    }

    .docs-code-panel__copy {
      animation: docs-fade-in 0.2s var(--au-ease-out) both;
    }

    .docs-code-panel__copy--done ::ng-deep .au-button__element {
      border-color: color-mix(in srgb, var(--au-color-semantic-success) 50%, transparent);
      color: var(--au-color-semantic-success);
    }

    .docs-code-panel__body {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--au-duration-slow) var(--au-ease-emph);
    }

    .docs-code-panel__body--open {
      grid-template-rows: 1fr;
    }

    .docs-code-panel__body > pre {
      overflow: hidden;
      min-height: 0;
    }

    .docs-code {
      margin: 0;
      padding: var(--au-space-4) var(--au-space-5);
      overflow: auto;
      background: var(--docs-code-bg);
      color: var(--docs-code-fg);
      line-height: 1.65;
      font-size: 0.8125rem;
      tab-size: 2;
      white-space: pre;
      word-break: normal;
    }

    .docs-code code {
      font-family: var(--au-font-mono);
      font-size: inherit;
    }
  `,
})
export class CodeBlock {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly i18n = inject(DocsLocaleService);

  readonly code = input.required<string>();
  readonly language = input<CodeLanguage>('typescript');
  readonly expandLabel = input<string | undefined>(undefined);
  readonly collapseLabel = input<string | undefined>(undefined);
  readonly showLanguage = input(true);

  readonly expanded = signal(true);
  readonly copied = signal(false);

  readonly prismLanguage = computed(() =>
    this.language() === 'html' ? 'markup' : this.language(),
  );

  readonly languageLabel = computed(() => {
    const lang = this.i18n.messages().codeBlock.lang;
    const labels: Record<CodeLanguage, string> = {
      typescript: lang.typescript,
      css: lang.css,
      bash: lang.bash,
      html: lang.html,
      text: lang.text,
    };
    return labels[this.language()];
  });

  readonly highlightedHtml = computed(() => {
    if (!this.expanded()) {
      return this.sanitizer.bypassSecurityTrustHtml('');
    }
    const html = highlightCode(this.code(), this.language());
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });

  private readonly labels = computed(() => this.i18n.messages().codeBlock);

  readonly expandLabelText = computed(() => this.expandLabel() ?? this.labels().show);

  readonly collapseLabelText = computed(() => this.collapseLabel() ?? this.labels().hide);

  readonly copyButtonLabel = computed(() => this.labels().copy);

  readonly copyDoneButtonLabel = computed(() => `${this.labels().copied} ✓`);

  readonly copyAriaLabel = computed(() => this.labels().copyAria);

  readonly copyDoneAriaLabel = computed(() => this.labels().copiedAria);

  readonly snippetAriaLabel = computed(() => this.labels().snippetAria(this.languageLabel()));

  toggle(): void {
    this.expanded.update((open) => !open);
  }

  async copy(event: Event): Promise<void> {
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      window.setTimeout(() => this.copied.set(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }
}
