import {
  ExampleMessageDismissibleDemo,
  ExampleMessageErrorDemo,
  ExampleMessageSuccessDemo,
} from '../../../../demos/examples/message.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Success',
    demoComponent: ExampleMessageSuccessDemo,
    code: `<au-message
  variant="success"
  title="Profile updated"
  message="Your changes were saved."
/>`,
  },
  {
    title: 'Error',
    demoComponent: ExampleMessageErrorDemo,
    code: `<au-message variant="error" message="Please fix the highlighted fields." />`,
  },
  {
    title: 'Dismissible',
    demoComponent: ExampleMessageDismissibleDemo,
    code: `<au-message
  variant="info"
  message="You can dismiss this notice."
  [dismissible]="true"
  (dismiss)="onDismiss()"
/>`,
  },
];
