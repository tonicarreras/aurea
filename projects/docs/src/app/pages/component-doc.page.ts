import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  model,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  AuStep,
  AuStepPanel,
  AuSteps,
} from '@aurea-design-system/components';
import { map } from 'rxjs';

import {
  COMPONENT_DOCS_BY_SLUG,
  type ComponentDoc,
  type ComponentDocStepId,
} from '../core/component-docs.registry';
import { importSnippetFor, resolveComponentApi } from '../core/component-doc-api';
import { resolveComponentExamples } from '../core/component-doc-examples';
import { resolveComponentOverview } from '../core/component-doc-overview';
import { resolveComponentStyling } from '../core/component-doc-styling';
import { CodeBlock } from '../shared/code-block';
import { ComponentDocApiTable } from '../shared/component-doc-api-table';
import { DemoPanel } from '../shared/demo-panel';
import { DocPage } from '../shared/doc-page';
import { DocsComponentExample } from '../shared/docs-component-example';
import { DocsComponentOverview } from '../shared/docs-component-overview';
import { DocsInlineText } from '../shared/docs-inline-text';
import { DocsTokenList } from '../shared/docs-token-list';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DocPage,
    DemoPanel,
    CodeBlock,
    NgComponentOutlet,
    RouterLink,
    AuSteps,
    AuStep,
    AuStepPanel,
    ComponentDocApiTable,
    DocsComponentExample,
    DocsComponentOverview,
    DocsInlineText,
    DocsTokenList,
  ],
  template: `
    @if (doc(); as meta) {
      <docs-page [title]="meta.title" [lead]="meta.summary">
        <au-steps
          class="docs-component-steps"
          layout="tabs"
          [value]="section()"
          (valueChange)="onSectionChange($event)"
          [ariaLabel]="'Secciones de ' + meta.title"
          size="md"
        >
          <button type="button" auStep="overview">Overview</button>
          <button type="button" auStep="api">API</button>
          <button type="button" auStep="styling">Styling</button>
          <button type="button" auStep="examples">Examples</button>

          <div auStepPanel="overview" class="docs-component-step">
            <h2 class="docs-component-step__title">Overview</h2>

            <ul class="docs-meta" aria-label="Metadatos del componente">
              <li class="docs-meta__item">
                <span class="docs-meta__label">Export</span>
                <code>{{ meta.exportName }}</code>
              </li>
              <li class="docs-meta__item">
                <span class="docs-meta__label">Selector</span>
                <code>{{ meta.selector }}</code>
              </li>
            </ul>

            <div class="docs-overview-block">
              @if (overview(meta); as ov) {
                <docs-component-overview [overview]="ov" />
              } @else {
                <p class="docs-component-step__lead">{{ meta.summary }}</p>
              }
            </div>

            <docs-demo-panel class="docs-overview-demo">
              <ng-container *ngComponentOutlet="meta.demoComponent" />
            </docs-demo-panel>
          </div>

          <div auStepPanel="api" class="docs-component-step">
            <h2 class="docs-component-step__title">API</h2>
            <p class="docs-component-step__lead">
              API de <code>{{ meta.exportName }}</code>. Los inputs usan signals de Angular
              (<docs-inline-text [text]="signalApiHint" />).
            </p>

            <docs-code-block
              [code]="importSnippet(meta)"
              language="typescript"
              [showLanguage]="false"
              expandLabel="Import"
              collapseLabel="Ocultar import"
            />

            @for (section of apiSections(meta); track section.title) {
              <section class="docs-api-section">
                <h3 class="docs-api-section__title">{{ section.title }}</h3>
                @if (section.description) {
                  <p class="docs-api-section__lead">
                    <docs-inline-text [text]="section.description" />
                  </p>
                }
                <docs-component-api-table [rows]="section.rows" />
              </section>
            } @empty {
              <p class="docs-component-step__note">
                Consulta la pestaña <strong>Autodocs</strong> en Storybook para la referencia
                completa de este componente.
              </p>
            }
          </div>

          <div auStepPanel="styling" class="docs-component-step">
            <h2 class="docs-component-step__title">
              Styling
            </h2>
            <p class="docs-component-step__lead">
              Tokens que <strong>{{ meta.title }}</strong> consume en su CSS (específicos de este
              componente). La paleta global, formularios compartidos y capas del tema están en
              <a routerLink="/temas">Temas y tokens</a>.
            </p>

            <docs-token-list [tokens]="stylingTokens(meta)" />
          </div>

          <div auStepPanel="examples" class="docs-component-step">
            <h2 class="docs-component-step__title">
              Examples
            </h2>
            <p class="docs-component-step__lead">
              Variantes con vista previa en vivo y fragmento de código listo para copiar.
            </p>

            <div class="docs-examples">
              @for (example of examples(meta); track example.title) {
                <docs-component-example
                  [title]="example.title"
                  [description]="example.description"
                  [demoComponent]="example.demoComponent"
                  [code]="example.code"
                  [language]="example.language ?? 'html'"
                />
              }
            </div>
          </div>
        </au-steps>
      </docs-page>
    } @else {
      <docs-page title="No encontrado" lead="No hay documentación para este componente.">
        <p><a routerLink="/componentes">Volver al índice</a></p>
      </docs-page>
    }
  `,
  styles: [
    `
      .docs-component-steps {
        position: sticky;
        top: calc(var(--docs-header-height) + var(--au-space-3));
        z-index: calc(var(--au-z-sticky) - 2);
        margin: 0 0 var(--au-space-4);
        padding-block: var(--au-space-2);
      }

      :host-context([data-au-theme='dark']) .docs-component-steps {
        background: var(--au-color-surface-canvas);
      }

      .docs-component-step:not([hidden]) {
        display: flex;
        flex-direction: column;
        gap: var(--au-space-6);
      }

      .docs-overview-block {
        margin-top: var(--au-space-2);
      }

      .docs-overview-demo {
        margin-top: var(--au-space-2);
      }

      .docs-component-step__title {
        margin: 0;
        font-size: var(--au-text-lg);
        font-weight: var(--au-weight-semibold);
        letter-spacing: var(--au-tracking-tight);
      }

      .docs-component-step__lead {
        margin: 0;
        max-width: min(62rem, 100%);
        color: var(--au-color-text-secondary);
        line-height: var(--au-leading-relaxed);
      }

      .docs-component-step__note {
        margin: 0;
        color: var(--au-color-text-secondary);
      }

      .docs-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--au-space-2);
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .docs-meta__item {
        --docs-meta-height: 2rem;
        display: flex;
        align-items: center;
        align-self: center;
        gap: var(--au-space-2-5);
        box-sizing: border-box;
        height: var(--docs-meta-height);
        margin: 0;
        padding: 0 var(--au-space-3);
        border: 1px solid var(--docs-border-fine);
        border-radius: var(--au-radius-pill);
        background: color-mix(in srgb, var(--au-color-surface-raised) 90%, transparent);
        font-size: var(--au-text-xs);
        line-height: 1;
        white-space: nowrap;
        flex-shrink: 0;
      }

      :host-context([data-au-theme='dark']) .docs-meta__item {
        border-color: var(--docs-border-fine);
        background: var(--au-color-surface-elevated);
      }

      .docs-meta__label {
        flex-shrink: 0;
        margin: 0;
        padding: 0;
        color: var(--au-color-text-tertiary);
        font-family: var(--au-font-sans);
        font-size: inherit;
        font-weight: var(--au-weight-semibold);
        line-height: 1;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      .docs-meta__item code {
        margin: 0;
        padding: 0;
        border: none;
        background: none;
        font-family: var(--au-font-mono);
        font-size: 1em;
        font-weight: var(--au-weight-medium);
        line-height: 1;
        color: var(--au-color-accent);
      }

      .docs-api-section {
        display: flex;
        flex-direction: column;
        gap: var(--au-space-3);
      }

      .docs-api-section__title {
        margin: 0;
        font-size: var(--au-text-base);
        font-weight: var(--au-weight-semibold);
      }

      .docs-api-section__lead {
        margin: 0;
        max-width: min(62rem, 100%);
        color: var(--au-color-text-secondary);
        font-size: var(--au-text-sm);
        line-height: var(--au-leading-relaxed);
      }

      .docs-examples {
        display: flex;
        flex-direction: column;
        gap: var(--au-space-10);
        max-width: 100%;
      }

      @media (max-width: 40rem) {
        .docs-component-steps {
          position: static;
          margin-bottom: var(--au-space-4);
        }
      }
    `,
  ],
})
export class ComponentDocPage {
  private readonly route = inject(ActivatedRoute);

  readonly section = model<ComponentDocStepId>('overview');

  /** Fragmento con backticks para {@link DocsInlineText} en la pestaña API. */
  readonly signalApiHint = '`input()`, `model()`, `output()`';

  constructor() {
    effect(() => {
      this.slug();
      this.section.set('overview');
    });
  }

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: '' },
  );

  readonly doc = computed(() => COMPONENT_DOCS_BY_SLUG[this.slug()] ?? null);

  overview(meta: ComponentDoc) {
    return resolveComponentOverview(meta);
  }

  apiSections(meta: ComponentDoc) {
    return resolveComponentApi(meta).sections;
  }

  stylingTokens(meta: ComponentDoc) {
    return resolveComponentStyling(meta);
  }

  importSnippet(meta: ComponentDoc): string {
    return importSnippetFor(meta);
  }

  onSectionChange(next: string): void {
    this.section.set(next as ComponentDocStepId);
  }

  examples(meta: ComponentDoc) {
    return resolveComponentExamples(meta);
  }
}
