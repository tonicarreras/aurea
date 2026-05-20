import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuTextarea } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTextarea],
  template: `<au-textarea label="Bio" [rows]="3" placeholder="Cuéntanos sobre ti…" style="max-width: 24rem" />`,
})
export class TextareaDemo {}
