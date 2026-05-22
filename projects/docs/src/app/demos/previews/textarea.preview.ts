import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuTextarea } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuTextarea],
  template: `
    <au-form-field label="Bio">
      <au-textarea
        [rows]="3"
        placeholder="Cuéntanos sobre ti…"
        style="max-width: 24rem"
      />
    </au-form-field>
  `,
})
export class TextareaDemo {}
