import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuTagInput } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-tag-input-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuTagInput],
  template: `
    <au-form-field
      [label]="t().basicLabel"
      [hint]="t().basicHint"
    >
      <au-tag-input />
    </au-form-field>
  `,
})
export class ExampleTagInputBasicDemo {
  readonly t = docsExampleLive('tagInput');
}

@Component({
  selector: 'docs-example-tag-input-limits',
  changeDetectionStrategy: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuTagInput],
  template: `
    <au-form-field
      [label]="t().limitsLabel"
      [hint]="t().limitsHint"
    >
      <au-tag-input
        [maxTags]="5"
        [allowDuplicates]="false"
      />
    </au-form-field>
  `,
})
export class ExampleTagInputLimitsDemo {
  readonly t = docsExampleLive('tagInput');
}
