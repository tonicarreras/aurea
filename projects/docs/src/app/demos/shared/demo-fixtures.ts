import type {
  AutocompleteOption,
  RadioOption,
  SelectOption,
} from '@aurea-design-system/components';

/** Shared option lists for overview and example demos. */
export const selectOptions: SelectOption[] = [
  { value: 'es', label: 'España' },
  { value: 'mx', label: 'México' },
  { value: 'ar', label: 'Argentina' },
];

export const autocompleteOptions: AutocompleteOption[] = [
  { value: 'mad', label: 'Madrid' },
  { value: 'bcn', label: 'Barcelona' },
  { value: 'vlc', label: 'Valencia' },
];

export const radioOptions: RadioOption[] = [
  { value: 'free', label: 'Gratis' },
  { value: 'pro', label: 'Pro' },
  { value: 'team', label: 'Equipo' },
];
