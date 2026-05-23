import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuChip, AuChipGroup } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-chip-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuChipGroup, AuChip],
  template: `
    <div class="docs-preview docs-preview--row">
      <au-chip-group ariaLabel="Filtros de estado">
        <div class="docs-demo-row docs-demo-row--tight">
          <au-chip
            label="Borrador"
            [selectable]="true"
          />
          <au-chip
            label="Publicado"
            [selectable]="true"
            [selected]="true"
            variant="accent"
          />
          <au-chip
            label="Archivado"
            [selectable]="true"
          />
        </div>
      </au-chip-group>
    </div>
  `,
})
export class ChipGroupDemo {}
