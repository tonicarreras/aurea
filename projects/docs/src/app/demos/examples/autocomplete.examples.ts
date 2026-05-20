import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuAutocomplete } from '@aurea-design-system/components';
import { autocompleteOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-example-autocomplete-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuAutocomplete],
  template: `
    <au-autocomplete
      label="Ciudad"
      placeholder="Buscar…"
      [options]="options"
      style="max-width: 16rem"
    />
  `,
})
export class ExampleAutocompleteBasicDemo {
  readonly options = autocompleteOptions;
}

@Component({
  selector: 'docs-example-autocomplete-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuAutocomplete],
  template: `
    <au-autocomplete
      label="Ciudad"
      placeholder="Buscar…"
      [options]="options"
      errorMessage="Elige una ciudad de la lista."
      style="max-width: 16rem"
    />
  `,
})
export class ExampleAutocompleteErrorDemo {
  readonly options = autocompleteOptions;
}

@Component({
  selector: 'docs-example-autocomplete-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuAutocomplete],
  template: `
    <au-autocomplete
      label="Ciudad"
      placeholder="Buscar…"
      [options]="options"
      hint="Escribe para filtrar; elige con Enter o clic."
      style="max-width: 16rem"
    />
  `,
})
export class ExampleAutocompleteHintDemo {
  readonly options = autocompleteOptions;
}

// —— Radio / Number / Date ——
