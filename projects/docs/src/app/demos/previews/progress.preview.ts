import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuProgress } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuProgress],
  template: `<div class="docs-preview docs-preview--field"><au-progress [value]="62" /></div>`,
})
export class ProgressDemo {}
