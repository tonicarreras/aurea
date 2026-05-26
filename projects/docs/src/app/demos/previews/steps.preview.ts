import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuStepPanel, AuStep, AuSteps } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-steps',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSteps, AuStep, AuStepPanel],
  template: `
    <div class="docs-preview docs-preview--wide">
      <au-steps
        [(value)]="section"
        [ariaLabel]="t().ariaLabel"
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
        <button
          type="button"
          auStep="examples"
        >
          {{ t().examples }}
        </button>
        <div auStepPanel="overview">
          <p>{{ t().overviewPanel }}</p>
        </div>
        <div auStepPanel="api">
          <p>{{ t().apiPanel }}</p>
        </div>
        <div auStepPanel="examples">
          <p>{{ t().examplesPanel }}</p>
        </div>
      </au-steps>
    </div>
  `,
})
export class StepsDemo {
  readonly t = docsPreviewCopy('steps');
  readonly section = model('overview');
}
