import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuChip, AuChipGroup } from '@aurea-design-system/components';
import { DEMO_ROW_TIGHT } from '../shared/demo-layout';

@Component({
  selector: 'docs-preview-chip-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuChipGroup, AuChip],
  template: `
    <au-chip-group ariaLabel="Filtros de estado">
      <div class="docs-demo-row">
        <au-chip label="Borrador" [selectable]="true" />
        <au-chip label="Publicado" [selectable]="true" [selected]="true" variant="accent" />
        <au-chip label="Archivado" [selectable]="true" />
      </div>
    </au-chip-group>
  `,
  styles: [DEMO_ROW_TIGHT],
})
export class ChipGroupDemo {}
