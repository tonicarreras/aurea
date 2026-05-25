import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AuAutocomplete, AuFormField } from '@aurea-design-system/components';
import { DocsLocaleService } from '../../core/docs-locale.service';
import { docsPreviewCopy } from '../../core/docs-preview-copy';
import { getAutocompleteOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-preview-autocomplete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuAutocomplete],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field [label]="t().label">
        <au-autocomplete [placeholder]="t().placeholder" [options]="options()" />
      </au-form-field>
    </div>
  `,
})
export class AutocompleteDemo {
  private readonly i18n = inject(DocsLocaleService);
  readonly t = docsPreviewCopy('autocomplete');
  readonly options = computed(() => getAutocompleteOptions(this.i18n.locale()));
}
