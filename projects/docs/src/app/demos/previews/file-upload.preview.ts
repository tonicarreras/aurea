import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFileUpload, AuFormField } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-file-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuFileUpload],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field
        [label]="t().label"
        [hint]="t().hint"
      >
        <au-file-upload />
      </au-form-field>
    </div>
  `,
})
export class FileUploadDemo {
  readonly t = docsPreviewCopy('fileUpload');
}
