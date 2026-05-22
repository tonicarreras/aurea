import {
  ExampleDialogConfirmDemo,
  ExampleDialogFormValidationDemo,
} from '../../../../demos/examples/dialog.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Confirmation',
    description: 'Modal dialog with footer actions.',
    demoComponent: ExampleDialogConfirmDemo,
    code: `<au-button (click)="open.set(true)">Open</au-button>

<au-dialog [(open)]="open" title="Delete project" size="sm">
  <p>This action cannot be undone.</p>
  <div auDialogFooter>
    <au-button variant="secondary" (click)="open.set(false)">Cancel</au-button>
    <au-button (click)="open.set(false)">Delete</au-button>
  </div>
</au-dialog>`,
    language: 'typescript',
  },
  {
    title: 'Form with errors',
    description: 'Fields wrapped in `au-form-field` inside the dialog.',
    demoComponent: ExampleDialogFormValidationDemo,
    code: `<au-button (click)="open.set(true)">Edit profile</au-button>

<au-dialog [(open)]="open" title="Edit profile" size="md">
  <au-form-field label="Name" errorMessage="Name is required." [invalid]="true">
    <au-input-text />
  </au-form-field>
  <au-form-field label="Email" errorMessage="Enter a valid email address." [invalid]="true">
    <au-input-text type="email" />
  </au-form-field>
  <div auDialogFooter>
    <au-button variant="secondary" (click)="open.set(false)">Cancel</au-button>
    <au-button (click)="open.set(false)">Save</au-button>
  </div>
</au-dialog>`,
    language: 'typescript',
  },
];
