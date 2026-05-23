import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { DocsCrudDemo } from '../demos/docs-crud-demo';
import { DocsLocaleService } from '../core/docs-locale.service';
import { DocPage } from '../shared/doc-page';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, DocsCrudDemo],
  template: `
    <docs-page
      [title]="eco().crudDemo.title"
      [lead]="eco().crudDemo.lead"
    >
      <docs-crud-demo />
    </docs-page>
  `,
})
export class GuideCrudDemoPage {
  readonly i18n = inject(DocsLocaleService);
  readonly eco = computed(() => this.i18n.messages().ecosystem);
}
