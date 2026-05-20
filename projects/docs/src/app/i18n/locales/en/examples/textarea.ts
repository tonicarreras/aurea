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
      title: 'With hint',
      demoComponent: ExampleTextareaHintDemo,
      code: `<au-textarea label="Bio" [rows]="4" hint="Maximum 280 characters." />`,
    },
    {
      title: 'With error',
      description: 'Invalid state via `errorMessage`; sets `aria-invalid` and `aria-errormessage`.',
      demoComponent: ExampleTextareaErrorDemo,
      code: `<au-textarea
  label="Comment"
  [rows]="3"
  errorMessage="Add at least one sentence."
/>`,
    },
];
