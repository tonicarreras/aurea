import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuAutocomplete, AuFormField } from '@aurea-design-system/components';

import { autocompleteOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-preview-autocomplete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuAutocomplete],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field label="Ciudad">
        <au-autocomplete
          placeholder="Buscar ciudad…"
          [options]="options"
        />
      </au-form-field>
    </div>
  `,
})
export class AutocompleteDemo {
  readonly options = autocompleteOptions;
}
