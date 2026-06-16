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
  <textarea auTextarea [rows]="3" placeholder="Escribe aquí…"></textarea>
</au-form-field>`,
  },
  {
    title: 'Con hint',
    demoComponent: ExampleTextareaHintDemo,
    code: `<au-form-field label="Bio" hint="Máximo 280 caracteres.">
  <textarea auTextarea [rows]="4"></textarea>
</au-form-field>`,
  },
  {
    title: 'Con error',
    description: 'Estado inválido vía `errorMessage` en `au-form-field`.',
    demoComponent: ExampleTextareaErrorDemo,
    code: `<au-form-field
  label="Comentario"
  errorMessage="Añade al menos una frase."
  [invalid]="true"
>
  <textarea auTextarea [rows]="3"></textarea>
</au-form-field>`,
  },
];
