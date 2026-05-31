import {
  ExampleFileUploadBasicDemo,
  ExampleFileUploadSingleDemo,
} from '../../../../demos/examples/file-upload.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Multiple files',
    description: 'Drag-and-drop zone with browse button and removable file list.',
    demoComponent: ExampleFileUploadBasicDemo,
    code: `import { AuFileUpload, AuFormField } from '@aurea-design-system/components';

<au-form-field label="Attachments" hint="PDF or images up to 10 MB each.">
  <au-file-upload [(value)]="files" />
</au-form-field>`,
  },
  {
    title: 'Single file',
    description: 'Replace the selection on each pick when `[multiple]="false"`.',
    demoComponent: ExampleFileUploadSingleDemo,
    code: `<au-form-field label="Cover image">
  <au-file-upload
    [(value)]="files"
    [multiple]="false"
    dropLabel="Drop a file here or browse"
  />
</au-form-field>`,
  },
];
