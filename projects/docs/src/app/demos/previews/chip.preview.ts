import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuChip } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuChip],
  template: `
    <div class="docs-preview docs-preview--row">
      <div class="docs-demo-row docs-demo-row--tight">
        <au-chip label="Angular" />
        <au-chip
          label="TypeScript"
          variant="outline"
        />
        <au-chip
          label="Removible"
          [removable]="true"
        />
      </div>
    </div>
  `,
})
export class ChipDemo {}
