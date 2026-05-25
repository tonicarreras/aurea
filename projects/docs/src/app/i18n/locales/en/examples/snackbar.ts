import {
  ExampleSnackbarErrorDemo,
  ExampleSnackbarSuccessDemo,
} from '../../../../demos/examples/snackbar.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Success',
    demoComponent: ExampleSnackbarSuccessDemo,
    code: `<au-snackbar
  [(open)]="saved"
  message="Changes saved"
  variant="success"
  [durationMs]="3000"
/>`,
    language: 'typescript',
  },
  {
    title: 'Error',
    demoComponent: ExampleSnackbarErrorDemo,
    code: `<au-snackbar
  [(open)]="failed"
  message="Could not save"
  variant="error"
/>`,
    language: 'typescript',
  },
];
