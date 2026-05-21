import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuMessage } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-message-success',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuMessage],
  template: `
    <au-message
      variant="success"
      title="Profile updated"
      message="Your changes were saved."
    />
  `,
})
export class ExampleMessageSuccessDemo {}

@Component({
  selector: 'docs-example-message-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuMessage],
  template: `
    <au-message variant="error" message="Please fix the highlighted fields." />
  `,
})
export class ExampleMessageErrorDemo {}

@Component({
  selector: 'docs-example-message-dismissible',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuMessage],
  template: `
    @if (visible()) {
      <au-message
        variant="info"
        message="You can dismiss this notice."
        [dismissible]="true"
        (dismiss)="visible.set(false)"
      />
    }
  `,
})
export class ExampleMessageDismissibleDemo {
  readonly visible = signal(true);
}
