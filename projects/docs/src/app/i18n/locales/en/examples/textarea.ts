import {
  ExampleTextareaBasicDemo,
  ExampleTextareaErrorDemo,
  ExampleTextareaHintDemo,
} from '../../../../demos/examples/textarea.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Basic textarea',
    demoComponent: ExampleTextareaBasicDemo,
    code: `<au-form-field label="Comment">
  <au-textarea [rows]="3" placeholder="Write here…" />
</au-form-field>`,
  },
  {
    title: 'With hint',
    demoComponent: ExampleTextareaHintDemo,
    code: `<au-form-field label="Bio" hint="Maximum 280 characters.">
  <au-textarea [rows]="4" />
</au-form-field>`,
  },
  {
    title: 'With error',
    description: 'Invalid state via `errorMessage` on `au-form-field`.',
    demoComponent: ExampleTextareaErrorDemo,
    code: `<au-form-field
  label="Comment"
  errorMessage="Add at least one sentence."
  [invalid]="true"
>
  <au-textarea [rows]="3" />
</au-form-field>`,
  },
];
