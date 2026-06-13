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
        <input type="checkbox" auCheckbox [label]="t().terms" />
        <input type="checkbox" auCheckbox
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
