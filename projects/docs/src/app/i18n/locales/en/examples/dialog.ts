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
    code: `<button auButton (click)="open.set(true)">Open</button>

<au-dialog [(open)]="open" title="Delete project" size="sm">
  <p>This action cannot be undone.</p>
  <div auDialogFooter>
    <button auButton variant="secondary" (click)="open.set(false)">Cancel</button>
    <button auButton (click)="open.set(false)">Delete</button>
  </div>
</au-dialog>`,
    language: 'typescript',
  },
  {
    title: 'Form with errors',
    description: 'Fields wrapped in `au-form-field` inside the dialog.',
    demoComponent: ExampleDialogFormValidationDemo,
    code: `<button auButton (click)="open.set(true)">Edit profile</button>

<au-dialog [(open)]="open" title="Edit profile" size="md">
  <au-form-field label="Name" errorMessage="Name is required." [invalid]="true">
    <input auInputText />
  </au-form-field>
  <au-form-field label="Email" errorMessage="Enter a valid email address." [invalid]="true">
    <input auInputText type="email" />
  </au-form-field>
  <div auDialogFooter>
    <button auButton variant="secondary" (click)="open.set(false)">Cancel</button>
    <button auButton (click)="open.set(false)">Save</button>
  </div>
</au-dialog>`,
    language: 'typescript',
  },
];
