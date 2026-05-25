import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AuFormField, AuSelect } from '@aurea-design-system/components';
import { DocsLocaleService } from '../../core/docs-locale.service';
import { docsPreviewCopy } from '../../core/docs-preview-copy';
import { getSelectOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-preview-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSelect],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field [label]="t().label">
        <au-select [placeholder]="t().placeholder" [options]="options()" />
      </au-form-field>
    </div>
  `,
})
export class SelectDemo {
  private readonly i18n = inject(DocsLocaleService);
  readonly t = docsPreviewCopy('select');
  readonly options = computed(() => getSelectOptions(this.i18n.locale()));
}
