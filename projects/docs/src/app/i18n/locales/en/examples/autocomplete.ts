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
      title: 'With error',
      demoComponent: ExampleAutocompleteErrorDemo,
      code: `<au-autocomplete
  label="City"
  placeholder="Search…"
  [options]="cities"
  errorMessage="Pick a city from the list."
/>`,
    },
    {
      title: 'With hint',
      demoComponent: ExampleAutocompleteHintDemo,
      code: `<au-autocomplete
  label="City"
  placeholder="Search…"
  [options]="cities"
  hint="Type to filter; choose with Enter or click."
/>`,
    },
];
