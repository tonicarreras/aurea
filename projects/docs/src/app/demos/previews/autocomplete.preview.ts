import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuAutocomplete } from '@aurea-design-system/components';
import { autocompleteOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-preview-autocomplete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuAutocomplete],
  template: `
    <au-autocomplete
      label="Ciudad"
      placeholder="Buscar ciudad…"
      [options]="options"
      style="max-width: 16rem"
    />
  `,
})
export class AutocompleteDemo {
  readonly options = autocompleteOptions;
}
