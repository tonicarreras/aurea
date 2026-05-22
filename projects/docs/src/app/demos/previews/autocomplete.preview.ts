import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuAutocomplete, AuFormField } from '@aurea-design-system/components';
import { autocompleteOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-preview-autocomplete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuAutocomplete],
  template: `
    <au-form-field label="Ciudad">
      <au-autocomplete
        placeholder="Buscar ciudad…"
        [options]="options"
        style="max-width: 16rem"
      />
    </au-form-field>
  `,
})
export class AutocompleteDemo {
  readonly options = autocompleteOptions;
}
