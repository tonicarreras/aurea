import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AuFormField, AuRadioGroup } from '@aurea-design-system/components';
import { DocsLocaleService } from '../../core/docs-locale.service';
import { docsPreviewCopy } from '../../core/docs-preview-copy';
import { getRadioOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-preview-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuRadioGroup],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field [label]="t().label">
        <au-radio-group [options]="options()" />
      </au-form-field>
    </div>
  `,
})
export class RadioGroupDemo {
  private readonly i18n = inject(DocsLocaleService);
  readonly t = docsPreviewCopy('radioGroup');
  readonly options = computed(() => getRadioOptions(this.i18n.locale()));
}
