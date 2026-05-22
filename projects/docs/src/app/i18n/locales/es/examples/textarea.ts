import {
  ExampleTextareaBasicDemo,
  ExampleTextareaErrorDemo,
  ExampleTextareaHintDemo,
} from '../../../../demos/examples/textarea.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Textarea básico',
    demoComponent: ExampleTextareaBasicDemo,
    code: `<au-form-field label="Comentario">
  <au-textarea [rows]="3" placeholder="Escribe aquí…" />
</au-form-field>`,
  },
  {
    title: 'Con hint',
    demoComponent: ExampleTextareaHintDemo,
    code: `<au-form-field label="Bio" hint="Máximo 280 caracteres.">
  <au-textarea [rows]="4" />
</au-form-field>`,
  },
  {
    title: 'Con error',
    demoComponent: ExampleTextareaErrorDemo,
    code: `<au-form-field
  label="Comentario"
  errorMessage="Añade al menos una frase."
  [invalid]="true"
>
  <au-textarea [rows]="3" />
</au-form-field>`,
  },
];
