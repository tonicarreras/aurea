import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuMessage } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-message-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuMessage],
  template: `
    <au-message
      layout="banner"
      variant="info"
      [title]="t().bannerTitle"
      [message]="t().bannerMessage"
      [dismissible]="true"
    />
  `,
})
export class ExampleMessageBannerDemo {
  readonly t = docsExampleLive('message');
}

@Component({
  selector: 'docs-example-message-banner-action',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuMessage],
  template: `
    <au-message
      layout="banner"
      variant="warning"
      [title]="t().bannerActionTitle"
      [message]="t().bannerActionMessage"
      [actionLabel]="t().bannerActionLabel"
      [dismissible]="true"
    />
  `,
})
export class ExampleMessageBannerActionDemo {
  readonly t = docsExampleLive('message');
}

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
  template: `<au-message
    variant="error"
    [message]="t().errorBody"
  />`,
})
export class ExampleMessageErrorDemo {
  readonly t = docsExampleLive('message');
}

@Component({
  selector: 'docs-example-message-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuMessage],
  template: `
    <au-message
      variant="info"
      [message]="t().infoBody"
      [dismissible]="true"
    />
  `,
})
export class ExampleMessageDismissibleDemo {
  readonly t = docsExampleLive('message');
}
