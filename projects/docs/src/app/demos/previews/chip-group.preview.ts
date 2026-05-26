import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuChip, AuChipGroup } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-chip-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuChip, AuChipGroup],
  template: `
    <div class="docs-preview docs-preview--row">
      <au-chip-group [ariaLabel]="t().ariaLabel">
        <div class="docs-demo-row docs-demo-row--tight">
          <au-chip
            [label]="t().draft"
            [selectable]="true"
          />
          <au-chip
            [label]="t().published"
            [selectable]="true"
            [selected]="true"
            variant="accent"
          />
          <au-chip
            [label]="t().archived"
            [selectable]="true"
          />
        </div>
      </au-chip-group>
    </div>
  `,
})
export class ChipGroupDemo {
  readonly t = docsPreviewCopy('chipGroup');
}
