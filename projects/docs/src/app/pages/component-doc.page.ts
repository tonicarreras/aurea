import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { COMPONENT_DOCS_BY_SLUG } from '../core/component-docs.registry';
import { CodeBlock } from '../shared/code-block';
import { DemoPanel } from '../shared/demo-panel';
import { DocPage } from '../shared/doc-page';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, DemoPanel, CodeBlock, NgComponentOutlet, RouterLink],
  template: `
    @if (doc(); as meta) {
      <docs-page [title]="meta.title" [lead]="meta.summary">
        <p>
          Export: <code>{{ meta.exportName }}</code> · Selector:
          <code>{{ meta.selector }}</code>
        </p>

        <docs-demo-panel>
          <ng-container *ngComponentOutlet="meta.demoComponent" />
        </docs-demo-panel>

        <h2>Código</h2>
        <docs-code-block [code]="meta.snippet" />
      </docs-page>
    } @else {
      <docs-page title="No encontrado" lead="No hay documentación para este componente.">
        <p><a routerLink="/componentes">Volver al índice</a></p>
      </docs-page>
    }
  `,
})
export class ComponentDocPage {
  private readonly route = inject(ActivatedRoute);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: '' },
  );

  readonly doc = computed(() => COMPONENT_DOCS_BY_SLUG[this.slug()] ?? null);
}
