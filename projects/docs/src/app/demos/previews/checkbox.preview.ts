import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuCheckbox } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCheckbox],
  template: `
    <div class="docs-preview docs-preview--stack">
      <div class="docs-demo-stack">
        <au-checkbox [label]="t().terms" />
        <au-checkbox
          [label]="t().newsletter"
          [checked]="true"
        />
      </div>
    </div>
  `,
})
export class CheckboxDemo {
  readonly t = docsPreviewCopy('checkbox');
}
