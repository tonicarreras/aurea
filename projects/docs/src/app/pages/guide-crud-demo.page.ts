import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { DocsCrudDemo } from '../demos/docs-crud-demo';
import { DocsLocaleService } from '../core/docs-locale.service';
import { DocPage } from '../shared/doc-page';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, DocsCrudDemo],
  template: `
    <docs-page
      [hero]="true"
      [eyebrow]="eco().crudDemo.frameTitle"
      [title]="eco().crudDemo.title"
      [lead]="eco().crudDemo.lead"
    >
      <p class="docs-crud-demo-page__hint">{{ eco().crudDemo.frameHint }}</p>
      <docs-crud-demo />
    </docs-page>
  `,
  styles: `
    .docs-crud-demo-page__hint {
      margin: 0 0 var(--au-space-6);
      max-width: 100%;
      font-size: var(--au-text-sm);
      line-height: var(--au-leading-relaxed);
      color: var(--au-color-text-secondary);
    }
  `,
})
export class GuideCrudDemoPage {
  readonly i18n = inject(DocsLocaleService);
  readonly eco = computed(() => this.i18n.messages().ecosystem);
}
