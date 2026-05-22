import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuStep, AuStepPanel, AuSteps } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-steps-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSteps, AuStep, AuStepPanel],
  template: `
    <au-steps
      [(value)]="section"
      ariaLabel="Documentation sections"
      layout="tabs"
    >
      <button
        type="button"
        auStep="overview"
      >
        Overview
      </button>
      <button
        type="button"
        auStep="api"
      >
        API
      </button>
      <div auStepPanel="overview"><p>Overview content</p></div>
      <div auStepPanel="api"><p>API reference</p></div>
    </au-steps>
  `,
})
export class ExampleStepsTabsDemo {
  readonly section = model('overview');
}

@Component({
  selector: 'docs-example-steps-sections',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSteps, AuStep, AuStepPanel],
  template: `
    <au-steps
      [(value)]="section"
      ariaLabel="On-page sections"
      layout="sections"
    >
      <button
        type="button"
        auStep="intro"
      >
        Intro
      </button>
      <button
        type="button"
        auStep="usage"
      >
        Usage
      </button>
      <div auStepPanel="intro"><p id="intro">Introduction</p></div>
      <div auStepPanel="usage"><p id="usage">Usage notes</p></div>
    </au-steps>
  `,
})
export class ExampleStepsSectionsDemo {
  readonly section = model('intro');
}
