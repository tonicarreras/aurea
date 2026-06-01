import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuTagInput } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-tag-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuTagInput],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field
        [label]="t().label"
        [hint]="t().hint"
      >
        <au-tag-input [value]="t().initialTags" />
      </au-form-field>
    </div>
  `,
})
export class TagInputDemo {
  readonly t = docsPreviewCopy('tagInput');
}
