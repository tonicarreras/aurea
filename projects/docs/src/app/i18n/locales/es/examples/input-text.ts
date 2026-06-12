import {
  ExampleInputTextBasicDemo,
  ExampleInputTextErrorDemo,
  ExampleInputTextHintDemo,
  ExampleInputTextSizesDemo,
} from '../../../../demos/examples/input-text.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Con hint',
    description: 'Hint bajo la etiqueta; el control no ocupa todo el ancho del panel.',
    demoComponent: ExampleInputTextHintDemo,
    code: `<au-form-field label="Usuario" hint="Entre 3 y 20 caracteres.">
  <au-input-text placeholder="nombre" />
</au-form-field>`,
  },
  {
    title: 'Campo básico',
    demoComponent: ExampleInputTextBasicDemo,
    code: `<au-form-field
  label="Email"
  hint="Usamos tu correo solo para avisos."
>
  <au-input-text type="email" placeholder="tu@correo.com" />
</au-form-field>`,
  },
  {
    title: 'Tamaños',
    description: 'Prop `size`: sm, md (por defecto) y lg.',
    demoComponent: ExampleInputTextSizesDemo,
    code: `<au-form-field label="Pequeño">
  <au-input-text size="sm" placeholder="nombre" />
</au-form-field>
<au-form-field label="Grande">
  <au-input-text size="lg" placeholder="nombre" />
</au-form-field>`,
  },
  {
    title: 'Con error',
    demoComponent: ExampleInputTextErrorDemo,
    code: `<au-form-field
  label="Email"
  errorMessage="Introduce un correo válido."
  [invalid]="true"
>
  <au-input-text type="email" />
</au-form-field>`,
  },
];
