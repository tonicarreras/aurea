import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuMessage } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-message-success',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuMessage],
  template: `
    <au-message
      variant="success"
      [title]="t().successTitle"
      [message]="t().successBody"
    />
  `,
})
export class ExampleMessageSuccessDemo {
  readonly t = docsExampleLive('message');
}

@Component({
  selector: 'docs-example-message-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuMessage],
  template: `<au-message variant="error" [message]="t().errorBody" />`,
})
export class ExampleMessageErrorDemo {
  readonly t = docsExampleLive('message');
}

@Component({
  selector: 'docs-example-message-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuMessage],
  template: `
    <au-message variant="info" [message]="t().infoBody" [dismissible]="true" />
  `,
})
export class ExampleMessageDismissibleDemo {
  readonly t = docsExampleLive('message');
}
