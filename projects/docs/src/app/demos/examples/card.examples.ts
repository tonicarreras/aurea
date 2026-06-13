import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuButton, AuCard, AuCardFooter } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-card-elevated',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCard],
  template: `
    <au-card
      variant="elevated"
      style="max-width: 20rem"
    >
      <h3 auCardHeader>{{ t().elevatedTitle }}</h3>
      <p>{{ t().elevatedBody }}</p>
    </au-card>
  `,
})
export class ExampleCardElevatedDemo {
  readonly t = docsExampleLive('card');
}

@Component({
  selector: 'docs-example-card-outlined',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCard],
  template: `
    <au-card
      variant="outlined"
      style="max-width: 20rem"
    >
      <h3 auCardHeader>{{ t().outlinedTitle }}</h3>
      <p>{{ t().outlinedBody }}</p>
    </au-card>
  `,
})
export class ExampleCardOutlinedDemo {
  readonly t = docsExampleLive('card');
}

@Component({
  selector: 'docs-example-card-filled-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCard, AuCardFooter, AuButton],
  template: `
    <au-card
      variant="filled"
      style="max-width: 20rem"
    >
      <h3 auCardHeader>{{ t().footerTitle }}</h3>
      <p>{{ t().footerBody }}</p>
      <div auCardFooter>
        <button
          auButton
          size="sm"
        >
          {{ t().footerAction }}
        </button>
      </div>
    </au-card>
  `,
})
export class ExampleCardFilledFooterDemo {
  readonly t = docsExampleLive('card');
}
