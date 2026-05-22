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
    code: `options: AuSelectOption[] = [
  { value: 'es', label: 'España' },
  { value: 'mx', label: 'México' },
];

<au-form-field label="País">
  <au-select placeholder="Elige…" [options]="options" />
</au-form-field>`,
    language: 'typescript',
  },
  {
    title: 'Obligatorio con error',
    demoComponent: ExampleSelectErrorDemo,
    code: `<au-form-field
  label="País"
  [required]="true"
  errorMessage="Selecciona un país."
  [invalid]="true"
>
  <au-select placeholder="Elige…" [options]="options" />
</au-form-field>`,
    language: 'typescript',
  },
  {
    title: 'Con hint',
    demoComponent: ExampleSelectHintDemo,
    code: `<au-form-field
  label="País de residencia"
  hint="Se usa en facturación y envío."
>
  <au-select placeholder="Elige…" [options]="options" />
</au-form-field>`,
    language: 'typescript',
  },
];
