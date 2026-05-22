import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuTextarea } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuTextarea],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field label="Bio">
        <au-textarea
          [rows]="3"
          placeholder="Cuéntanos sobre ti…"
        />
      </au-form-field>
    </div>
  `,
})
export class TextareaDemo {}
