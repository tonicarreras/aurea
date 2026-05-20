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
      code: `<au-autocomplete
  label="Ciudad"
  placeholder="Buscar…"
  [options]="cities"
/>`,
    },
    {
      title: 'Con error',
      demoComponent: ExampleAutocompleteErrorDemo,
      code: `<au-autocomplete
  label="Ciudad"
  placeholder="Buscar…"
  [options]="cities"
  errorMessage="Elige una ciudad de la lista."
/>`,
    },
    {
      title: 'Con hint',
      demoComponent: ExampleAutocompleteHintDemo,
      code: `<au-autocomplete
  label="Ciudad"
  placeholder="Buscar…"
  [options]="cities"
  hint="Escribe para filtrar; elige con Enter o clic."
/>`,
    },
];
