import {
  ExampleAutocompleteBasicDemo,
  ExampleAutocompleteErrorDemo,
  ExampleAutocompleteHintDemo,
} from '../../../../demos/examples/autocomplete.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Autocomplete',
    demoComponent: ExampleAutocompleteBasicDemo,
    code: `<au-form-field label="Ciudad">
  <au-autocomplete placeholder="Buscar…" [options]="cities" />
</au-form-field>`,
  },
  {
    title: 'Con error',
    demoComponent: ExampleAutocompleteErrorDemo,
    code: `<au-form-field
  label="Ciudad"
  errorMessage="Elige una ciudad de la lista."
  [invalid]="true"
>
  <au-autocomplete placeholder="Buscar…" [options]="cities" />
</au-form-field>`,
  },
  {
    title: 'Con hint',
    demoComponent: ExampleAutocompleteHintDemo,
    code: `<au-form-field
  label="Ciudad"
  hint="Escribe para filtrar; elige con Enter o clic."
>
  <au-autocomplete placeholder="Buscar…" [options]="cities" />
</au-form-field>`,
  },
];
