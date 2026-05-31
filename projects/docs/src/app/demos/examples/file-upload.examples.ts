import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuFileUpload, AuFormField } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-file-upload-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuFileUpload],
  template: `
    <au-form-field
      [label]="t().basicLabel"
      [hint]="t().hint"
    >
      <au-file-upload [(value)]="files" />
    </au-form-field>
  `,
})
export class ExampleFileUploadBasicDemo {
  readonly t = docsExampleLive('fileUpload');
  readonly files = model<File[]>([]);
}

@Component({
  selector: 'docs-example-file-upload-single',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuFileUpload],
  template: `
    <au-form-field [label]="t().singleLabel">
      <au-file-upload
        [(value)]="files"
        [multiple]="false"
        [dropLabel]="t().singleDropLabel"
      />
    </au-form-field>
  `,
})
export class ExampleFileUploadSingleDemo {
  readonly t = docsExampleLive('fileUpload');
  readonly files = model<File[]>([]);
}
