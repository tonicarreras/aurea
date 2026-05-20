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
      code: `<au-textarea label="Comentario" [rows]="3" placeholder="Escribe aquí…" />`,
    },
    {
      title: 'Con hint',
      demoComponent: ExampleTextareaHintDemo,
      code: `<au-textarea label="Bio" [rows]="4" hint="Máximo 280 caracteres." />`,
    },
    {
      title: 'Con error',
      description: 'Estado inválido con `errorMessage`; expone `aria-invalid` y `aria-errormessage`.',
      demoComponent: ExampleTextareaErrorDemo,
      code: `<au-textarea
  label="Comentario"
  [rows]="3"
  errorMessage="Añade al menos una frase."
/>`,
    },
];
