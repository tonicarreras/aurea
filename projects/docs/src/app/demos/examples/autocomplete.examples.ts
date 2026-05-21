import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuAutocomplete, AuFormField } from '@aurea-design-system/components';
import { autocompleteOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-example-autocomplete-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuAutocomplete],
  template: `
    <au-form-field label="Ciudad">
      <au-autocomplete
        placeholder="Buscar…"
        [options]="options"
        style="max-width: 16rem"
      />
    </au-form-field>
  `,
})
export class ExampleAutocompleteBasicDemo {
  readonly options = autocompleteOptions;
}

@Component({
  selector: 'docs-example-autocomplete-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuAutocomplete],
  template: `
    <au-form-field
      label="Ciudad"
      errorMessage="Elige una ciudad de la lista."
      [invalid]="true"
    >
      <au-autocomplete
        placeholder="Buscar…"
        [options]="options"
        style="max-width: 16rem"
      />
    </au-form-field>
  `,
})
export class ExampleAutocompleteErrorDemo {
  readonly options = autocompleteOptions;
}

@Component({
  selector: 'docs-example-autocomplete-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuAutocomplete],
  template: `
    <au-form-field label="Ciudad" hint="Escribe para filtrar; elige con Enter o clic.">
      <au-autocomplete
        placeholder="Buscar…"
        [options]="options"
        style="max-width: 16rem"
      />
    </au-form-field>
  `,
})
export class ExampleAutocompleteHintDemo {
  readonly options = autocompleteOptions;
}
