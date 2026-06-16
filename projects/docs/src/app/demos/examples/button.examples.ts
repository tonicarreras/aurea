import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuButton } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';
import { DEMO_ROW } from '../shared/demo-layout';

@Component({
  selector: 'docs-example-button-primary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<button
    auButton
    variant="primary"
  >
    {{ t().primary }}
  </button>`,
})
export class ExampleButtonPrimaryDemo {
  readonly t = docsExampleLive('button');
}

@Component({
  selector: 'docs-example-button-secondary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<button
    auButton
    variant="secondary"
  >
    {{ t().secondary }}
  </button>`,
})
export class ExampleButtonSecondaryDemo {
  readonly t = docsExampleLive('button');
}

@Component({
  selector: 'docs-example-button-outline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<button
    auButton
    variant="outline"
  >
    {{ t().outline }}
  </button>`,
})
export class ExampleButtonOutlineDemo {
  readonly t = docsExampleLive('button');
}

@Component({
  selector: 'docs-example-button-ghost',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<button
    auButton
    variant="ghost"
  >
    {{ t().ghost }}
  </button>`,
})
export class ExampleButtonGhostDemo {
  readonly t = docsExampleLive('button');
}

@Component({
  selector: 'docs-example-button-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<button
    auButton
    variant="primary"
    [loading]="true"
  >
    {{ t().loading }}
  </button>`,
})
export class ExampleButtonLoadingDemo {
  readonly t = docsExampleLive('button');
}

@Component({
  selector: 'docs-example-button-disabled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton],
  template: `<button
    auButton
    variant="primary"
    [disabled]="true"
  >
    {{ t().disabled }}
  </button>`,
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
      <button
        auButton
        size="sm"
      >
        {{ t().sizeSm }}
      </button>
      <button
        auButton
        size="md"
      >
        {{ t().sizeMd }}
      </button>
      <button
        auButton
        size="lg"
      >
        {{ t().sizeLg }}
      </button>
    </div>
  `,
  styles: [DEMO_ROW],
})
export class ExampleButtonSizesDemo {
  readonly t = docsExampleLive('button');
}
