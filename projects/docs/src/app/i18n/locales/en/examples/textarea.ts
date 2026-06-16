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
  <textarea auTextarea [rows]="3" placeholder="Write here…"></textarea>
</au-form-field>`,
  },
  {
    title: 'With hint',
    demoComponent: ExampleTextareaHintDemo,
    code: `<au-form-field label="Bio" hint="Maximum 280 characters.">
  <textarea auTextarea [rows]="4"></textarea>
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
  <textarea auTextarea [rows]="3"></textarea>
</au-form-field>`,
  },
];
