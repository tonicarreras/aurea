import {
  ExampleMessageBannerActionDemo,
  ExampleMessageBannerDemo,
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
  {
    title: 'Banner',
    demoComponent: ExampleMessageBannerDemo,
    code: `<au-message
  layout="banner"
  variant="info"
  title="Scheduled maintenance"
  message="Read-only mode from 18:00–19:00 UTC."
  [dismissible]="true"
/>`,
  },
  {
    title: 'Banner with action',
    demoComponent: ExampleMessageBannerActionDemo,
    code: `<au-message
  layout="banner"
  variant="warning"
  title="Trial ending soon"
  message="Upgrade to keep team features."
  actionLabel="View plans"
  [dismissible]="true"
/>`,
  },
];
