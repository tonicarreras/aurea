import {
  ExampleSelectBasicDemo,
  ExampleSelectErrorDemo,
  ExampleSelectHintDemo,
} from '../../../../demos/examples/select.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
{
      title: 'Select con opciones',
      demoComponent: ExampleSelectBasicDemo,
      code: `options: SelectOption[] = [
  { value: 'es', label: 'España' },
  { value: 'mx', label: 'México' },
];

<au-select label="País" placeholder="Elige…" [options]="options" />`,
      language: 'typescript',
    },
    {
      title: 'Obligatorio con error',
      demoComponent: ExampleSelectErrorDemo,
      code: `<au-select
  label="País"
  placeholder="Elige…"
  [options]="options"
  [required]="true"
  errorMessage="Selecciona un país."
/>`,
      language: 'typescript',
    },
    {
      title: 'Con hint',
      demoComponent: ExampleSelectHintDemo,
      code: `<au-select
  label="País de residencia"
  placeholder="Elige…"
  [options]="options"
  hint="Usado para facturación y envíos."
/>`,
      language: 'typescript',
    },
];
