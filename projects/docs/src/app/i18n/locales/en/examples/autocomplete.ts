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
    code: `<au-form-field label="City">
  <au-autocomplete placeholder="Search…" [options]="cities" />
</au-form-field>`,
  },
  {
    title: 'With error',
    demoComponent: ExampleAutocompleteErrorDemo,
    code: `<au-form-field
  label="City"
  errorMessage="Pick a city from the list."
  [invalid]="true"
>
  <au-autocomplete placeholder="Search…" [options]="cities" />
</au-form-field>`,
  },
  {
    title: 'With hint',
    demoComponent: ExampleAutocompleteHintDemo,
    code: `<au-form-field
  label="City"
  hint="Type to filter; choose with Enter or click."
>
  <au-autocomplete placeholder="Search…" [options]="cities" />
</au-form-field>`,
  },
];
