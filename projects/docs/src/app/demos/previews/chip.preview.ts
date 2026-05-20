import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuChip } from '@aurea-design-system/components';
import { DEMO_ROW_TIGHT } from '../shared/demo-layout';

@Component({
  selector: 'docs-preview-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuChip],
  template: `
    <div class="docs-demo-row">
      <au-chip label="Angular" />
      <au-chip label="TypeScript" variant="outline" />
      <au-chip label="Removible" [removable]="true" />
    </div>
  `,
  styles: [DEMO_ROW_TIGHT],
})
export class ChipDemo {}
