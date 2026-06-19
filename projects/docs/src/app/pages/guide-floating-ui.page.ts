import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { DocsLocaleService } from '../core/docs-locale.service';
import { DocPage } from '../shared/doc-page';
import { DocsGuideSections } from '../shared/docs-guide-sections';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, DocsGuideSections],
  template: `
    <docs-page
      [title]="i18n.messages().guides.floatingUi.title"
      [lead]="i18n.messages().guides.floatingUi.lead"
    >
      <docs-guide-sections [sections]="sections()" />
    </docs-page>
  `,
})
export class GuideFloatingUiPage {
  readonly i18n = inject(DocsLocaleService);
  readonly sections = computed(() => this.i18n.messages().guides.floatingUi.sections);
}
