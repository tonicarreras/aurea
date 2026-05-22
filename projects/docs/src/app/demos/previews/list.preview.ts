import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuChip, AuList } from '@aurea-design-system/components';
import { DEMO_ROW_TIGHT } from '../shared/demo-layout';

@Component({
  selector: 'docs-preview-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuList, AuChip],
  template: `
    <au-list ariaLabel="Tecnologías seleccionadas">
      <div class="docs-demo-row">
        <au-chip
          label="Angular"
          [removable]="true"
        />
        <au-chip
          label="TypeScript"
          [removable]="true"
        />
        <au-chip
          label="Vitest"
          [removable]="true"
        />
      </div>
    </au-list>
  `,
  styles: [DEMO_ROW_TIGHT],
})
export class ListDemo {}
