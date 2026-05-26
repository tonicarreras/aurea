import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuStep, AuStepPanel, AuSteps } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-steps-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSteps, AuStep, AuStepPanel],
  template: `
    <au-steps
      [(value)]="section"
      [ariaLabel]="t().tabsAria"
      layout="tabs"
    >
      <button
        type="button"
        auStep="overview"
      >
        {{ t().overview }}
      </button>
      <button
        type="button"
        auStep="api"
      >
        {{ t().api }}
      </button>
      <div auStepPanel="overview">
        <p>{{ t().overviewPanel }}</p>
      </div>
      <div auStepPanel="api">
        <p>{{ t().apiPanel }}</p>
      </div>
    </au-steps>
  `,
})
export class ExampleStepsTabsDemo {
  readonly t = docsExampleLive('steps');
  readonly section = model('overview');
}

@Component({
  selector: 'docs-example-steps-sections',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSteps, AuStep, AuStepPanel],
  template: `
    <au-steps
      [(value)]="section"
      [ariaLabel]="t().sectionsAria"
      layout="sections"
    >
      <button
        type="button"
        auStep="intro"
      >
        {{ t().intro }}
      </button>
      <button
        type="button"
        auStep="usage"
      >
        {{ t().usage }}
      </button>
      <div auStepPanel="intro">
        <p>{{ t().introPanel }}</p>
      </div>
      <div auStepPanel="usage">
        <p>{{ t().usagePanel }}</p>
      </div>
    </au-steps>
  `,
})
export class ExampleStepsSectionsDemo {
  readonly t = docsExampleLive('steps');
  readonly section = model('intro');
}
