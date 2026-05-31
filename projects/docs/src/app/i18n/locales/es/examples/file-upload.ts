import {
  ExampleFileUploadBasicDemo,
  ExampleFileUploadSingleDemo,
} from '../../../../demos/examples/file-upload.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Varios archivos',
    description: 'Zona drag-and-drop con botón de explorar y lista removible.',
    demoComponent: ExampleFileUploadBasicDemo,
    code: `import { AuFileUpload, AuFormField } from '@aurea-design-system/components';

<au-form-field label="Adjuntos" hint="PDF o imágenes de hasta 10 MB.">
  <au-file-upload [(value)]="files" />
</au-form-field>`,
  },
  {
    title: 'Un solo archivo',
    description: 'Reemplaza la selección en cada elección con `[multiple]="false"`.',
    demoComponent: ExampleFileUploadSingleDemo,
    code: `<au-form-field label="Imagen de portada">
  <au-file-upload
    [(value)]="files"
    [multiple]="false"
    dropLabel="Arrastra un archivo o explora"
  />
</au-form-field>`,
  },
];
