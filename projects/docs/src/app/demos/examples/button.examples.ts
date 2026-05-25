import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuButton } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';
import { DEMO_ROW } from '../shared/demo-layout';

@Component({
  selector: 'docs-example-button-primary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<au-button variant="primary">{{ t().primary }}</au-button>`,
})
export class ExampleButtonPrimaryDemo {
  readonly t = docsExampleLive('button');
}

@Component({
  selector: 'docs-example-button-secondary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<au-button variant="secondary">{{ t().secondary }}</au-button>`,
})
export class ExampleButtonSecondaryDemo {
  readonly t = docsExampleLive('button');
}

@Component({
  selector: 'docs-example-button-outline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<au-button variant="outline">{{ t().outline }}</au-button>`,
})
export class ExampleButtonOutlineDemo {
  readonly t = docsExampleLive('button');
}

@Component({
  selector: 'docs-example-button-ghost',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<au-button variant="ghost">{{ t().ghost }}</au-button>`,
})
export class ExampleButtonGhostDemo {
  readonly t = docsExampleLive('button');
}

@Component({
  selector: 'docs-example-button-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<au-button variant="primary" [loading]="true">{{ t().loading }}</au-button>`,
})
export class ExampleButtonLoadingDemo {
  readonly t = docsExampleLive('button');
}

@Component({
  selector: 'docs-example-button-disabled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<au-button variant="primary" [disabled]="true">{{ t().disabled }}</au-button>`,
})
export class ExampleButtonDisabledDemo {
  readonly t = docsExampleLive('button');
}

@Component({
  selector: 'docs-example-button-sizes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `
    <div class="docs-demo-row">
      <au-button size="sm">{{ t().sizeSm }}</au-button>
      <au-button size="md">{{ t().sizeMd }}</au-button>
      <au-button size="lg">{{ t().sizeLg }}</au-button>
    </div>
  `,
  styles: [DEMO_ROW],
})
export class ExampleButtonSizesDemo {
  readonly t = docsExampleLive('button');
}
