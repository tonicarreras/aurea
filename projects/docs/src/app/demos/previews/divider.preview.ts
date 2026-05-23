import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuDivider } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuDivider],
  template: `
    <div class="docs-preview docs-preview--stack">
      <div class="docs-demo-stack">
        <p>Sección superior</p>
        <au-divider />
        <au-divider label="o" />
        <p>Sección inferior</p>
      </div>
    </div>
  `,
})
export class DividerDemo {}
